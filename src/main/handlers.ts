import { show, ok } from '@quenk/tendril/lib/app/api/action/response';
import { ActionM } from '@quenk/tendril/lib/app/api/action';
import { Request } from '@quenk/tendril/lib/app/api/request';

/**
 * showForm displays the employer regisration form.
 */
export const showForm = (_: Request): ActionM<undefined> =>
    show('employer/registration/form.html', {});

/** 
 *   createEmployer creates the employer after registration.
*/
export const createEmployer = (r: Request): ActionM<undefined> => {

    console.log(r.body);

    return ok('submitted');

}
