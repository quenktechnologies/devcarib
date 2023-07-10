import react from 'react';
import reactDOM from 'react-dom/client';

import CssBaseline from '@mui/material/CssBaseline';

import { Store } from 'redux';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { PosterFormView } from './stages/poster';
import { DetailsFormView } from './stages/details';
import { DescriptionFormView } from './stages/description';
import { PreviewFormView } from './stages/preview';
import { PostJobWizardPage } from './page';

const stages = [
    new PosterFormView(),
    new DetailsFormView(),
    new DescriptionFormView(),
    new PreviewFormView()
];

 const reducer = {
    poster: PosterFormView.reducer,
    details: DetailsFormView.reducer,
    description: DescriptionFormView.reducer,
    preview: PreviewFormView.reducer
};

/**
 * PostJobWizard serves as a wizard for creating a new job posting
 * to the board backend.
 *
 * Data entry takes place in stages using implementors of the FormView class.
 * 
 * Currently the stages are:
 * 1. Poster and company details stage.
 * 2. Job title and details stage.
 * 3. Job description stage.
 * 4. Preview stage.
 * 5. Result page.
 */
export class PostJobWizard {
    /**
     * @param root - The DOM node that the app will be rendered to.
     */
    constructor(public root: reactDOM.Root, public store: Store) {}

    /**
     * main initializes and runs the application.
     *
     * @param root - The app root node.
     */
    static main(root: HTMLElement) {
        let app = new PostJobWizard(
            reactDOM.createRoot(root),
            configureStore({
                reducer
            })
        );

        app.run();
    }

    /**
     * run the app.
     *
     * This method should only be called once per application lifecycle.
     */
    run() {
        this.root.render(
            <react.StrictMode>
                <CssBaseline />
                <Provider store={this.store}>
                    <PostJobWizardPage stages={stages} />
                </Provider>
            </react.StrictMode>
        );
    }
}

PostJobWizard.main(document.querySelector('main') as HTMLElement);
