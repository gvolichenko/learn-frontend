import { checkForName } from "../src/client/js/nameChecker.js"
import { TestScheduler } from "jest"

test('nameChecker returns an alert for numbers', () => {
    expect (checkForName('12345')).toBe('firing an alert');
});