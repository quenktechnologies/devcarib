"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showPost = exports.createPost = exports.showPostJobPage = exports.showPosts = exports.ERROR_AUTH_FAILED = void 0;
const collection_1 = require("@quenk/noni-mongodb/lib/database/collection");
const response_1 = require("@quenk/tendril/lib/app/api/response");
const control_1 = require("@quenk/tendril/lib/app/api/control");
const pool_1 = require("@quenk/tendril/lib/app/api/pool");
const api_1 = require("@quenk/tendril/lib/app/api");
const tendril_show_wml_1 = require("@quenk/tendril-show-wml");
const candidate_post_1 = require("@board/checks/lib/candidate-post");
const _404_1 = require("@board/views/lib/error/404");
const post_form_1 = require("@board/views/lib/post-form");
const post_1 = require("@board/views/lib/post");
const views_1 = require("@board/views");
exports.ERROR_AUTH_FAILED = 'Invalid Email or password! Try again.';
/**
 * showPosts currently approved.
 *
 * This only shows the most recent 50 posts. In future we will refactor if
 * needed to show more.
 */
const showPosts = (_) => api_1.doAction(function* () {
    let db = yield getMain();
    let collection = db.collection('posts');
    let qry = { approved: true };
    let posts = yield control_1.fork(collection_1.find(collection, qry, { sort: { created_on: -1 }, limit: 50 }));
    return tendril_show_wml_1.render(new views_1.IndexView({ posts }));
});
exports.showPosts = showPosts;
/**
 * showPostJobPage displays the form for creating new posts on a new
 * page.
 */
const showPostJobPage = (_) => tendril_show_wml_1.render(new post_form_1.PostFormView({}));
exports.showPostJobPage = showPostJobPage;
/**
 * createPost saves the submitted post data in the database for approval later.
 */
const createPost = (r) => api_1.doAction(function* () {
    let eResult = yield control_1.fork(candidate_post_1.check(r.body));
    if (eResult.isRight()) {
        let data = eResult.takeRight();
        let db = yield getMain();
        let collection = db.collection('posts');
        data.approved = false;
        data.created_on = new Date();
        yield control_1.fork(collection_1.insertOne(collection, data));
        return response_1.created({ id: data.id });
    }
    else {
        return response_1.conflict({ errors: eResult.takeLeft().explain() });
    }
});
exports.createPost = createPost;
/**
 * showPost displays a page for a single approved post.
 */
const showPost = (r) => api_1.doAction(function* () {
    let id = Number(r.params.id); //XXX: this could be done with a check.
    let db = yield getMain();
    let collection = db.collection('posts');
    let qry = { id, approved: true };
    let mResult = yield control_1.fork(collection_1.findOne(collection, qry));
    if (mResult.isNothing()) {
        return tendril_show_wml_1.render(new _404_1.NotFoundErrorView({}), 404);
    }
    else {
        let post = mResult.get();
        return tendril_show_wml_1.render(new post_1.PostView({
            post,
            // TODO: Move this to a library function
            meta: [
                {
                    property: 'og:site_name',
                    content: 'Caribbean Developers'
                },
                { property: 'og:type', content: 'article' },
                { property: 'og:image', content: "https://jobs.caribbeandevelopers.org/ogimg.png" },
                { property: 'og:title', content: post.title },
                { property: 'og:description', content: post.type }
            ]
        }));
    }
});
exports.showPost = showPost;
//retrieves the main connection from the tendril pool.
const getMain = () => pool_1.checkout('main');
//# sourceMappingURL=handlers.js.map