import { Object } from '@quenk/noni/lib/data/jsonx';
import { Explanations } from '@quenk/preconditions/lib/result/failure';

import { TestSuite, swap } from '../test';

export const complete: TestSuite = {

    'should pass valid data': {

        input() {

            return {

                title: '5GX Developer Wanted',

                description: '5G'.repeat(2000),

                company: '5G Technologies',

                company_email: '5ghr@example.com',

                company_logo: 'https://example.com/40x40.png',

                apply_url: 'https://example.com/jobs/apply',

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

                title: 'notNull',

                description: 'notNull',

                company: 'notNull',

                company_email: 'notNull'

            };

        }

    },

    'should fail invalid data': {

        shouldFail: true,

        input() {

            return {

                title: '5',

                description: '',

                company: '',

                company_email: '5',

                company_logo: '/example.com/40x40.png',

                apply_url: '/example.com/jobs/apply',

            };

        },

        expectedFailure() {

            return {

                title: 'minLength',

                description: 'notNull',

                company: 'notNull',

                company_email: 'minLength',

                company_logo: 'matches',

                apply_url: 'matches'

            };

        }

    },

    'should fail data below allowed limits': {

        shouldFail: true,

        input() {

            return {

                title: '5g',

                description: '5g',

                company: '',

                company_email: '5g',

                company_logo: '5g',

                apply_url: '5g',

            };

        },

        expectedFailure() {

            return {

                title: 'minLength',

                description: 'minLength',

                company: 'notNull',

                company_email: 'minLength',

                company_logo: 'minLength',

                apply_url: 'minLength',

            };
        }

    },

    'should fail data above allowed limits': {

        shouldFail: true,

        input() {

            return {

                title: '5g'.repeat(256),

                description: '5g'.repeat(26 * 100 * 10),

                company: 'd'.repeat(65),

                company_email: '5g'.repeat(60),

                company_logo: `https://example.com/?id=${'5g'.repeat(5001)}`,

                apply_url: `https://example.com/?id=${'5g'.repeat(5001)}`

            };

        },

        expectedFailure() {

            return {

                title: 'maxLength',

                description: 'maxLength',

                company: 'maxLength',

                company_email: 'maxLength',

                company_logo: 'maxLength',

                apply_url: 'maxLength'

            };
        }

    }

}

export const partial: TestSuite = {

    'should pass valid data': {

        input() {

            return {

                title: '5GX Developer Wanted',

                description: '5G'.repeat(2000),

                company: '5G Technologies',

                company_email: '5ghr@example.com',

                company_logo: 'https://example.com/40x40.png',

                apply_url: 'https://example.com/jobs/apply',

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

                title: '5',

                description: '',

                company: '',

                company_email: '5',

                company_logo: '/example.com/40x40.png',

                apply_url: '/example.com/jobs/apply',

            };

        },

        expectedFailure(e: Explanations) {

            return swap(e, {

                title: 'minLength',

                description: 'notNull',

                company: 'notNull',

                company_email: 'minLength',

                company_logo: 'matches',

                apply_url: 'matches'

            });

        }

    },

    'should fail data below allowed limits': {

        shouldFail: true,

        input() {

            return {

                title: '5g',

                description: '5g',

                company: '',

                company_email: '5g',

                company_logo: '5g',

                apply_url: '5g',

            };

        },

        expectedFailure(e: Explanations) {

            return swap(e, {

                title: 'minLength',

                description: 'minLength',

                company: 'notNull',

                company_email: 'minLength',

                company_logo: 'minLength',

                apply_url: 'minLength',

            });

        }

    },

    'should fail data above allowed limits': {

        shouldFail: true,

        input() {

            return {

                title: '5g'.repeat(256),

                description: '5g'.repeat(26 * 100 * 10),

                company: 'd'.repeat(65),

                company_email: '5g'.repeat(60),

                company_logo: `https://example.com/?id=${'5g'.repeat(5001)}`,

                apply_url: `https://example.com/?id=${'5g'.repeat(5001)}`

            };

        },

        expectedFailure(e: Explanations) {

            return swap(e, {

                title: 'maxLength',

                description: 'maxLength',

                company: 'maxLength',

                company_email: 'maxLength',

                company_logo: 'maxLength',

                apply_url: 'maxLength'

            });

        }

    }

}
