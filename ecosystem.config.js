module.exports = {
  apps : [{
    name: 'congo',
    script: 'server.js',
    env: {
      PORT: 3000,
    },
    watch: false,
    time: true, 
    exp_backoff_restart_delay: 100,
    restart_delay: 60000
  }],
};
