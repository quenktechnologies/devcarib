"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyMoneyTextFieldView = void 0;
var __document = require("@quenk/wml/lib/dom");
//@ts-ignore: 6192
var maybe_1 = require("@quenk/noni/lib/data/maybe");
var input_group_1 = require("@quenk/wml-widgets/lib/control/input-group");
;
var text_input_1 = require("@quenk/wml-widgets/lib/control/text-input");
;
var drop_list_1 = require("@quenk/wml-widgets/lib/control/drop-list");
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
// @ts-ignore 6192
var text = __document.text;
// @ts-ignore 6192
var unsafe = __document.unsafe;
// @ts-ignore 6192
var isSet = function (value) { return value != null; };
var CurrencyMoneyTextFieldView = /** @class */ (function () {
    function CurrencyMoneyTextFieldView(__context) {
        this.ids = {};
        this.groups = {};
        this.views = [];
        this.widgets = [];
        this.tree = __document.createElement('div');
        this.template = function (__this) {
            return __this.widget(new input_group_1.InputGroup({}, [
                __this.widget(new input_group_1.AddOn({ 'button': true }, [
                    __this.widget(new drop_list_1.DropList({ ww: { 'name': __context.values.dropList.name, 'options': __context.values.dropList.options, 'value': __context.values.dropList.value, 'onSelect': __context.values.dropList.onSelect } }, []), { ww: { 'name': __context.values.dropList.name, 'options': __context.values.dropList.options, 'value': __context.values.dropList.value, 'onSelect': __context.values.dropList.onSelect } })
                ]), { 'button': true }),
                __this.widget(new text_input_1.TextInput({ ww: { 'name': __context.values.input.name, 'value': __context.values.input.value, 'type': 'number', 'min': 0, 'onChange': __context.values.input.onChange } }, []), { ww: { 'name': __context.values.input.name, 'value': __context.values.input.value, 'type': 'number', 'min': 0, 'onChange': __context.values.input.onChange } })
            ]), {});
        };
    }
    CurrencyMoneyTextFieldView.prototype.registerView = function (v) {
        this.views.push(v);
        return v;
    };
    CurrencyMoneyTextFieldView.prototype.register = function (e, attrs) {
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
    CurrencyMoneyTextFieldView.prototype.node = function (tag, attrs, children) {
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
            else if (!__document.isBrowser &&
                value instanceof __document.WMLDOMText) {
                e.setAttribute(key, value);
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
    CurrencyMoneyTextFieldView.prototype.widget = function (w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    CurrencyMoneyTextFieldView.prototype.findById = function (id) {
        var mW = maybe_1.fromNullable(this.ids[id]);
        return this.views.reduce(function (p, c) {
            return p.isJust() ? p : c.findById(id);
        }, mW);
    };
    CurrencyMoneyTextFieldView.prototype.findByGroup = function (name) {
        var mGroup = maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
        return this.views.reduce(function (p, c) {
            return p.isJust() ? p : c.findByGroup(name);
        }, mGroup);
    };
    CurrencyMoneyTextFieldView.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    };
    CurrencyMoneyTextFieldView.prototype.render = function () {
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
    return CurrencyMoneyTextFieldView;
}());
exports.CurrencyMoneyTextFieldView = CurrencyMoneyTextFieldView;
//# sourceMappingURL=money.js.map