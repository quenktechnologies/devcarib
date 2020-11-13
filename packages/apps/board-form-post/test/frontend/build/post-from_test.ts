import { assert } from '@quenk/test/lib/assert';

describe('index', function () {
    beforeEach(function () {
        window.location.href = '/';
    });
    describe('primary button', function () {
        it('should show post form ', function () {
            var btn = document.querySelector('a.-primary');
            assert_1.assert(btn).not.undefined();
            btn.click();
            var form = document.querySelector('name[post-form]');
            assert_1.assert(form).not.undefined();
        });

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
