const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const { expect } = require('chai');

// Test Cases
const testCases = [
    {
        description: 'should login successfully with valid credentials',
        username: 'validUsername',
        password: 'invalidPassword',
        expectedUrl: 'https://www.facebook.com',
        shouldPass: true,
    },
    {
        description: 'should fail to login with invalid password',
        username: 'validUsername',
        password: 'invalidPassword',
        expectedUrl: 'https://www.facebook.com',
        shouldPass: false,
    },
    {
        description: 'should fail to login with invalid username',
        username: 'invalidUsername',
        password: 'validPassword',
        expectedUrl: 'https://www.facebook.com',
        shouldPass: false,
    },
    
];

describe('Login Tests Facebook', function () {
    this.timeout(20000);

    let driver;

    before(async function () {
        driver = await new Builder().forBrowser('firefox').setFirefoxOptions(new firefox.Options()).build();
    });

    after(async function () {
        await driver.quit();
    });

    testCases.forEach((testCase) => {
        it(testCase.description, async function () {
            await driver.get('http://old-demo.securehr.net/');

            // Find Element and send data
            await driver.findElement(By.name('elementFormUsername')).sendKeys(testCase.username);
            await driver.findElement(By.name('elementFormPassword')).sendKeys(testCase.password);
            await driver.findElement(By.xpath("elementButtonLogin")).click();

            if (testCase.shouldPass) {
                await driver.wait(until.urlIs(testCase.expectedUrl), 10000);
                const currentUrl = await driver.getCurrentUrl();
                expect(currentUrl).to.equal(testCase.expectedUrl);
            } else {
                await driver.wait(until.urlIs(testCase.expectedUrl), 10000).catch(() => null);
                const currentUrl = await driver.getCurrentUrl();
                expect(currentUrl).to.equal(testCase.expectedUrl);
            }
        });
    });
});