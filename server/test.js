const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const list = require('./controllers/list');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/api/allitems', list.getAllItems);

app.post('/api/newitem', list.addItem);

app.patch('/api/item', list.updateItem);

app.delete('/api/item', list.deleteItem);


const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})
