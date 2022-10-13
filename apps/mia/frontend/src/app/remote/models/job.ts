import * as remoteModel from '@quenk/jouvert/lib/app/remote/model';


import { Job } from '@mia/types/lib/job';



/**
 * JobRemoteModel
 *
 * AUTO-GENERATED, DO NOT EDIT DIRECTLY, CHANGES WILL BE LOST!
 */
export class JobRemoteModel
    extends
    remoteModel.RemoteModel<Job> {

    static paths = { "search": "/mia/r/jobs", "get": "/mia/r/jobs/{id}" }

    paths = JobRemoteModel.paths;

}

