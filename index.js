const Apify = require('apify');
require('dotenv').config();
const fs = require('fs');
const parser = require('./src/parser');

const config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

config.dataSources.forEach(async (source) => {
    console.log(`Looking up console availability for ${source.name}...`);

    const mappedUrls = parser.mapUrls(source.urls);
    const requestList = new Apify.RequestList({
        sources: mappedUrls,
    });
    await requestList.initialize();

    const crawler = new Apify.CheerioCrawler({
        requestList,
        handlePageFunction: parser.handlePageFunctionCreator(source),
    });

    await crawler.run();
});
