const path = require('path');
const fs = require('fs');
const MFS = require('memory-fs');
const webpack = require('webpack');
const chokidar = require('chokidar');

const clientConfig = require('./webpack.client');
const serverConfig = require('./webpack.server');

const readFile = (fs, file) => {
  return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8');
}

module.exports = function setupDevServer (app, templatePath, cb) {
  let bundle;
  let template;
  let clientManifest;
  let degradeHtml;

  let ready;
  const readyPromise = new Promise(r => {ready = r});
  const update = () => {
    if (bundle && clientManifest && degradeHtml) {
      ready()
      cb(bundle, {
        template,
        clientManifest
      }, degradeHtml)
    }
  }

  template = fs.readFileSync(templatePath, 'utf-8');
  chokidar.watch(templatePath).on('change', () => {
    template = fs.readFileSync(templatePath, 'utf-8');
    console.log('index.html uploaded');
    update();
  })

  clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app];
  clientConfig.output.filename = '[name].js';
  clientConfig.mode = 'development';
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )

  const clientCompiler = webpack(clientConfig);
  const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
    publicPath: clientConfig.output.publicPath,
    noInfo: true
  });
  app.use(devMiddleware);
  clientCompiler.plugin('done', stats => {
    console.log('client compiler');
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(err => console.warn(err))
    if (stats.errors.length) return
    clientManifest = JSON.parse(readFile(
      devMiddleware.fileSystem,
      'vue-ssr-client-manifest.json'
    ))
    degradeHtml = readFile(
      devMiddleware.fileSystem,
      'index.degrade.html'
    )
    update()
  })

  app.use(require('webpack-hot-middleware')(clientCompiler, { heartbeat: 5000 }));


  serverConfig.mode = 'development';
  const serverCompiler = webpack(serverConfig);
  const mfs = new MFS();
  serverCompiler.outputFileSystem = mfs;
  serverCompiler.watch({}, (err, stats) => {
    console.log('server compiler');
    if (err) throw err
    stats = stats.toJson()
    if (stats.errors.length) return

    bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'))
    update()
  })

  return readyPromise
}