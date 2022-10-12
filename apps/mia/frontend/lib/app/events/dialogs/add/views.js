"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddEventDialogView = void 0;
const __document = require("@quenk/wml/lib/dom");
//@ts-ignore: 6192
const maybe_1 = require("@quenk/noni/lib/data/maybe");
const grid_1 = require("@quenk/wml-widgets/lib/layout/grid");
;
const text_field_1 = require("@quenk/wml-widgets/lib/control/text-field");
;
const date_field_1 = require("@quenk/wml-widgets/lib/control/date-field");
;
const drop_list_1 = require("@quenk/wml-widgets/lib/control/drop-list");
;
const label_1 = require("@quenk/wml-widgets/lib/control/label");
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
class AddEventDialogView {
    constructor(__context) {
        this.ids = {};
        this.groups = {};
        this.views = [];
        this.widgets = [];
        this.tree = __document.createElement('div');
        this.template = (__this) => {
            return __this.widget(new grid_1.GridLayout({}, [
                __this.widget(new grid_1.Row({}, [
                    __this.widget(new grid_1.Column({}, [
                        __this.widget(new text_field_1.TextField({ wml: { 'id': 'title' }, 'name': 'title', 'label': 'Title*', 'error': __context.values.errors.title, 'value': __context.values.data.title, 'onChange': __context.values.onChange }, []), { wml: { 'id': 'title' }, 'name': 'title', 'label': 'Title*', 'error': __context.values.errors.title, 'value': __context.values.data.title, 'onChange': __context.values.onChange })
                    ]), {})
                ]), {}),
                __this.widget(new grid_1.Row({}, [
                    __this.widget(new grid_1.Column({}, [
                        __this.widget(new label_1.Label({}, [
                            __document.createTextNode('Starts')
                        ]), {})
                    ]), {}),
                    __this.widget(new grid_1.Column({ 'span': 8 }, [
                        __this.widget(new date_field_1.DateField({ wml: { 'id': 'startDate' }, 'className': 'start-date -block', 'placeholder': 'YYYY-MM-DD', 'name': 'startDate', 'value': __context.values.start.date(), 'onChange': __context.values.start.onChange }, []), { wml: { 'id': 'startDate' }, 'className': 'start-date -block', 'placeholder': 'YYYY-MM-DD', 'name': 'startDate', 'value': __context.values.start.date(), 'onChange': __context.values.start.onChange })
                    ]), { 'span': 8 }),
                    __this.widget(new grid_1.Column({ 'span': 4 }, [
                        __this.widget(new drop_list_1.DropList({ wml: { 'id': 'startTime' }, 'name': 'startTime', 'className': 'start-time', 'value': __context.values.start.time(), 'options': __context.values.start.timeOptions, 'onSelect': __context.values.start.onChange }, []), { wml: { 'id': 'startTime' }, 'name': 'startTime', 'className': 'start-time', 'value': __context.values.start.time(), 'options': __context.values.start.timeOptions, 'onSelect': __context.values.start.onChange })
                    ]), { 'span': 4 })
                ]), {}),
                __this.widget(new grid_1.Row({}, [
                    __this.widget(new grid_1.Column({}, [
                        __this.widget(new label_1.Label({}, [
                            __document.createTextNode('Ends')
                        ]), {})
                    ]), {}),
                    __this.widget(new grid_1.Column({ 'span': 8 }, [
                        __this.widget(new date_field_1.DateField({ wml: { 'id': 'endDate' }, 'className': 'start-date -block', 'placeholder': 'YYYY-MM-DD', 'name': 'endDate', 'value': __context.values.end.date(), 'onChange': __context.values.end.onChange }, []), { wml: { 'id': 'endDate' }, 'className': 'start-date -block', 'placeholder': 'YYYY-MM-DD', 'name': 'endDate', 'value': __context.values.end.date(), 'onChange': __context.values.end.onChange })
                    ]), { 'span': 8 }),
                    __this.widget(new grid_1.Column({ 'span': 4 }, [
                        __this.widget(new drop_list_1.DropList({ wml: { 'id': 'endTime' }, 'name': 'endTime', 'className': 'start-time', 'value': __context.values.end.time(), 'options': __context.values.end.timeOptions, 'onSelect': __context.values.end.onChange }, []), { wml: { 'id': 'endTime' }, 'name': 'endTime', 'className': 'start-time', 'value': __context.values.end.time(), 'options': __context.values.end.timeOptions, 'onSelect': __context.values.end.onChange })
                    ]), { 'span': 4 }),
                    __this.widget(new grid_1.Column({}, [
                        __this.widget(new label_1.Label({}, [
                            __document.createTextNode('All day event? ')
                        ]), {}),
                        __this.widget(new checkbox_1.Checkbox({ wml: { 'id': 'allDay' }, 'name': 'allDay', 'value': __context.values.data.allDay, 'onChange': __context.values.onChange }, []), { wml: { 'id': 'allDay' }, 'name': 'allDay', 'value': __context.values.data.allDay, 'onChange': __context.values.onChange })
                    ]), {})
                ]), {}),
                __this.widget(new grid_1.Row({}, [
                    __this.widget(new grid_1.Column({}, [
                        __this.widget(new text_field_1.TextField({ wml: { 'id': 'host' }, 'name': 'host', 'label': 'Host', 'error': __context.values.errors.host, 'value': __context.values.data.host, 'onChange': __context.values.onChange }, []), { wml: { 'id': 'host' }, 'name': 'host', 'label': 'Host', 'error': __context.values.errors.host, 'value': __context.values.data.host, 'onChange': __context.values.onChange })
                    ]), {})
                ]), {}),
                __this.widget(new grid_1.Row({}, [
                    __this.widget(new grid_1.Column({}, [
                        __this.widget(new text_field_1.TextField({ wml: { 'id': 'location' }, 'name': 'location', 'label': 'Location', 'error': __context.values.errors.location, 'value': __context.values.data.location, 'onChange': __context.values.onChange }, []), { wml: { 'id': 'location' }, 'name': 'location', 'label': 'Location', 'error': __context.values.errors.location, 'value': __context.values.data.location, 'onChange': __context.values.onChange })
                    ]), {})
                ]), {}),
                __this.widget(new grid_1.Row({}, [
                    __this.widget(new grid_1.Column({}, [
                        __this.widget(new text_field_1.TextField({ wml: { 'id': 'url' }, 'name': 'url', 'label': 'Url', 'error': __context.values.errors.url, 'value': __context.values.data.url, 'onChange': __context.values.onChange }, []), { wml: { 'id': 'url' }, 'name': 'url', 'label': 'Url', 'error': __context.values.errors.url, 'value': __context.values.data.url, 'onChange': __context.values.onChange })
                    ]), {})
                ]), {}),
                __this.widget(new grid_1.Row({}, [
                    __this.widget(new grid_1.Column({}, []), {})
                ]), {}),
                __this.widget(new grid_1.Row({}, [
                    __this.widget(new grid_1.Column({}, []), {})
                ]), {}),
                __this.widget(new grid_1.Row({}, [
                    __this.widget(new grid_1.Column({}, []), {})
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
    findByGroup(name) {
        let mGroup = (0, maybe_1.fromArray)(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
        return this.views.reduce((p, c) => p.isJust() ? p : c.findByGroup(name), mGroup);
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
exports.AddEventDialogView = AddEventDialogView;
//# sourceMappingURL=views.js.map