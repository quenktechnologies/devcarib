"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostFormAppView = void 0;
var __document = require("@quenk/wml/lib/dom");
//@ts-ignore: 6192
var maybe_1 = require("@quenk/noni/lib/data/maybe");
var grid_1 = require("@quenk/wml-widgets/lib/layout/grid");
;
var button_1 = require("@quenk/wml-widgets/lib/control/button");
;
var link_1 = require("@quenk/wml-widgets/lib/content/link");
;
var post_1 = require("./form/post");
;
var company_1 = require("./form/company");
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
var PostFormAppView = /** @class */ (function () {
    function PostFormAppView(__context) {
        this.ids = {};
        this.groups = {};
        this.views = [];
        this.widgets = [];
        this.tree = __document.createElement('div');
        this.template = function (__this) {
            return __this.widget(new grid_1.GridLayout({}, [
                __this.widget(new grid_1.Row({}, [
                    __this.widget(new grid_1.Column({ ww: { 'span': 6, 'offset': 3 } }, [
                        __this.widget(new grid_1.Row({}, [
                            __this.widget(new grid_1.Column({}, [
                                __this.node('div', { 'class': 'back-link-container' }, [
                                    __this.widget(new link_1.Link({ ww: { 'className': 'back-link', 'text': '← Back to Listings', 'href': '/' } }, []), { ww: { 'className': 'back-link', 'text': '← Back to Listings', 'href': '/' } })
                                ])
                            ]), {})
                        ]), {}),
                        __this.widget(new grid_1.Row({}, [
                            __this.widget(new grid_1.Column({}, [
                                __this.node('h3', { 'class': 'board-post-form-heading' }, [
                                    __document.createTextNode('Tell us about the job.')
                                ]),
                                __this.registerView((new post_1.PostFormView(__context))).render()
                            ]), {})
                        ]), {}),
                        __this.widget(new grid_1.Row({}, [
                            __this.widget(new grid_1.Column({}, [
                                __this.node('h3', { 'class': 'board-post-form-heading' }, [
                                    __document.createTextNode('Tell us a little bit about the company hiring.')
                                ]),
                                __this.registerView((new company_1.CompanyFormView(__context))).render()
                            ]), {})
                        ]), {}),
                        __this.widget(new grid_1.Row({}, [
                            __this.widget(new grid_1.Column({}, [
                                __this.node('div', { 'class': 'preview-button-container' }, [
                                    __this.widget(new button_1.Button({ wml: { 'id': __context.values.buttons.preview.id }, ww: { 'disabled': true, 'className': 'preview-button -primary -large', 'text': 'Preview', 'onClick': __context.values.buttons.preview.click } }, []), { wml: { 'id': __context.values.buttons.preview.id }, ww: { 'disabled': true, 'className': 'preview-button -primary -large', 'text': 'Preview', 'onClick': __context.values.buttons.preview.click } })
                                ]),
                                __this.node('p', { 'class': 'required-note' }, [
                                    __this.node('b', {}, [
                                        __document.createTextNode('* indicates a field is required.')
                                    ])
                                ])
                            ]), {})
                        ]), {})
                    ]), { ww: { 'span': 6, 'offset': 3 } })
                ]), {})
            ]), {});
        };
    }
    PostFormAppView.prototype.registerView = function (v) {
        this.views.push(v);
        return v;
    };
    PostFormAppView.prototype.register = function (e, attrs) {
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
    PostFormAppView.prototype.node = function (tag, attrs, children) {
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
    PostFormAppView.prototype.widget = function (w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    PostFormAppView.prototype.findById = function (id) {
        var mW = maybe_1.fromNullable(this.ids[id]);
        return this.views.reduce(function (p, c) {
            return p.isJust() ? p : c.findById(id);
        }, mW);
    };
    PostFormAppView.prototype.findByGroup = function (name) {
        var mGroup = maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
        return this.views.reduce(function (p, c) {
            return p.isJust() ? p : c.findByGroup(name);
        }, mGroup);
    };
    PostFormAppView.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    };
    PostFormAppView.prototype.render = function () {
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
    return PostFormAppView;
}());
exports.PostFormAppView = PostFormAppView;
//# sourceMappingURL=app.js.map