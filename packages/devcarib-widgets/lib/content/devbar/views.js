"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevBarView = void 0;
const __document = require("@quenk/wml/lib/dom");
//@ts-ignore: 6192
const maybe_1 = require("@quenk/noni/lib/data/maybe");
const action_bar_1 = require("@quenk/wml-widgets/lib/layout/action-bar");
;
const image_1 = require("@quenk/wml-widgets/lib/content/image");
;
const nav_1 = require("@quenk/wml-widgets/lib/menu/nav");
;
const link_1 = require("@quenk/wml-widgets/lib/content/link");
;
//@ts-ignore:6192
const __if = (__expr, __conseq, __alt) => (__expr) ? __conseq() : __alt ? __alt() : [];
//@ts-ignore:6192
const __forIn = (list, f, alt) => {
    let ret = [];
    for (let i = 0; i < list.length; i++)
        ret = ret.concat(f(list[i], i, list));
    return ret.length === 0 ? alt() : ret;
};
//@ts-ignore:6192
const __forOf = (o, f, alt) => {
    let ret = [];
    for (let key in o)
        if (o.hasOwnProperty(key))
            ret = ret.concat(f((o)[key], key, o));
    return ret.length === 0 ? alt() : ret;
};
// @ts-ignore 6192
const text = __document.text;
// @ts-ignore 6192
const unsafe = __document.unsafe;
// @ts-ignore 6192
const isSet = (value) => value != null;
class DevBarView {
    constructor(__context) {
        this.ids = {};
        this.groups = {};
        this.views = [];
        this.widgets = [];
        this.tree = __document.createElement('div');
        this.template = (__this) => {
            return __this.widget(new action_bar_1.ActionBar({ 'className': __context.values.className }, [
                __this.widget(new link_1.Link({ 'className': __context.values.logo.className, 'href': __context.values.logo.target }, [
                    __this.widget(new image_1.Image({ 'className': __context.values.logo.image.className, 'src': __context.values.logo.image.src, 'alt': __context.values.logo.image.alt }, []), { 'className': __context.values.logo.image.className, 'src': __context.values.logo.image.src, 'alt': __context.values.logo.image.alt })
                ]), { 'className': __context.values.logo.className, 'href': __context.values.logo.target }),
                ...((__context.values.links) ?
                    (() => ([
                        __this.widget(new nav_1.NavMenu({ 'items': __context.values.links }, []), { 'items': __context.values.links })
                    ]))() :
                    (() => ([]))()),
                ...((__context.values.cta) ?
                    (() => ([
                        __this.widget(new link_1.Link(__context.values.cta, []), __context.values.cta)
                    ]))() :
                    (() => ([]))()),
                __this.node('div', { 'class': __context.values.cta.className }, [
                    ...__forIn(__context.values.cta.links, (attr, _$$i, _$$all) => ([
                        __this.widget(new link_1.Link(attr, []), attr)
                    ]), () => ([]))
                ]),
                ...(__context.children)
            ]), { 'className': __context.values.className });
        };
    }
    registerView(v) {
        this.views.push(v);
        return v;
    }
    register(e, attrs) {
        let attrsMap = attrs;
        if (attrsMap.wml) {
            let { id, group } = attrsMap.wml;
            if (id != null) {
                if (this.ids.hasOwnProperty(id))
                    throw new Error(`Duplicate id '${id}' detected!`);
                this.ids[id] = e;
            }
            if (group != null) {
                this.groups[group] = this.groups[group] || [];
                this.groups[group].push(e);
            }
        }
        return e;
    }
    node(tag, attrs, children) {
        let asDOMAttrs = attrs;
        let e = __document.createElement(tag, asDOMAttrs, children, attrs.wml && attrs.wml.ns || '');
        this.register(e, attrs);
        return e;
    }
    widget(w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    }
    findById(id) {
        let mW = (0, maybe_1.fromNullable)(this.ids[id]);
        return this.views.reduce((p, c) => p.isJust() ? p : c.findById(id), mW);
    }
    findGroupById(name) {
        return this.groups.hasOwnProperty(name) ?
            this.groups[name] : [];
    }
    invalidate() {
        let { tree } = this;
        let parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    }
    render() {
        this.ids = {};
        this.widgets.forEach(w => w.removed());
        this.widgets = [];
        this.views = [];
        this.tree = this.template(this);
        this.ids['root'] = (this.ids['root']) ?
            this.ids['root'] :
            this.tree;
        this.widgets.forEach(w => w.rendered());
        return this.tree;
    }
}
exports.DevBarView = DevBarView;
//# sourceMappingURL=views.js.map