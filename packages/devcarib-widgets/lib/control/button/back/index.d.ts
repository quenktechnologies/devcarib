import { Attrs, Component } from '@quenk/wml';
import { BackButtonView } from './views';
/**
 * BackButtonAttrs
 */
export interface BackButtonAttrs extends Attrs {
    /**
     * onClick handler.
     */
    onClick: () => void;
}
/**
 * BackButton provides a button that can be clicked to go back.
 */
export declare class BackButton extends Component<BackButtonAttrs> {
    view: BackButtonView;
    values: {
        onClick: () => void;
    };
}
