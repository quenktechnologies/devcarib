"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escape = exports.JobFormApp = void 0;
const mark = require("@devcarib/server/lib/data/markdown");
const timer_1 = require("@quenk/noni/lib/control/timer");
const future_1 = require("@quenk/noni/lib/control/monad/future");
const util_1 = require("@quenk/wml-widgets/lib/util");
const feedback_1 = require("@quenk/wml-widgets/lib/control/feedback");
const browser_1 = require("@quenk/jhr/lib/browser");
const job_1 = require("@board/server/lib/data/validators/job");
const job_2 = require("@board/server/lib/data/job");
const app_1 = require("./views/app");
const preview_1 = require("./views/preview");
const finish_1 = require("./views/finish");
const DELAY_job_VALIDATION = 250;
const messages = {
    notNull: '{name} is required.',
    minLength: '{name} must be at least {target} characters.',
    maxLength: '{name} must not be more than {target} characters.',
    isString: '{name} is invalid.',
    isNumber: '{name} is invalid.'
};
const escapeMap = {
    '&': '&amp;',
    '"': '&quot;',
    '\'': '&#39;',
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
class JobFormApp {
    constructor(node) {
        this.node = node;
        this.view = new app_1.JobFormAppView(this);
        this.previewView = new preview_1.PreviewView(this);
        this.finishView = new finish_1.FinishView(this);
        this.agent = (0, browser_1.createAgent)();
        this.values = {
            job: {
                data: {
                    payment_currency: "USD",
                    payment_frequency: "Monthly",
                    status: job_2.JOB_STATUS_NEW
                },
                errors: {},
                onChange: (e) => {
                    let { name, value } = e;
                    if (job_1.fieldValidators.hasOwnProperty(name)) {
                        this.values.job.data[name] = value;
                        let eResult = job_1.fieldValidators[name](value);
                        if (eResult.isLeft()) {
                            let msg = eResult
                                .takeLeft()
                                .explain(messages, { name });
                            this.setControlErrorMessage(name, msg);
                        }
                        else {
                            this.values.job.data[name] = eResult.takeRight();
                            this.setControlOk(name);
                        }
                        this.delayedValidateJob(undefined);
                    }
                    else if (e.name === 'type') {
                        console.warn(`Ignoring unknown field: "${name}"`);
                    }
                },
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
        this.delayedValidateJob = (0, timer_1.debounce)(() => this.validateJob(), DELAY_job_VALIDATION);
    }
    static create(node) {
        return new JobFormApp(node);
    }
    /**
     * setControlErrorMessages updates a control to have an error message.
     *
     * The control will be switched into the "error" validation state.
     */
    setControlErrorMessage(id, msg) {
        let mCtl = (0, util_1.getById)(this.view, id);
        if (mCtl.isJust()) {
            let ctl = mCtl.get();
            ctl.setMessage(msg);
            ctl.setValidationState(feedback_1.ValidationState.Error);
        }
    }
    /**
     * setControlOk gives the user visual feedback when a control's value is
     * valid.
     */
    setControlOk(id) {
        let mCtl = (0, util_1.getById)(this.view, id);
        if (mCtl.isJust()) {
            let ctl = mCtl.get();
            ctl.setMessage('');
            ctl.setValidationState(feedback_1.ValidationState.Success);
        }
    }
    /**
     * validateJob tests whether the data entered into the form so far is
     * valid.
     *
     * If it is, the "preview" button will be enabled.
     */
    validateJob() {
        let btn = (0, util_1.getById)(this.view, this.values.buttons.preview.id).get();
        let eresult = (0, job_1.validate)(this.values.job.data);
        if (eresult.isRight())
            btn.enable();
        else
            btn.disable();
    }
    /**
     * showPreview switches to the preview screen.
     */
    showPreview() {
        this.values.job.data.description_html =
            mark.parse(this.values.job.data.description);
        this.render(this.previewView);
    }
    /**
     * showJob switches to the job screen.
     */
    showJob() {
        this.render(this.view);
        this.validateJob();
    }
    /**
     * showFinished shows the finished views.
     */
    showFinished() {
        this.render(this.finishView);
    }
    /**
     * send the data to the backend.
     */
    send() {
        let mButton = (0, util_1.getById)(this.previewView, this.values.buttons.send.id);
        if (mButton.isJust())
            mButton.get().disable();
        this
            .agent
            .post('/post', this.values.job.data)
            .chain((r) => {
            if (r.code === 401) {
                this.values.job.errors = r.body.errors;
                this.view.invalidate();
            }
            else if (r.code === 201) {
                this.showFinished();
            }
            else {
                return (0, future_1.raise)(new Error(`Status: ${r.code}`));
            }
            return (0, future_1.pure)(undefined);
        })
            .catch(e => {
            alert('An error occured please go back and try again!');
            return (0, future_1.raise)(e);
        })
            .fork(console.error, () => { });
    }
    /**
     * run the application.
     */
    run() {
        this.render(this.view);
    }
    /**
     * render a view of the application to the screen.
     */
    render(view) {
        while (this.node.firstChild != null)
            this.node.removeChild(this.node.firstChild);
        this.node.appendChild(view.render());
        window.scroll(0, 0);
    }
}
exports.JobFormApp = JobFormApp;
const escape = (str) => str.replace(/[&"'<>]/g, t => escapeMap[t]);
exports.escape = escape;
//# sourceMappingURL=index.js.map