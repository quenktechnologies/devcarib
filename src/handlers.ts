import { Action } from '@quenk/tendril/lib/app/api';
import { Request } from '@quenk/tendril/lib/app/api/request';
import { redirect } from '@quenk/tendril/lib/app/api/response';

export const showBoard = (_: Request): Action<void> => redirect('/board', 301);
