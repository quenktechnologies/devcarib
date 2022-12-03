"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevBar = void 0;
const wml_1 = require("@quenk/wml");
const views_1 = require("./views");
const DEFAULT_IMAGE = '/assets/img/logo.svg';
const DEFAULT_TARGET = '/';
/**
 * DevBar generates an ActionBar for the purpose of app/site navigation.
 *
 * The API provides support for the following layout:
 *
 * [[logo] [link1, link2, link2]  [action]]
 *
 * Each section is optional.
 */
class DevBar extends wml_1.Component {
    constructor() {
        super(...arguments);
        this.view = new views_1.DevBarView(this);
        this.values = {
            className: 'devcarib-devbar',
            logo: {
                target: DEFAULT_TARGET,
                className: 'devcarib-devbar-logo',
                image: {
                    className: 'devcarib-devbar-logo-image',
                    src: this.attrs.image || DEFAULT_IMAGE,
                    alt: 'Logo'
                }
            },
            links: this.attrs.links,
            cta: {
                className: 'devcarib-devbar-cta',
                links: [{
                        className: 'ww-button -primary',
                        href: '/login',
                        text: 'Log in'
                    }]
            }
        };
    }
}
exports.DevBar = DevBar;
//# sourceMappingURL=index.js.map