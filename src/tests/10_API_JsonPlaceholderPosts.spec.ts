import {test, expect } from "@playwright/test";

test("GET API - JsonPlaceholder Posts", async ({ request }) => {
    // Send the api request and measure the response time
    const startTime = Date.now()
    const response = await request.get("https://jsonplaceholder.typicode.com/posts")
    const endTime = Date.now()
    const responseTime = endTime - startTime   

    // Verify the request status code
    expect(response.status()).toBe(200)

    // Verify the response time is less than 2 seconds
    console.log(`Response time: ${responseTime} ms`)
    expect(responseTime).toBeLessThan(2000)

    // Print all the response headers
    console.log('=========Headers Array:=========')
    response.headersArray().forEach(header => {
        console.log(`${header.name}: ${header.value}`)
    })
    console.log('=========Headers Object:=========')
    console.log(response.headers())

    // Verify the response headers
    expect(response.headers()['content-type']).toBe('application/json; charset=utf-8');
    expect(response.headers()['x-powered-by']).toBe('Express');
    expect(response.headers()['pragma']).toBe('no-cache');
    expect(response.headers()['expires']).toBe('-1');
    expect(response.headers()['access-control-allow-credentials']).toBe('true');
    expect(response.headers()['x-content-type-options']).toBe('nosniff');
    expect(response.headers()['connection']).toBe('keep-alive');
    expect(response.headers()['transfer-encoding']).toBe('chunked');
    expect(response.headers()['server']).toBe('cloudflare');

    // Verify the number of articles in the response
    const responseObject = await response.json()
    expect(responseObject).toHaveLength(100)

    console.log('=========Post titles:=========')
    for (const post of responseObject) {
        console.log(post.id)
        console.log(post.title)
        console.log(`User id: ${post.userId}`)
    }
});