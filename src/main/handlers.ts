import { ok } from '@quenk/tendril/lib/app/api/action/response';
import { ActionM } from '@quenk/tendril/lib/app/api/action';
import { Request  } from '@quenk/tendril/lib/app/api/request';

/**
 * index sends a 200 status with example body text.
 */
export const index = (_: Request): ActionM<undefined> => ok('It works!');
