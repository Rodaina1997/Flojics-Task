const helmet = require('helmet');
const compress = require('compression');

module.exports = (app) => {
    app.use(helmet());
    app.use(compress());

}