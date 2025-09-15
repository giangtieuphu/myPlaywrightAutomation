import { test, expect } from "@playwright/test";

test.beforeEach(async ({ request }) => {
});

test("GET API - Demoqa Books", async ({ request }) => {
    // Send the api request and measure the response time
    const startTime = Date.now();
    const response = await request.get("https://demoqa.com/BookStore/v1/Books")
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    // Verify the request status code
    expect(response.status()).toBe(200)

    // Verify the response time is less than 2 seconds
    console.log(`Response time: ${responseTime} ms`);
    expect(responseTime).toBeLessThan(2000);
    
    // Print all the response headers
    // Way 1 - headersArray()
    console.log('=========Headers Array:========='); 
    response.headersArray().forEach(header => {
        console.log(`${header.name}: ${header.value}`);
    });
    // Way 2 - headers()
    console.log('=========Headers Object:=========');
    console.log(response.headers());

    // Verify the number of books in the response
    const responseObject = await response.json()
    expect(responseObject.books).toHaveLength(8);

    console.log('=========Book titles:=========');    
    for (const book of responseObject.books) {
        console.log(book.title);
    }

    // Verify all the book titles
    const titles = ['Git Pocket Guide', 'Learning JavaScript Design Patterns', 
                    'Designing Evolvable Web APIs with ASP.NET', 'Speaking JavaScript',
                    'You Don\'t Know JS', 'Programming JavaScript Applications',
                    'Eloquent JavaScript, Second Edition', 'Understanding ECMAScript 6']

    for (let i = 0; i < responseObject.books.length; i++) {
        expect(responseObject.books[i].title).toBe(titles[i]);
    }
});
