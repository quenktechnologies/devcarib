import { assert } from '@quenk/test/lib/assert';

describe('index', () => {

    beforeEach(() => {

        window.location.href = '/';

    })

    describe('primary button', () => {

        it('should show post form ', () => {

            let btn = <HTMLButtonElement> document.querySelector('a.-primary');
            assert(btn).not.undefined();
            btn.click();

            let form = document.querySelector('name[post-form]');
            assert(form).not.undefined();

        })

    })

})
