"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeadView = void 0;
const __document = require("@quenk/wml/lib/dom");
//@ts-ignore: 6192
const maybe_1 = require("@quenk/noni/lib/data/maybe");
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
;
;
class HeadView {
    constructor(__context) {
        this.ids = {};
        this.groups = {};
        this.views = [];
        this.widgets = [];
        this.tree = __document.createElement('div');
        this.template = (__this) => {
            return __this.node('head', {}, [
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
                __this.node('meta', { 'name': 'theme-color', 'content': '#218c8d' }, []),
                __this.node('meta', { 'name': 'viewport', 'content': unsafe('width=device-width, initial-scale=1.0') }, []),
                ...(((__context.meta) != null) ?
                    (() => ([
                        ...__forIn(__context.meta, (meta, _$$i, _$$all) => ([
                            __this.node('meta', { 'property': meta.property, 'http-equiv': meta.httpEquiv, 'charset': meta.charset, 'name': meta.name, 'content': meta.content }, [])
                        ]), () => ([]))
                    ]))() :
                    (() => ([]))()),
                ...((!(__context.noSite)) ?
                    (() => ([
                        __this.node('link', { 'rel': 'stylesheet', 'href': '/assets/css/site.css' }, [])
                    ]))() :
                    (() => ([]))()),
                ...(((__context.styles) != null) ?
                    (() => ([
                        ...__forIn(__context.styles, (style, _$$i, _$$all) => ([
                            __this.node('link', { 'rel': 'stylesheet', 'href': style }, [])
                        ]), () => ([]))
                    ]))() :
                    (() => ([]))()),
                __this.node('title', {}, [
                    text(__context.title)
                ])
            ]);
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
        let e = __document.createElement(tag);
        Object.keys(attrs).forEach(key => {
            let value = attrs[key];
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
        children.forEach(c => {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    let tn = __document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError(`Can not adopt child ${c} of type ${typeof c}`);
            }
        });
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
exports.HeadView = HeadView;
//# sourceMappingURL=head.js.map