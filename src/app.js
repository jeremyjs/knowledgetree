const path = require('path');
const serveStatic = require('feathers').static;
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const feathers = require('feathers');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const bodyParser = require('body-parser');
const socketio = require('feathers-socketio');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const morgan = require('morgan');

const middleware = require('./middleware');
const services = require('./services');
const config = require('../webpack.config');

const clientRoutes = '*';

const app = feathers();
const compiler = webpack(config);

app.use(webpackMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.configure(configuration(path.join(__dirname, '..')));

const staticServer = serveStatic(app.get('public'));

app.use(compress())
  .options('*', cors())
  .use(cors())
  .use(morgan('dev'))
  .use(favicon( path.join(app.get('public'), 'favicon.ico') ))
  .use(clientRoutes, (req, res, next) => {
    if (/\/api\//.test(req.originalUrl)) {
      next();
    } else {
      staticServer(req, res, next);
    }
  })
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .configure(hooks())
  .configure(rest())
  .configure(socketio())
  .configure(services)
  .configure(middleware);

module.exports = app;
