import { Path } from '@quenk/noni/lib/io/file';

import { Component } from '@quenk/wml';

import { LinkMap } from '@quenk/wml-widgets/lib/menu/nav';
import { LinkAttrs } from '@quenk/wml-widgets/lib/content/link';
import { HTMLElementAttrs } from '@quenk/wml-widgets';

import { DevBarView } from './views';

const DEFAULT_IMAGE = '/assets/img/logo.svg';
const DEFAULT_TARGET = '/';

/**
 * DevBar attrs.
 */
export interface DevBarAttrs extends HTMLElementAttrs {

    /**
     * target for the logo link.
     */
    target?: Path,

    /**
     * image to display in the left most part of the devbar.
     */
    image?: Path,

    /**
     * links to generate in the link area of the navbar.
     */
    links?: LinkMap,

    /**
     * cta if specified will render a "call to action" style link to the
     * rightmost part of the navbar.
     */
    cta?: LinkAttrs

}

/**
 * DevBar generates an ActionBar for the purpose of app/site navigation.
 *
 * The API provides support for the following layout:
 *
 * [[logo] [link1, link2, link2]  [action]]
 *
 * Each section is optional.
 */
export class DevBar extends Component<DevBarAttrs> {

    view = new DevBarView(this);

    values = {

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

    }

}
