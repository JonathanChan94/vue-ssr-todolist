const List = require('../schema/list');

async function getAllItems (name) {
  const data = await List.find(name).sort({ '_id': -1 });
  return data;
}

async function addItem (content) {
  const data = await List.create(content);
  return data;
}

async function updateItem (item, update) {
  const data = await List.findOneAndUpdate(item, update);
  return data;
}

async function deleteItem (item) {
  const data = await List.findOneAndDelete(item);
  return data;
}

module.exports = {
  getAllItems,
  addItem,
  updateItem,
  deleteItem
}