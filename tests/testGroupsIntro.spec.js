import { test } from "@playwright/test";

test.describe("User story", ()=>{

    test.beforeAll(async ()=>{
        console.log("==> Before all test cases");
    });
    
    test.afterAll(async ()=>{
        console.log("After all test cases <==");
    });
    test.beforeEach(async ()=>{
        console.log("Before each test case");
    });
    
    test.afterEach(async ()=>{
        console.log("After each test case");
    });

    test("Test case 1", async () => {
        console.log("Test case 1 started");
    });

     test('Test case 2', async () => {
        console.log("Test case 2 started");
     });

      test('Test case 3', async () => {
        console.log("Test case 3 started");
      });

});