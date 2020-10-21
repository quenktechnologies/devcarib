import { Object } from '@quenk/noni/lib/data/jsonx';
import { Explanations } from '@quenk/preconditions/lib/result/failure';

import { TestSuite, swap } from '../test';

export const complete: TestSuite = {

    'should pass valid data': {

        input() {

            return {

                name: 'Winston Bailey',

                email: 'wb@example.com',

                password: 'd1ng0L@y@@@!'

            }

        },

        expectedValue() {

            return this.input();

        }

    },

    'should fail empty objects': {

        shouldFail: true,

        input() {

            return {};

        },

        expectedFailure() {

            return {

                name: 'notNull',

                email: 'notNull',

                password: 'notNull'

            };

        }

    },

    'should fail invalid data': {

        shouldFail: true,

        input() {

            return {

                name: '$0M^inC()()L!',

                email: 'aw',

                password: 'bark'

            };

        },

        expectedFailure() {

            return {

                name: 'matches',

                email: 'matches',

                password: 'minLength'

            };

        }

    },

    'should fail data below allowed limits': {

        shouldFail: true,

        input() {

            return {

                name: 'e',

                email: 'aw',

                password: 'bark'

            };

        },

        expectedFailure() {

            return {

                name: 'minLength',

                email: 'minLength',

                password: 'minLength'

            };

        }

    },

    'should fail data above allowed limits': {

        shouldFail: true,

        input() {

            return {

                name: 'a'.repeat(200),

                email: 'me@example.com'.repeat(200),

                password: 'bark'.repeat(60)

            };

        },

        expectedFailure() {

            return {

                name: 'maxLength',

                email: 'maxLength',

                password: 'maxLength'

            };

        }

    }

}

export const partial: TestSuite = {

    'should pass valid data': {

        input() {

            return {

                name: 'Winston Bailey',

                email: 'wb@example.com',

                password: 'd1ng0L@y@@@!'

            }

        },

        expectedValue(value: Object) {

            return swap(value, this.input());

        }

    },

    'should pass empty objects': {

        input() {

            return {};

        }

    },

    'should fail invalid data': {

        shouldFail: true,

        input() {

            return {

                name: '$0M^inC()()L!',

                email: 'aw',

                password: 'bark'

            };

        },

        expectedFailure(e: Explanations) {

            return swap(e, {

                name: 'matches',

                email: 'matches',

                password: 'minLength'

            });

        }

    },

    'should fail data below allowed limits': {

        shouldFail: true,

        input() {

            return {

                name: 'e',

                email: 'aw',

                password: 'bark'

            };

        },

        expectedFailure(e: Explanations) {

            return swap(e, {

                name: 'minLength',

                email: 'minLength',

                password: 'minLength'

            });

        }

    },

    'should fail data above allowed limits': {

        shouldFail: true,

        input() {

            return {

                name: 'a'.repeat(200),

                email: 'me@example.com'.repeat(200),

                password: 'bark'.repeat(60)

            };

        },

        expectedFailure(e: Explanations) {

            return swap(e, {

                name: 'maxLength',

                email: 'maxLength',

                password: 'maxLength'

            });

        }

    }

}
