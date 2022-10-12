"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostThreadView = void 0;
const __document = require("@quenk/wml/lib/dom");
//@ts-ignore: 6192
const maybe_1 = require("@quenk/noni/lib/data/maybe");
const grid_1 = require("@quenk/wml-widgets/lib/layout/grid");
;
const editor_1 = require("@devcarib/widgets/lib/post/editor");
;
const panel_1 = require("@devcarib/widgets/lib/post/panel");
;
const stream_1 = require("@devcarib/widgets/lib/comment/stream");
;
const rank_1 = require("@devcarib/widgets/lib/job/panel/rank");
;
const rank_2 = require("@devcarib/widgets/lib/post/panel/rank");
;
const rank_3 = require("@devcarib/widgets/lib/event/panel/rank");
;
const back_1 = require("@devcarib/widgets/lib/control/button/back");
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
class PostThreadView {
    constructor(__context) {
        this.ids = {};
        this.groups = {};
        this.views = [];
        this.widgets = [];
        this.tree = __document.createElement('div');
        this.template = (__this) => {
            return __this.widget(new grid_1.GridLayout({}, [
                __this.widget(new grid_1.Row({}, [
                    __this.widget(new grid_1.Column({ 'span': 7, 'offset': 1 }, [
                        __this.widget(new grid_1.Row({}, [
                            __this.widget(new grid_1.Column({}, [
                                __this.node('div', { 'class': 'converse-post-thread-header' }, [
                                    __this.widget(new back_1.BackButton({ 'onClick': __context.values.onBack }, []), { 'onClick': __context.values.onBack }),
                                    __this.node('h4', {}, [
                                        __document.createTextNode('Dashboard')
                                    ])
                                ])
                            ]), {})
                        ]), {}),
                        __this.widget(new grid_1.Row({}, [
                            __this.widget(new grid_1.Column({}, [
                                __this.widget(new panel_1.PostPanel({ 'editable': (__context.values.post.data.created_by && (__context.values.post.data.created_by.id === __context.app.user.id)), 'data': __context.values.post.data, 'onEdit': __context.values.post.onEdit }, []), { 'editable': (__context.values.post.data.created_by && (__context.values.post.data.created_by.id === __context.app.user.id)), 'data': __context.values.post.data, 'onEdit': __context.values.post.onEdit })
                            ]), {})
                        ]), {}),
                        __this.widget(new grid_1.Row({}, [
                            __this.widget(new grid_1.Column({}, [
                                __this.widget(new stream_1.CommentStream({ wml: { 'id': __context.values.comments.id }, 'user': __context.app.user.id, 'onEdit': __context.values.comments.onEdit }, []), { wml: { 'id': __context.values.comments.id }, 'user': __context.app.user.id, 'onEdit': __context.values.comments.onEdit })
                            ]), {})
                        ]), {}),
                        __this.widget(new grid_1.Row({}, [
                            __this.widget(new grid_1.Column({}, [
                                __this.widget(new editor_1.PostEditor({ 'notitle': true, 'value': __context.values.comment.data, 'errors': __context.values.comment.errors, 'onChange': __context.values.comment.onChange, 'onPost': __context.values.comment.onPost }, []), { 'notitle': true, 'value': __context.values.comment.data, 'errors': __context.values.comment.errors, 'onChange': __context.values.comment.onChange, 'onPost': __context.values.comment.onPost })
                            ]), {})
                        ]), {})
                    ]), { 'span': 7, 'offset': 1 }),
                    __this.widget(new grid_1.Column({ 'span': 3 }, [
                        __this.widget(new grid_1.Row({}, [
                            __this.widget(new grid_1.Column({}, [
                                __this.widget(new rank_2.PostRankPanel({ wml: { 'id': __context.values.posts.recent.id }, 'title': 'Recent Posts', 'data': __context.values.posts.recent.data }, []), { wml: { 'id': __context.values.posts.recent.id }, 'title': 'Recent Posts', 'data': __context.values.posts.recent.data })
                            ]), {})
                        ]), {}),
                        __this.widget(new grid_1.Row({}, [
                            __this.widget(new grid_1.Column({}, [
                                __this.widget(new rank_3.EventRankPanel({ wml: { 'id': __context.values.events.id }, 'data': __context.values.events.data }, []), { wml: { 'id': __context.values.events.id }, 'data': __context.values.events.data })
                            ]), {})
                        ]), {}),
                        __this.widget(new grid_1.Row({}, [
                            __this.widget(new grid_1.Column({}, [
                                __this.widget(new rank_1.JobRankPanel({ wml: { 'id': __context.values.jobs.id }, 'data': __context.values.jobs.data }, []), { wml: { 'id': __context.values.jobs.id }, 'data': __context.values.jobs.data })
                            ]), {})
                        ]), {})
                    ]), { 'span': 3 })
                ]), {})
            ]), {});
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
        let e = __document.createElement(tag);
        Object.keys(attrs).forEach(key => {
            let value = attrs[key];
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
        children.forEach(c => {
            switch (typeof c) {
                case 'string':
                case 'number':
                case 'boolean':
                    let tn = __document.createTextNode('' + c);
                    e.appendChild(tn);
                case 'object':
                    e.appendChild(c);
                    break;
                default:
                    throw new TypeError(`Can not adopt child ${c} of type ${typeof c}`);
            }
        });
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
    findByGroup(name) {
        let mGroup = (0, maybe_1.fromArray)(this.groups.hasOwnProperty(name) ?
            this.groups[name] :
            []);
        return this.views.reduce((p, c) => p.isJust() ? p : c.findByGroup(name), mGroup);
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
exports.PostThreadView = PostThreadView;
//# sourceMappingURL=views.js.map