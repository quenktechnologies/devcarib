import { show } from '@quenk/tendril/lib/app/api/action/response';
import { ActionM } from '@quenk/tendril/lib/app/api/action';
import { Request } from '@quenk/tendril/lib/app/api/request';

/**
 * showForm displays the employer regisration form.
 */
export const showForm = (_: Request): ActionM<undefined> =>
    show('employer/registration/form.html', {});
