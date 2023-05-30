import * as mark from '@devcarib/server/lib/data/markdown';

import { View } from '@quenk/wml';
import { Value, Object } from '@quenk/noni/lib/data/jsonx';
import { debounce } from '@quenk/noni/lib/control/timer';
import { Future, pure, raise } from '@quenk/noni/lib/control/monad/future';
import { Record } from '@quenk/noni/lib/data/record';
import { Event } from '@quenk/wml-widgets/lib/control';
import { getById } from '@quenk/wml-widgets/lib/util';
import { ValidationState } from '@quenk/wml-widgets/lib/control/feedback';
import { TextField } from '@quenk/wml-widgets/lib/control/text-field';
import { Button } from '@quenk/wml-widgets/lib/control/button';
import { createAgent } from '@quenk/jhr/lib/browser';
import { Response } from '@quenk/jhr/lib/response';

import { Job } from '@board/types/lib/job';

import {
    fieldValidators,
    validate
} from '@board/server/lib/data/validators/job';

import { JOB_STATUS_NEW } from '@board/server/lib/data/job';

import { JobFormAppView } from './views/app';
import { PreviewView } from './views/preview';
import { FinishView } from './views/finish';

/**
 * WMLId for wml elements.
 */
export type WMLId = string;

/**
 * Message to display to the user.
 */
export type Message = string;

const DELAY_job_VALIDATION = 250;

const messages = {
    notNull: '{name} is required.',

    minLength: '{name} must be at least {target} characters.',

    maxLength: '{name} must not be more than {target} characters.',

    isString: '{name} is invalid.',

    isNumber: '{name} is invalid.'
};

const escapeMap: Record<string> = {
    '&': '&amp;',

    '"': '&quot;',

    "'": '&#39;',

    '<': '&lt;',

    '>': '&gt;'
};

/**
 * JobFormApp provides the JS form used to create new forms.
 *
 * The JS impementation of this form was done as a feeble attempt to disuade
 * abuse. Additional measures should be put in place if the board's popularity
 * grows.
 */
export class JobFormApp {
    constructor(public node: Node) {}

    view = new JobFormAppView(this);

    previewView = new PreviewView(this);

    finishView = new FinishView(this);

    agent = createAgent();

    values = {
        job: {
            data: <Job>{
                payment_currency: 'USD',

                payment_frequency: 'Monthly',

                status: JOB_STATUS_NEW
            },

            errors: <Record<string>>{},

            onChange: (e: Event<Value>) => {
                let { name, value } = e;

                /* eslint-disable no-prototype-builtins */
                if (fieldValidators.hasOwnProperty(name)) {
                    this.values.job.data[name] = value;

                    let eResult = fieldValidators[name](value);

                    if (eResult.isLeft()) {
                        let msg = <string>(
                            eResult.takeLeft().explain(messages, { name })
                        );

                        this.setControlErrorMessage(name, msg);
                    } else {
                        this.values.job.data[name] = eResult.takeRight();

                        this.setControlOk(name);
                    }

                    this.delayedValidateJob(undefined);
                } else if (e.name === 'type') {
                    console.warn(`Ignoring unknown field: "${name}"`);
                }
            }
        },

        preview: {
            csp: `default-src:'none'; style-src 'self'`,

            sandbox: '',

            srcdoc: ''
        },

        buttons: {
            preview: {
                id: 'preview-button',

                click: () => this.showPreview()
            },

            job: {
                click: () => this.showJob()
            },

            send: {
                id: 'send',

                click: () => this.send()
            }
        }
    };

    delayedValidateJob = debounce(
        () => this.validateJob(),
        DELAY_job_VALIDATION
    );

    static create(node: Node): JobFormApp {
        return new JobFormApp(node);
    }

    /**
     * setControlErrorMessages updates a control to have an error message.
     *
     * The control will be switched into the "error" validation state.
     */
    setControlErrorMessage(id: WMLId, msg: Message): void {
        let mCtl = getById<TextField>(this.view, id);

        if (mCtl.isJust()) {
            let ctl = mCtl.get();

            ctl.setMessage(msg);

            ctl.setValidationState(ValidationState.Error);
        }
    }

    /**
     * setControlOk gives the user visual feedback when a control's value is
     * valid.
     */
    setControlOk(id: WMLId): void {
        let mCtl = getById<TextField>(this.view, id);

        if (mCtl.isJust()) {
            let ctl = mCtl.get();

            ctl.setMessage('');
            ctl.setValidationState(ValidationState.Success);
        }
    }

    /**
     * validateJob tests whether the data entered into the form so far is
     * valid.
     *
     * If it is, the "preview" button will be enabled.
     */
    validateJob() {
        let btn = getById<Button<void>>(
            this.view,
            this.values.buttons.preview.id
        ).get();

        let eresult = validate(this.values.job.data);

        if (eresult.isRight()) btn.enable();
        else btn.disable();
    }

    /**
     * showPreview switches to the preview screen.
     */
    showPreview(): void {
        this.values.job.data.description_html = mark.parse(
            <string>this.values.job.data.description
        );

        this.render(this.previewView);
    }

    /**
     * showJob switches to the job screen.
     */
    showJob(): void {
        this.render(this.view);
        this.validateJob();
    }

    /**
     * showFinished shows the finished views.
     */
    showFinished(): void {
        this.render(this.finishView);
    }

    /**
     * send the data to the backend.
     */
    async send() {
        let mButton = getById<Button<void>>(
            this.previewView,
            this.values.buttons.send.id
        );

        if (mButton.isJust()) mButton.get().disable();

        await this.agent
            .post('/post', this.values.job.data)
            .chain((r: Response<Object>) => {
                if (r.code === 401) {
                    this.values.job.errors = <Record<string>>r.body.errors;

                    this.view.invalidate();
                } else if (r.code === 201) {
                    this.showFinished();
                } else {
                    return <Future<void>>raise(new Error(`Status: ${r.code}`));
                }

                return <Future<void>>pure(undefined);
            })
            .catch(e => {
                alert('An error occured please go back and try again!');
                return <Future<void>>raise(e);
            });
    }

    /**
     * run the application.
     */
    run(): void {
        this.render(this.view);
    }

    /**
     * render a view of the application to the screen.
     */
    render(view: View): void {
        while (this.node.firstChild != null)
            this.node.removeChild(this.node.firstChild);

        this.node.appendChild(<Node>view.render());

        window.scroll(0, 0);
    }
}

export const escape = (str: string) =>
    str.replace(/[&"'<>]/g, t => escapeMap[t]);
