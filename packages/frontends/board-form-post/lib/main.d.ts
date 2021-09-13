import { View } from '@quenk/wml';
import { Value, Object } from '@quenk/noni/lib/data/json';
import { Record } from '@quenk/noni/lib/data/record';
import { Event } from '@quenk/wml-widgets/lib/control';
import { Job } from '@board/types/lib/job';
import { JobFormAppView } from './views/app';
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
 * JobFormApp provides the JS form used to create new forms.
 *
 * The JS impementation of this form was done as a feeble attempt to disuade
 * abuse. Additional measures should be put in place if the board's popularity
 * grows.
 */
export declare class JobFormApp {
    node: Node;
    constructor(node: Node);
    view: JobFormAppView;
    previewView: PreviewView;
    finishView: FinishView;
    agent: import("@quenk/jhr/lib/agent").Agent<object, Object>;
    values: {
        job: {
            data: Job;
            errors: Record<string>;
            type: {
                options: {
                    label: string;
                    value: string;
                }[];
            };
            payment_frequency: {
                options: {
                    label: string;
                    value: string;
                }[];
            };
            onChange: (e: Event<Value>) => void;
            onSelect: (e: Event<Value>) => void;
        };
        preview: {
            csp: string;
            sandbox: string;
            srcdoc: string;
        };
        buttons: {
            preview: {
                id: string;
                click: () => void;
            };
            job: {
                click: () => void;
            };
            send: {
                id: string;
                click: () => void;
            };
        };
    };
    delayedValidateJob: import("@quenk/noni/lib/data/function").Function<unknown, void>;
    static create(node: Node): JobFormApp;
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
     * validateJob tests whether the data entered into the form so far is
     * valid.
     *
     * If it is, the "preview" button will be enabled.
     */
    validateJob(): void;
    /**
     * showPreview switches to the preview screen.
     */
    showPreview(): void;
    /**
     * showJob switches to the job screen.
     */
    showJob(): void;
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
