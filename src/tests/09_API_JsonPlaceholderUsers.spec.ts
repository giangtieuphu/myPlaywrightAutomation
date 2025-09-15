import {test, expect} from '@playwright/test';

test("GET API - JsonPlaceholder Users", async ({request}) => {
    // Send the api request and measure the response time
    const startTime = Date.now()
    const response = await request.get("https://jsonplaceholder.typicode.com/users")
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

    // Verify the number of users in the response
    const responseObject = await response.json()
    expect(responseObject).toHaveLength(10)

    console.log('=========User names:=========')
    for (const user of responseObject) {
        console.log(user.id)
        console.log(user.name)
        console.log(user.email)
        console.log(user.username)
    }   
    
    // Verify all the user names
    const usernames = [ 'Bret', 'Antonette', 'Samantha', 'Karianne', 
                        'Kamren', 'Leopoldo_Corkery', 'Elwyn.Skiles', 
                        'Maxime_Nienow', 'Delphine', 'Moriah.Stanton']

    for (let i = 0; i < responseObject.length; i++) {
        expect(responseObject[i].username).toBe(usernames[i])
    }
});