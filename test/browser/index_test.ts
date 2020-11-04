import { Builder, By } from 'selenium-webdriver';

import { assert } from '@quenk/test/lib/assert';

const url = process.env.URL || 'http://localhost:2407';

const driver = new Builder()
    .forBrowser(process.env.BROWSER || 'firefox')
    .build();

describe('index', () => {

    beforeEach(() => driver.get(url));

    after(() => driver.quit());

    describe('primary button', () => {

        it('should navigate to post form ', async () => {

            let btn = await driver.findElement(By.css('#create-new-post-button'));
            btn.click();

            let title = await driver.getTitle();

            assert(title.includes('Post a Job'));

        })

    })

})
