/* eslint-disable no-console */

import '@testing-library/jest-dom/extend-expect'

// this is just a little hack to silence a warning that we'll get until we
// upgrade to 16.9: https://github.com/facebook/react/pull/14853
const originalError = console.error
const originalWarning = console.warn

beforeAll(() => {
    console.error = (...args) => {
        if (/Warning.*not wrapped in act/.test(args[0])) {
            return
        }
        originalError.call(console, ...args)
    }

    console.warn = (...args) => {
        if (/Warning.*componentWillMount has been renamed/.test(args[0])) {
            return
        }
        originalWarning.call(console, ...args)
    }
})

afterAll(() => {
    console.error = originalError
    console.warn = originalWarning
})
