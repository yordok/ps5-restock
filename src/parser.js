/**
 * Maps urls from config to be useable by
 *
 * @param {Array} urls array of string urls
 * @returns
 */
const mapUrls = (urls) => {
    return urls.map((url) => {
        return {
            url,
        };
    });
};

/**
 *
 * @param {*} source
 * @returns
 */
const handlePageFunctionCreator = (source) => {
    return async ({ request, response, body, contentType, $ }) => {
        const data = [];
        // Do some data extraction from the page with Cheerio.
        $(source.elementSearch).each((index, el) => {
            const { value, search } = source.positiveValue;
            let searchText = '';
            if (search === 'innerHtml') {
                searchText = el.attribs['data-buttontext'];
            }

            if (searchText.toLowerCase() === value) {
                //positive check
                console.warn(`AVAILABLE AT: ${request.url}`);
                await Apify.pushData({
                    url: request.url,
                    name: source.name,
                });
            } else {
                //negative check
                console.log(`not available at: ${request.url}`);
            }
        });
    };
};

module.exports = {
    mapUrls,
    handlePageFunctionCreator,
};
