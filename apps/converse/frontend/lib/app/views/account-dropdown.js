"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountDropDownView = void 0;
const __document = require("@quenk/wml/lib/dom");
//@ts-ignore: 6192
const maybe_1 = require("@quenk/noni/lib/data/maybe");
const menu_1 = require("@quenk/wml-widgets/lib/menu/menu");
;
const item_1 = require("@quenk/wml-widgets/lib/menu/item");
;
const link_1 = require("@quenk/wml-widgets/lib/content/link");
;
const drop_down_1 = require("@quenk/wml-widgets/lib/control/drop-down");
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
class AccountDropDownView {
    constructor(__context) {
        this.ids = {};
        this.groups = {};
        this.views = [];
        this.widgets = [];
        this.tree = __document.createElement('div');
        this.template = (__this) => {
            return __this.widget(new drop_down_1.DropDown({ 'className': "converse-account-dropdown", 'buttonText': "Account" }, [
                __this.widget(new menu_1.Menu({}, [
                    __this.widget(new item_1.Item({}, [
                        __this.widget(new link_1.Link({ 'text': "Invite friend", 'onClick': __context.values.header.invite }, []), { 'text': "Invite friend", 'onClick': __context.values.header.invite })
                    ]), {}),
                    __this.widget(new item_1.Item({}, [
                        __this.widget(new link_1.Link({ 'text': "Change password", 'onClick': __context.values.header.password }, []), { 'text': "Change password", 'onClick': __context.values.header.password })
                    ]), {}),
                    __this.widget(new item_1.Divider({}, []), {}),
                    __this.widget(new item_1.Item({}, [
                        __this.widget(new link_1.Link({ 'text': "Log Out", 'onClick': __context.values.header.logout }, []), { 'text': "Log Out", 'onClick': __context.values.header.logout })
                    ]), {})
                ]), {})
            ]), { 'className': "converse-account-dropdown", 'buttonText': "Account" });
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
exports.AccountDropDownView = AccountDropDownView;
//# sourceMappingURL=account-dropdown.js.map