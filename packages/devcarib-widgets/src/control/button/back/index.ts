import {Attrs, Component} from '@quenk/wml';

import {BackButtonView} from './views';

/**
 * BackButtonAttrs
 */
export interface BackButtonAttrs extends Attrs{

    /**
     * onClick handler.
     */
    onClick:()=> void

}

/**
 * BackButton provides a button that can be clicked to go back.
 */
export class BackButton extends Component<BackButtonAttrs> {

    view = new BackButtonView(this);

    values = {

        onClick: ()=> this.attrs.onClick && this.attrs.onClick()

    }

}
