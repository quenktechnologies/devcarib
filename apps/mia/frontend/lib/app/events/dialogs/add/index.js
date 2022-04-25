"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddEventDialog = void 0;
const moment = require("moment");
const api = require("../../../api");
const record_1 = require("@quenk/noni/lib/data/record");
const form_1 = require("../../../common/scene/dialog/form");
const views_1 = require("./views");
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
    })), []);
};
const now = () => moment.utc().startOf('day').add(9, 'hours').add(15, 'minutes');
class AddEventDialog extends form_1.MiaFormDialog {
    constructor() {
        super(...arguments);
        this.name = 'Add Event';
        this.view = new views_1.AddEventDialogView(this);
        this.model = this.getModel(api.events);
        this.value = (0, record_1.merge)({ start: now().toISOString() }, this.value);
        this.values = {
            data: this.value,
            errors: {},
            start: {
                date: () => moment.utc(this.values.data.start).format('YYYY-MM-DD'),
                time: () => moment.utc(this.values.data.start).format('hh:mm'),
                timeOptions: getTimes(),
                onChange: ({ name, value }) => {
                    if (name === 'endDate') {
                        let start = moment.utc(this.values.data.start);
                        let newStart = moment.utc(value);
                        newStart.hour(start.hour());
                        newStart.minute(start.minute());
                        newStart.seconds(start.seconds());
                        this.set('start', newStart.toISOString());
                    }
                    else if (name === 'startTime') {
                        let start = moment.utc(this.values.data.start);
                        let newStart = moment.utc(value);
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
                onChange: ({ name, value }) => {
                    if (name === 'endDate') {
                        let end = moment.utc(this.values.data.end);
                        let newStart = moment.utc(value);
                        newStart.hour(end.hour());
                        newStart.minute(end.minute());
                        newStart.seconds(end.seconds());
                        this.set('end', newStart.toISOString());
                    }
                    else if (name === 'endTime') {
                        let end = moment.utc(this.values.data.end);
                        let newStart = moment.utc(value);
                        newStart.year(end.year());
                        newStart.month(end.month());
                        newStart.date(end.date());
                        this.set('end', newStart.toISOString());
                    }
                }
            },
            onSelect: (e) => {
                this.tell(this.self(), e);
            },
            onChange: (e) => {
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
}
exports.AddEventDialog = AddEventDialog;
//# sourceMappingURL=index.js.map