import { Converse } from './app';

window.system = Converse.create(
    <HTMLElement>document.getElementById('main'),
    <HTMLElement>document.getElementById('dialogs')
);

window.system.run();
