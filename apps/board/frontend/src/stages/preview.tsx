import { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { createSlice } from '@reduxjs/toolkit';

import Box from '@mui/material/Box';

import { Object } from '@quenk/noni/lib/data/jsonx';
import { merge, Record } from '@quenk/noni/lib/data/record';

import { JobPage } from '@board/widgets/lib/page/job-page';

import { FormView } from './';

const slice = createSlice({
    name: 'preview',
    initialState: { ok: false, values: {} },
    reducers: {
        setValues: (state, action) => {
            state.values = action.payload;
        }
    }
});

export const { setValues } = slice.actions;

const stages = ['poster', 'details', 'description'];

/**
 * PreviewFormView displays the job before attempting to save.
 */
export class PreviewFormView implements FormView {
    static reducer = slice.reducer;

    name = 'preview';

    title = 'Publish';

    View = () => {
        let data = stages.reduce(
            (prev, curr) =>
                merge(
                    prev,
                    useSelector(
                        (state: Record<{ values: Object }>) =>
                            state[curr].values
                    )
                ),
            {}
        );

        useEffect(() => {
            let page = new JobPage({ data }, []);
            let node = document.getElementById(
                'preview-container'
            ) as HTMLElement;
            node.replaceChildren(page.render());
        }, []);

        return (
            <Box sx={{ marginBottom: 2 }}>
                <div id="preview-container" />
            </Box>
        );
    };
}
