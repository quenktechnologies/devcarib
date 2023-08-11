import { expect, browser } from '@wdio/globals';

import { assert } from '@quenk/test/lib/assert';

import { Object as JSONObject, Value } from '@quenk/noni/lib/data/jsonx';
import { Record, merge } from '@quenk/noni/lib/data/record';
import { isString } from '@quenk/noni/lib/data/type';

import { PostPage } from './pages/post';

type Step = Record<
    string | { type: string; value: string; expectValue?: Value }
>;

const steps: Step[] = [
    {
        poster: 'Lasana Murray',
        company_email: 'test@example.com',
        company: 'Quenk Technologies Limited'
    },
    {
        title: 'A Test Job',
        type: {
            type: 'select',
            value: 'contract'
        },
        remote: {
            type: 'select',
            value: 'hybrid'
        },
        apply_url: 'https://example.com/jobs/1'
    },
    {
        description: {
            type: 'html',
            value: 'Some description text.',
            expectValue: '<p>Some description text.</p>'
        }
    },
    {} // Preview
];

describe('/post', () => {
    it('can post a job', async () => {
        let expected: JSONObject = {};
        let backend = await browser.mock(/post/, { method: 'post' });
        backend.respond(
            { data: { id: 1 } },
            { statusCode: 201, fetchResponse: false }
        );

        PostPage.open();

        for (let i = 0; i < steps.length; i++) {
            let step = steps[i];
            let isFirst = i === 0;
            let isLast = i === steps.length - 1;

            await expect(PostPage.next).not.toExist();

            if (isFirst) await expect(PostPage.back).not.toExist();
            else await expect(PostPage.back).toExist();

            if (isLast) await expect(PostPage.save).toExist();

            for (let [name, val] of Object.entries(step)) {
                if (isString(val)) await PostPage.input(name, val);
                else if (val.type === 'select')
                    await PostPage.select(name, val.value);
                else if (val.type === 'html')
                    await PostPage.html(name, val.value);

                expected[name] = isString(val)
                    ? val
                    : val.expectValue || val.value;
            }

            if (isLast) {
                await PostPage.save.waitForExist();
                await expect(PostPage.back).toExist();
                await expect(PostPage.next).not.toExist();
                await PostPage.save.click();
            } else {
                await PostPage.next.waitForExist();

                if (isFirst) await expect(PostPage.back).not.toExist();
                else await expect(PostPage.back).toExist();

                await expect(PostPage.save).not.toExist();
                await PostPage.next.click();
            }
        }

        await PostPage.result.waitForExist();

        let msg = await PostPage.result.getText();
        assert(msg.includes('Success!')).true();
        assert(backend.calls.length).equal(1);
        assert(JSON.parse(backend.calls[0].postData)).equate(expected);
    });
});
