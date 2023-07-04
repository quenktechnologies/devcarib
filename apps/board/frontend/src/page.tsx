import react from 'react';

import { createSlice } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';

import { Object } from '@quenk/noni/lib/data/jsonx';
import { Record } from '@quenk/noni/lib/data/record';

import { restrict } from '@quenk/preconditions/lib/record';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';

import { validators } from './validators';
import { templates } from './templates';

/**
 * FormStageTitle is a string indicating the title for a FormStage.
 */
export type FormStageTitle = string;

/**
 * Index pointer type.
 */
export type Index = number;

/**
 * ErrorMessage type.
 */
export type ErrorMessage = string;

/**
 * FormStage encapsulates a stage of the form.
 *
 * It is used indicate what to render for the stage in question.
 */
export interface FormStage {
    /**
     * title to display.
     */
    title: FormStageTitle;

    /**
     * messages if specified, are displayed above the view to guide the user
     * on completing the stage.
     */
    messages?: react.FC[];

    /**
     * View is the component to render for the step.
     */
    View: react.FC;
}

/**
 * PostJobWizardPageProps interface.
 */
export interface PostJobWizardPageProps {
    /**
     * stages is a list containing all the possible stages of the form
     * submission process.
     */
    stages: FormStage[];
}

/**
 * PageState is the value stored in the react-redux slice.
 *
 * It tracks the progress the user has made through the form.
 */
export interface PageState {
    /**
     * total stages in the page.
     */
    total: number;

    /**
     * current stage in the form.
     */
    current: Index;

    /**
     * values captured through the form.
     */
    values: Object;

    /**
     * errors encountered when validating the form values.
     */
    errors: Record<ErrorMessage>;

    /**
     * ok tracks the validity of each stage.
     */
    ok: boolean[];
}

const slice = createSlice({
    name: 'page',
    initialState: {
        current: 0,
        total: 0,
        values: {},
        errors: {},
        ok: []
    },
    reducers: {
        /**
         * next advances the page to the next stage.
         */
        next(state) {
            state.current = state.current + 1;
        },
        /**
         * back retreats the page to the previous stage.
         */
        back(state) {
            state.current = state.current - 1;
        },
        /**
         * setValue updates the value of a property collected by the form.
         */
        setValue(state: PageState, action) {
            let { name, value } = action.payload;
            state.values[name] = value;
            state.errors[name] = '';

            let validator = validators[state.current];
            let eresult = validator[name](value);
            if (eresult.isLeft()) {
                state.errors[name] = eresult
                    .takeLeft()
                    .explain(templates) as string;
                state.ok[state.current] = false;
            } else {
                state.values[name] = eresult.takeRight();
                let eallResult = restrict(validator)(state.values);
                state.ok[state.current] = eallResult.isLeft() ? false : true;
            }
        }
    }
});

export const { next, back, setValue } = slice.actions;
export const { reducer } = slice;

/**
 * PostJobWizardPage is the root element for the form used to submit a new job
 * to the board back-end.
 */
export const PostJobWizardPage: react.FC<PostJobWizardPageProps> = ({
    stages
}) => {
    let { current, ok } = useSelector(
        (state: { page: PageState }) => state.page
    );
    let stage = stages[current];
    let messages = stage.messages || [];
    let dispatch = useDispatch();
    let onBack = () => dispatch(back());
    let onNext = () => dispatch(next());
    let canBack = current > 0;
    let canNext = ok[current] && current + 1 < stages.length;

    return (
        <Container maxWidth="lg" sx={{mb:'2em'}}>
            <Grid
                container
                justifyContent="center"
                style={{ marginTop: '5em' }}
            >
                <Grid item xs={10} md={8}>
                    <Grid xs={12}>
                        <Typography
                            variant="h3"
                            component="h1"
                            align="center"
                            gutterBottom={true}
                        >
                            Post Job
                        </Typography>
                        <Stepper
                            orientation="horizontal"
                            activeStep={current}
                            sx={{ mb: 3 }}
                        >
                            {stages.map(stage => (
                                <Step key={stage.title}>
                                    <StepLabel>{stage.title}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Grid>
                    <Grid xs={12}>
                        {messages.map((Comp, idx) => (
                            <react.Fragment key={`m${idx}`}>
                                <Comp />
                            </react.Fragment>
                        ))}
                    </Grid>
                    <Grid xs={12}>
                        <stage.View />
                    </Grid>
                    <Grid container xs={12} sx={{ mt: 3 }}>
                        {canBack && (
                            <Button color="inherit" onClick={onBack}>
                                Back
                            </Button>
                        )}
                        {canNext && (
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ ml: 'auto' }}
                                onClick={onNext}
                            >
                                Next
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};
