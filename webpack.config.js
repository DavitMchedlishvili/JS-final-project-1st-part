const path = require('path');
const { Script } = require('vm');


module.exports = {
    entry : "./script.js",
    output : {
        filename : 'build.js',
        path: path.resolve(__dirname, 'dist')
    },
};