const http = require('http');
const axios = require('axios');

function get(url) {
    return new Promise((resolve, reject) => {
        return http.get(url, (res) => {
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