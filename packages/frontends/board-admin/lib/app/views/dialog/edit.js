"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostEditView = void 0;
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
var wml_widgets_1 = require("@quenk/wml-widgets");
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
;
var PostEditView = /** @class */ (function () {
    function PostEditView(__context) {
        this.ids = {};
        this.groups = {};
        this.views = [];
        this.widgets = [];
        this.tree = __document.createElement('div');
        this.template = function (__this) {
            return __this.widget(new modal_1.Modal({ ww: { 'className': '-large' } }, [
                __this.widget(new modal_1.ModalHeader({}, [
                    wml_widgets_1.text(type_1.toString(__context.post.company))
                ]), {}),
                __this.widget(new modal_1.ModalBody({}, [
                    __this.widget(new grid_1.GridLayout({}, [
                        __this.widget(new grid_1.Row({}, [
                            __this.widget(new grid_1.Column({}, [
                                __this.widget(new text_field_1.TextField({ ww: { 'name': 'title', 'value': __context.post.title, 'onChange': __context.onChange } }, []), { ww: { 'name': 'title', 'value': __context.post.title, 'onChange': __context.onChange } })
                            ]), {})
                        ]), {}),
                        __this.widget(new grid_1.Row({}, [
                            __this.widget(new grid_1.Column({}, [
                                __this.widget(new text_field_1.TextField({ ww: { 'rows': 15, 'name': 'description', 'value': __context.post.description, 'onChange': __context.onChange } }, []), { ww: { 'rows': 15, 'name': 'description', 'value': __context.post.description, 'onChange': __context.onChange } })
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
    PostEditView.prototype.registerView = function (v) {
        this.views.push(v);
        return v;
    };
    PostEditView.prototype.register = function (e, attrs) {
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
    PostEditView.prototype.node = function (tag, attrs, children) {
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
    PostEditView.prototype.widget = function (w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    PostEditView.prototype.findById = function (id) {
        var mW = maybe_1.fromNullable(this.ids[id]);
        return this.views.reduce(function (p, c) {
            return p.isJust() ? p : c.findById(id);
        }, mW);
    };
    PostEditView.prototype.findByGroup = function (name) {
        var mGroup = maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
        return this.views.reduce(function (p, c) {
            return p.isJust() ? p : c.findByGroup(name);
        }, mGroup);
    };
    PostEditView.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    };
    PostEditView.prototype.render = function () {
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
    return PostEditView;
}());
exports.PostEditView = PostEditView;
//# sourceMappingURL=edit.js.map