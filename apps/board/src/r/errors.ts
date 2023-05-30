/**
 * templates used for failed validation and checks.
 */
export const templates: { [key: string]: string } = {
    minLength: '{$key} must be {target} or more characters!',

    maxLength: '{$key} must be less than {target} characters!',

    notNull: '{$key} is required!'
};
