import { View } from '@quenk/wml';
import { Value, Object } from '@quenk/noni/lib/data/json';
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

import { Post } from '@board/types/lib/post';
import { schema, validate } from '@board/validation/lib/post';

import { PostFormAppView } from './views/app';
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

const CHANGE_EVENT_DURATION = 250;

const messages = {

    notNull: '{name} is required.',

    minLength: '{name} must be at least {target} characters.',

    maxLength: '{name} must not be more than {target} characters.',

    isString: '{name} is invalid.',

    isNumber: '{name} is invalid.'

}

const escapeMap: Record<string> = {

    '&': '&amp;',

    '"': '&quot;',

    '\'': '&#39;',

    '<': '&lt;',

    '>': '&gt;'

}

const agent = createAgent();

/**
 * PostFormApp provides the JS form used to create new forms.
 *
 * The JS impementation of this form was done as a feeble attempt to disuade
 * abuse. Additional measures should be put in place if the board's popularity
 * grows.
 */
export class PostFormApp {

    constructor(public node: Node) { }

    view = new PostFormAppView(this);

    previewView = new PreviewView(this);

    finishView = new FinishView(this);

    values = {

        post: {

            data: <Post>{},

            errors: <Record<string>>{},

            onChange: debounce((e: Event<Value>) => {

                let { name, value } = e;

                if (schema.hasOwnProperty(name)) {

                    this.values.post.data[name] = value;

                    let eResult = schema[name](value);

                    if (eResult.isLeft()) {

                        let msg = <string>eResult
                            .takeLeft()
                            .explain(messages, { name });

                        this.setControlErrorMessage(e.name, msg);

                    } else {

                        this.values.post.data[e.name] = eResult.takeRight();

                        this.setControlOk(e.name);

                    }

                    this.validatePost();

                }

            }, CHANGE_EVENT_DURATION)

        },

        buttons: {

            preview: {

                id: 'preview',

                click: () => this.showPreview()

            },

            post: {

                click: () => this.showPost()

            },

            send: {

                id: 'send',

                click: () => this.send()

            }

        }

    };

    static create(node: Node): PostFormApp {

        return new PostFormApp(node);

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
     * validatePost tests whether the data entered into the form so far is
     * valid.
     *
     * If it is, the "preview" button will be enabled.
     */
    validatePost() {

        let state = validate(this.values.post.data).isRight();

        let mbtn = getById<Button<void>>(this.view,
            this.values.buttons.preview.id);

        if (mbtn.isJust()) {

            let btn = mbtn.get();
            if (state)
                btn.enable();
            else
                btn.disable();

        }

    }

    /**
     * showPreview switches to the preview screen.
     */
    showPreview(): void {

        this.render(this.previewView);

    }

    /**
     * showPost switches to the post screen.
     */
    showPost(): void {

        this.render(this.view);
        this.validatePost();

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
    send(): void {

        let mButton = getById<Button<void>>(this.previewView,
            this.values.buttons.send.id);

        if (mButton.isJust())
            mButton.get().disable();

        agent
            .post('/post', this.values.post.data)
            .chain((r: Response<Object>) => {

                if (r.code === 401) {

                    this.values.post.errors = <Record<string>>r.body.errors;

                    this.view.invalidate();

                } else if (r.code === 201) {

                    this.showFinished();

                } else {

                    return <Future<void>>raise(new Error(`Status: ${r.code}`));

                }

                return <Future<void>>pure(undefined);

            })
            .catch(e => {

                alert('An error occured while sending your request!');

                this.view.invalidate();

                return <Future<void>>raise(e);

            })
            .fork(console.error, () => { });

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

PostFormApp.create(<Node>document.getElementById('main')).run();
