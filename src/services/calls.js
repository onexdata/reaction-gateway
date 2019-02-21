module.exports = (app, config) => {
  return {
    hydrate (version) {
      return {
        version, app, config
      };
    }
  };
};