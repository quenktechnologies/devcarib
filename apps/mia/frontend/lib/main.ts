import { Mia } from './app';

// Create and run the app. Note that it will crash if the DOM nodes below are
// missing.
window.system = Mia.create(
    <HTMLElement>document.getElementById('app'),
    <HTMLElement>document.getElementById('dialogs')
);

window.system.run();
