import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import ReactQuill from 'react-quill';

import { useSelector, useDispatch } from 'react-redux';

import { createSlice } from '@reduxjs/toolkit';

import { FormView, FormViewState, handleValue, newState } from './';

const slice = createSlice({
    name: 'description',
    initialState: newState(),
    reducers: {
        setValue: handleValue
    }
});

const { setValue } = slice.actions;

const fields = ['description'];

const toolbar = [
    ['bold', 'italic', 'underline'],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ list: 'ordered' }, { list: 'bullet' }]
];

/**
 * DescriptionFormView gathers the job description in a rich editor.
 */
export class DescriptionFormView implements FormView {
    static reducer = slice.reducer;

    name = 'description';

    title = 'Description';

    View = () => {
        let value = useSelector(
            (state: { description: FormViewState }) =>
                state.description.values.description || ''
        );
        let dispatch = useDispatch();
        let fireChange = (value: string) => {
            dispatch(setValue({ name: 'description', value, fields }));
        };
        return (
            <Box sx={{ marginBottom: 2 }}>
                <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 'bold', marginBottom: 1 }}
                >
                    About The Job
                </Typography>
                <Box sx={{ mb: '1em' }}>
                    <Alert severity="info">
                        <AlertTitle>Tip</AlertTitle>
                        This part is used for the job page. Specify any
                        additional information not included in previous steps
                        that you want job seekers to know.
                    </Alert>
                </Box>
                <ReactQuill
                    modules={{ toolbar }}
                    theme="snow"
                    value={value as string}
                    onChange={fireChange}
                />
            </Box>
        );
    };
}
