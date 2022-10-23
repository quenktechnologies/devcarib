"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddEventDialog = void 0;
const record_1 = require("@quenk/noni/lib/data/record");
const dialog_1 = require("@devcarib/frontend/lib/app/scene/form/remote/dialog");
const datetime_1 = require("@devcarib/common/lib/data/datetime");
const models_1 = require("../../../remote/models");
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
const now = new Date();
const nowDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDay() + 1}`;
class AddEventDialog extends dialog_1.DevCaribDialogRemoteForm {
    constructor() {
        super(...arguments);
        this.name = 'Add Event';
        this.view = new views_1.AddEventDialogView(this);
        this.model = models_1.RemoteModels.create('event', this.app.services['remote.background'], this);
        this.value = (0, record_1.merge)({
            startDate: nowDate,
            startTime: '09:00',
            tzOffset: (0, datetime_1.getOffset)()
        }, this.value);
        this.values = {
            data: this.value,
            errors: {},
            time: {
                options: getTimes(),
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