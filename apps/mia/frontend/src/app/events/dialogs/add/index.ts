import * as moment from 'moment';

import { Value } from '@quenk/noni/lib/data/jsonx';
import { merge, Record } from '@quenk/noni/lib/data/record';

import { Event as ControlEvent } from '@quenk/wml-widgets/lib/control';
import { Option } from '@quenk/wml-widgets/lib/control/drop-list';

import { Event } from '@mia/types/lib/event';

import {
    DevCaribDialogRemoteForm
} from '@devcarib/frontend/lib/app/scene/form/remote/dialog';

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

const now = () => moment.utc().startOf('day').add(9, 'hours').add(15, 'minutes');

export class AddEventDialog extends DevCaribDialogRemoteForm<Event, void> {

    name = 'Add Event';

    view = new AddEventDialogView(this);

    model = RemoteModels.create('event',
        this.app.services['remote.background'], this);

    value: Event = merge({ start: now().toISOString() }, this.value);

    values = {

        data: this.value,

        errors: <Record<string>>{},

        start: {

            date: () => moment.utc(this.values.data.start).format('YYYY-MM-DD'),

            time: () => moment.utc(this.values.data.start).format('hh:mm'),

            timeOptions: getTimes(),

            onChange: ({ name, value }: ControlEvent<Value>) => {

                if (name === 'endDate') {

                    let start = moment.utc(this.values.data.start);
                    let newStart = moment.utc(<string>value);

                    newStart.hour(start.hour());
                    newStart.minute(start.minute());
                    newStart.seconds(start.seconds());

                    this.set('start', newStart.toISOString());

                } else if (name === 'startTime') {

                    let start = moment.utc(this.values.data.start);
                    let newStart = moment.utc(<string>value);

                    newStart.year(start.year());
                    newStart.month(start.month());
                    newStart.date(start.date());

                    this.set('start', newStart.toISOString());

                }

            }

        },

        end: {

            date: () => moment.utc(this.values.data.end).format('YYYY-MM-DD'),

            time: () => moment.utc(this.values.data.end).format('hh:mm'),

            timeOptions: getTimes(),

            onChange: ({ name, value }: ControlEvent<Value>) => {

                if (name === 'endDate') {

                    let end = moment.utc(this.values.data.end);
                    let newStart = moment.utc(<string>value);

                    newStart.hour(end.hour());
                    newStart.minute(end.minute());
                    newStart.seconds(end.seconds());

                    this.set('end', newStart.toISOString());


                } else if (name === 'endTime') {

                    let end = moment.utc(this.values.data.end);
                    let newStart = moment.utc(<string>value);

                    newStart.year(end.year());
                    newStart.month(end.month());
                    newStart.date(end.date());

                    this.set('end', newStart.toISOString());

                }

            }

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
