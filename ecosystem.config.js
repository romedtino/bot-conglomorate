module.exports = {
  apps : [{
    name: 'congo',
    script: 'server.js',
    env: {
      PORT: 3123,
      DISPLAY: ":99"
    },
    watch: false,
    time: true, 
    exp_backoff_restart_delay: 100,
    restart_delay: 60000
  },
  {
    name        : "Xvfb",
    interpreter : "none",
    script      : "Xvfb",
    args        : ":99"
  }],
};
