const Logger = () => {
  const fgBlue = '\x1b[34m';
  const fgGreen = '\x1b[32m';
  const fgYellow = '\x1b[33m';
  const fgRed = '\x1b[31m';
  const suffix = '\x1b[0m';

  return {
    info: (message: string) => {
      console.log(`${fgBlue}${message}${suffix}`);
    },
    success: (message: string) => {
      console.log(`${fgGreen}${message}${suffix}`);
    },
    warning: (message: string) => {
      console.log(`${fgYellow}${message}${suffix}`);
    },
    error: (message: string) => {
      console.log(`${fgRed}${message}${suffix}`);
    },
  };
};

export const logger = Logger();
