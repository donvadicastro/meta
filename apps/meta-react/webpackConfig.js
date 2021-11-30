module.exports = (config) => {
  return {
    ...config,

    resolve: {
      ...config.resolve,

      fallback: {
        'fs': false
      }
    }
  };
};
