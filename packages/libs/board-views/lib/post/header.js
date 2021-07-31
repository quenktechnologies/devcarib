"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostHeaderView = void 0;
var __document = require("@quenk/wml/lib/dom");
//@ts-ignore: 6192
var maybe_1 = require("@quenk/noni/lib/data/maybe");
;
var apply_1 = require("./button/apply");
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
var PostHeaderView = /** @class */ (function () {
    function PostHeaderView(__context) {
        this.ids = {};
        this.groups = {};
        this.views = [];
        this.widgets = [];
        this.tree = __document.createElement('div');
        this.template = function (__this) {
            return __this.node('div', { 'id': 'post-header', 'class': 'ww-grid-layout board-post-header' }, [
                __this.node('div', { 'class': 'ww-grid-layout__row' }, [
                    __this.node('div', { 'class': 'ww-grid-layout__column -span8 -offset2' }, [
                        __this.node('div', { 'class': 'board-post-back-link' }, [
                            __this.node('a', { 'class': 'ww-link', 'href': '/' }, [
                                unsafe('&#x2190; See other posts')
                            ])
                        ])
                    ])
                ]),
                __this.node('div', { 'class': 'ww-grid-layout__row' }, [
                    __this.node('div', { 'class': 'ww-grid-layout__column -span8 -offset2 board-post-img-wrapper' }, __spreadArray(__spreadArray([], (((__context.company_logo) != null) ?
                        (function () { return ([
                            __this.node('img', { 'class': 'board-post-company-logo', 'src': __context.company_logo, 'alt': 'Company Logo' }, [])
                        ]); })() :
                        (function () { return ([]); })())), [
                        __this.node('h2', { 'class': 'board-post-title' }, [
                            text(__context.title)
                        ]),
                        __this.node('div', { 'class': 'board-post-line' }, []),
                        __this.node('p', { 'class': 'board-post-company' }, [
                            text(__context.company)
                        ])
                    ]))
                ]),
                __this.node('div', { 'class': 'ww-grid-layout__row' }, [
                    __this.node('div', { 'class': 'ww-grid-layout__column -span8 -offset2 -board-center' }, [
                        __this.registerView((new apply_1.PostApplyButtonView(__context))).render()
                    ])
                ])
            ]);
        };
    }
    PostHeaderView.prototype.registerView = function (v) {
        this.views.push(v);
        return v;
    };
    PostHeaderView.prototype.register = function (e, attrs) {
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
    PostHeaderView.prototype.node = function (tag, attrs, children) {
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
    PostHeaderView.prototype.widget = function (w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    PostHeaderView.prototype.findById = function (id) {
        var mW = maybe_1.fromNullable(this.ids[id]);
        return this.views.reduce(function (p, c) {
            return p.isJust() ? p : c.findById(id);
        }, mW);
    };
    PostHeaderView.prototype.findByGroup = function (name) {
        var mGroup = maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
        return this.views.reduce(function (p, c) {
            return p.isJust() ? p : c.findByGroup(name);
        }, mGroup);
    };
    PostHeaderView.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    };
    PostHeaderView.prototype.render = function () {
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
    return PostHeaderView;
}());
exports.PostHeaderView = PostHeaderView;
//# sourceMappingURL=header.js.map