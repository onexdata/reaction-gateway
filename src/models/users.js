module.exports = function (def) {
  return {
    email: {
      type: def.TEXT('long'),
      allowNull: false
    },
    password: {
      type: def.TEXT('long'),
      allowNull: false
    },
    settings: {
      type: def.TEXT('long'),
      allowNull: true
    },
  };
};