import { Request } from '@quenk/frontend-routers/lib/hash';

import { Resume } from '@quenk/jouvert/lib/app/service/director';
import { MainScene } from '@quenk/jouvert/lib/app/scene/main';

import { Converse } from '../../';

/**
 * ConverseScene is the base class for all mia AppScenes.
 *
 * This definition exists to specify the app property.
 */
export abstract class ConverseScene<M>
    extends MainScene<Request, M> {

    constructor(public app: Converse, public resume: Resume<Request>) {

        super(app, resume);

    }

}
