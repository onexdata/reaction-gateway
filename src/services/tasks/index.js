module.exports = function ( config ) {
  return {
    records: [{
      text: 'Learn Feathers',
      complete: false
    }],
    find (params, next) {
      next(null, this.records);
    },
    create (data, params, next) {
      this.records.push(data);
      next(null, data);
    }  
  };
};