"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobSummaryPanelView = exports.JobFeaturesView = void 0;
const __document = require("@quenk/wml/lib/dom");
//@ts-ignore: 6192
const maybe_1 = require("@quenk/noni/lib/data/maybe");
const panel_1 = require("@quenk/wml-widgets/lib/layout/panel");
;
const link_1 = require("@quenk/wml-widgets/lib/content/link");
;
;
const job_feature_1 = require("../../../content/job-feature");
;
const filters_1 = require("../../../filters");
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
class JobFeaturesView {
    constructor(__context) {
        this.ids = {};
        this.groups = {};
        this.views = [];
        this.widgets = [];
        this.tree = __document.createElement('div');
        this.template = (__this) => {
            return __this.node('div', {}, [
                ...(((__context.type) != null) ?
                    (() => ([
                        __this.widget(new job_feature_1.JobFeature({ 'text': __context.type }, []), { 'text': __context.type })
                    ]))() :
                    (() => ([]))()),
                ...(((__context.remote) != null) ?
                    (() => ([
                        __this.widget(new job_feature_1.JobFeature({ 'text': "Remote" }, []), { 'text': "Remote" })
                    ]))() :
                    (() => ([]))()),
                ...(((__context.location) != null) ?
                    (() => ([
                        __this.widget(new job_feature_1.JobFeature({ 'text': (0, filters_1.truncate)(60)(__context.location) }, []), { 'text': (0, filters_1.truncate)(60)(__context.location) })
                    ]))() :
                    (() => ([]))()),
                ...(((__context.salary_range) != null) ?
                    (() => ([
                        __this.widget(new job_feature_1.JobFeature({ 'text': String(__context.salary_range) }, []), { 'text': String(__context.salary_range) })
                    ]))() :
                    (() => ([]))())
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
exports.JobFeaturesView = JobFeaturesView;
;
class JobSummaryPanelView {
    constructor(__context) {
        this.ids = {};
        this.groups = {};
        this.views = [];
        this.widgets = [];
        this.tree = __document.createElement('div');
        this.template = (__this) => {
            return __this.widget(new panel_1.Panel({ 'className': __context.values.className }, [
                __this.widget(new panel_1.PanelHeader({}, [
                    __this.node('h3', {}, [
                        __this.widget(new link_1.Link({ 'href': __context.values.url, 'text': __context.values.job.title }, []), { 'href': __context.values.url, 'text': __context.values.job.title })
                    ])
                ]), {}),
                __this.widget(new panel_1.PanelBody({}, [
                    __this.node('div', { 'class': __context.values.meta.className }, [
                        __this.node('span', {}, [
                            text(__context.values.job.company)
                        ]),
                        text(" - "),
                        __this.node('span', {}, [
                            text((0, filters_1.timefromnow)(__context.values.job.created_on))
                        ])
                    ]),
                    __this.registerView(new JobFeaturesView(__context.values.job)).render()
                ]), {})
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
exports.JobSummaryPanelView = JobSummaryPanelView;
//# sourceMappingURL=views.js.map