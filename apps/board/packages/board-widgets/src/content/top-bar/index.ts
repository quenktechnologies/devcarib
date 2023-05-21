import { Path } from '@quenk/noni/lib/io/file';

import { Component } from '@quenk/wml';

import { MenuItemInfo } from '@quenk/wml-widgets/lib/menu/nav';
import { LinkAttrs } from '@quenk/wml-widgets/lib/content/link';
import { HTMLElementAttrs } from '@quenk/wml-widgets';

import { TopBarView } from './views';

const DEFAULT_IMAGE = '/assets/img/logo.svg';
const DEFAULT_TARGET = '/';

/**
 * TopBar attrs.
 */
export interface TopBarAttrs extends HTMLElementAttrs {

    /**
     * target for the logo link.
     */
    target?: Path,

    /**
     * image to display in the left most part of the TopBar.
     */
    image?: Path,

    /**
     * links to generate in the link area of the navbar.
     */
    links?: MenuItemInfo[],

    /**
     * cta if specified will render a "call to action" style link to the
     * rightmost part of the navbar.
     */
    cta?: LinkAttrs

}

/**
 * TopBar generates an ActionBar for the purpose of app/site navigation.
 *
 * The API provides support for the following layout:
 *
 * [[logo] [link1, link2, link2]  [action]]
 *
 * Each section is optional.
 */
export class TopBar extends Component<TopBarAttrs> {

    view = new TopBarView(this);

    values = {

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

    }

}
