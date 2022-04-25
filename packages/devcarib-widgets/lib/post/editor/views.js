"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostEditorView = void 0;
var __document = require("@quenk/wml/lib/dom");
//@ts-ignore: 6192
var maybe_1 = require("@quenk/noni/lib/data/maybe");
var panel_1 = require("@quenk/wml-widgets/lib/layout/panel");
;
var text_field_1 = require("@quenk/wml-widgets/lib/control/text-field");
;
var button_1 = require("@quenk/wml-widgets/lib/control/button");
;
//@ts-ignore:6192
var __if = function (__expr, __conseq, __alt) {
    return (__expr) ? __conseq() : __alt ? __alt() : [];
};
//@ts-ignore:6192
var __forIn = function (list, f, alt) {
    var ret = [];
    for (var i = 0; i < list.length; i++)
        ret = ret.concat(f(list[i], i, list));
    return ret.length === 0 ? alt() : ret;
};
//@ts-ignore:6192
var __forOf = function (o, f, alt) {
    var ret = [];
    for (var key in o)
        if (o.hasOwnProperty(key))
            ret = ret.concat(f((o)[key], key, o));
    return ret.length === 0 ? alt() : ret;
};
// @ts-ignore 6192
var text = __document.text;
// @ts-ignore 6192
var unsafe = __document.unsafe;
// @ts-ignore 6192
var isSet = function (value) { return value != null; };
var PostEditorView = /** @class */ (function () {
    function PostEditorView(__context) {
        this.ids = {};
        this.groups = {};
        this.views = [];
        this.widgets = [];
        this.tree = __document.createElement('div');
        this.template = function (__this) {
            return __this.widget(new panel_1.Panel({ ww: { 'className': 'devcarib-post-editor' } }, [
                __this.widget(new panel_1.PanelBody({}, __spreadArray(__spreadArray([], ((!(__context.values.title.hide)) ?
                    (function () { return ([
                        __this.widget(new text_field_1.TextField({ ww: { 'name': 'title', 'className': 'devcarib-post-editor__title', 'placeholder': 'Title', 'value': __context.values.title.value, 'error': __context.values.title.error, 'onChange': __context.values.title.onChange } }, []), { ww: { 'name': 'title', 'className': 'devcarib-post-editor__title', 'placeholder': 'Title', 'value': __context.values.title.value, 'error': __context.values.title.error, 'onChange': __context.values.title.onChange } })
                    ]); })() :
                    (function () { return ([]); })()), true), [
                    __this.widget(new text_field_1.TextField({ ww: { 'name': 'body', 'className': 'devcarib-post-editor__body', 'rows': 10, 'placeholder': 'Body', 'value': __context.values.body.value, 'error': __context.values.body.error, 'onChange': __context.values.body.onChange } }, []), { ww: { 'name': 'body', 'className': 'devcarib-post-editor__body', 'rows': 10, 'placeholder': 'Body', 'value': __context.values.body.value, 'error': __context.values.body.error, 'onChange': __context.values.body.onChange } })
                ], false)), {}),
                __this.widget(new panel_1.PanelFooter({}, __spreadArray(__spreadArray([], ((__context.values.post.allowCancel) ?
                    (function () { return ([
                        __this.widget(new button_1.Button({ ww: { 'className': 'devcarib-post-editor__post cancel-button', 'text': 'Cancel', 'onClick': __context.values.post.onCancel } }, []), { ww: { 'className': 'devcarib-post-editor__post cancel-button', 'text': 'Cancel', 'onClick': __context.values.post.onCancel } })
                    ]); })() :
                    (function () { return ([]); })()), true), [
                    __this.widget(new button_1.Button({ ww: { 'className': 'devcarib-post-editor__post post-button -primary', 'text': 'Post', 'onClick': __context.values.post.onPost } }, []), { ww: { 'className': 'devcarib-post-editor__post post-button -primary', 'text': 'Post', 'onClick': __context.values.post.onPost } })
                ], false)), {})
            ]), { ww: { 'className': 'devcarib-post-editor' } });
        };
    }
    PostEditorView.prototype.registerView = function (v) {
        this.views.push(v);
        return v;
    };
    PostEditorView.prototype.register = function (e, attrs) {
        var attrsMap = attrs;
        if (attrsMap.wml) {
            var _a = attrsMap.wml, id = _a.id, group = _a.group;
            if (id != null) {
                if (this.ids.hasOwnProperty(id))
                    throw new Error("Duplicate id '".concat(id, "' detected!"));
                this.ids[id] = e;
            }
            if (group != null) {
                this.groups[group] = this.groups[group] || [];
                this.groups[group].push(e);
            }
        }
        return e;
    };
    PostEditorView.prototype.node = function (tag, attrs, children) {
        var e = __document.createElement(tag);
        Object.keys(attrs).forEach(function (key) {
            var value = attrs[key];
            if (typeof value === 'function') {
                e[key] = value;
            }
            else if (typeof value === 'string') {
                //prevent setting things like disabled=''
                if (value !== '')
                    e.setAttribute(key, value);
            }
            else if (typeof value === 'boolean') {
                e.setAttribute(key, '');
            }
            else if (!__document.isBrowser &&
                value instanceof __document.WMLDOMText) {
                e.setAttribute(key, value);
            }
        });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = __document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError("Can not adopt child ".concat(c, " of type ").concat(typeof c));
            }
        });
        this.register(e, attrs);
        return e;
    };
    PostEditorView.prototype.widget = function (w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    PostEditorView.prototype.findById = function (id) {
        var mW = (0, maybe_1.fromNullable)(this.ids[id]);
        return this.views.reduce(function (p, c) {
            return p.isJust() ? p : c.findById(id);
        }, mW);
    };
    PostEditorView.prototype.findByGroup = function (name) {
        var mGroup = (0, maybe_1.fromArray)(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
        return this.views.reduce(function (p, c) {
            return p.isJust() ? p : c.findByGroup(name);
        }, mGroup);
    };
    PostEditorView.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    };
    PostEditorView.prototype.render = function () {
        this.ids = {};
        this.widgets.forEach(function (w) { return w.removed(); });
        this.widgets = [];
        this.views = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(function (w) { return w.rendered(); });
        return this.tree;
    };
    return PostEditorView;
}());
exports.PostEditorView = PostEditorView;
//# sourceMappingURL=views.js.map