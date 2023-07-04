import react from 'react';

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';

import { useSelector, useDispatch } from 'react-redux';

import { FormStage, PageState, setValue } from '../page';

/**
 * CompanyStage gathers details about company making the posting.
 */
export class CompanyStage implements FormStage {
    title = 'Poster';

    View = () => {
        let {values,errors} = useSelector(
            (state: { page: PageState }) => state.page
        );
        let dispatch = useDispatch();
        let fireChange = ({ target }: react.ChangeEvent<HTMLInputElement>) => {
            dispatch(setValue({ name: target.name, value: target.value }));
        };
        return (
            <form autoComplete="off">
                <Paper style={{ width: '100%', padding: 16 }}>
                    <TextField
                        name="poster"
                        label="Your Name*"
                        autoFocus
                        margin="normal"
                        fullWidth
                        placeholder="Jane Smith"
                        error={!!errors['poster']}
                        helperText={errors['poster'] || ''}
                        value={values['poster'] || ''}
                        onChange={fireChange}
                    />
                    <TextField
                        name="email"
                        label="Email*"
                        margin="normal"
                        fullWidth
                        placeholder="In case we need to contact you."
                        error={!!errors['email']}
                        helperText={errors['email'] || ''}
                        value={values['email'] || ''}
                        onChange={fireChange}
                    />
                    <TextField
                        name="company"
                        label="Hiring Company*"
                        fullWidth
                        margin="normal"
                        placeholder="ABC Example LLC"
                        error={!!errors['company']}
                        helperText={errors['company'] || ''}
                        value={values['company'] || ''}
                        onChange={fireChange}
                    />
                </Paper>
            </form>
        );
    };
}
