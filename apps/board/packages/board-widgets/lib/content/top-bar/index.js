"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TopBar = void 0;
const wml_1 = require("@quenk/wml");
const views_1 = require("./views");
const DEFAULT_IMAGE = '/assets/img/logo.svg';
const DEFAULT_TARGET = '/';
/**
 * TopBar generates an ActionBar for the purpose of app/site navigation.
 *
 * The API provides support for the following layout:
 *
 * [[logo] [link1, link2, link2]  [action]]
 *
 * Each section is optional.
 */
class TopBar extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views_1.TopBarView(this);
        this.values = {
            className: 'board-top-bar',
            logo: {
                target: DEFAULT_TARGET,
                className: 'board-top-bar-logo',
                image: {
                    className: 'board-top-bar-logo-image',
                    src: this.attrs.image || DEFAULT_IMAGE,
                    alt: 'Logo'
                }
            },
            links: this.attrs.links,
            cta: {
                className: 'board-top-bar-cta',
                links: [{
                        className: 'ww-button -primary',
                        href: '/post',
                        text: 'Post Job'
                    }]
            }
        };
    }
}
exports.TopBar = TopBar;
//# sourceMappingURL=index.js.map