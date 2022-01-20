import * as api from '../../../api';

import { Value } from '@quenk/noni/lib/data/jsonx';
import { doFuture, voidPure } from '@quenk/noni/lib/control/monad/future';
import { Record } from '@quenk/noni/lib/data/record';

import { SaveOk } from '@quenk/jouvert/lib/app/scene/form';
import { Close, Show } from '@quenk/jouvert/lib/app/service/display';

import { Event } from '@quenk/wml-widgets/lib/control';

import { Job } from '@board/types/lib/job';

import { supportedPaymentFrequencies } from '@board/common/lib/data/payment';

import { MiaFormScene } from '../../../common/scene/form';
import { JobEditDialogView } from './views/edit';

/**
 * JobEditDialog provides an editor for a job in a dialog.
 */
export class JobEditDialog extends MiaFormScene<Job, void> {

    name = 'Job Edit Dialog';

    view = new JobEditDialogView(this);

    jobModel = this.app.getModel(api.JOB);

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

    onSaveOk() {

        this.close();

    }

    close() {

        this.tell(this.app.services.dialogs, new Close(this.self()));

    }

    save() {

        let that = this;

        return doFuture(function*() {

            yield that.jobModel.update(
                <number>that.value.id,
                that.getModifiedValues()
            );

            that.tell(that.self(), new SaveOk());

            return voidPure;

        }).fork();

    }

    /**
     * show is overriden here to always send content to the dialog service as
     * this actor is intended for a modal.
     */
    show() {

        this.tell(this.app.services.dialogs,
            new Show(this.name, this.view, this.self()));

    }

}
