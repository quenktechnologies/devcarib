import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

import ReactQuill from 'react-quill';

import { useSelector, useDispatch } from 'react-redux';

import { FormStage, PageState, setValue } from '../page';

const toolbar = [
    ['bold', 'italic', 'underline'], // Customize your desired buttons
    [{ list: 'ordered' }, { list: 'bullet' }]
];

/**
 * DescriptionStage gathers the job description in a rich editor.
 */
export class DescriptionStage implements FormStage {
    title = 'Description';

    View = () => {
        let value = useSelector(
            (state: { page: PageState }) => state.page.values.description || ''
        );
        let dispatch = useDispatch();
        let fireChange = (value: string) => {
            dispatch(setValue({ name: 'description', value }));
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
