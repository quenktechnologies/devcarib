import { Value } from '@quenk/noni/lib/data/jsonx';
import { merge, Record } from '@quenk/noni/lib/data/record';

import { Event as ControlEvent } from '@quenk/wml-widgets/lib/control';
import { Option } from '@quenk/wml-widgets/lib/control/drop-list';
import { Event } from '@mia/types/lib/event';

import {
    DevCaribDialogRemoteForm
} from '@devcarib/frontend/lib/app/scene/form/remote/dialog';
import { getOffset } from '@devcarib/common/lib/data/datetime';

import { RemoteModels } from '../../../remote/models';
import { AddEventDialogView } from './views';

const getTimes = () => {

    let mins = ['00', '15', '30', '45'];

    let hrs = [
        '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11',
        '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'
    ];

    return hrs.reduce((res, hr) => res.concat(mins.map(min => {
        let label = `${hr}:${min}`;
        let value = label;
        return { label, value };
    })), <Option<string>[]>[]);

}

const now = new Date();

const nowDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDay() + 1}`;

export class AddEventDialog extends DevCaribDialogRemoteForm<Event, void> {

    name = 'Add Event';

    view = new AddEventDialogView(this);

    model = RemoteModels.create('event',
        this.app.services['remote.background'], this);

    value: Event = merge({

        startDate: nowDate,

        startTime: '09:00',

        tzOffset: getOffset()

    }, this.value);

    values = {

        data: this.value,

        errors: <Record<string>>{},

        time: {

            options: getTimes(),

        },

        onSelect: (e: ControlEvent<Value>) => {

            this.tell(this.self(), e);

        },

        onChange: (e: ControlEvent<Value>) => {

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
