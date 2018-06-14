const cache = {}

/* Unsets cache entry */
const invalidate = key => {
  cache[key] = undefined
}

/* Checks if entry exists in cache */
const contains = key => cache[key] !== undefined

/* Gets cache entry */
const get = key => cache[key]

/* Sets cache entry */
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
  get,
  set
}
