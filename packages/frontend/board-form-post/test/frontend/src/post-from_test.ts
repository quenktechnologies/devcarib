import { assert } from '@quenk/test/lib/assert';

describe('post-form', () => {

    it('should work', () => {

        window.location.href = '#/';

        let form = <HTMLFormElement>document.querySelector(
            '[name="create-post-form"]'
        );

        assert(form).not.undefined();

        let company = <HTMLInputElement>form.querySelector('[name="company"]');
        company.value = 'Quenk';

    })

})
