const Apify = require('apify');

// Get the HTML of a web page
async function asd() {
    const { body } = await Apify.utils.requestAsBrowser({
        url: 'https://www.example.com',
    });
    console.log(body);
}

asd();
