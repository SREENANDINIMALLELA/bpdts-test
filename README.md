# bpdts-app

### Overview
An API which calls https://bpdts-test-app.herokuapp.com/, and returns people who are listed as either living in London, or whose current coordinates are within 50 miles of London.



## Dependencies
 - Express
 - Nodemon
 - Mocha
 - Chai
 - Chai-http
 - Nock
 - Axios
 - Lodash
 - Geolib

## Running Locally

Setup
```
npm install
```
Run
```
node app.js
```

### Calling API
Postman (GET)
```
localhost:3000/users/London
```
Curl
```
curl -X GET "http://localhost:3000/users/London" -H "accept: application/json"
```


## Testing
Run
```
npm test
```