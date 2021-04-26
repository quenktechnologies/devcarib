"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostFormView = void 0;
var __document = require("@quenk/wml/lib/dom");
//@ts-ignore: 6192
var maybe_1 = require("@quenk/noni/lib/data/maybe");
var grid_1 = require("@quenk/wml-widgets/lib/layout/grid");
;
var panel_1 = require("@quenk/wml-widgets/lib/layout/panel");
;
var text_field_1 = require("@quenk/wml-widgets/lib/control/text-field");
;
var drop_list_1 = require("@quenk/wml-widgets/lib/control/drop-list");
;
var checkbox_1 = require("@quenk/wml-widgets/lib/control/checkbox");
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
var PostFormView = /** @class */ (function () {
    function PostFormView(__context) {
        this.ids = {};
        this.groups = {};
        this.views = [];
        this.widgets = [];
        this.tree = __document.createElement('div');
        this.template = function (__this) {
            return __this.node('form', { 'name': 'post-form', 'onsubmit': function (e) { return e.preventDefault(); }, 'autocomplete': 'off' }, [
                __this.widget(new panel_1.Panel({}, [
                    __this.widget(new panel_1.PanelBody({}, [
                        __this.widget(new grid_1.GridLayout({}, [
                            __this.widget(new grid_1.Row({}, [
                                __this.widget(new grid_1.Column({}, [
                                    __this.widget(new text_field_1.TextField({ wml: { 'id': 'title' }, ww: { 'name': 'title', 'label': 'Title*', 'placeholder': 'Example: Fintech Software Engineer Needed', 'value': __context.values.post.data.title, 'onChange': __context.values.post.onChange } }, []), { wml: { 'id': 'title' }, ww: { 'name': 'title', 'label': 'Title*', 'placeholder': 'Example: Fintech Software Engineer Needed', 'value': __context.values.post.data.title, 'onChange': __context.values.post.onChange } })
                                ]), {})
                            ]), {}),
                            __this.widget(new grid_1.Row({}, [
                                __this.widget(new grid_1.Column({ ww: { 'span': 6 } }, [
                                    __this.widget(new text_field_1.TextField({ wml: { 'id': 'location' }, ww: { 'name': 'location', 'label': 'Location*', 'value': __context.values.post.data.location, 'onChange': __context.values.post.onChange } }, []), { wml: { 'id': 'location' }, ww: { 'name': 'location', 'label': 'Location*', 'value': __context.values.post.data.location, 'onChange': __context.values.post.onChange } })
                                ]), { ww: { 'span': 6 } }),
                                __this.widget(new grid_1.Column({ ww: { 'span': 6 } }, [
                                    __this.node('label', { 'class': 'ww-label' }, [
                                        __document.createTextNode('Select A Job Type*')
                                    ]),
                                    __this.widget(new drop_list_1.DropList({ wml: { 'id': 'type' }, ww: { 'className': '-block', 'name': 'type', 'value': __context.values.post.data.type, 'options': __context.values.post.type.options, 'onSelect': __context.values.post.onSelect } }, []), { wml: { 'id': 'type' }, ww: { 'className': '-block', 'name': 'type', 'value': __context.values.post.data.type, 'options': __context.values.post.type.options, 'onSelect': __context.values.post.onSelect } })
                                ]), { ww: { 'span': 6 } })
                            ]), {}),
                            __this.widget(new grid_1.Row({}, [
                                __this.widget(new grid_1.Column({}, [
                                    __this.widget(new text_field_1.TextField({ wml: { 'id': 'apply_url' }, ww: { 'name': 'apply_url', 'label': 'Apply Link', 'placeholder': 'Specify a url or email address applicants can use to apply', 'value': __context.values.post.data.apply_url, 'onChange': __context.values.post.onChange } }, []), { wml: { 'id': 'apply_url' }, ww: { 'name': 'apply_url', 'label': 'Apply Link', 'placeholder': 'Specify a url or email address applicants can use to apply', 'value': __context.values.post.data.apply_url, 'onChange': __context.values.post.onChange } })
                                ]), {})
                            ]), {}),
                            __this.widget(new grid_1.Row({}, [
                                __this.widget(new grid_1.Column({}, [
                                    __this.node('b', {}, [
                                        __document.createTextNode('\u000a              Is this a remote position? \u000a              '),
                                        __this.widget(new checkbox_1.Checkbox({ ww: { 'name': 'remote', 'value': __context.values.post.data.remote, 'onChange': __context.values.post.onSelect } }, []), { ww: { 'name': 'remote', 'value': __context.values.post.data.remote, 'onChange': __context.values.post.onSelect } })
                                    ])
                                ]), {})
                            ]), {}),
                            __this.widget(new grid_1.Row({}, [
                                __this.widget(new grid_1.Column({}, [
                                    __this.widget(new text_field_1.TextField({ wml: { 'id': 'preview' }, ww: { 'name': 'preview', 'placeholder': 'Provide a brief summary here for the listings section', 'rows': 5, 'value': __context.values.post.data.preview, 'onChange': __context.values.post.onChange } }, []), { wml: { 'id': 'preview' }, ww: { 'name': 'preview', 'placeholder': 'Provide a brief summary here for the listings section', 'rows': 5, 'value': __context.values.post.data.preview, 'onChange': __context.values.post.onChange } })
                                ]), {})
                            ]), {}),
                            __this.widget(new grid_1.Row({}, [
                                __this.widget(new grid_1.Column({}, [
                                    __this.widget(new text_field_1.TextField({ wml: { 'id': 'description' }, ww: { 'name': 'description', 'placeholder': 'Provide full details of the job. Markdown is supported', 'rows': 12, 'value': __context.values.post.data.description, 'onChange': __context.values.post.onChange } }, []), { wml: { 'id': 'description' }, ww: { 'name': 'description', 'placeholder': 'Provide full details of the job. Markdown is supported', 'rows': 12, 'value': __context.values.post.data.description, 'onChange': __context.values.post.onChange } })
                                ]), {})
                            ]), {})
                        ]), {})
                    ]), {})
                ]), {})
            ]);
        };
    }
    PostFormView.prototype.registerView = function (v) {
        this.views.push(v);
        return v;
    };
    PostFormView.prototype.register = function (e, attrs) {
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
    PostFormView.prototype.node = function (tag, attrs, children) {
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
    PostFormView.prototype.widget = function (w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    PostFormView.prototype.findById = function (id) {
        var mW = maybe_1.fromNullable(this.ids[id]);
        return this.views.reduce(function (p, c) {
            return p.isJust() ? p : c.findById(id);
        }, mW);
    };
    PostFormView.prototype.findByGroup = function (name) {
        var mGroup = maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
        return this.views.reduce(function (p, c) {
            return p.isJust() ? p : c.findByGroup(name);
        }, mGroup);
    };
    PostFormView.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    };
    PostFormView.prototype.render = function () {
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
    return PostFormView;
}());
exports.PostFormView = PostFormView;
//# sourceMappingURL=post.js.map