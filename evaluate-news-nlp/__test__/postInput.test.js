import { getResult, postInput } from "../src/client/js/formHandler.js"
import { TestScheduler } from "jest"
require('jest-fetch-mock').enableMocks()


describe('Testing post/get of the submit functionality', () => {
test('postInput promise resolves successfully', async () => {
    await expect(postInput('http://localhost:8081/posttext','dummy text')).resolves.toBe('done posting');
})
})
;
