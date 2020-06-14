"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostFormApp = void 0;
var timer_1 = require("@quenk/noni/lib/control/timer");
var util_1 = require("@quenk/wml-widgets/lib/util");
var feedback_1 = require("@quenk/wml-widgets/lib/control/feedback");
var post_1 = require("@board/validation/lib/post");
var app_1 = require("./views/app");
var CHANGE_EVENT_DURATION = 1000;
var messages = {
    notNull: '{name} is required.',
    minLength: '{name} must be at least {target} characters.',
    maxLength: '{name} must not be more than {target} characters.',
    isString: '{name} is invalid.',
    isNumber: '{name} is invalid.'
};
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
        this.values = {
            post: {
                data: {},
                onChange: timer_1.debounce(function (e) {
                    var name = e.name, value = e.value;
                    if (post_1.schema.hasOwnProperty(name)) {
                        _this.values.post.data[name] = value;
                        var eResult = post_1.schema[name](value);
                        if (eResult.isLeft()) {
                            var msg = eResult
                                .takeLeft()
                                .explain(messages, { name: name });
                            _this.setControlErrorMessage(e.name, msg);
                        }
                        else {
                            _this.values.post.data[e.name] = eResult.takeRight();
                            _this.setControlOk(e.name);
                        }
                        _this.updatePreviewButton(_this.formIsValid());
                    }
                }, CHANGE_EVENT_DURATION)
            },
            buttons: {
                preview: {
                    id: 'preview'
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
        if (mCtl.isJust())
            mCtl.get().setValidationState(feedback_1.ValidationState.Success);
    };
    /**
     * formIsValid tests whether the data entered into the form so far is
     * valid.
     */
    PostFormApp.prototype.formIsValid = function () {
        return post_1.validate(this.values.post.data).isRight();
    };
    /**
     * updatePreviewButton toggles the "Preview" button between
     * it's disabled and enabled states.
     *
     * @param state - If true, the button will be enabled, disabled otherwise.
     */
    PostFormApp.prototype.updatePreviewButton = function (state) {
        var mbtn = util_1.getById(this.view, this.values.buttons.preview.id);
        if (mbtn.isJust()) {
            var btn = mbtn.get();
            if (state)
                btn.enable();
            else
                btn.disable();
        }
    };
    /**
     * run the application.
     */
    PostFormApp.prototype.run = function () {
        this.node.appendChild(this.view.render());
    };
    return PostFormApp;
}());
exports.PostFormApp = PostFormApp;
PostFormApp.create(document.getElementById('main')).run();
//# sourceMappingURL=main.js.map