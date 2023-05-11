"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobPageView = void 0;
const __document = require("@quenk/wml/lib/dom");
//@ts-ignore: 6192
const maybe_1 = require("@quenk/noni/lib/data/maybe");
const grid_1 = require("@quenk/wml-widgets/lib/layout/grid");
;
const panel_1 = require("@quenk/wml-widgets/lib/layout/panel");
;
const tag_1 = require("@quenk/wml-widgets/lib/content/tag");
;
const image_1 = require("@quenk/wml-widgets/lib/content/image");
;
const filters_1 = require("../../filters");
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
class JobPageView {
    constructor(__context) {
        this.ids = {};
        this.groups = {};
        this.views = [];
        this.widgets = [];
        this.tree = __document.createElement('div');
        this.template = (__this) => {
            return __this.widget(new grid_1.GridLayout({ 'className': "devcarib-job-page" }, [
                __this.widget(new grid_1.Row({}, [
                    __this.widget(new grid_1.Column({ 'span': 8, 'offset': 2 }, [
                        __this.widget(new grid_1.Row({}, [
                            __this.widget(new grid_1.Column({ 'className': "devcarib-job-page-deets" }, [
                                ...(((__context.attrs.data.company_logo) != null) ?
                                    (() => ([
                                        __this.widget(new image_1.Image({ 'className': "devcarib-job-page-company-logo", 'src': __context.attrs.data.company_logo, 'alt': "Company Logo" }, []), { 'className': "devcarib-job-page-company-logo", 'src': __context.attrs.data.company_logo, 'alt': "Company Logo" })
                                    ]))() :
                                    (() => ([]))()),
                                __this.node('div', { 'class': "devcarib-job-page-title" }, [
                                    __this.node('h1', {}, [
                                        text(__context.attrs.data.title)
                                    ]),
                                    ...((__context.attrs.data.remote) ?
                                        (() => ([
                                            __this.widget(new tag_1.Tag({ 'text': "Remote", 'className': "-success" }, []), { 'text': "Remote", 'className': "-success" })
                                        ]))() :
                                        (() => ([]))())
                                ]),
                                __this.node('div', { 'class': "devcarib-job-page-meta" }, [
                                    __this.node('div', {}, [
                                        __this.node('i', { 'class': "fa-regular fa-building" }, []),
                                        text(__context.attrs.data.company)
                                    ]),
                                    __this.node('div', {}, [
                                        __this.node('i', { 'class': "fa fa-location-pin" }, []),
                                        text(__context.attrs.data.location)
                                    ]),
                                    __this.node('div', {}, [
                                        __this.node('i', { 'class': "fa fa-briefcase" }, []),
                                        text(__context.attrs.data["type"])
                                    ]),
                                    ...((__context.attrs.data.payment_amount) ?
                                        (() => ([
                                            __this.node('div', {}, [
                                                __this.node('i', { 'class': "fa fa-sack-dollar" }, []),
                                                text(__context.attrs.data.payment_amount),
                                                __document.createTextNode('\u00a0\u000a              '),
                                                __this.node('b', {}, [
                                                    text(__context.attrs.data.payment_currency)
                                                ]),
                                                __document.createTextNode('\u000a              \u002F\u000a              '),
                                                text(__context.attrs.data.payment_frequency)
                                            ])
                                        ]))() :
                                        (() => ([]))()),
                                    __this.node('div', { 'class': "devcarib-job-page-timestamp" }, [
                                        __this.node('i', { 'class': "fa fa-clock" }, []),
                                        __document.createTextNode('\u000a            Posted '),
                                        text((0, filters_1.timefromnow)(__context.attrs.data.created_on))
                                    ])
                                ])
                            ]), { 'className': "devcarib-job-page-deets" })
                        ]), {}),
                        ...((__context.attrs.data.description_html) ?
                            (() => ([
                                __this.widget(new grid_1.Row({}, [
                                    __this.widget(new grid_1.Column({}, [
                                        __this.widget(new panel_1.Panel({}, [
                                            __this.widget(new panel_1.PanelBody({ 'className': "devcarib-job-page-description" }, [
                                                unsafe(__context.attrs.data.description_html)
                                            ]), { 'className': "devcarib-job-page-description" })
                                        ]), {})
                                    ]), {})
                                ]), {})
                            ]))() :
                            (() => ([]))()),
                        __this.widget(new grid_1.Row({}, [
                            __this.widget(new grid_1.Column({}, [
                                ...((__context.attrs.data.apply_url) ?
                                    (() => ([
                                        __this.node('a', { 'href': __context.attrs.data.apply_url, 'class': "ww-button -success -large devcarib-job-page-apply", 'target': "_blank" }, [
                                            __document.createTextNode('Apply')
                                        ])
                                    ]))() :
                                    (() => ([]))())
                            ]), {})
                        ]), {})
                    ]), { 'span': 8, 'offset': 2 })
                ]), {})
            ]), { 'className': "devcarib-job-page" });
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
exports.JobPageView = JobPageView;
//# sourceMappingURL=views.js.map