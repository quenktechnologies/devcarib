import { Value } from '@quenk/noni/lib/data/jsonx';
import { Record } from '@quenk/noni/lib/data/record';

import { Event } from '@quenk/wml-widgets/lib/control';

import { Job } from '@board/types/lib/job';

import { supportedPaymentFrequencies } from '@devcarib/common/lib/data/payment';

import {
    REMOTE_FORM_MODE_UPDATE
} from '@devcarib/frontend/lib/app/scene/form/remote';

import {
    DevCaribDialogRemoteForm
} from '@devcarib/frontend/lib/app/scene/form/remote/dialog';

import { RemoteModels } from '../../../remote/models';
import { EditJobDialogView } from './views/edit';

/**
 * EditJobDialog provides an editor for a job in a dialog.
 */
export class EditJobDialog extends DevCaribDialogRemoteForm<Job, void> {

    name = 'Job Edit Dialog';

    view = new EditJobDialogView(this);

    model = RemoteModels.create('job',
        this.app.services['remote.background'], this);

    mode = REMOTE_FORM_MODE_UPDATE;

    values = {

        data: this.value,

        errors: <Record<string>>{},

        type: {

            options: [

                { label: 'Full-Time', value: 'Full-Time' },
                { label: 'Part-Time', value: 'Part-Time' },
                { label: 'Contractor', value: 'Contractor' },
                { label: 'Co-Founder', value: 'Co-Founder' },
                { label: 'Contributor', value: 'Contributor' },
                { label: 'Volunteer', value: 'Volunteer' },

            ]

        },

        payment_frequency: {

            options: supportedPaymentFrequencies.map(value =>
                ({ label: value, value }))

        },

        onSelect: (e: Event<Value>) => {

            this.tell(this.self(), e);

        },

        onChange: (e: Event<Value>) => {

            this.tell(this.self(), e);

        },

        close: () => {

            this.close();

            this.abort();

        },

        save: () => {

            this.save();

        }

    };

}
