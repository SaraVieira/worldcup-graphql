/* Performs left-to-right function composition */
const pipe = (...funcs) => value =>
  funcs.reduce((acc, func) => func(acc), value)

module.exports = {
  pipe
}
