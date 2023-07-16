import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import { useState } from 'react';

import { useSelector } from 'react-redux';

import { merge, Record } from '@quenk/noni/lib/data/record';
import { apply } from '@quenk/noni/lib/data/function';
import { Except } from '@quenk/noni/lib/control/except';

import { Job } from '@board/types/lib/job';

import { FormView, FormViewState } from './stages';

const MSG_PREVIEW = `Please review the details below before continuing.`;

const MSG_SYS_ERROR = `We could not submit your job for some reason! This is a problem on our end.
 Please try again later while we attempt to resolve the issue!`;

const MSG_CLIENT_ERROR = `We encountered an error while submitting your job. Please go back and ensure
  you entered each field correctly.`;

const MSG_INFO = `
Yeah! Your post has been successfully submitted and is awaiting approval.
`;

const takeOk = (name: string, state: Record<FormViewState>) => state[name].ok;

const takeValues = (name: string, state: Record<FormViewState>) =>
    state[name].values;

interface PostJobWizardPageProps {
    stages: FormView[];

    onPost: (data: Job) => Promise<Except<void>>;
}

const Message = ({ code }: { code: number }) => {
    if (!code) return <PreviewMessage />;

    if (code === 201) return <SuccessMessage />;

    return (
        <ErrorMessage
            message={code === 409 ? MSG_CLIENT_ERROR : MSG_SYS_ERROR}
        />
    );
};

const PreviewMessage = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Alert severity="info">
                    <AlertTitle>Preview</AlertTitle>
                    {MSG_PREVIEW}
                </Alert>
            </Grid>
        </Grid>
    );
};

const ErrorMessage = ({ message }: { message: string }) => (
    <Grid container spacing={2}>
        <Grid item xs={12}>
            <Alert severity="error">
                <AlertTitle>Something is not right!</AlertTitle>
                {message}
            </Alert>
        </Grid>
    </Grid>
);

const SuccessMessage = () => (
    <Grid container spacing={2}>
        <Grid item xs={12}>
            <Alert severity="success">
                <AlertTitle>Success!</AlertTitle>
                {MSG_INFO}
            </Alert>
        </Grid>
    </Grid>
);

const reset = () => window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

/**
 * PostJobWizardPage is the root element for the form used to submit a new job
 * to the board back-end.
 */
export const PostJobWizardPage = ({
    stages,
    onPost
}: PostJobWizardPageProps) => {
    let [resultCode, setResultCode] = useState(0);
    let [ptr, setPtr] = useState(0);
    let [isSaving, setIsSaving] = useState(false);

    let validStages = stages.reduce((prev, { name }) => {
        prev[name] = useSelector(apply(takeOk, name));
        return prev;
    }, {} as Record<boolean>);

    let values = stages.map(({ name }) => useSelector(apply(takeValues, name)));
    let current = stages[ptr];
    let isFinal = ptr === stages.length - 1;
    let isSuccess = resultCode === 201;
    let canBack = ptr > 0 && !isSuccess;
    let canNext =
        validStages[current.name] && !isFinal && !isSaving && !isSuccess;
    let canPost = isFinal && !isSuccess;
    let onSeek = (n: number) => () => {
        setPtr(ptr + n);
        reset();
    };

    let onSave = async () => {
        setIsSaving(true);

        // XXX: Prevent the backdrop flashing.
        await new Promise(resolve => setTimeout(resolve, 500));

        let payload = values.reduce((prev, curr) => merge(prev, curr), {});
        let result = await onPost(payload);
        reset();
        setIsSaving(false);
        setResultCode(
            result.isRight() ? 201 : (result.takeLeft() as any).code || -1
        );
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
                        {isFinal && <Message code={resultCode} />}
                        <current.View />
                    </Grid>
                    <Grid container xs={12} sx={{ mt: 3 }}>
                        {canBack && (
                            <Button color="inherit" onClick={onSeek(-1)}>
                                Back
                            </Button>
                        )}
                        {canNext && (
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ ml: 'auto' }}
                                onClick={onSeek(1)}
                            >
                                Next
                            </Button>
                        )}
                        {canPost &&(
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={isSaving}
                                sx={{ ml: 'auto' }}
                                onClick={onSave}
                            >
                                {isSaving ? 'Saving' : 'Post'}
                            </Button>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};
