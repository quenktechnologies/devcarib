
import { adminsCtrl,postsCtl } from './handlers';
import {Template} from '@quenk/tendril/lib/app/module/template';
import {Module} from '@quenk/tendril/lib/app/module';
import {App as App} from '@quenk/tendril/lib/app';



export const template = (_app:App) : Template<App> =>(
 {'id': `r`,
'app': {'dirs': {'self': `/build/app/admin/r`},
'routes': (_m:Module) => {

return [{ method: 'post',path: '/admins',filters: [adminsCtrl.create  ]}
,{ method: 'get',path: '/admins',filters: [adminsCtrl.search  ]}
,{ method: 'get',path: '/admins/:id',filters: [adminsCtrl.get  ]}
,{ method: 'patch',path: '/admins/:id',filters: [adminsCtrl.update  ]}
,{ method: 'delete',path: '/admins/:id',filters: [adminsCtrl.remove  ]}
,{ method: 'post',path: '/posts',filters: [postsCtl.create  ]}
,{ method: 'get',path: '/posts',filters: [postsCtl.search  ]}
,{ method: 'patch',path: '/posts/:id',filters: [postsCtl.update  ]}
,{ method: 'get',path: '/posts/:id',filters: [postsCtl.get  ]}
,{ method: 'delete',path: '/posts/:id',filters: [postsCtl.remove  ]}
]
}},
'create': 
//@ts-ignore: 6133 
(_app:App) => new Module(_app)})