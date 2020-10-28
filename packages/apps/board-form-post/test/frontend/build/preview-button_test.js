"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = require("@quenk/test/lib/assert");
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
    });
});
//# sourceMappingURL=preview-button_test.js.map