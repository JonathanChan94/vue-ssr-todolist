const fs = require('fs');
const path = require('path');
const express = require('express');
const LRU = require('lru-cache');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { createBundleRenderer } = require('vue-server-renderer');
const auth = require('./server/routes/auth');
const list = require('./server/routes/list');
const isProd = process.env.NODE_ENV === 'production';
const resolve = file => path.resolve(__dirname, file);
const app = express();

const microCache = new LRU({
  max: 100,
  maxAge: 60 * 1000 // 重要提示：条目在 1 秒后过期。
})

const isCacheable = req => {
  if (req.url && req.url === '/login') {
    return req.url;
  } else {
    return false;
  }
}

function createRenderer(bundle, options) {
  return createBundleRenderer(
    bundle,
    Object.assign(options, {
      // cache: new LRU({
      //   max: 1000,
      //   maxAge: 1000 * 60 * 15
      // }),
      basedir: resolve('./dist'),
      runInNewContext: false
    })
  )
}

let renderer;
let readyPromise;
const templatePath = resolve('./src/index.html');
if (isProd) {
  const template = fs.readFileSync(templatePath, 'utf-8');
  const bundle = require('./dist/vue-ssr-server-bundle.json');
  const clientManifest = require('./dist/vue-ssr-client-manifest.json');
  renderer = createRenderer(bundle, {
    template,
    clientManifest
  });
} else {
  readyPromise = require('./build/setup-dev-server')(
    app,
    templatePath,
    (bundle, options) => {
      renderer = createRenderer(bundle, options);
    }
  )
}


const serve = (path, cache) => express.static(resolve(path), {
  maxAge: cache && isProd ? 1000 * 60 * 60 * 24 * 30 : 0
})

function render(req, res) {

  // 页面缓存
  const cacheable = isCacheable(req);
  if (cacheable) {
    const hit = microCache.get(req.url);
    if (hit) {
      return res.send(hit);
    }
  }

  res.setHeader("Content-Type", "text/html")

  const handleError = err => {
    if (err.url) {
      res.redirect(err.url)
    } else if (err.code === 404) {
      res.status(404).send('404 | Page Not Found')
    } else {
      // Render Error Page or Redirect
      res.status(500).send('500 | Internal Server Error')
      console.error(`error during render : ${req.url}`)
      console.error(err.stack)
    }
  }

  const context = {
    title: 'Vue SSR demo', // default title
    description: 'this is a vue ssr demo',
    keywords: 'ssr',
    url: req.url,
    cookies: req.cookies
  }

  renderer.renderToString(context, (err, html) => {
    if (err) {
      return handleError(err)
    }
    res.send(html);
    if (cacheable) {
      microCache.set(req.url, html);
    }
  })
}

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cookieParser());

app.use('/auth', auth);
app.use('/api', list);

app.use('/dist', serve('./dist', true));

app.get('*', isProd ? render : (req, res) => {
  readyPromise.then(() => render(req, res));
});

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})