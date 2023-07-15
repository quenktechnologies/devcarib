import react from 'react';
import reactDOM from 'react-dom/client';

import CssBaseline from '@mui/material/CssBaseline';

import { Store } from 'redux';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { Except } from '@quenk/noni/lib/control/except';
import { left, right } from '@quenk/noni/lib/data/either';

import { createAgent } from '@quenk/jhr/lib/browser';

import { Job } from '@board/types/lib/job';

import { PosterFormView } from './stages/poster';
import { DetailsFormView } from './stages/details';
import { DescriptionFormView } from './stages/description';
import { PreviewFormView } from './stages/preview';
import { PostJobWizardPage } from './page';
import { JobHttpModel } from './models/job';

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
     * onPost sends job data to the backend for review.
     */
    onPost = async (data: Job): Promise<Except<void>> => {
        let model = new JobHttpModel(createAgent() as any); //XXX: jhr type error

        try {
            await model.create(data);
            return right(void 0);
        } catch (e) {
            return left(e) as Except<void>;
        }
    };

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
                    <PostJobWizardPage stages={stages} onPost={this.onPost} />
                </Provider>
            </react.StrictMode>
        );
    }
}

PostJobWizard.main(document.querySelector('main') as HTMLElement);
