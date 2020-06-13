import { Value } from '@quenk/noni/lib/data/json';
import { Event } from '@quenk/wml-widgets/lib/control';
import { Post } from '@board/types/lib/post';
import { PostFormAppView } from './views/app';
/**
 * WMLId for wml elements.
 */
export declare type WMLId = string;
/**
 * Message to display to the user.
 */
export declare type Message = string;
/**
 * PostFormApp provides the JS form used to create new forms.
 *
 * The JS impementation of this form was done as a feeble attempt to disuade
 * abuse. Additional measures should be put in place if the board's popularity
 * grows.
 */
export declare class PostFormApp {
    node: Node;
    constructor(node: Node);
    view: PostFormAppView;
    values: {
        post: {
            data: Post;
            onChange: import("@quenk/noni/lib/data/function").Function<Event<Value>, void>;
        };
        buttons: {
            preview: {
                id: string;
            };
        };
    };
    static create(node: Node): PostFormApp;
    /**
     * setControlErrorMessages updates a control to have an error message.
     *
     * The control will be switched into the "error" validation state.
     */
    setControlErrorMessage(id: WMLId, msg: Message): void;
    /**
     * setControlOk gives the user visual feedback when a control's value is
     * valid.
     */
    setControlOk(id: WMLId): void;
    /**
     * formIsValid tests whether the data entered into the form so far is
     * valid.
     */
    formIsValid(): boolean;
    /**
     * updatePreviewButton toggles the "Preview" button between
     * it's disabled and enabled states.
     *
     * @param state - If true, the button will be enabled, disabled otherwise.
     */
    updatePreviewButton(state: boolean): void;
    /**
     * run the application.
     */
    run(): void;
}
