"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobPreviewPanelView = void 0;
var __document = require("@quenk/wml/lib/dom");
//@ts-ignore: 6192
var maybe_1 = require("@quenk/noni/lib/data/maybe");
;
var filters_1 = require("../../filters");
;
var features_1 = require("../panel/features");
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
var JobPreviewPanelView = /** @class */ (function () {
    function JobPreviewPanelView(__context) {
        this.ids = {};
        this.groups = {};
        this.views = [];
        this.widgets = [];
        this.tree = __document.createElement('div');
        this.template = function (__this) {
            return __this.node('div', { 'class': 'ww-panel -default board-job-preview-panel' }, [
                __this.node('div', { 'class': 'ww-panel__body' }, [
                    __this.node('div', { 'class': 'board-job-preview-panel-header' }, [
                        __this.node('h3', { 'class': 'board-job-preview-panel-header__title' }, [
                            __this.node('a', { 'href': ('/jobs/' + __context.id) }, [
                                text(__context.title)
                            ])
                        ]),
                        __this.node('div', { 'class': 'board-job-preview-panel-header__text' }, [
                            __this.node('span', { 'class': 'board-job-preview-panel-company' }, [
                                text(__context.company)
                            ]),
                            __document.createTextNode(' - \u000a        '),
                            __this.node('span', { 'class': 'board-job-preview-panel-time' }, [
                                text((0, filters_1.timefromnow)(__context.created_on))
                            ])
                        ]),
                        __this.registerView((new features_1.JobFeaturesView(__context))).render()
                    ])
                ])
            ]);
        };
    }
    JobPreviewPanelView.prototype.registerView = function (v) {
        this.views.push(v);
        return v;
    };
    JobPreviewPanelView.prototype.register = function (e, attrs) {
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
    JobPreviewPanelView.prototype.node = function (tag, attrs, children) {
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
    JobPreviewPanelView.prototype.widget = function (w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    JobPreviewPanelView.prototype.findById = function (id) {
        var mW = (0, maybe_1.fromNullable)(this.ids[id]);
        return this.views.reduce(function (p, c) {
            return p.isJust() ? p : c.findById(id);
        }, mW);
    };
    JobPreviewPanelView.prototype.findByGroup = function (name) {
        var mGroup = (0, maybe_1.fromArray)(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
        return this.views.reduce(function (p, c) {
            return p.isJust() ? p : c.findByGroup(name);
        }, mGroup);
    };
    JobPreviewPanelView.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    };
    JobPreviewPanelView.prototype.render = function () {
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
    return JobPreviewPanelView;
}());
exports.JobPreviewPanelView = JobPreviewPanelView;
//# sourceMappingURL=index.js.map