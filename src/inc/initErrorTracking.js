
var _errorHistory = [{test:'123'}];
function getErrorHistory() {
  return _errorHistory;
}
function setErrorHistory(error) {
  _errorHistory.push(error);
}

module.exports = {
  get: getErrorHistory,
  add: setErrorHistory
};