"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeadView = void 0;
var __document = require("@quenk/wml/lib/dom");
//@ts-ignore: 6192
var maybe_1 = require("@quenk/noni/lib/data/maybe");
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
;
var HeadView = /** @class */ (function () {
    function HeadView(__context) {
        this.ids = {};
        this.groups = {};
        this.views = [];
        this.widgets = [];
        this.tree = __document.createElement('div');
        this.template = function (__this) {
            return __this.node('head', {}, __spreadArray(__spreadArray(__spreadArray(__spreadArray([
                __this.node('meta', { 'charset': 'utf-8' }, []),
                __this.node('meta', { 'http-equiv': 'X-UA-Compatible', 'content': unsafe('IE=edge') }, []),
                __this.node('meta', { 'name': 'viewport', 'content': unsafe('width=device-width, initial-scale=1.0') }, []),
                __this.node('meta', { 'name': 'author', 'content': 'Caribbean Developers' }, []),
                __this.node('link', { 'rel': 'apple-touch-icon', 'sizes': '57x57', 'href': '/apple-icon-57x57.png' }, []),
                __this.node('link', { 'rel': 'apple-touch-icon', 'sizes': '60x60', 'href': '/apple-icon-60x60.png' }, []),
                __this.node('link', { 'rel': 'apple-touch-icon', 'sizes': '72x72', 'href': '/apple-icon-72x72.png' }, []),
                __this.node('link', { 'rel': 'apple-touch-icon', 'sizes': '76x76', 'href': '/apple-icon-76x76.png' }, []),
                __this.node('link', { 'rel': 'apple-touch-icon', 'sizes': '114x114', 'href': '/apple-icon-114x114.png' }, []),
                __this.node('link', { 'rel': 'apple-touch-icon', 'sizes': '120x120', 'href': '/apple-icon-120x120.png' }, []),
                __this.node('link', { 'rel': 'apple-touch-icon', 'sizes': '144x144', 'href': '/apple-icon-144x144.png' }, []),
                __this.node('link', { 'rel': 'apple-touch-icon', 'sizes': '152x152', 'href': '/apple-icon-152x152.png' }, []),
                __this.node('link', { 'rel': 'apple-touch-icon', 'sizes': '180x180', 'href': '/apple-icon-180x180.png' }, []),
                __this.node('link', { 'rel': 'icon', 'type': 'image/png', 'sizes': '192x192', 'href': '/android-icon-192x192.png' }, []),
                __this.node('link', { 'rel': 'icon', 'type': 'image/png', 'sizes': '32x32', 'href': '/favicon-32x32.png' }, []),
                __this.node('link', { 'rel': 'icon', 'type': 'image/png', 'sizes': '96x96', 'href': '/favicon-96x96.png' }, []),
                __this.node('link', { 'rel': 'icon', 'type': 'image/png', 'sizes': '16x16', 'href': '/favicon-16x16.png' }, []),
                __this.node('link', { 'rel': 'manifest', 'href': '/manifest.json' }, []),
                __this.node('meta', { 'name': 'msapplication-TileColor', 'content': '#218c8d' }, []),
                __this.node('meta', { 'name': 'msapplication-TileImage', 'content': '/ms-icon-144x144.png' }, []),
                __this.node('meta', { 'name': 'theme-color', 'content': '#218c8d' }, [])
            ], (((__context.meta) != null) ?
                (function () { return (__spreadArray([], __forIn(__context.meta, function (meta, _$$i, _$$all) {
                    return ([
                        __this.node('meta', { 'property': meta.property, 'name': meta.name, 'content': meta.content }, [])
                    ]);
                }, function () { return ([]); }))); })() :
                (function () { return ([]); })())), [
                __this.node('link', { 'rel': 'stylesheet', 'href': '/assets/css/site.css' }, [])
            ]), (((__context.styles) != null) ?
                (function () { return (__spreadArray([], __forIn(__context.styles, function (style, _$$i, _$$all) {
                    return ([
                        __this.node('link', { 'rel': 'stylesheet', 'href': style }, [])
                    ]);
                }, function () { return ([]); }))); })() :
                (function () { return ([]); })())), [
                __this.node('title', {}, [
                    text(__context.title)
                ])
            ]));
        };
    }
    HeadView.prototype.registerView = function (v) {
        this.views.push(v);
        return v;
    };
    HeadView.prototype.register = function (e, attrs) {
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
    HeadView.prototype.node = function (tag, attrs, children) {
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
    HeadView.prototype.widget = function (w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    HeadView.prototype.findById = function (id) {
        var mW = maybe_1.fromNullable(this.ids[id]);
        return this.views.reduce(function (p, c) {
            return p.isJust() ? p : c.findById(id);
        }, mW);
    };
    HeadView.prototype.findByGroup = function (name) {
        var mGroup = maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
        return this.views.reduce(function (p, c) {
            return p.isJust() ? p : c.findByGroup(name);
        }, mGroup);
    };
    HeadView.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    };
    HeadView.prototype.render = function () {
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
    return HeadView;
}());
exports.HeadView = HeadView;
//# sourceMappingURL=head.js.map