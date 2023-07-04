import { Value } from '@quenk/noni/lib/data/jsonx';

import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MUISelect, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

/**
 * Id is a string used to distinguish an individual item or object from its
 * siblings.
 */
export type Id = string;

/**
 * Label is a string that is displayed to the user as the name of a control
 * or element.
 */
export type Label = string;

/**
 * Name is a string used to identify a control within a form.
 */
export type Name = string;

/**
 * SelectProps interface.
 */
export interface SelectProps {
    /**
     * id to assign to the control.
     */
    id?: Id;

    /**
     * label to use for the control.
     */
    label?: Label;

    /**
     * name to assign to the control.
     */
    name?: Name;

    /**
     * options used to populate the select's list.
     */
    options: { label: Label; value: Value }[];

    /**
     * value to initialize the control with.
     */
    value?: Value;

    /**
     * onChange handler.
     */
    onChange?: (e: SelectChangeEvent<Value>) => void;
}

/**
 * Select control specialized for this app.
 */
export const Select = ({
    id,
    options,
    label,
    name,
    value,
    onChange
}: SelectProps) => {
    id = id || name;
    return (
        <FormControl fullWidth>
            <InputLabel id={`${id}-label`}>{label}</InputLabel>
            <MUISelect
                labelId={`${id}-label`}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
            >
                {options.map(({ label, value }) => (
                    <MenuItem value={value as string} key={`opt-${label}`}>
                        {label}
                    </MenuItem>
                ))}
            </MUISelect>
        </FormControl>
    );
};
