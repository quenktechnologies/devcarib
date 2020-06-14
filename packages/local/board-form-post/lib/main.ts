import { Value } from '@quenk/noni/lib/data/json';
import { debounce } from '@quenk/noni/lib/control/timer';
import { Event } from '@quenk/wml-widgets/lib/control';
import { getById } from '@quenk/wml-widgets/lib/util';
import { ValidationState } from '@quenk/wml-widgets/lib/control/feedback';
import { TextField } from '@quenk/wml-widgets/lib/control/text-field';
import { Button } from '@quenk/wml-widgets/lib/control/button';

import { Post } from '@board/types/lib/post';
import { schema, validate } from '@board/validation/lib/post';

import { PostFormAppView } from './views/app';

/**
 * WMLId for wml elements.
 */
export type WMLId = string;

/**
 * Message to display to the user.
 */
export type Message = string;

const CHANGE_EVENT_DURATION = 1000;

const messages = {

    notNull: '{name} is required.',

    minLength: '{name} must be at least {target} characters.',

    maxLength: '{name} must not be more than {target} characters.',

    isString: '{name} is invalid.',

    isNumber: '{name} is invalid.'

}

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

    values = {

        post: {

            data: <Post>{},

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

                    this.updatePreviewButton(this.formIsValid());

                }

            }, CHANGE_EVENT_DURATION)

        },

        buttons: {

            preview: {

                id: 'preview'

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

        if (mCtl.isJust())
            mCtl.get().setValidationState(ValidationState.Success);

    }

    /**
     * formIsValid tests whether the data entered into the form so far is
     * valid.
     */
    formIsValid(): boolean {

        return validate(this.values.post.data).isRight();

    }

    /**
     * updatePreviewButton toggles the "Preview" button between
     * it's disabled and enabled states.
     *
     * @param state - If true, the button will be enabled, disabled otherwise.
     */
    updatePreviewButton(state: boolean): void {

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
     * run the application.
     */
    run(): void {

        this.node.appendChild(<Node>this.view.render());

    }

}

PostFormApp.create(<Node>document.getElementById('main')).run();
