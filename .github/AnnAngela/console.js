const originalConsole = global.console;
const prefixable = ["log", "warn", "debug", "info", "error"];
const fixZero = (n, l = 2) => `${n}`.padStart(l, "0");

const toLocalTimeZoneString = (date = new Date()) => `${date.getFullYear()}-${fixZero(date.getMonth() + 1)}-${fixZero(date.getDate())}T${fixZero(date.getHours())}:${fixZero(date.getMinutes())}:${fixZero(date.getSeconds())}.${fixZero(date.getMilliseconds(), 3)}+${fixZero(Math.floor(-date.getTimezoneOffset() / 60))}:${fixZero(-date.getTimezoneOffset() % 60)}`;

export default new Proxy(originalConsole, {
    get: (t, p) => prefixable.includes(p) ? t[p].bind(t, `[${toLocalTimeZoneString()}]`) : t[p],
});
