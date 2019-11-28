"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var grid_1 = require("@quenk/wml-widgets/lib/layout/grid");
;
var panel_1 = require("@quenk/wml-widgets/lib/layout/panel");
;
var text_field_1 = require("@quenk/wml-widgets/lib/control/text-field");
;
var button_1 = require("@quenk/wml-widgets/lib/control/button");
;
//@ts-ignore: 6192
var maybe_1 = require("@quenk/noni/lib/data/maybe");
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
var JobFormView = /** @class */ (function () {
    function JobFormView(__context) {
        this.ids = {};
        this.groups = {};
        this.views = [];
        this.widgets = [];
        this.tree = document.createElement('div');
        this.template = function (__this) {
            return __this.widget(new grid_1.GridLayout({}, [
                __this.widget(new grid_1.Row({}, [
                    __this.widget(new grid_1.Column({ ww: { 'span': 8, 'offset': 2 } }, [
                        __this.widget(new panel_1.Panel({}, [
                            __this.widget(new panel_1.PanelBody({}, [
                                __this.node('form', { 'autocomplete': 'off' }, [
                                    __this.widget(new text_field_1.TextField({ ww: { 'name': 'title', 'value': __context.values.data.title, 'label': 'Title', 'focus': true, 'onChange': __context.values.controls.change } }, []), { ww: { 'name': 'title', 'value': __context.values.data.title, 'label': 'Title', 'focus': true, 'onChange': __context.values.controls.change } }),
                                    __this.widget(new text_field_1.TextField({ ww: { 'name': 'country', 'value': __context.values.data.country, 'label': 'Country', 'onChange': __context.values.controls.change } }, []), { ww: { 'name': 'country', 'value': __context.values.data.country, 'label': 'Country', 'onChange': __context.values.controls.change } }),
                                    __this.widget(new text_field_1.TextField({ ww: { 'name': 'city', 'value': __context.values.data.city, 'label': 'City', 'onChange': __context.values.controls.change } }, []), { ww: { 'name': 'city', 'value': __context.values.data.city, 'label': 'City', 'onChange': __context.values.controls.change } }),
                                    __this.widget(new text_field_1.TextField({ ww: { 'name': 'type', 'value': __context.values.data.type, 'label': 'Type', 'onChange': __context.values.controls.change } }, []), { ww: { 'name': 'type', 'value': __context.values.data.type, 'label': 'Type', 'onChange': __context.values.controls.change } }),
                                    __this.widget(new text_field_1.TextField({ ww: { 'name': 'role', 'value': __context.values.data.role, 'label': 'Role', 'onChange': __context.values.controls.change } }, []), { ww: { 'name': 'role', 'value': __context.values.data.role, 'label': 'Role', 'onChange': __context.values.controls.change } }),
                                    __this.widget(new text_field_1.TextField({ ww: { 'name': 'industry', 'value': __context.values.data.industry, 'label': 'Industry', 'onChange': __context.values.controls.change } }, []), { ww: { 'name': 'industry', 'value': __context.values.data.industry, 'label': 'Industry', 'onChange': __context.values.controls.change } }),
                                    __this.widget(new text_field_1.TextField({ ww: { 'name': 'technologies', 'value': __context.values.data.technologies, 'label': 'Technologies', 'onChange': __context.values.controls.change } }, []), { ww: { 'name': 'technologies', 'value': __context.values.data.technologies, 'label': 'Technologies', 'onChange': __context.values.controls.change } }),
                                    __this.widget(new text_field_1.TextField({ ww: { 'name': 'link', 'value': __context.values.data.link, 'label': 'Link', 'onChange': __context.values.controls.change } }, []), { ww: { 'name': 'link', 'value': __context.values.data.link, 'label': 'Link', 'onChange': __context.values.controls.change } }),
                                    __this.widget(new text_field_1.TextField({ ww: { 'name': 'description', 'value': __context.values.data.description, 'label': 'Description', 'rows': 15, 'onChange': __context.values.controls.change } }, []), { ww: { 'name': 'description', 'value': __context.values.data.description, 'label': 'Description', 'rows': 15, 'onChange': __context.values.controls.change } })
                                ])
                            ]), {}),
                            __this.widget(new panel_1.PanelFooter({}, [
                                __this.widget(new button_1.Button({ ww: { 'className': '-primary', 'text': 'create', 'onClick': __context.values.controls.create } }, []), { ww: { 'className': '-primary', 'text': 'create', 'onClick': __context.values.controls.create } })
                            ]), {})
                        ]), {})
                    ]), { ww: { 'span': 8, 'offset': 2 } })
                ]), {})
            ]), {});
        };
    }
    JobFormView.prototype.registerView = function (v) {
        this.views.push(v);
        return v;
    };
    JobFormView.prototype.register = function (e, attrs) {
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
    JobFormView.prototype.node = function (tag, attrs, children) {
        var e = document.createElement(tag);
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
                e.setAttribute(key, "" + value);
            }
        });
        children.forEach(function (c) {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    var tn = document.createTextNode('' + c);
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
    JobFormView.prototype.widget = function (w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    JobFormView.prototype.findById = function (id) {
        var mW = maybe_1.fromNullable(this.ids[id]);
        return this.views.reduce(function (p, c) {
            return p.isJust() ? p : c.findById(id);
        }, mW);
    };
    JobFormView.prototype.findByGroup = function (name) {
        var mGroup = maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
        return this.views.reduce(function (p, c) {
            return p.isJust() ? p : c.findByGroup(name);
        }, mGroup);
    };
    JobFormView.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    };
    JobFormView.prototype.render = function () {
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
    return JobFormView;
}());
exports.JobFormView = JobFormView;
//# sourceMappingURL=job-form.js.map