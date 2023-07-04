import react from 'react';

import { Value } from '@quenk/noni/lib/data/jsonx';

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { SelectChangeEvent } from '@mui/material/Select';

import { useSelector, useDispatch } from 'react-redux';

import { Select } from '../components/select';
import { FormStage, PageState, setValue } from '../page';

const typeOptions = [
    { label: 'Full-Time', value: 'full-time' },
    { label: 'Part-Time', value: 'part-time' },
    { label: 'Contract', value: 'contract' },
    { label: 'Internship', value: 'internship' },
    { label: 'Contributor', value: 'contributor' },
    { label: 'Co-Founder', value: 'co-founder' },
    { label: 'Volunteer', value: 'volunteer' }
];

const remoteOptions = [
    { label: 'On-site', value: 'on-site' },
    { label: 'Hybrid', value: 'hybrid' },
    { label: 'Remote', value: 'remote' }
];

/**
 * DetailsStage gathers details about the job posting itself.
 *
 * The job description is captured in a separate step.
 */
export class DetailsStage implements FormStage {
    title = 'Job Details';

    View = () => {
        let {values, errors} = useSelector(
            (state: { page: PageState }) => state.page
        );
        let dispatch = useDispatch();
        let fireChange = ({ target }: react.ChangeEvent<HTMLInputElement>) => {
            dispatch(setValue({ name: target.name, value: target.value }));
        };
        let fireSelect = ({ target }: SelectChangeEvent<Value>) => {
            dispatch(setValue({ name: target.name, value: target.value }));
        };
        return (
            <form autoComplete="off">
                <Paper style={{ width: '100%', padding: 16 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="title"
                                label="Posting Title*"
                                margin="normal"
                                fullWidth
                                autoFocus
                                placeholder="Example: Lead Software Engineer"
                                error={!!errors['title']}
                                helperText={errors['title'] || ''}
                                value={values['title'] || ''}
                                onChange={fireChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" gap={2}>
                                <Select
                                    name="type"
                                    label="Job Type*"
                                    options={typeOptions}
                                    value={values['type'] || ''}
                                    onChange={fireSelect}
                                />
                                <Select
                                    name="remote"
                                    label="Remote?*"
                                    options={remoteOptions}
                                    value={values['remote'] || ''}
                                    onChange={fireSelect}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper style={{ width: '100%', marginTop: '1em', padding: 16 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Alert severity="info">
                                <AlertTitle>Tip</AlertTitle>
                                Specify a link to the job page on your ATS,
                                LinkedIn or whereever you receive applications.
                                If you do we'll show a button seekers can click
                                on.
                            </Alert>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="apply_url"
                                label="Apply Url"
                                error={!!errors['apply_url']}
                                helperText={errors['apply_url'] || ''}
                                margin="normal"
                                fullWidth
                                value={values['apply_url'] || ''}
                                onChange={fireChange}
                            />
                        </Grid>
                    </Grid>
                </Paper>
            </form>
        );
    };
}
