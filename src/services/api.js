const http = require('http');
const https = require('https');
const axios = require('axios');

function getHttpProtocol(url) {
    return (url.indexOf('https') > -1) ? https : http; 
}

function get(url) {
    return new Promise((resolve, reject) => {
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
    });
}

module.exports = {
    get
}