import * as remoteModel from '@quenk/jouvert/lib/app/remote/model';


import { Event } from '@mia/types/lib/event';



/**
 * EventRemoteModel
 *
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
export class EventRemoteModel
    extends
    remoteModel.RemoteModel<Event> {

    static paths = { "search": "/r/events", "get": "/r/events/{id}" }

    paths = EventRemoteModel.paths;

}

