const getConfig = () => {
  return {
    httpPort: 80,
    staticDir: 'public'
  };
};

module.exports = {
  get(key) {
    const config = getConfig();
    if (config.hasOwnProperty(key)) {
      return config[key];
    } else {
      throw new Error(`Unknown configuration option ${key}`);
    }
  }
};
