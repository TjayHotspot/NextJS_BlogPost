/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: "tjayhotspot",
        mongodb_password: "Admin12341234",
        mongodb_clustername: "cluster0",
        mongodb_database: "my-site-dev",
      },
      reactStrictMode: true,
    };
  }

  return {
    env: {
      mongodb_username: "tjayhotspot",
      mongodb_password: "Admin12341234",
      mongodb_clustername: "cluster0",
      mongodb_database: "my-site",
    },
    reactStrictMode: true,
  };
};

module.exports = nextConfig;
