import service from '../utils/request';

function login (data) {
  return service.post('/auth/login', data);
}

function register (data) {
  return service.post('/auth/register', data);
}

function getAllItems () {
  return service.get('/api/allitems');
}

function addItem (data) {
  return service.post('/api/newitem', data);
}

function updateItem (data) {
  return service.patch('/api/item', data);
}

function deleteItem (data) {
  return service.delete('/api/item', data);
}

export { login, register, getAllItems, addItem, updateItem, deleteItem }