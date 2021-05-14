"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardAdminView = void 0;
var __document = require("@quenk/wml/lib/dom");
//@ts-ignore: 6192
var maybe_1 = require("@quenk/noni/lib/data/maybe");
var grid_1 = require("@quenk/wml-widgets/lib/layout/grid");
;
var table_1 = require("@quenk/wml-widgets/lib/data/table");
;
var text_field_1 = require("@quenk/wml-widgets/lib/control/text-field");
;
var nav_1 = require("@quenk/wml-widgets/lib/menu/nav");
;
var item_1 = require("@quenk/wml-widgets/lib/menu/item");
;
var link_1 = require("@quenk/wml-widgets/lib/content/link");
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
var BoardAdminView = /** @class */ (function () {
    function BoardAdminView(__context) {
        this.ids = {};
        this.groups = {};
        this.views = [];
        this.widgets = [];
        this.tree = __document.createElement('div');
        this.template = function (__this) {
            return __this.widget(new grid_1.GridLayout({}, [
                __this.widget(new grid_1.Row({}, [
                    __this.widget(new grid_1.Column({}, [
                        __this.widget(new nav_1.Nav({}, __spreadArray([], __forOf(__context.values.header.links, function (handler, text, _$$all) {
                            return ([
                                __this.widget(new item_1.Item({}, [
                                    __this.widget(new link_1.Link({ ww: { 'text': text, 'onClick': handler } }, []), { ww: { 'text': text, 'onClick': handler } })
                                ]), {})
                            ]);
                        }, function () { return ([]); }))), {})
                    ]), {})
                ]), {}),
                __this.widget(new grid_1.Row({}, [
                    __this.widget(new grid_1.Column({}, [
                        __this.node('h1', {}, [
                            __document.createTextNode('Manage Posts')
                        ])
                    ]), {})
                ]), {}),
                __this.widget(new grid_1.Row({}, [
                    __this.widget(new grid_1.Column({}, [
                        __this.widget(new text_field_1.TextField({ ww: { 'placeholder': 'Search', 'onChange': __context.values.search.onChange } }, []), { ww: { 'placeholder': 'Search', 'onChange': __context.values.search.onChange } })
                    ]), {})
                ]), {}),
                __this.widget(new grid_1.Row({}, [
                    __this.widget(new grid_1.Column({}, [
                        __this.widget(new table_1.DataTable({ wml: { 'id': __context.values.table.id }, ww: { 'data': __context.values.table.data, 'columns': __context.values.table.columns } }, []), { wml: { 'id': __context.values.table.id }, ww: { 'data': __context.values.table.data, 'columns': __context.values.table.columns } })
                    ]), {})
                ]), {})
            ]), {});
        };
    }
    BoardAdminView.prototype.registerView = function (v) {
        this.views.push(v);
        return v;
    };
    BoardAdminView.prototype.register = function (e, attrs) {
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
    BoardAdminView.prototype.node = function (tag, attrs, children) {
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
    BoardAdminView.prototype.widget = function (w, attrs) {
        this.register(w, attrs);
        this.widgets.push(w);
        return w.render();
    };
    BoardAdminView.prototype.findById = function (id) {
        var mW = maybe_1.fromNullable(this.ids[id]);
        return this.views.reduce(function (p, c) {
            return p.isJust() ? p : c.findById(id);
        }, mW);
    };
    BoardAdminView.prototype.findByGroup = function (name) {
        var mGroup = maybe_1.fromArray(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
        return this.views.reduce(function (p, c) {
            return p.isJust() ? p : c.findByGroup(name);
        }, mGroup);
    };
    BoardAdminView.prototype.invalidate = function () {
        var tree = this.tree;
        var parent = tree.parentNode;
        if (tree == null)
            return console.warn('invalidate(): ' + 'Missing DOM tree!');
        if (tree.parentNode == null)
            throw new Error('invalidate(): cannot invalidate this view, it has no parent node!');
        parent.replaceChild(this.render(), tree);
    };
    BoardAdminView.prototype.render = function () {
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
    return BoardAdminView;
}());
exports.BoardAdminView = BoardAdminView;
//# sourceMappingURL=app.js.map