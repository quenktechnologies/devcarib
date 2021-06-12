"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = require("@quenk/test/lib/assert");
describe('post-form', function () {
    it('should work', function () {
        window.location.href = '#/';
        var form = document.querySelector('[name="create-post-form"]');
        assert_1.assert(form).not.undefined();
        var company = form.querySelector('[name="company"]');
        company.value = 'Quenk';
    });
});
//# sourceMappingURL=post-from_test.js.map