const http = require('http');
const https = require('https');

const getHttpProtocol = url => (url && url.indexOf('https') > -1) ? https : http;

const getImageFromUrl = (url) => {
    return (url) ? new Promise((resolve, reject) => {
        return getHttpProtocol(url).get(url, (res) => {
            const data = [];
            res
            .on('data', function(chunk) {
                data.push(chunk);
            })
            .on('end', function() {
                const buffer = Buffer.concat(data);
                return resolve(buffer);
            });
        });
    }) : Promise.resolve(null);
};

module.exports = {
    getImageFromUrl,
}