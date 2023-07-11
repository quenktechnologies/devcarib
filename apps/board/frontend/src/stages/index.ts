import * as react from 'react';

import { Object, Value } from '@quenk/noni/lib/data/jsonx';
import { Record, merge } from '@quenk/noni/lib/data/record';

import { restrict } from '@quenk/preconditions/lib/record';

import { fieldValidators as validators } from '@board/server/lib/data/validators/job';

import { templates } from './templates';

/**
 * FormViewName indicates the name of a FormView as used in the redux store.
 */
export type FormViewName = string;

/**
 * FormViewTitle is a string indicating the title for a FormView.
 */
export type FormViewTitle = string;

/**
 * Index pointer type.
 */
export type Index = number;

/**
 * ErrorMessage type.
 */
export type ErrorMessage = string;

/**
 * FormViewState tracks the values of a single view within the form.
 */
export interface FormViewState {
    /**
     * values captured through the form.
     */
    values: Object;

    /**
     * errors encountered when validating the form values.
     */
    errors: Record<ErrorMessage>;

    /**
     * ok indicates whether the FormView is valid.
     */
    ok: boolean;
}

/**
 * FormView is a view dispalyed in the stages of the form.
 *
 * User's step through these filling out the required information until the land
 * on the final one.
 */
export interface FormView {
    /**
     * name to use.
     */
    name: FormViewName;

    /**
     * title to display.
     */
    title: FormViewTitle;

    /**
     * messages if specified, are displayed above the view.
     */
    messages?: react.FC[];

    /**
     * View is the component to render for the step.
     */
    View: react.FC;
}

/**
 * newState creates an initial FormViewState for a FormView's slice.
 */
export const newState = () => ({ values: {}, errors: {}, ok: false });

/**
 * FieldName is the name of a form field.
 */
export type FieldName = string;

/**
 * HandleValuePayload is the expected shape of the payload for "setValue"
 * dispatches.
 */
export interface HandleValuePayload {
    /**
     * name of the field.
     */
    name: FieldName;

    /**
     * value to set the field to.
     */
    value: Value;

    /**
     * fields is the list of fields the FormView handles.
     *
     * These must all be valid for the FormView to be considered in a valid
     * state.
     */
    fields: FieldName[];
}

/**
 * handleValue is a common reducer for FormViews.
 *
 * It collects and validates values entered into a FormView detecting whether
 * the entire view is valid or not.
 */
export const handleValue = (
    state: FormViewState,
    action: { payload: HandleValuePayload }
) => {
    let { name, value, fields } = action.payload;
    let validator = validators[name];
    if (!validator) return;

    state.values[name] = value;
    state.errors[name] = '';

    let eresult = validator(value);
    if (eresult.isLeft()) {
        state.errors[name] = eresult.takeLeft().explain(templates) as string;
        state.ok = false;
    } else {
        state.values[name] = eresult.takeRight();
        let all = fields.reduce(
            (prev, curr) => merge(prev, { [curr]: validators[curr] }),
            {}
        );

        let eallResult = restrict(all)(state.values);
        state.ok = eallResult.isRight();
    }
};
