module.exports = {
  apps: [
    {
      name: 'ts-smart-safety-backend',
      script: 'dist/main.js',
      instances: 1,
      autorestart: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
