"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobEditView = void 0;
var __document = require("@quenk/wml/lib/dom");
//@ts-ignore: 6192
var maybe_1 = require("@quenk/noni/lib/data/maybe");
var type_1 = require("@quenk/noni/lib/data/type");
;
;
var modal_1 = require("@quenk/wml-widgets/lib/dialog/modal");
;
var grid_1 = require("@quenk/wml-widgets/lib/layout/grid");
;
var button_1 = require("@quenk/wml-widgets/lib/control/button");
;
var text_field_1 = require("@quenk/wml-widgets/lib/control/text-field");
;
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
var JobEditView = /** @class */ (function () {
    function JobEditView(__context) {
        this.ids = {};
        this.groups = {};
        this.views = [];
        this.widgets = [];
        this.tree = __document.createElement('div');
        this.template = function (__this) {
            return __this.widget(new modal_1.Modal({ ww: { 'className': '-large' } }, [
                __this.widget(new modal_1.ModalHeader({}, [
                    text(type_1.toString(__context.job.company))
                ]), {}),
                __this.widget(new modal_1.ModalBody({}, [
                    __this.widget(new grid_1.GridLayout({}, [
                        __this.widget(new grid_1.Row({}, [
                            __this.widget(new grid_1.Column({}, [
                                __this.widget(new text_field_1.TextField({ ww: { 'name': 'title', 'value': __context.job.title, 'onChange': __context.onChange } }, []), { ww: { 'name': 'title', 'value': __context.job.title, 'onChange': __context.onChange } })
                            ]), {})
                        ]), {}),
                        __this.widget(new grid_1.Row({}, [
                            __this.widget(new grid_1.Column({}, [
                                __this.widget(new text_field_1.TextField({ ww: { 'rows': 15, 'name': 'description', 'value': __context.job.description, 'onChange': __context.onChange } }, []), { ww: { 'rows': 15, 'name': 'description', 'value': __context.job.description, 'onChange': __context.onChange } })
                            ]), {})
                        ]), {})
                    ]), {})
                ]), {}),
                __this.widget(new modal_1.ModalFooter({}, [
                    __this.widget(new button_1.Button({ ww: { 'onClick': __context.onCancel, 'text': 'Cancel' } }, []), { ww: { 'onClick': __context.onCancel, 'text': 'Cancel' } }),
                    __this.widget(new button_1.Button({ ww: { 'className': '-primary', 'onClick': __context.onSave, 'text': 'Save' } }, []), { ww: { 'className': '-primary', 'onClick': __context.onSave, 'text': 'Save' } })
                ]), {})
            ]), { ww: { 'className': '-large' } });
        };
    }
    JobEditView.prototype.registerView = function (v) {
        this.views.push(v);
        return v;
    };
    JobEditView.prototype.register = function (e, attrs) {
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
    JobEditView.prototype.node = function (tag, attrs, children) {
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
    JobEditView.prototype.widget = function (w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    JobEditView.prototype.findById = function (id) {
        var mW = maybe_1.fromNullable(this.ids[id]);
        return this.views.reduce(function (p, c) {
            return p.isJust() ? p : c.findById(id);
        }, mW);
    };
    JobEditView.prototype.findByGroup = function (name) {
        var mGroup = maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
        return this.views.reduce(function (p, c) {
            return p.isJust() ? p : c.findByGroup(name);
        }, mGroup);
    };
    JobEditView.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    };
    JobEditView.prototype.render = function () {
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
    return JobEditView;
}());
exports.JobEditView = JobEditView;
//# sourceMappingURL=edit.js.map