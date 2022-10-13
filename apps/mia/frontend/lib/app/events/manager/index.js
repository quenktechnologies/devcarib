"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsManager = exports.TIME_SEARCH_DEBOUNCE = void 0;
const future_1 = require("@quenk/noni/lib/control/monad/future");
const timer_1 = require("@quenk/noni/lib/control/timer");
const handlers_1 = require("@quenk/jouvert/lib/app/scene/remote/handlers");
const columns_1 = require("../columns");
const manager_1 = require("../../common/scene/manager");
const add_1 = require("../dialogs/add");
const edit_1 = require("../dialogs/edit");
const views_1 = require("./views");
exports.TIME_SEARCH_DEBOUNCE = 500;
/**
 * EventsManager provides the scene for managing events.
 */
class EventsManager extends manager_1.MiaManager {
    constructor() {
        super(...arguments);
        this.name = 'events';
        this.view = new views_1.EventsManagerView(this);
        this.values = {
            search: {
                onChange: (0, timer_1.debounce)((e) => {
                    let qry = e.value === '' ? {} : { q: `title:"${e.value}"` };
                    this.search(qry);
                }, exports.TIME_SEARCH_DEBOUNCE)
            },
            table: {
                id: 'table',
                title: 'Events',
                data: [],
                add: () => this.spawn(() => new add_1.AddEventDialog(this.app, this.self())),
                pagination: {
                    current: {
                        count: 0,
                        page: 1,
                        limit: 50
                    },
                    total: {
                        count: 0,
                        pages: 0
                    }
                },
                columns: [
                    new columns_1.TitleColumn(event => this.editEvent(event)),
                    new columns_1.HostColumn(),
                    new columns_1.StartColumn(),
                    new columns_1.EndColumn(),
                    new columns_1.ActionColumn([
                        {
                            text: "Edit",
                            divider: false,
                            onClick: (data) => this.editEvent(data)
                        },
                        {
                            text: "Remove",
                            divider: true,
                            onClick: (data) => this.wait(this.removeEvent(data.id))
                        }
                    ])
                ]
            },
        };
        this.model = this.models.create('event', [
            new handlers_1.AfterSearchSetData(data => { this.values.table.data = data; }),
            new handlers_1.AfterSearchSetPagination(this.values.table),
            new handlers_1.ShiftingOnComplete([
                new handlers_1.OnCompleteShowData(this),
                new handlers_1.AfterSearchUpdateWidget(this.view, this.values.table.id)
            ])
        ]);
    }
    /**
     * search for job postings that match the specified query criteria.
     *
     * The first time this method is called, results will populate and display
     * the view. Subsequent calls will only update the already displated table.
     */
    search(qry) {
        return this.model.search(qry);
    }
    editEvent(job) {
        this.spawn(() => {
            window.x = new edit_1.EditEventDialog(this.app, this.self(), job);
            return window.x;
        });
    }
    removeEvent(id) {
        let that = this;
        return (0, future_1.doFuture)(function* () {
            let r = yield that.model.remove(id);
            if (r.code == 200) {
                alert('Event removed!');
                that.reload();
            }
            else {
                alert('Could not complete request!');
            }
            return (0, future_1.pure)(undefined);
        });
    }
    run() {
        return this.search({});
    }
}
exports.EventsManager = EventsManager;
//# sourceMappingURL=index.js.map