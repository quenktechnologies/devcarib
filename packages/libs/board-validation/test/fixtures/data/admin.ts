import { Object } from '@quenk/noni/lib/data/jsonx';

export const valid = (): Object => ({

    name: 'Lasana Murray',

    email: 'foo@bar.com',

    password: 'password12356'

});

export const invalid = (): Object => ({

    name: 24,

    email: 'not an email',

    password: []

})

export const lower = (): Object => ({

    name: '',

    email: 'a',

    password: ''

})

export const upper = (): Object => ({

    name: 'a'.repeat(0xffffff),

    email: 'a'.repeat(0xffffff),

    password: 'a'.repeat(0xffffff)

})

export const expected: { [key: string]: Object } = {

    valid: {

        name: 'Lasana Murray',

        email: 'foo@bar.com',

        password: 'password12356'

    },

    invalid: {

        name: 'isString',

        email: 'invalid',

        password: 'isString'

    },

    lower: {

        name: 'minLength',

        email: 'minLength',

        password: 'minLength'

    },

    upper: {

        name: 'maxLength',

        email: 'maxLength',

        password: 'maxLength'

    }

}
