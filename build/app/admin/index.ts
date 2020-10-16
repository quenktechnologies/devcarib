import * as r from './r'; 
import { adminCtl } from './handlers';
import {Template} from '@quenk/tendril/lib/app/module/template';
import {Module} from '@quenk/tendril/lib/app/module';
import {App as App} from '@quenk/tendril/lib/app';



export const template = (_app:App) : Template<App> =>(
 {'id': `admin`,
'app': {'dirs': {'self': `/Users/genora/board/build/app/admin`},
'modules': {'r': r.template},
'routes': (_m:Module) => {

return [{ method: 'get',path: '/',filters: [adminCtl.showIndex  ]}
,{ method: 'get',path: '/login',filters: [adminCtl.showLoginForm  ]}
,{ method: 'post',path: '/login',filters: [adminCtl.authenticate  ]}
,{ method: 'post',path: '/logout',filters: [adminCtl.logout  ]}
]
}},
'create': 
//@ts-ignore: 6133 
(_app:App) => new Module(_app)})