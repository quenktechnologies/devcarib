"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobFormAppView = void 0;
const __document = require("@quenk/wml/lib/dom");
//@ts-ignore: 6192
const maybe_1 = require("@quenk/noni/lib/data/maybe");
const grid_1 = require("@quenk/wml-widgets/lib/layout/grid");
;
const button_1 = require("@quenk/wml-widgets/lib/control/button");
;
const link_1 = require("@quenk/wml-widgets/lib/content/link");
;
const job_post_1 = require("@board/widgets/lib/panel/job-post");
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
class JobFormAppView {
    constructor(__context) {
        this.ids = {};
        this.groups = {};
        this.views = [];
        this.widgets = [];
        this.tree = __document.createElement('div');
        this.template = (__this) => {
            return __this.node('form', { 'name': "postJobForm", 'onsubmit': (e) => e.preventDefault(), 'autocomplete': "off" }, [
                __this.widget(new grid_1.GridLayout({}, [
                    __this.widget(new grid_1.Row({}, [
                        __this.widget(new grid_1.Column({ 'span': 6, 'offset': 3 }, [
                            __this.widget(new grid_1.Row({}, [
                                __this.widget(new grid_1.Column({}, [
                                    __this.node('div', { 'class': "back-link-container" }, [
                                        __this.widget(new link_1.Link({ 'className': "ww-button -default back-link", 'text': "Back to Jobs", 'href': "/" }, []), { 'className': "ww-button -default back-link", 'text': "Back to Jobs", 'href': "/" })
                                    ])
                                ]), {})
                            ]), {}),
                            __this.widget(new grid_1.Row({}, [
                                __this.widget(new grid_1.Column({ 'className': "board-post-job-form-header" }, [
                                    __this.node('h1', { 'class': "board-post-job-form-heading" }, [
                                        __document.createTextNode('Post a Job')
                                    ]),
                                    __this.node('p', { 'class': "board-post-job-form-subtext" }, [
                                        __document.createTextNode('* indicates a required field')
                                    ])
                                ]), { 'className': "board-post-job-form-header" })
                            ]), {}),
                            __this.widget(new grid_1.Row({}, [
                                __this.widget(new grid_1.Column({}, [
                                    __this.widget(new job_post_1.PostJobFormPanel({ 'data': __context.values.job.data, 'onChange': __context.values.job.onChange }, []), { 'data': __context.values.job.data, 'onChange': __context.values.job.onChange })
                                ]), {})
                            ]), {}),
                            __this.widget(new grid_1.Row({}, [
                                __this.widget(new grid_1.Column({}, [
                                    __this.widget(new job_post_1.PostJobFormCompanyPanel({ 'data': __context.values.job.data, 'onChange': __context.values.job.onChange }, []), { 'data': __context.values.job.data, 'onChange': __context.values.job.onChange })
                                ]), {})
                            ]), {}),
                            __this.widget(new grid_1.Row({}, [
                                __this.widget(new grid_1.Column({}, [
                                    __this.node('div', { 'class': "preview-button-container" }, [
                                        __this.widget(new button_1.Button({ wml: { 'id': __context.values.buttons.preview.id }, 'disabled': true, 'className': "preview-button -primary -large", 'text': "Preview", 'onClick': __context.values.buttons.preview.click }, []), { wml: { 'id': __context.values.buttons.preview.id }, 'disabled': true, 'className': "preview-button -primary -large", 'text': "Preview", 'onClick': __context.values.buttons.preview.click })
                                    ])
                                ]), {})
                            ]), {})
                        ]), { 'span': 6, 'offset': 3 })
                    ]), {})
                ]), {})
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
exports.JobFormAppView = JobFormAppView;
//# sourceMappingURL=app.js.map