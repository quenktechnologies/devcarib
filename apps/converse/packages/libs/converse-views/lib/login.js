"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginView = void 0;
var __document = require("@quenk/wml/lib/dom");
//@ts-ignore: 6192
var maybe_1 = require("@quenk/noni/lib/data/maybe");
var grid_1 = require("@quenk/wml-widgets/lib/layout/grid");
;
var panel_1 = require("@quenk/wml-widgets/lib/layout/panel");
;
var button_1 = require("@quenk/wml-widgets/lib/control/button");
;
var head_1 = require("./common/head");
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
;
var LoginView = /** @class */ (function () {
    function LoginView(__context) {
        this.ids = {};
        this.groups = {};
        this.views = [];
        this.widgets = [];
        this.tree = __document.createElement('div');
        this.template = function (__this) {
            var headCtx = {
                'title': 'Login'
            };
            return __this.node('html', { 'lang': 'en', 'dir': 'ltr' }, [
                __this.registerView((new head_1.HeadView(headCtx))).render(),
                __this.node('body', {}, [
                    __this.widget(new grid_1.GridLayout({ ww: { 'id': 'main' } }, [
                        __this.widget(new grid_1.Row({}, [
                            __this.widget(new grid_1.Column({ ww: { 'span': 4, 'offset': 4 } }, [
                                __this.widget(new grid_1.Row({}, [
                                    __this.widget(new grid_1.Column({}, __spreadArray([], ((((__context.errors) != null && (__context.errors.message) != null)) ?
                                        (function () { return ([
                                            __this.node('div', { 'class': 'ww-alert -error', 'style': 'text-align:center' }, [
                                                text(__context.errors.message)
                                            ])
                                        ]); })() :
                                        (function () { return ([]); })()))), {})
                                ]), {}),
                                __this.widget(new grid_1.Row({}, [
                                    __this.widget(new grid_1.Column({}, [
                                        __this.node('h3', {}, [
                                            __document.createTextNode('Log into Converse')
                                        ]),
                                        __this.widget(new panel_1.Panel({}, [
                                            __this.widget(new panel_1.PanelBody({}, [
                                                __this.node('form', { 'autocomplete': 'off', 'action': '/converse/login', 'method': 'POST' }, [
                                                    __this.node('div', { 'class': (((__context.errors) != null && (__context.errors.email) != null)) ? 'ww-text-field -error' : 'ww-text-field' }, [
                                                        __this.node('label', { 'class': 'ww-label' }, [
                                                            __document.createTextNode('Email')
                                                        ]),
                                                        __this.node('input', { 'name': 'email', 'class': 'ww-text-input -block', 'value': __context.email, 'autocomplete': 'off' }, []),
                                                        __this.node('span', { 'class': 'ww-help' }, __spreadArray([], ((((__context.errors) != null && (__context.errors.email) != null)) ?
                                                            (function () { return ([
                                                                text(__context.errors.email)
                                                            ]); })() :
                                                            (function () { return ([]); })())))
                                                    ]),
                                                    __this.node('div', { 'class': (((__context.errors) != null && (__context.errors.password) != null)) ? 'ww-text-field -error' : 'ww-text-field' }, [
                                                        __this.node('label', { 'class': 'ww-label' }, [
                                                            __document.createTextNode('Password')
                                                        ]),
                                                        __this.node('input', { 'name': 'password', 'class': 'ww-text-input -block', 'autocomplete': 'off', 'type': 'password' }, []),
                                                        __this.node('span', { 'class': 'ww-help' }, __spreadArray([], ((((__context.errors) != null && (__context.errors.password) != null)) ?
                                                            (function () { return ([
                                                                text(__context.errors.password)
                                                            ]); })() :
                                                            (function () { return ([]); })())))
                                                    ]),
                                                    __this.node('input', { 'type': 'hidden', 'name': '_csrf', 'value': __context.csrfToken }, []),
                                                    __this.widget(new button_1.Button({ ww: { 'type': 'submit', 'className': '-toolbar-compat -primary -block', 'text': 'Login' } }, []), { ww: { 'type': 'submit', 'className': '-toolbar-compat -primary -block', 'text': 'Login' } })
                                                ])
                                            ]), {})
                                        ]), {})
                                    ]), {})
                                ]), {})
                            ]), { ww: { 'span': 4, 'offset': 4 } })
                        ]), {})
                    ]), { ww: { 'id': 'main' } })
                ])
            ]);
        };
    }
    LoginView.prototype.registerView = function (v) {
        this.views.push(v);
        return v;
    };
    LoginView.prototype.register = function (e, attrs) {
        var attrsMap = attrs;
        if (attrsMap.wml) {
            var _a = attrsMap.wml, id = _a.id, group = _a.group;
            if (id != null) {
                if (this.ids.hasOwnProperty(id))
                    throw new Error("Duplicate id '" + id + "' detected!");
                this.ids[id] = e;
            }
            if (group != null) {
                this.groups[group] = this.groups[group] || [];
                this.groups[group].push(e);
            }
        }
        return e;
    };
    LoginView.prototype.node = function (tag, attrs, children) {
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
                    throw new TypeError("Can not adopt child " + c + " of type " + typeof c);
            }
        });
        this.register(e, attrs);
        return e;
    };
    LoginView.prototype.widget = function (w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    LoginView.prototype.findById = function (id) {
        var mW = maybe_1.fromNullable(this.ids[id]);
        return this.views.reduce(function (p, c) {
            return p.isJust() ? p : c.findById(id);
        }, mW);
    };
    LoginView.prototype.findByGroup = function (name) {
        var mGroup = maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
        return this.views.reduce(function (p, c) {
            return p.isJust() ? p : c.findByGroup(name);
        }, mGroup);
    };
    LoginView.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    };
    LoginView.prototype.render = function () {
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
    return LoginView;
}());
exports.LoginView = LoginView;
//# sourceMappingURL=login.js.map