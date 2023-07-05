import react from 'react';
import reactDOM from 'react-dom/client';

import CssBaseline from '@mui/material/CssBaseline';

import { Store } from 'redux';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { PostJobWizardPage, reducer } from './page';

/**
 * PostJobWizard renders a step by step wizard for creating a new job posting
 * to the board backend.
 *
 * We collect the information in 5 stages:
 * 1. The company and contact details.
 * 2. The job title and details.
 * 3. The job description.
 * 4. The preview.
 * 5. Conformation of the saved data.
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
                    <PostJobWizardPage />
                </Provider>
            </react.StrictMode>
        );
    }
}

PostJobWizard.main(document.querySelector('main') as HTMLElement);
