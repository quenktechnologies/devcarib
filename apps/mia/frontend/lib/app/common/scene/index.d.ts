import { DScene } from '@quenk/dfront/lib/app/scene';
import { Request } from '@quenk/frontend-routers/lib/hash';
import { Resume } from '@quenk/jouvert/lib/app/director';
import { Mia } from '../../';
/**
 * MiaScene
 */
export declare abstract class MiaScene<M> extends DScene<M> {
    app: Mia;
    resume: Resume<Request>;
    constructor(app: Mia, resume: Resume<Request>);
}
