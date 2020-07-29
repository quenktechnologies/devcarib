
import { postAPI } from './handlers';
import {Template} from '@quenk/tendril/lib/app/module/template';
import {Module} from '@quenk/tendril/lib/app/module';
import {App as App} from '@quenk/tendril/lib/app';



export const template = (_app:App) : Template<App> =>(
 {'create': 
//@ts-ignore: 6133 
(_app:App) => new Module(_app),
'id': `admin`,
'app': {'routes': (_m:Module) => {

return [{ method: 'get',path: '/r/posts',filters: [postAPI.search  ]}
,{ method: 'patch',path: '/r/posts',filters: [postAPI.update  ]}
,{ method: 'get',path: '/r/posts/:id',filters: [postAPI.get  ]}
,{ method: 'delete',path: '/r/posts/:id',filters: [postAPI.remove  ]}
]
}}})