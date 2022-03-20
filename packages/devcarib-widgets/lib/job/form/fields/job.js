"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobFormJobFieldsView = void 0;
var __document = require("@quenk/wml/lib/dom");
//@ts-ignore: 6192
var maybe_1 = require("@quenk/noni/lib/data/maybe");
;
;
var grid_1 = require("@quenk/wml-widgets/lib/layout/grid");
;
var text_field_1 = require("@quenk/wml-widgets/lib/control/text-field");
;
var drop_list_1 = require("@quenk/wml-widgets/lib/control/drop-list");
;
var checkbox_1 = require("@quenk/wml-widgets/lib/control/checkbox");
;
var money_1 = require("@devcarib/widgets/lib/control/input/money");
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
;
var JobFormJobFieldsView = /** @class */ (function () {
    function JobFormJobFieldsView(__context) {
        this.ids = {};
        this.groups = {};
        this.views = [];
        this.widgets = [];
        this.tree = __document.createElement('div');
        this.template = function (__this) {
            return __this.widget(new grid_1.GridLayout({}, [
                __this.widget(new grid_1.Row({}, [
                    __this.widget(new grid_1.Column({}, [
                        __this.widget(new text_field_1.TextField({ wml: { 'id': 'title' }, ww: { 'name': 'title', 'label': 'Title*', 'placeholder': 'Example: Fintech Software Engineer Needed', 'value': __context.data.title, 'onChange': __context.onChange } }, []), { wml: { 'id': 'title' }, ww: { 'name': 'title', 'label': 'Title*', 'placeholder': 'Example: Fintech Software Engineer Needed', 'value': __context.data.title, 'onChange': __context.onChange } })
                    ]), {})
                ]), {}),
                __this.widget(new grid_1.Row({}, [
                    __this.widget(new grid_1.Column({ ww: { 'span': 6 } }, [
                        __this.widget(new text_field_1.TextField({ wml: { 'id': 'location' }, ww: { 'name': 'location', 'label': 'Location*', 'value': __context.data.location, 'onChange': __context.onChange } }, []), { wml: { 'id': 'location' }, ww: { 'name': 'location', 'label': 'Location*', 'value': __context.data.location, 'onChange': __context.onChange } })
                    ]), { ww: { 'span': 6 } }),
                    __this.widget(new grid_1.Column({ ww: { 'span': 6 } }, [
                        __this.node('label', { 'class': 'ww-label' }, [
                            __document.createTextNode('Select A Job Type*')
                        ]),
                        __this.widget(new drop_list_1.DropList({ wml: { 'id': 'type' }, ww: { 'className': 'board-job-type-dropdown -block', 'name': 'type', 'value': __context.data.type, 'options': __context.type.options, 'onSelect': __context.onSelect } }, []), { wml: { 'id': 'type' }, ww: { 'className': 'board-job-type-dropdown -block', 'name': 'type', 'value': __context.data.type, 'options': __context.type.options, 'onSelect': __context.onSelect } })
                    ]), { ww: { 'span': 6 } })
                ]), {}),
                __this.widget(new grid_1.Row({}, [
                    __this.widget(new grid_1.Column({}, [
                        __this.widget(new text_field_1.TextField({ wml: { 'id': 'apply_url' }, ww: { 'name': 'apply_url', 'label': 'Apply Link', 'placeholder': 'Specify a url or email address applicants can use to apply', 'value': __context.data.apply_url, 'onChange': __context.onChange } }, []), { wml: { 'id': 'apply_url' }, ww: { 'name': 'apply_url', 'label': 'Apply Link', 'placeholder': 'Specify a url or email address applicants can use to apply', 'value': __context.data.apply_url, 'onChange': __context.onChange } })
                    ]), {})
                ]), {}),
                __this.widget(new grid_1.Row({}, [
                    __this.widget(new grid_1.Column({}, [
                        __this.node('b', {}, [
                            __document.createTextNode('\u000a         Is this a remote position? \u000a         '),
                            __this.widget(new checkbox_1.Checkbox({ ww: { 'name': 'remote', 'value': __context.data.remote, 'onChange': __context.onSelect } }, []), { ww: { 'name': 'remote', 'value': __context.data.remote, 'onChange': __context.onSelect } })
                        ])
                    ]), {})
                ]), {}),
                __this.widget(new grid_1.Row({}, [
                    __this.widget(new grid_1.Column({ ww: { 'span': 6 } }, [
                        __this.node('b', {}, [
                            __document.createTextNode('Payment')
                        ]),
                        __this.widget(new money_1.CurrencyMoneyTextField({ 'names': [
                                'payment_currency',
                                'payment_amount'
                            ], 'onChange': __context.onChange }, []), { 'names': [
                                'payment_currency',
                                'payment_amount'
                            ], 'onChange': __context.onChange })
                    ]), { ww: { 'span': 6 } }),
                    __this.widget(new grid_1.Column({ ww: { 'span': 6 } }, [
                        __this.node('label', { 'class': 'ww-label' }, [
                            __document.createTextNode('Payment Frequency')
                        ]),
                        __this.widget(new drop_list_1.DropList({ wml: { 'id': 'payment_frequency' }, ww: { 'className': '-block board-job-payment-frequency', 'name': 'payment_frequency', 'value': __context.data.payment_frequency, 'options': __context.payment_frequency.options, 'onSelect': __context.onSelect } }, []), { wml: { 'id': 'payment_frequency' }, ww: { 'className': '-block board-job-payment-frequency', 'name': 'payment_frequency', 'value': __context.data.payment_frequency, 'options': __context.payment_frequency.options, 'onSelect': __context.onSelect } })
                    ]), { ww: { 'span': 6 } })
                ]), {}),
                __this.widget(new grid_1.Row({}, [
                    __this.widget(new grid_1.Column({}, [
                        __this.widget(new text_field_1.TextField({ wml: { 'id': 'description' }, ww: { 'name': 'description', 'placeholder': 'Provide full details of the job. Markdown is supported', 'rows': 12, 'value': __context.data.description, 'onChange': __context.onChange } }, []), { wml: { 'id': 'description' }, ww: { 'name': 'description', 'placeholder': 'Provide full details of the job. Markdown is supported', 'rows': 12, 'value': __context.data.description, 'onChange': __context.onChange } })
                    ]), {})
                ]), {})
            ]), {});
        };
    }
    JobFormJobFieldsView.prototype.registerView = function (v) {
        this.views.push(v);
        return v;
    };
    JobFormJobFieldsView.prototype.register = function (e, attrs) {
        var attrsMap = attrs;
        if (attrsMap.wml) {
            var _a = attrsMap.wml, id = _a.id, group = _a.group;
            if (id != null) {
                if (this.ids.hasOwnProperty(id))
                    throw new Error("Duplicate id '".concat(id, "' detected!"));
                this.ids[id] = e;
            }
            if (group != null) {
                this.groups[group] = this.groups[group] || [];
                this.groups[group].push(e);
            }
        }
        return e;
    };
    JobFormJobFieldsView.prototype.node = function (tag, attrs, children) {
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
                    throw new TypeError("Can not adopt child ".concat(c, " of type ").concat(typeof c));
            }
        });
        this.register(e, attrs);
        return e;
    };
    JobFormJobFieldsView.prototype.widget = function (w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    JobFormJobFieldsView.prototype.findById = function (id) {
        var mW = (0, maybe_1.fromNullable)(this.ids[id]);
        return this.views.reduce(function (p, c) {
            return p.isJust() ? p : c.findById(id);
        }, mW);
    };
    JobFormJobFieldsView.prototype.findByGroup = function (name) {
        var mGroup = (0, maybe_1.fromArray)(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
        return this.views.reduce(function (p, c) {
            return p.isJust() ? p : c.findByGroup(name);
        }, mGroup);
    };
    JobFormJobFieldsView.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    };
    JobFormJobFieldsView.prototype.render = function () {
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
    return JobFormJobFieldsView;
}());
exports.JobFormJobFieldsView = JobFormJobFieldsView;
//# sourceMappingURL=job.js.map