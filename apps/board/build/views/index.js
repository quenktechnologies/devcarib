"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexView = void 0;
const __document = require("@quenk/wml/lib/dom");
//@ts-ignore: 6192
const maybe_1 = require("@quenk/noni/lib/data/maybe");
const grid_1 = require("@quenk/wml-widgets/lib/layout/grid");
;
const link_1 = require("@quenk/wml-widgets/lib/content/link");
;
const devbar_1 = require("@devcarib/widgets/lib/content/devbar");
;
const summary_1 = require("@devcarib/widgets/lib/panel/job/summary");
;
const head_1 = require("@devcarib/views/lib/common/head");
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
;
class IndexView {
    constructor(__context) {
        this.ids = {};
        this.groups = {};
        this.views = [];
        this.widgets = [];
        this.tree = __document.createElement('div');
        this.template = (__this) => {
            return __this.node('html', {}, [
                __this.registerView(new head_1.HeadView({
                    'title': "Jobs For Caribbean Software Developers",
                    'noSite': true,
                    'styles': [
                        "/assets/css/board.css"
                    ]
                })).render(),
                __this.node('body', {}, [
                    __this.widget(new devbar_1.DevBar({}, []), {}),
                    __this.widget(new grid_1.GridLayout({ 'id': "main" }, [
                        __this.widget(new grid_1.Row({}, [
                            __this.widget(new grid_1.Column({ 'span': 8, 'offset': 2 }, [
                                __this.widget(new grid_1.Row({}, [
                                    __this.widget(new grid_1.Column({}, [
                                        __this.node('p', { 'class': "board-post-job-prompt" }, [
                                            __document.createTextNode('Need talent for a project? \u000a                  '),
                                            __this.widget(new link_1.Link({ 'className': "ww-button -error", 'href': "/jobs/post", 'text': "Post a Job" }, []), { 'className': "ww-button -error", 'href': "/jobs/post", 'text': "Post a Job" })
                                        ])
                                    ]), {})
                                ]), {}),
                                __this.widget(new grid_1.Row({}, [
                                    __this.widget(new grid_1.Column({}, [
                                        ...__forIn(__context.jobs, (job, _$$i, _$$all) => ([
                                            __this.widget(new summary_1.JobSummaryPanel({ 'job': job }, []), { 'job': job })
                                        ]), () => ([
                                            __this.node('div', { 'class': "board-no-jobs" }, [
                                                __this.node('img', { 'src': "/assets/img/sad.svg", 'alt': "Sad Face" }, []),
                                                __this.node('h1', {}, [
                                                    unsafe("Sorry, This Job Board Is Empty!")
                                                ]),
                                                __this.node('p', {}, [
                                                    __document.createTextNode('Jobs posted by recruiters will show up here so check back in a few days.')
                                                ]),
                                                __this.node('p', {}, [
                                                    __document.createTextNode('Looking for developers?')
                                                ]),
                                                __this.widget(new link_1.Link({ 'className': "ww-button -primary", 'text': "Post a Job", 'href': "/jobs/post" }, []), { 'className': "ww-button -primary", 'text': "Post a Job", 'href': "/jobs/post" })
                                            ])
                                        ]))
                                    ]), {})
                                ]), {})
                            ]), { 'span': 8, 'offset': 2 })
                        ]), {})
                    ]), { 'id': "main" })
                ])
            ]);
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
        let asDOMAttrs = attrs;
        let e = __document.createElement(tag, asDOMAttrs, children, attrs.wml && attrs.wml.ns || '');
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
    findGroupById(name) {
        return this.groups.hasOwnProperty(name) ?
            this.groups[name] : [];
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
exports.IndexView = IndexView;
//# sourceMappingURL=index.js.map