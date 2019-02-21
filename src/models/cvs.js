module.exports = function (def) {
  return {
    picture: {
      type: def.TEXT('long'),
      allowNull: false
    },
    name: {
      type: def.TEXT('long'),
      allowNull: false
    },
    company: {
      type: def.TEXT('long'),
      allowNull: false
    }
  };
};