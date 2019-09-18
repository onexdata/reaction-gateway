module.exports = function (def) {
  return {
    from: {
      type: def.BIGINT,
      allowNull: false
    },
    to: {
      type: def.BIGINT,
      allowNull: false
    },
    contents: {
      type: def.TEXT('long'),
      allowNull: false
    },
  };
};