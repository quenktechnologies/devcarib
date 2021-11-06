import { DScene } from '@quenk/dfront/lib/app/scene';

import { Request } from '@quenk/frontend-routers/lib/hash';

import { Resume } from '@quenk/jouvert/lib/app/director';

import { Mia } from '../../';

/**
 * MiaScene
 */
export abstract class MiaScene<M> extends DScene<M> {

    constructor(public app: Mia, public resume: Resume<Request>) {
        super(resume, app);
    }

}
