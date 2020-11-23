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
        var email = form.querySelector('[name="company_email"]');
        email.value = 'info@example.com';
        var logo = form.querySelector('[name="company_logo"]');
        logo.value = 'https://www.quenk.com/';
        var applyLink = form.querySelector('[name="apply_url"]');
        applyLink.value = 'https://www.quenk.com';
        var jobTitle = form.querySelector('[name="title"]');
        jobTitle.value = 'Software Engineer needed';
        var jobDescription = form.querySelector('[name="description"]');
        jobDescription.value = 'We are currently looking for a Software Engineer in the Port of Spain region';
        let btn = document.querySelector('.-preview-button');
        assert_1.assert(btn).not.undefined();
        btn.click();

    });
});
//# sourceMappingURL=post-from_test.js.map
