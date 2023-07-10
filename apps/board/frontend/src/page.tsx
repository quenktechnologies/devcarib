import { useState } from 'react';

import { useSelector } from 'react-redux';

import {  Record } from '@quenk/noni/lib/data/record';
import { apply } from '@quenk/noni/lib/data/function';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';

import { FormView, FormViewState } from './stages';

const takeOk = (name: string, state: Record<FormViewState>) => state[name].ok;

const takeValues = (name: string, state: Record<FormViewState>) =>
    state[name].values;

/**
 * PostJobWizardPage is the root element for the form used to submit a new job
 * to the board back-end.
 */
export const PostJobWizardPage = ({stages}: {stages: FormView[]}) => {
    let [ptr, setPtr] = useState(0);

    let validStages = stages.reduce((prev, { name }) => {
        prev[name] = useSelector(apply(takeOk, name));
        return prev;
    }, {} as Record<boolean>);
    let isFinal = ptr === stages.length - 1;
    let values = stages.map(({name}) => useSelector(apply(takeValues, name)));
    let current = stages[ptr];
    let canBack = ptr > 0;
    let canNext = validStages[current.name] && !isFinal;
    let onBack = () => setPtr(ptr - 1);
    let onNext = () => setPtr(ptr + 1);
    let onPost = () => {
        console.error('submit ----> ', values);
    };

    return (
        <Container maxWidth="lg" sx={{ mb: '2em' }}>
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
                            activeStep={ptr}
                            sx={{ mb: 3 }}
                        >
                            {stages.map(current => (
                                <Step key={current.title}>
                                    <StepLabel>{current.title}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Grid>
                    <Grid xs={12}>
                        <current.View />
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
                        {isFinal && (
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ ml: 'auto' }}
                                onClick={onPost}
                            >
                                Post
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};
