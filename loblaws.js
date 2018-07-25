import Page from './page-object';
import { Selector } from 'testcafe';

fixture `Loblaws`
    .page `https://www.loblaws.ca/`;

const page       = new Page();

var prices = Selector('.reg-price-text');

var priceList = [];

for (var i = 0; i < prices.length; i++) {
    priceList.push(prices[i].innerText);
}

test('Sorting Verification', async t => {
    await t
        // Resize window to fit widest breakpoint (mobile break at 650 and wide break at 960 px)
        .resizeWindow(1269, 700)
        // Uncomment line below to Click Language Button to trigger french
        .click(page.languageButton)
        // Click on search input apples and complete search
        .click(page.searchBar)
        .typeText(page.searchBar, 'apples')
        .pressKey('enter')
        // Click on the sort High-to-low button
        .click(page.priceSort);

    
    var prices = page.applePrices
    var count    = await prices.count;

    for (var i = 0; i < count; i++) {
        var price1 = page.applePrices.nth(i).innerText
        console.log(await price1)
        var price2 = page.applePrices.nth(i+1).innerText;
        console.log(await price2);
        await t
            .expect(price1).gte(await price2);
    }

});