## KAWA-API

This is a node.js and express api, writen in typescript
to serve as an authentication api for the KAWA-APP.

In here you will find a docker-compose file with configurated
mongodb service, and the services of this node aplication. 

The idea with this api was to lear how to build a express api
with typescript and mocha tests, the api will receive the
callback request from the twitch and spotify authentications
flow to register the user access token to then deliver it to
the frontend application. 

### To Run Tests: 
`docker-compose run api yarn run test`

### To Run Dev Server: 
`docker-compose up api`

### To Run Lint + Build: 
`docker-compose run api yarn run build`


## TO-DO:
- Make twitch authentication callback
- Add to travisCI and coveralls