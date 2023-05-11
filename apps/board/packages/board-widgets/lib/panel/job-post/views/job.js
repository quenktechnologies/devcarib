"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostJobFormPanelView = void 0;
const __document = require("@quenk/wml/lib/dom");
//@ts-ignore: 6192
const maybe_1 = require("@quenk/noni/lib/data/maybe");
const grid_1 = require("@quenk/wml-widgets/lib/layout/grid");
;
const panel_1 = require("@quenk/wml-widgets/lib/layout/panel");
;
const text_field_1 = require("@quenk/wml-widgets/lib/control/text-field");
;
const drop_list_1 = require("@quenk/wml-widgets/lib/control/drop-list");
;
const checkbox_1 = require("@quenk/wml-widgets/lib/control/checkbox");
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
class PostJobFormPanelView {
    constructor(__context) {
        this.ids = {};
        this.groups = {};
        this.views = [];
        this.widgets = [];
        this.tree = __document.createElement('div');
        this.template = (__this) => {
            return __this.widget(new panel_1.Panel({}, [
                __this.widget(new panel_1.PanelBody({}, [
                    __this.widget(new grid_1.GridLayout({}, [
                        __this.widget(new grid_1.Row({}, [
                            __this.widget(new grid_1.Column({}, [
                                __this.widget(new text_field_1.TextField({ wml: { 'id': "title" }, 'name': "title", 'label': "Title*", 'placeholder': "Senior Software Engineer", 'value': __context.attrs.data.title, 'onChange': __context.attrs.onChange }, []), { wml: { 'id': "title" }, 'name': "title", 'label': "Title*", 'placeholder': "Senior Software Engineer", 'value': __context.attrs.data.title, 'onChange': __context.attrs.onChange })
                            ]), {})
                        ]), {}),
                        __this.widget(new grid_1.Row({}, [
                            __this.widget(new grid_1.Column({ 'span': 6 }, [
                                __this.widget(new text_field_1.TextField({ wml: { 'id': "location" }, 'name': "location", 'label': "Location (where the job is based)*", 'value': __context.attrs.data.location, 'onChange': __context.attrs.onChange }, []), { wml: { 'id': "location" }, 'name': "location", 'label': "Location (where the job is based)*", 'value': __context.attrs.data.location, 'onChange': __context.attrs.onChange })
                            ]), { 'span': 6 }),
                            __this.widget(new grid_1.Column({ 'span': 6 }, [
                                __this.node('label', { 'class': "ww-label" }, [
                                    __document.createTextNode('Select A Job Type*')
                                ]),
                                __this.widget(new drop_list_1.DropList({ wml: { 'id': "type" }, 'className': "board-job-type-dropdown -block", 'name': "type", 'value': __context.attrs.data.type, 'options': __context.typeOptions, 'onSelect': __context.attrs.onChange }, []), { wml: { 'id': "type" }, 'className': "board-job-type-dropdown -block", 'name': "type", 'value': __context.attrs.data.type, 'options': __context.typeOptions, 'onSelect': __context.attrs.onChange })
                            ]), { 'span': 6 })
                        ]), {}),
                        __this.widget(new grid_1.Row({}, [
                            __this.widget(new grid_1.Column({}, [
                                __this.widget(new text_field_1.TextField({ wml: { 'id': "apply_url" }, 'name': "apply_url", 'label': "Apply Link", 'placeholder': "Specify a url or email address applicants can use to apply", 'value': __context.attrs.data.apply_url, 'onChange': __context.attrs.onChange }, []), { wml: { 'id': "apply_url" }, 'name': "apply_url", 'label': "Apply Link", 'placeholder': "Specify a url or email address applicants can use to apply", 'value': __context.attrs.data.apply_url, 'onChange': __context.attrs.onChange })
                            ]), {})
                        ]), {}),
                        __this.widget(new grid_1.Row({}, [
                            __this.widget(new grid_1.Column({}, [
                                __this.node('b', {}, [
                                    __this.widget(new checkbox_1.Checkbox({ 'name': "remote", 'value': __context.attrs.data.remote, 'onChange': __context.attrs.onChange }, []), { 'name': "remote", 'value': __context.attrs.data.remote, 'onChange': __context.attrs.onChange }),
                                    __document.createTextNode('\u000a             This job is remote \u000a          ')
                                ])
                            ]), {})
                        ]), {}),
                        __this.widget(new grid_1.Row({}, [
                            __this.widget(new grid_1.Column({}, [
                                __this.widget(new text_field_1.TextField({ wml: { 'id': "description" }, 'name': "description", 'placeholder': "Provide full details of the job. Markdown is supported", 'rows': 12, 'value': __context.attrs.data.description, 'onChange': __context.attrs.onChange }, []), { wml: { 'id': "description" }, 'name': "description", 'placeholder': "Provide full details of the job. Markdown is supported", 'rows': 12, 'value': __context.attrs.data.description, 'onChange': __context.attrs.onChange })
                            ]), {})
                        ]), {})
                    ]), {})
                ]), {})
            ]), {});
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
exports.PostJobFormPanelView = PostJobFormPanelView;
//# sourceMappingURL=job.js.map