const cache = {}

const contains = key => cache[key] !== undefined

const invalidate = key => {
  cache[key] = undefined
}

const get = key => cache[key]

const set = (key, value, options) => {
  let effectiveOptions = { maxAge: 1000 * 60 }

  if (options !== undefined) {
    effectiveOptions = options
  }

  cache[key] = value
  setTimeout(() => invalidate(key), effectiveOptions.maxAge)
}

module.exports = {
  contains,
  invalidate,
  get,
  set
}
