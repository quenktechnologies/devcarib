import { Request } from '@quenk/frontend-routers/lib/hash';
import { Resume } from '@quenk/jouvert/lib/app/service/director';
import { MainScene } from '@quenk/jouvert/lib/app/scene/main';
import { Mia } from '../../';
/**
 * MiaScene is the base class for all mia AppScenes.
 *
 * This definition exists to specify the app property.
 */
export declare abstract class MiaScene<M> extends MainScene<Request, M> {
    app: Mia;
    resume: Resume<Request>;
    constructor(app: Mia, resume: Resume<Request>);
}
