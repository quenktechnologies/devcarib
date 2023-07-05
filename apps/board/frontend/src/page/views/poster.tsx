import react from 'react';

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';

import { useSelector, useDispatch } from 'react-redux';
import { createSlice } from '@reduxjs/toolkit';

import { FormView, FormViewState, newState, handleValue } from './';

const slice = createSlice({
    name: 'poster',
    initialState: newState(),
    reducers: {
        setValue: handleValue
    }
});

const { setValue } = slice.actions;

const fields = ['poster', 'company_email', 'company'];

/**
 * PosterFormView gathers details about the person posting the form.
 */
export class PosterFormView implements FormView {
    static reducer = slice.reducer;

    name = 'poster';

    title = 'Poster';

    View = () => {
        let { values, errors } = useSelector(
            (state: { poster: FormViewState }) => state.poster
        );
        let dispatch = useDispatch();
        let fireChange = ({ target }: react.ChangeEvent<HTMLInputElement>) => {
            dispatch(
                setValue({ name: target.name, value: target.value, fields })
            );
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
                        name="company_email"
                        label="Email*"
                        margin="normal"
                        fullWidth
                        placeholder="In case we need to contact you."
                        error={!!errors['company_email']}
                        helperText={errors['company_email'] || ''}
                        value={values['company_email'] || ''}
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
