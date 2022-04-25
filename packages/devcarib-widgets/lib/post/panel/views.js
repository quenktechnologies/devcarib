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
exports.EditPostPanelView = exports.PostPanelView = void 0;
var __document = require("@quenk/wml/lib/dom");
//@ts-ignore: 6192
var maybe_1 = require("@quenk/noni/lib/data/maybe");
var panel_1 = require("@quenk/wml-widgets/lib/layout/panel");
;
var link_1 = require("@quenk/wml-widgets/lib/content/link");
;
var metadata_1 = require("../metadata");
;
var editor_1 = require("../editor");
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
var PostPanelView = /** @class */ (function () {
    function PostPanelView(__context) {
        this.ids = {};
        this.groups = {};
        this.views = [];
        this.widgets = [];
        this.tree = __document.createElement('div');
        this.template = function (__this) {
            return __this.widget(new panel_1.Panel({ ww: { 'className': 'devcarib-post-panel' } }, __spreadArray([
                __this.widget(new panel_1.PanelHeader({ ww: { 'className': 'devcarib-post-panel-header' } }, [
                    __this.widget(new metadata_1.PostMetadata({ 'data': __context.values.data }, []), { 'data': __context.values.data }),
                    __this.node('div', { 'class': 'devcarib-post-panel-header-links' }, __spreadArray([], ((__context.values.editable) ?
                        (function () { return ([
                            __this.widget(new link_1.Link({ ww: { 'text': 'Edit', 'onClick': __context.values.editor.show } }, []), { ww: { 'text': 'Edit', 'onClick': __context.values.editor.show } })
                        ]); })() :
                        (function () { return ([]); })()), true)),
                    __this.node('h1', { 'class': 'devcarib-post-panel-header-title' }, [
                        text(__context.values.data.title)
                    ])
                ]), { ww: { 'className': 'devcarib-post-panel-header' } })
            ], ((__context.values.data.body) ?
                (function () { return ([
                    __this.widget(new panel_1.PanelBody({}, [
                        __this.node('div', { 'class': 'devcarib-post-panel_body' }, [
                            unsafe(__context.values.data.body_html)
                        ])
                    ]), {})
                ]); })() :
                (function () { return ([]); })()), true)), { ww: { 'className': 'devcarib-post-panel' } });
        };
    }
    PostPanelView.prototype.registerView = function (v) {
        this.views.push(v);
        return v;
    };
    PostPanelView.prototype.register = function (e, attrs) {
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
    PostPanelView.prototype.node = function (tag, attrs, children) {
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
    PostPanelView.prototype.widget = function (w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    PostPanelView.prototype.findById = function (id) {
        var mW = (0, maybe_1.fromNullable)(this.ids[id]);
        return this.views.reduce(function (p, c) {
            return p.isJust() ? p : c.findById(id);
        }, mW);
    };
    PostPanelView.prototype.findByGroup = function (name) {
        var mGroup = (0, maybe_1.fromArray)(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
        return this.views.reduce(function (p, c) {
            return p.isJust() ? p : c.findByGroup(name);
        }, mGroup);
    };
    PostPanelView.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    };
    PostPanelView.prototype.render = function () {
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
    return PostPanelView;
}());
exports.PostPanelView = PostPanelView;
;
var EditPostPanelView = /** @class */ (function () {
    function EditPostPanelView(__context) {
        this.ids = {};
        this.groups = {};
        this.views = [];
        this.widgets = [];
        this.tree = __document.createElement('div');
        this.template = function (__this) {
            return __this.widget(new editor_1.PostEditor({ 'allowCancel': true, 'value': __context.values.editor.data, 'onChange': __context.values.editor.onChange, 'onPost': __context.values.editor.onPost, 'onCancel': __context.values.editor.onCancel }, []), { 'allowCancel': true, 'value': __context.values.editor.data, 'onChange': __context.values.editor.onChange, 'onPost': __context.values.editor.onPost, 'onCancel': __context.values.editor.onCancel });
        };
    }
    EditPostPanelView.prototype.registerView = function (v) {
        this.views.push(v);
        return v;
    };
    EditPostPanelView.prototype.register = function (e, attrs) {
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
    EditPostPanelView.prototype.node = function (tag, attrs, children) {
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
    EditPostPanelView.prototype.widget = function (w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    EditPostPanelView.prototype.findById = function (id) {
        var mW = (0, maybe_1.fromNullable)(this.ids[id]);
        return this.views.reduce(function (p, c) {
            return p.isJust() ? p : c.findById(id);
        }, mW);
    };
    EditPostPanelView.prototype.findByGroup = function (name) {
        var mGroup = (0, maybe_1.fromArray)(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
        return this.views.reduce(function (p, c) {
            return p.isJust() ? p : c.findByGroup(name);
        }, mGroup);
    };
    EditPostPanelView.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    };
    EditPostPanelView.prototype.render = function () {
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
    return EditPostPanelView;
}());
exports.EditPostPanelView = EditPostPanelView;
//# sourceMappingURL=views.js.map