import { addWeather } from "../src/server/index.js"
import { TestScheduler } from "jest"

test('addWeather posts nothing when supplied nothing', () => {
    expect (addWeather({})).toBeUndefined();
});