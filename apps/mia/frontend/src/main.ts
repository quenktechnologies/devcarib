import { Mia } from './app';

// Create and run the app. Note that it will crash if the DOM nodes below are
// missing.
Mia.create(
    <HTMLElement>document.getElementById('main'),
    <HTMLElement>document.getElementById('dialogs')
).run();
