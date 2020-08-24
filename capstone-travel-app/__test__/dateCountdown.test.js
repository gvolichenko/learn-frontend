import { dateCountdown } from "../src/client/js/app.js"
import { TestScheduler } from "jest"
require('jest-fetch-mock').enableMocks()


// this test was passed on 8/24/20
test('dateCountdown works correctly', () => {
    expect(dateCountdown('2020-09-01')).toBe(8);
})
