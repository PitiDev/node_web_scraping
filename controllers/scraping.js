var express = require('express');
var router = express.Router();
const playwright = require('playwright');
const axios = require("axios");
const cheerio = require("cheerio");

router.get('/scraping', async function (req, res) {
    console.log('=== url run = ');
    const browser = await playwright.webkit.launch({
        headless: true // set this to true
    });

    const page = await browser.newPage();
    await page.goto('https://tradingeconomics.com/commodities');
    const Energy = await page.$eval('#aspnetForm > div.container > div > div > div:nth-child(8) > div > table > tbody', tableBody => {
        let all = []
        for (let i = 0, row; row = tableBody.rows[i]; i++) {
            let stock = [];
            for (let j = 0, col; col = row.cells[j]; j++) {
                stock.push(row.cells[j].innerText)
            }
            all.push(stock)
        }
        return all;
    });

    const Agricultural = await page.$eval('#aspnetForm > div.container > div > div > div:nth-child(16) > div > table > tbody', tableBody => {
        let all = []
        for (let i = 0, row; row = tableBody.rows[i]; i++) {
            let stock = [];
            for (let j = 0, col; col = row.cells[j]; j++) {
                stock.push(row.cells[j].innerText)
            }
            all.push(stock)
        }
        return all;
    });

    const Industrial = await page.$eval('#aspnetForm > div.container > div > div > div:nth-child(20) > div > table > tbody', tableBody => {
        let all = []
        for (let i = 0, row; row = tableBody.rows[i]; i++) {
            let stock = [];
            for (let j = 0, col; col = row.cells[j]; j++) {
                stock.push(row.cells[j].innerText)
            }
            all.push(stock)
        }
        return all;
    });

    var resultEnergy = Energy.map(dataMap => ({ name: dataMap[0].split('\n')[0], unit: dataMap[0].split('\n')[1], price: dataMap[1], percen: dataMap[3], date: dataMap[7] }));
    var resultAgricultural = Agricultural.map(dataMap => ({ name: dataMap[0].split('\n')[0], unit: dataMap[0].split('\n')[1], price: dataMap[1], percen: dataMap[3], date: dataMap[7] }));
    var resultIndustrial = Industrial.map(dataMap => ({ name: dataMap[0].split('\n')[0], unit: dataMap[0].split('\n')[1], price: dataMap[1], percen: dataMap[3], date: dataMap[7] }));

    console.log('Most Active', resultEnergy);

    res.json({
        'status': 'success',
        'dataEnergy': resultEnergy,
        'dataAgricultural': resultAgricultural,
        'dataIndustrial': resultIndustrial
    });

    await page.waitForTimeout(30000); // wait
    await browser.close();

});

router.get('/web', async function (req, res) {
    try {
        // Go to the dev.to tags page 
        const response = await axios.get("https://markets.businessinsider.com/commodities");

        // Get the HTML code of the webpage 
        const html = response.data;
        const $ = cheerio.load(html);

        // Create tags array to store tags 
        const tags = [];

        // Find all elements with crayons-tag class, find their innerText and add them to the tags array 
        $(".push-data").each((_idx, el) => tags.push($(el).text()));

        res.json({
            'status': 'success',
            'dataEnergy': tags,
            'dataAgricultural': 'resultAgricultural',
            'dataIndustrial': 'resultIndustrial'
        });
        
        return tags;
    } catch (error) {
        throw error;
    }
});

module.exports = router;