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

        let email = <HTMLInputElement>form.querySelector('[name="company_email"]');
        email.value = 'info@example.com';

        let logo= <HTMLInputElement>form.querySelector('[name="company_logo"]');
        logo.value = 'https://www.example.com';

        let applyLink = <HTMLInputElement>form.querySelector('[name="apply_url"]');
        applyLink.value = 'https://www.quenk.com/';

        let jobTitle = <HTMLInputElement>form.querySelector('[name="title"]');
        jobTitle.value = 'Software Engineer needed';

        let jobDescription = <HTMLInputElement>form.querySelector('[name="description"]');
        email.value = 'We are currently looking for a Software Engineer in the Port of Spain region';

        let btn = document.querySelector('.-preview-button');
        assert_1.assert(btn).not.undefined();
        btn.click();

    })

})
