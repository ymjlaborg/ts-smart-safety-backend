module.exports = {
  apps: [
    {
      name: 'ts-smart-safety-backend',
      script: 'dist/main.js',
      instances: 1,
      autorestart: true,
      env_development: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
