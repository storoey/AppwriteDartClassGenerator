"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const Logger = () => {
    const fgBlue = '\x1b[34m';
    const fgGreen = '\x1b[32m';
    const fgYellow = '\x1b[33m';
    const fgRed = '\x1b[31m';
    const suffix = '\x1b[0m';
    return {
        info: (message) => {
            console.log(`${fgBlue}[I]${message}${suffix}`);
        },
    };
};
exports.logger = Logger();
