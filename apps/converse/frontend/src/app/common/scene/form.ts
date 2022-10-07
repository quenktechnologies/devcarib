import { Object } from '@quenk/noni/lib/data/jsonx';

import { DevCaribRemoteForm } from '@devcarib/frontend/lib/app/scene/form/remote';

import { RemoteModels } from '../../remote/models';

/**
 * ConverseRemoteForm
 */
export abstract class ConverseRemoteForm<T extends Object, M>
    extends
    DevCaribRemoteForm<T, M> {

    models = RemoteModels.getInstance(this.app.services['remote.background'], this);

}
