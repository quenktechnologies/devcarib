"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escape = exports.PostFormApp = void 0;
var commonMark = require("@board/common/lib/common-mark");
var timer_1 = require("@quenk/noni/lib/control/timer");
var future_1 = require("@quenk/noni/lib/control/monad/future");
var util_1 = require("@quenk/wml-widgets/lib/util");
var feedback_1 = require("@quenk/wml-widgets/lib/control/feedback");
var browser_1 = require("@quenk/jhr/lib/browser");
var post_1 = require("@board/validators/lib/post");
var salary_range_1 = require("@board/common/lib/data/post/salary-range");
var app_1 = require("./views/app");
var preview_1 = require("./views/preview");
var finish_1 = require("./views/finish");
var CHANGE_EVENT_DURATION = 250;
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
var agent = browser_1.createAgent();
/**
 * PostFormApp provides the JS form used to create new forms.
 *
 * The JS impementation of this form was done as a feeble attempt to disuade
 * abuse. Additional measures should be put in place if the board's popularity
 * grows.
 */
var PostFormApp = /** @class */ (function () {
    function PostFormApp(node) {
        var _this = this;
        this.node = node;
        this.view = new app_1.PostFormAppView(this);
        this.previewView = new preview_1.PreviewView(this);
        this.finishView = new finish_1.FinishView(this);
        this.values = {
            post: {
                data: {},
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
                salary_range: {
                    options: salary_range_1.ranges.map(function (value) { return ({ label: value, value: value }); })
                },
                onChange: timer_1.debounce(function (e) {
                    var name = e.name, value = e.value;
                    if (post_1.validators.hasOwnProperty(name)) {
                        _this.values.post.data[name] = value;
                        var eResult = post_1.validators[name](value);
                        if (eResult.isLeft()) {
                            var msg = eResult
                                .takeLeft()
                                .explain(messages, { name: name });
                            _this.setControlErrorMessage(name, msg);
                        }
                        else {
                            _this.values.post.data[name] = eResult.takeRight();
                            _this.setControlOk(name);
                        }
                        _this.validatePost();
                    }
                    else {
                        console.warn("Ignoring unknown field: \"" + name + "\"");
                    }
                }, CHANGE_EVENT_DURATION),
                onSelect: function (e) {
                    _this.values.post.data[e.name] = e.value;
                    _this.validatePost();
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
                post: {
                    click: function () { return _this.showPost(); }
                },
                send: {
                    id: 'send',
                    click: function () { return _this.send(); }
                }
            }
        };
    }
    PostFormApp.create = function (node) {
        return new PostFormApp(node);
    };
    /**
     * setControlErrorMessages updates a control to have an error message.
     *
     * The control will be switched into the "error" validation state.
     */
    PostFormApp.prototype.setControlErrorMessage = function (id, msg) {
        var mCtl = util_1.getById(this.view, id);
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
    PostFormApp.prototype.setControlOk = function (id) {
        var mCtl = util_1.getById(this.view, id);
        if (mCtl.isJust()) {
            var ctl = mCtl.get();
            ctl.setMessage('');
            ctl.setValidationState(feedback_1.ValidationState.Success);
        }
    };
    /**
     * validatePost tests whether the data entered into the form so far is
     * valid.
     *
     * If it is, the "preview" button will be enabled.
     */
    PostFormApp.prototype.validatePost = function () {
        var btn = util_1.getById(this.view, this.values.buttons.preview.id).get();
        var eresult = post_1.validate(this.values.post.data);
        if (eresult.isRight())
            btn.enable();
        else
            btn.disable();
    };
    /**
     * showPreview switches to the preview screen.
     */
    PostFormApp.prototype.showPreview = function () {
        this.values.preview.srcdoc = previewTemplate(commonMark.parse(this.values.post.data.description));
        this.render(this.previewView);
    };
    /**
     * showPost switches to the post screen.
     */
    PostFormApp.prototype.showPost = function () {
        this.render(this.view);
        this.validatePost();
    };
    /**
     * showFinished shows the finished views.
     */
    PostFormApp.prototype.showFinished = function () {
        this.render(this.finishView);
    };
    /**
     * send the data to the backend.
     */
    PostFormApp.prototype.send = function () {
        var _this = this;
        var mButton = util_1.getById(this.previewView, this.values.buttons.send.id);
        if (mButton.isJust())
            mButton.get().disable();
        agent
            .post('/post', this.values.post.data)
            .chain(function (r) {
            if (r.code === 401) {
                _this.values.post.errors = r.body.errors;
                _this.view.invalidate();
            }
            else if (r.code === 201) {
                _this.showFinished();
            }
            else {
                return future_1.raise(new Error("Status: " + r.code));
            }
            return future_1.pure(undefined);
        })
            .catch(function (e) {
            alert('An error occured please go back and try again!');
            return future_1.raise(e);
        })
            .fork(console.error, function () { });
    };
    /**
     * run the application.
     */
    PostFormApp.prototype.run = function () {
        this.render(this.view);
    };
    /**
     * render a view of the application to the screen.
     */
    PostFormApp.prototype.render = function (view) {
        while (this.node.firstChild != null)
            this.node.removeChild(this.node.firstChild);
        this.node.appendChild(view.render());
        window.scroll(0, 0);
    };
    return PostFormApp;
}());
exports.PostFormApp = PostFormApp;
var escape = function (str) {
    return str.replace(/[&"'<>]/g, function (t) { return escapeMap[t]; });
};
exports.escape = escape;
var previewTemplate = function (html) { return "\n<!DOCTYPE html>\n<html lang=\"en\">\n\n<head>\n    <meta charset=\"utf-8\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <meta name=\"author\" content=\"Caribbean Developers\">\n    <link rel=\"stylesheet\" href=\"/assets/css/site.css\">\n    <title>Job Preview</title>\n</head>\n\n<body>\n " + html + "\n</body>\n\n</html>\n"; };
PostFormApp.create(document.getElementById('main')).run();
//# sourceMappingURL=main.js.map