import { Path } from '@quenk/noni/lib/io/file';
import { Component } from '@quenk/wml';
import { LinkMap } from '@quenk/wml-widgets/lib/menu/nav';
import { LinkAttrs } from '@quenk/wml-widgets/lib/content/link';
import { HTMLElementAttrs } from '@quenk/wml-widgets';
import { TopBarView } from './views';
/**
 * TopBar attrs.
 */
export interface TopBarAttrs extends HTMLElementAttrs {
    /**
     * target for the logo link.
     */
    target?: Path;
    /**
     * image to display in the left most part of the TopBar.
     */
    image?: Path;
    /**
     * links to generate in the link area of the navbar.
     */
    links?: LinkMap;
    /**
     * cta if specified will render a "call to action" style link to the
     * rightmost part of the navbar.
     */
    cta?: LinkAttrs;
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
export declare class TopBar extends Component<TopBarAttrs> {
    view: TopBarView;
    values: {
        className: string;
        logo: {
            target: string;
            className: string;
            image: {
                className: string;
                src: string;
                alt: string;
            };
        };
        links: LinkMap | undefined;
        cta: {
            className: string;
            links: {
                className: string;
                href: string;
                text: string;
            }[];
        };
    };
}
