
import { adminCtl,postsCtl } from './handlers';
import {Template} from '@quenk/tendril/lib/app/module/template';
import {Module} from '@quenk/tendril/lib/app/module';
import {App as App} from '@quenk/tendril/lib/app';



export const template = (_app:App) : Template<App> =>(
 {'id': `admin`,
'app': {'dirs': {'self': `/home/master/Code/development/products/board/build/app/admin`},
'routes': (_m:Module) => {

return [{ method: 'get',path: '/',filters: [adminCtl.showIndex  ]}
,{ method: 'get',path: '/r/posts',filters: [postsCtl.runSearch  ]}
,{ method: 'patch',path: '/r/posts/:id',filters: [postsCtl.runUpdate  ]}
,{ method: 'get',path: '/r/posts/:id',filters: [postsCtl.get  ]}
,{ method: 'delete',path: '/r/posts/:id',filters: [postsCtl.remove  ]}
]
}},
'create': 
//@ts-ignore: 6133 
(_app:App) => new Module(_app)})