import { assert } from '@quenk/test/lib/assert';

import { forEach, Record } from '@quenk/noni/lib/data/record';

describe('post-form', () => {

    it('should work', async () => {

        let previewBtn =
            <HTMLButtonElement>document.querySelector('.preview-button');

        assert(previewBtn.disabled).true();

        dispatchEvents({

            '[name=title]': { value: 'Quenk Technologies Needs A Tester' },

            '[name=location]': { value: 'Trinidad and Tobago' },

            '.board-job-type-dropdown': { type: 'dropdown', selection: 3 },

            '[name=apply_url]': { value: 'https://quenk.com' },

            '[name=remote]': { type: 'click' },

            '.board-currency-money-text-field': {

                type: 'dropdown',

                selection: 4

            },

            '[name=payment_amount]': { value: '6000' },

            '.board-job-payment-frequency': {

                type: 'dropdown',

                selection: 3

            },

            '[name=description]': { value: 'This is a test. *With Markdown!*' },

            '[name=company]': { value: 'Quenk Technologies' },

            '[name=company_logo]': { value: 'https://quenk.com/logo.png' },

            '[name=company_email]': { value: 'info@quenk.com' },

        });

        // Allow full  validation to take place.
        await new Promise(r => setTimeout(r, 500));

        assert(previewBtn.disabled, 'preview button disabled').is.false();

        await new Promise(r => setTimeout(r, 500));

        let expectedData = {

            apply_url: "https://quenk.com",

            company: "Quenk Technologies",

            company_email: "info@quenk.com",

            company_logo: "https://quenk.com/logo.png",

            description: "This is a test. *With Markdown!*",

            location: "Trinidad and Tobago",

            payment_amount: 6000,

            payment_currency: "TTD",

            payment_frequency: "Weekly",

            remote: true,

            status: "new",

            title: "Quenk Technologies Needs A Tester",

            type: "Contractor"

        };

        assert(window.postFormApp.values.post.data, 'post form data')
            .equate(expectedData);

        previewBtn.click();

        // Give the preview a chance to load.
        await new Promise(r => setTimeout(r, 500));

        let previewFrame =
            <HTMLIFrameElement>document.querySelector('#preview-iframe');

        assert(previewFrame, 'preview frame').is.not.null();

        let previewFrameBody =
            <HTMLElement>(<HTMLDocument>previewFrame.contentDocument).body;

        let previewFrameText = previewFrameBody.textContent || '';

        assert(previewFrameText.includes('This is a test'),
            'preview frame text contains description').true();

        let postBtn = <HTMLButtonElement>document.querySelector('.send-button');

        assert(postBtn, 'post button').is.not.null();

        assert(postBtn.disabled, 'post button is not disabled').is.not.true();

        let sendFunc = <Function>window.postFormApp.agent.post;

        let sentData: object = {};

        window.postFormApp.agent.post = (path: string, data: object) => {

            sentData = data;
            return sendFunc.apply(window.postFormApp.agent, [path, data]);

        };

        postBtn.click();

        // Give the data a chance to transmit.
        await new Promise(r => setTimeout(r, 500));

        assert(sentData, 'data sent to server').equate(expectedData);

        let resultHeading =
            <HTMLElement>document.querySelector('.post-title');

        assert(resultHeading, 'success page shown').is.not.null();

        assert(
            (resultHeading.textContent || '').includes('Success'),
            'heading says success'
        ).is.true();

    })

})

interface EventSpecMap extends Record<Partial<EventSpec>> { }

interface EventSpec {

    type: string,

    selector: string,

    value?: string,

    selection?: number

}

const dispatchEvents =
    (specMap: EventSpecMap, doc: HTMLDocument = document) => {

        forEach(specMap, (spec, key) => {

            if (spec.type === 'click') {

                dispatchClick(spec.selector ? spec.selector : key, doc);

            } else if (spec.type === 'dropdown') {

                dispatchDropdownEvent(
                    spec.selector ? spec.selector : key,
                    spec.selection ? spec.selection : 0,
                    doc
                );

            } else {

                dispatchInputEvent(
                    spec.selector ? spec.selector : key,
                    spec.value ? spec.value : '',
                    doc
                );

            }

        });

    }

const dispatchClick = (sel: string, doc: HTMLDocument = document) => {

    let target = <HTMLInputElement>doc.querySelector(sel);

    if (target != null)
        target.dispatchEvent(new MouseEvent('click'));

}

const dispatchDropdownEvent =
    (sel: string, index: number, doc: HTMLDocument = document) => {

        let container = <HTMLInputElement>doc.querySelector(sel);

        if (container != null) {

            let displayField =
                <HTMLElement>container.querySelector('.ww-display-field');

            displayField.dispatchEvent(new MouseEvent('click'));

            let a = container.querySelector(`ul > li:nth-of-type(${index}) a`);

            if (a != null)
                a.dispatchEvent(new MouseEvent('click'));

        }

    }

const dispatchInputEvent =
    (sel: string, value: string, doc: HTMLDocument = document) => {

        let target = <HTMLInputElement>doc.querySelector(sel);

        if (target != null) {

            target.value = value;

            target.dispatchEvent(new InputEvent('input'));

        }

    }
