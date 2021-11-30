module.exports = (config) => {
  return {
    ...config,

    resolve: {
      fallback: {
        'fs': false
      }
    }
  };
};
