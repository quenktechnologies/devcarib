"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escape = exports.JobFormApp = void 0;
var commonMark = require("@devcarib/common/lib/common-mark");
var timer_1 = require("@quenk/noni/lib/control/timer");
var future_1 = require("@quenk/noni/lib/control/monad/future");
var util_1 = require("@quenk/wml-widgets/lib/util");
var feedback_1 = require("@quenk/wml-widgets/lib/control/feedback");
var browser_1 = require("@quenk/jhr/lib/browser");
var job_1 = require("@board/validators/lib/job");
var payment_1 = require("@devcarib/common/lib/data/payment");
var job_2 = require("@devcarib/common/lib/data/job");
var app_1 = require("./views/app");
var preview_1 = require("./views/preview");
var finish_1 = require("./views/finish");
var DELAY_job_VALIDATION = 250;
var messages = {
    notNull: '{name} is required.',
    minLength: '{name} must be at least {target} characters.',
    maxLength: '{name} must not be more than {target} characters.',
    isString: '{name} is invalid.',
    isNumber: '{name} is invalid.'
};
var escapeMap = {
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
var JobFormApp = /** @class */ (function () {
    function JobFormApp(node) {
        var _this = this;
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
                type: {
                    options: [
                        { label: 'Full-Time', value: 'Full-Time' },
                        { label: 'Part-Time', value: 'Part-Time' },
                        { label: 'Contractor', value: 'Contractor' },
                        { label: 'Co-Founder', value: 'Co-Founder' },
                        { label: 'Contributor', value: 'Contributor' },
                        { label: 'Volunteer', value: 'Volunteer' },
                    ]
                },
                payment_frequency: {
                    options: payment_1.supportedPaymentFrequencies.map(function (value) {
                        return ({ label: value, value: value });
                    })
                },
                onChange: function (e) {
                    var name = e.name, value = e.value;
                    if (job_1.validators.hasOwnProperty(name)) {
                        _this.values.job.data[name] = value;
                        var eResult = job_1.validators[name](value);
                        if (eResult.isLeft()) {
                            var msg = eResult
                                .takeLeft()
                                .explain(messages, { name: name });
                            _this.setControlErrorMessage(name, msg);
                        }
                        else {
                            _this.values.job.data[name] = eResult.takeRight();
                            _this.setControlOk(name);
                        }
                        _this.delayedValidateJob(undefined);
                    }
                    else {
                        console.warn("Ignoring unknown field: \"".concat(name, "\""));
                    }
                },
                onSelect: function (e) {
                    _this.values.job.data[e.name] = e.value;
                    _this.validateJob();
                }
            },
            preview: {
                csp: "default-src:'none'; style-src 'self'",
                sandbox: '',
                srcdoc: ''
            },
            buttons: {
                preview: {
                    id: 'preview-button',
                    click: function () { return _this.showPreview(); }
                },
                job: {
                    click: function () { return _this.showJob(); }
                },
                send: {
                    id: 'send',
                    click: function () { return _this.send(); }
                }
            }
        };
        this.delayedValidateJob = (0, timer_1.debounce)(function () { return _this.validateJob(); }, DELAY_job_VALIDATION);
    }
    JobFormApp.create = function (node) {
        return new JobFormApp(node);
    };
    /**
     * setControlErrorMessages updates a control to have an error message.
     *
     * The control will be switched into the "error" validation state.
     */
    JobFormApp.prototype.setControlErrorMessage = function (id, msg) {
        var mCtl = (0, util_1.getById)(this.view, id);
        if (mCtl.isJust()) {
            var ctl = mCtl.get();
            ctl.setMessage(msg);
            ctl.setValidationState(feedback_1.ValidationState.Error);
        }
    };
    /**
     * setControlOk gives the user visual feedback when a control's value is
     * valid.
     */
    JobFormApp.prototype.setControlOk = function (id) {
        var mCtl = (0, util_1.getById)(this.view, id);
        if (mCtl.isJust()) {
            var ctl = mCtl.get();
            ctl.setMessage('');
            ctl.setValidationState(feedback_1.ValidationState.Success);
        }
    };
    /**
     * validateJob tests whether the data entered into the form so far is
     * valid.
     *
     * If it is, the "preview" button will be enabled.
     */
    JobFormApp.prototype.validateJob = function () {
        var btn = (0, util_1.getById)(this.view, this.values.buttons.preview.id).get();
        var eresult = (0, job_1.validate)(this.values.job.data);
        if (eresult.isRight())
            btn.enable();
        else
            btn.disable();
    };
    /**
     * showPreview switches to the preview screen.
     */
    JobFormApp.prototype.showPreview = function () {
        this.render(this.previewView);
        var mPanel = this.previewView.findById('panel');
        if (mPanel.isJust())
            mPanel.get().setContent(commonMark.parse(this.values.job.data.description));
    };
    /**
     * showJob switches to the job screen.
     */
    JobFormApp.prototype.showJob = function () {
        this.render(this.view);
        this.validateJob();
    };
    /**
     * showFinished shows the finished views.
     */
    JobFormApp.prototype.showFinished = function () {
        this.render(this.finishView);
    };
    /**
     * send the data to the backend.
     */
    JobFormApp.prototype.send = function () {
        var _this = this;
        var mButton = (0, util_1.getById)(this.previewView, this.values.buttons.send.id);
        if (mButton.isJust())
            mButton.get().disable();
        this
            .agent
            .post('/jobs/post', this.values.job.data)
            .chain(function (r) {
            if (r.code === 401) {
                _this.values.job.errors = r.body.errors;
                _this.view.invalidate();
            }
            else if (r.code === 201) {
                _this.showFinished();
            }
            else {
                return (0, future_1.raise)(new Error("Status: ".concat(r.code)));
            }
            return (0, future_1.pure)(undefined);
        })
            .catch(function (e) {
            alert('An error occured please go back and try again!');
            return (0, future_1.raise)(e);
        })
            .fork(console.error, function () { });
    };
    /**
     * run the application.
     */
    JobFormApp.prototype.run = function () {
        this.render(this.view);
    };
    /**
     * render a view of the application to the screen.
     */
    JobFormApp.prototype.render = function (view) {
        while (this.node.firstChild != null)
            this.node.removeChild(this.node.firstChild);
        this.node.appendChild(view.render());
        window.scroll(0, 0);
    };
    return JobFormApp;
}());
exports.JobFormApp = JobFormApp;
var escape = function (str) {
    return str.replace(/[&"'<>]/g, function (t) { return escapeMap[t]; });
};
exports.escape = escape;
window.jobFormApp = JobFormApp.create(document.getElementById('main'));
window.jobFormApp.run();
//# sourceMappingURL=main.js.map