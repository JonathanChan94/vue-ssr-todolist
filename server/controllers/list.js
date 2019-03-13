const list = require('../models/list');

const getAllItems = async (req, res) => {
  let name = {
    name: req.name
  };
  const data = await list.getAllItems(name);
  if (data) {
    res.json({code: 0, res: data});
  } else {
    res.json({code: 100, msg: '出错啦'});
  }
}

const addItem = async (req, res) => {
  let content = {
    content: req.body.content,
    complete: req.body.complete,
    name: req.name
  };
  const data = await list.addItem(content);
  if (data) {
    res.json({code: 0, res: data});
  } else {
    res.json({code: 100, msg: '出错啦'})
  }
}

const updateItem = async (req, res) => {
  let { _id, complete } = req.body;
  let item  = {
    _id: _id,
    name: req.name
  }
  const data = await list.updateItem(item, {complete});
  if (data) {
    res.json({code: 0, res: data});
  } else {
    res.json({code: 100, msg: '出错啦'});
  }
}

const deleteItem = async (req, res) => {
  let item = {
    _id: req.body._id,
    name: req.name
  }
  const data = await list.deleteItem(item);
  if (data) {
    res.json({code: 0, res: data});
  } else {
    res.json({code: 100, msg: '出错啦'});
  }
}

module.exports = {
  getAllItems,
  addItem,
  updateItem,
  deleteItem
}