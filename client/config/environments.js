/**
 * [exports description]
 * @type {Object}
 */
module.exports = {
  debug: {
    minifyCss: false,
    cleanHtml: true,
    compilationLevel: 'WHITESPACE_ONLY',
    formatting: 'PRETTY_PRINT'
  },
  local: {
    minifyCss: false,
    cleanHtml: true,
    compilationLevel: 'ADVANCED',
    formatting: 'PRETTY_PRINT'
  },
  dev: {
    minifyCss: true,
    cleanHtml: true,
    compilationLevel: 'ADVANCED',
    formatting: 'PRETTY_PRINT'
  },
  test: {
    minifyCss: true,
    cleanHtml: true,
    compilationLevel: 'ADVANCED',
    formatting: 'SINGLE_QUOTES'
  },
  qa: {
    minifyCss: true,
    cleanHtml: true,
    compilationLevel: 'ADVANCED',
    formatting: 'SINGLE_QUOTES'
  },
  stg: {
    minifyCss: true,
    cleanHtml: true,
    compilationLevel: 'ADVANCED',
    formatting: 'SINGLE_QUOTES'
  },
  prod: {
    minifyCss: true,
    cleanHtml: true,
    compilationLevel: 'ADVANCED',
    formatting: 'SINGLE_QUOTES'
  }
};
