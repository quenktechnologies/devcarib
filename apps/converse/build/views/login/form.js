"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginFormView = void 0;
const __document = require("@quenk/wml/lib/dom");
//@ts-ignore: 6192
const maybe_1 = require("@quenk/noni/lib/data/maybe");
const panel_1 = require("@quenk/wml-widgets/lib/layout/panel");
;
const text_field_1 = require("@quenk/wml-widgets/lib/control/text-field");
;
const button_1 = require("@quenk/wml-widgets/lib/control/button");
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
class LoginFormView {
    constructor(__context) {
        this.ids = {};
        this.groups = {};
        this.views = [];
        this.widgets = [];
        this.tree = __document.createElement('div');
        this.template = (__this) => {
            return __this.widget(new panel_1.Panel({}, [
                __this.widget(new panel_1.PanelBody({}, [
                    __this.node('form', { 'autocomplete': 'off', 'action': '/login', 'method': 'POST' }, [
                        __this.widget(new text_field_1.TextField({ html: { 'autocomplete': 'off' }, 'className': '-block', 'label': 'Email', 'name': 'email', 'value': (((__context.auth.credentials) != null && (__context.auth.credentials.email) != null)) ? __context.auth.credentials.email : '' }, []), { html: { 'autocomplete': 'off' }, 'className': '-block', 'label': 'Email', 'name': 'email', 'value': (((__context.auth.credentials) != null && (__context.auth.credentials.email) != null)) ? __context.auth.credentials.email : '' }),
                        __this.widget(new text_field_1.TextField({ html: { 'autocomplete': 'off' }, 'className': '-block', 'name': 'password', 'label': 'Password', 'type': 'password' }, []), { html: { 'autocomplete': 'off' }, 'className': '-block', 'name': 'password', 'label': 'Password', 'type': 'password' }),
                        __this.node('input', { 'type': 'hidden', 'name': '_csrf', 'value': __context.csrfToken }, []),
                        __this.widget(new button_1.Button({ 'type': 'submit', 'className': '-toolbar-compat -primary -block', 'text': 'Login' }, []), { 'type': 'submit', 'className': '-toolbar-compat -primary -block', 'text': 'Login' })
                    ])
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
exports.LoginFormView = LoginFormView;
//# sourceMappingURL=form.js.map