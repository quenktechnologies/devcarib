import {App as App} from '@quenk/tendril/lib/app';
import {template} from './';

let app = new App(template);
app.start().fork(e => { throw e; }, ()=>{});