import {BoardAdmin} from './app';

// Create and run the app. Note that it will crash if the DOM nodes below are
// missing.
BoardAdmin.create(
    <Node>document.getElementById('main'),
    <Node>document.getElementById('dialogs')
).run();
