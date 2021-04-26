import { View } from '@quenk/wml';
import { Value } from '@quenk/noni/lib/data/json';
import { Record } from '@quenk/noni/lib/data/record';
import { Event } from '@quenk/wml-widgets/lib/control';
import { Post } from '@board/types/lib/post';
import { PostFormAppView } from './views/app';
import { PreviewView } from './views/preview';
import { FinishView } from './views/finish';
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
    previewView: PreviewView;
    finishView: FinishView;
    values: {
        post: {
            data: Post;
            errors: Record<string>;
            type: {
                options: {
                    label: string;
                    value: string;
                }[];
            };
            onChange: import("@quenk/noni/lib/data/function").Function<Event<Value>, void>;
            onSelect: (e: Event<Value>) => void;
        };
        buttons: {
            preview: {
                id: string;
                click: () => void;
            };
            post: {
                click: () => void;
            };
            send: {
                id: string;
                click: () => void;
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
     * validatePost tests whether the data entered into the form so far is
     * valid.
     *
     * If it is, the "preview" button will be enabled.
     */
    validatePost(): void;
    /**
     * showPreview switches to the preview screen.
     */
    showPreview(): void;
    /**
     * showPost switches to the post screen.
     */
    showPost(): void;
    /**
     * showFinished shows the finished views.
     */
    showFinished(): void;
    /**
     * send the data to the backend.
     */
    send(): void;
    /**
     * run the application.
     */
    run(): void;
    /**
     * render a view of the application to the screen.
     */
    render(view: View): void;
}
export declare const escape: (str: string) => string;
