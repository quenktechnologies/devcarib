"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreviewView = void 0;
var __document = require("@quenk/wml/lib/dom");
//@ts-ignore: 6192
var maybe_1 = require("@quenk/noni/lib/data/maybe");
var wml_widgets_1 = require("@quenk/wml-widgets");
;
var button_1 = require("@quenk/wml-widgets/lib/control/button");
;
var link_1 = require("@quenk/wml-widgets/lib/content/link");
;
var grid_1 = require("@quenk/wml-widgets/lib/layout/grid");
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
var PreviewView = /** @class */ (function () {
    function PreviewView(__context) {
        this.ids = {};
        this.groups = {};
        this.views = [];
        this.widgets = [];
        this.tree = __document.createElement('div');
        this.template = function (__this) {
            return __this.widget(new grid_1.GridLayout({}, [
                __this.widget(new grid_1.Row({}, [
                    __this.widget(new grid_1.Column({ ww: { 'span': 8, 'offset': 2 } }, [
                        __this.widget(new grid_1.Row({}, [
                            __this.widget(new grid_1.Column({}, [
                                __this.node('h1', { 'class': 'post-title' }, [
                                    wml_widgets_1.text(__context.values.post.data.title)
                                ])
                            ]), {})
                        ]), {}),
                        __this.widget(new grid_1.Row({}, [
                            __this.widget(new grid_1.Column({}, [
                                __this.node('dl', { 'class': 'ww-description-list ww-property-list -horizontal' }, [])
                            ]), {})
                        ]), {}),
                        __this.widget(new grid_1.Row({}, [
                            __this.widget(new grid_1.Column({}, [
                                __this.node('h3', {}, [
                                    __document.createTextNode('Job Description')
                                ]),
                                __this.node('p', {}, [
                                    wml_widgets_1.text(__context.values.post.data.description)
                                ])
                            ]), {})
                        ]), {}),
                        __this.widget(new grid_1.Row({}, [
                            __this.widget(new grid_1.Column({}, [
                                __this.node('div', { 'class': 'action-container' }, [
                                    __this.widget(new link_1.Link({ ww: { 'text': 'Back', 'onClick': __context.values.buttons.post.click } }, []), { ww: { 'text': 'Back', 'onClick': __context.values.buttons.post.click } }),
                                    __this.widget(new button_1.Button({ wml: { 'id': __context.values.buttons.send.id }, ww: { 'className': 'send-button -primary -large', 'text': 'Post', 'onClick': __context.values.buttons.send.click } }, []), { wml: { 'id': __context.values.buttons.send.id }, ww: { 'className': 'send-button -primary -large', 'text': 'Post', 'onClick': __context.values.buttons.send.click } })
                                ])
                            ]), {})
                        ]), {})
                    ]), { ww: { 'span': 8, 'offset': 2 } })
                ]), {})
            ]), {});
        };
    }
    PreviewView.prototype.registerView = function (v) {
        this.views.push(v);
        return v;
    };
    PreviewView.prototype.register = function (e, attrs) {
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
    PreviewView.prototype.node = function (tag, attrs, children) {
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
    PreviewView.prototype.widget = function (w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    PreviewView.prototype.findById = function (id) {
        var mW = maybe_1.fromNullable(this.ids[id]);
        return this.views.reduce(function (p, c) {
            return p.isJust() ? p : c.findById(id);
        }, mW);
    };
    PreviewView.prototype.findByGroup = function (name) {
        var mGroup = maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
        return this.views.reduce(function (p, c) {
            return p.isJust() ? p : c.findByGroup(name);
        }, mGroup);
    };
    PreviewView.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    };
    PreviewView.prototype.render = function () {
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
    return PreviewView;
}());
exports.PreviewView = PreviewView;
//# sourceMappingURL=preview.js.map