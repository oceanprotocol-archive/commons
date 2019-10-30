/* eslint-disable no-console */

import '@testing-library/jest-dom/extend-expect'

// Filter out deprecation warnings caused by external dependencies
const originalWarning = console.warn

beforeAll(() => {
    console.warn = (...args) => {
        if (/Warning.*componentWillMount has been renamed/.test(args[0])) {
            return
        }
        originalWarning.call(console, ...args)
    }
})

afterAll(() => {
    console.warn = originalWarning
})
