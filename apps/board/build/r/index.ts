import * as dotdotDotdotDotdotConverseBuild from '../../../converse/build'; 
import * as devcaribServerLibFiltersCheck from '@devcarib/server/lib/filters/check'; 
import * as boardChecks from '@board/checks'; 
import * as devcaribCommonLibError from '@devcarib/common/lib/error'; 
import * as devcaribServerLibFiltersBody from '@devcarib/server/lib/filters/body'; 
import * as devcaribServerLibFiltersAudit from '@devcarib/server/lib/filters/audit'; 
import * as devcaribServerLibFiltersQuery from '@devcarib/server/lib/filters/query'; 
import * as boardFilterPolicies from '@board/filter-policies'; 
import * as boardFields from '@board/fields'; 
//@ts-ignore: 6133
import {System} from '@quenk/potoo/lib/actor/system';
//@ts-ignore: 6133
import * as _json from '@quenk/noni/lib/data/jsonx';
//@ts-ignore: 6133
import {Template} from '@quenk/tendril/lib/app/module/template';
//@ts-ignore: 6133
import {Module} from '@quenk/tendril/lib/app/module';
//@ts-ignore: 6133
import {Request} from '@quenk/tendril/lib/app/api/request;'
//@ts-ignore: 6133
import {RouteConf as $RouteConf} from '@quenk/tendril/lib/app/module';
import {App as App} from '@quenk/tendril/lib/app';




// @ts-ignore: 2300
import { Request } from '@quenk/tendril/lib/app/api/request';

import { ApiController } from '@devcarib/server/lib/controllers/api';

import { JobModel } from '@board/models/lib/job';

export const jobsCtrl = new ApiController(JobModel.getInstance);

//@ts-ignore: 6133
export const template = ($app: App): Template => (
 {'id': `r`,
'app': {'dirs': {'self': `/apps/board/build/r`},
'filters': [dotdotDotdotDotdotConverseBuild.ensureAuthXHR,devcaribServerLibFiltersCheck.checkBody(boardChecks.checksAvailable,boardChecks.partialChecksAvailable,devcaribCommonLibError.templates),devcaribServerLibFiltersBody.fromParams,devcaribServerLibFiltersAudit.ensureOwner,devcaribServerLibFiltersQuery.compile({'policies': boardFilterPolicies.policiesEnabled,
'fields': boardFields.fields}),devcaribServerLibFiltersAudit.auditWrite(`user`)],
'routes': //@ts-ignore: 6133
($module:Module) => {

let $routes:$RouteConf[] = [];

$routes.push({
method:'get',
path:'/jobs',
filters:[jobsCtrl.search.bind(jobsCtrl)],tags:{search: `job` }});
return $routes;
}},
'create': 
//@ts-ignore: 6133 
(s:System) => new Module(<App>s)})
