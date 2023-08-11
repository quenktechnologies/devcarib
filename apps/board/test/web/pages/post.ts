import { browser } from '@wdio/globals';

/**
 * PostPage page object.
 */
export class PostPage {
    static get result() {
        return browser.$('#result');
    }

    static get back() {
        return browser.$('#backButton');
    }

    static get next() {
        return browser.$('#nextButton');
    }

    static get save() {
        return browser.$('#saveButton');
    }

    static controls = {};

    static async open() {
        await browser.maximizeWindow();
        await browser.url('/post');
    }

    /**
     * input text into an input or textarea.
     */
    static async input(name: string, txt: string) {
        let el = await browser.$(`input[name="${name}"]`);
        await el.click();
        await el.addValue(txt);
    }

    static async select(id: string, value: string) {
        let el = await browser.$(`#${id}`);
        await el.click();
        await browser.$(`li[data-value="${value}"]`).click();
    }

    static async html(id: string, value: string) {
        let el = await browser.$(`#${id}`);
        await el.click();

        let txtarea = await el.$('[contenteditable="true"]');
        await txtarea.addValue(value);
    }
}
