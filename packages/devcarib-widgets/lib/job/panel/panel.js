"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobPanelView = void 0;
var __document = require("@quenk/wml/lib/dom");
//@ts-ignore: 6192
var maybe_1 = require("@quenk/noni/lib/data/maybe");
var panel_1 = require("@quenk/wml-widgets/lib/layout/panel");
;
var filters_1 = require("../../filters");
;
var features_1 = require("./features");
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
var JobPanelView = /** @class */ (function () {
    function JobPanelView(__context) {
        this.ids = {};
        this.groups = {};
        this.views = [];
        this.widgets = [];
        this.tree = __document.createElement('div');
        this.template = function (__this) {
            return __this.widget(new panel_1.Panel({}, [
                __this.widget(new panel_1.PanelHeader({}, [
                    __this.node('div', { 'class': 'ww-panel__header__content' }, [
                        __this.registerView((new features_1.JobFeaturesView(__context.values.data))).render(),
                        __this.node('div', { 'class': 'board-job-timestamp' }, [
                            __document.createTextNode('\u000a        Posted '),
                            text((0, filters_1.timestamp)(__context.values.data.created_on))
                        ])
                    ])
                ]), {}),
                __this.widget(new panel_1.PanelBody({}, [
                    __this.node('div', { 'class': 'board-job-salary' }, __spreadArray([], (((__context.values.data.payment_amount) != null) ?
                        (function () { return ([
                            __this.node('span', {}, [
                                text(__context.values.data.payment_amount),
                                __document.createTextNode('\u00a0'),
                                __this.node('b', {}, [
                                    text(__context.values.data.payment_currency),
                                    __document.createTextNode('\u002F'),
                                    text(__context.values.data.payment_frequency)
                                ])
                            ])
                        ]); })() :
                        (function () { return ([]); })()), true)),
                    __this.node('div', { wml: { 'id': 'content' }, 'class': 'board-job-html' }, __spreadArray([], ((__context.values.raw) ?
                        (function () { return ([
                            unsafe(__context.values.data.description_html)
                        ]); })() :
                        (function () { return ([
                            text(__context.values.data.description_html)
                        ]); })()), true))
                ]), {})
            ]), {});
        };
    }
    JobPanelView.prototype.registerView = function (v) {
        this.views.push(v);
        return v;
    };
    JobPanelView.prototype.register = function (e, attrs) {
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
    JobPanelView.prototype.node = function (tag, attrs, children) {
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
    JobPanelView.prototype.widget = function (w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    JobPanelView.prototype.findById = function (id) {
        var mW = (0, maybe_1.fromNullable)(this.ids[id]);
        return this.views.reduce(function (p, c) {
            return p.isJust() ? p : c.findById(id);
        }, mW);
    };
    JobPanelView.prototype.findByGroup = function (name) {
        var mGroup = (0, maybe_1.fromArray)(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
        return this.views.reduce(function (p, c) {
            return p.isJust() ? p : c.findByGroup(name);
        }, mGroup);
    };
    JobPanelView.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    };
    JobPanelView.prototype.render = function () {
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
    return JobPanelView;
}());
exports.JobPanelView = JobPanelView;
//# sourceMappingURL=panel.js.map