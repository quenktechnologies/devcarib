import { Value } from '@quenk/noni/lib/data/jsonx';
import { Record } from '@quenk/noni/lib/data/record';
import { Event as ControlEvent } from '@quenk/wml-widgets/lib/control';
import { Option } from '@quenk/wml-widgets/lib/control/drop-list';
import { Event } from '@mia/types/lib/event';
import { MiaFormDialog } from '../../../common/scene/dialog/form';
import { AddEventDialogView } from './views';
export declare class AddEventDialog extends MiaFormDialog<Event, void> {
    name: string;
    view: AddEventDialogView;
    model: import("@quenk/jouvert/lib/app/remote/model").RemoteModel<Event>;
    value: Event;
    values: {
        data: Event;
        errors: Record<string>;
        start: {
            date: () => string;
            time: () => string;
            timeOptions: Option<string>[];
            onChange: ({ name, value }: ControlEvent<Value>) => void;
        };
        end: {
            date: () => string;
            time: () => string;
            timeOptions: Option<string>[];
            onChange: ({ name, value }: ControlEvent<Value>) => void;
        };
        onSelect: (e: ControlEvent<Value>) => void;
        onChange: (e: ControlEvent<Value>) => void;
        close: () => void;
        save: () => void;
    };
}
