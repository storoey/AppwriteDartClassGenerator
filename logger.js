const fgBlue = '\x1b[34m';
const fgGreen = '\x1b[32m';
const fgYellow = '\x1b[33m';
const fgRed = '\x1b[31m';
const suffix = '\x1b[0m';

export const Logger = {
  info: function (message) {
    console.log(`${fgBlue}${message}${suffix}`);
  },
  success: function (message) {
    console.log(`${fgGreen}${message}${suffix}`);
  },
  warning: function (message) {
    console.log(`${fgYellow}${message}${suffix}`);
  },
  error: function (message) {
    console.log(`${fgRed}${message}${suffix}`);
  },
}