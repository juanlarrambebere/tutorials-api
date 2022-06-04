# Tutorials API

This API provides some endpoints to manage users' tutorials. As an API user you can:

1. Create users with an specific role `user` or `admin`.
2. Authenticate with users previously created (if you know their credentials)
3. If you are authenticated:
   1. List all the existing posts (you can see tutorials from other users).
   2. If you are an admin:
      1. Create tutorials
      2. Delete your tutorials (individually or massively)
      3. Update your tutorials

<b>Disclaimers:</b>

1. It doesn't make too much sense to allow creating admin users without authentication, but since users' creation was not part of the plan I decided to keep it simple. In the real world that endpoint should at least require authentication and only allow admins to create new admins.

2. I decided to skip the endpoint that was intended to provide a token for creating tutorials. In my mind it made more sense to make the hole API secure and use the token provided by the auth method in the authorization phase.

# Domain model:

[domain model](https://user-images.githubusercontent.com/18520314/171967440-9d442689-c878-4477-b333-0c5406322892.png)

- A user might own many tutorials
- A tutorial belongs to a single user.

# Endpoints

In [postman collection](./postman-collection/tutorials-api.postman_collection.json) you will find a postman collection with all the endpoints this API provides.

Notes:

1. All the endpoints are using a postman environment variable `{{baseUrl}}` for the base url. Its value must be `http://localhost:8080`.
2. All the authenticated endpoints are using a postman environment variable `{{accessToken}}` for the access token. You can set this variable manually or use the authentication endpoint. That endpoint has a test script that sets the variable for you when the authentication works (it will also clear it if the authentication fails)

### Endpoints that don't require authentication

#### Create a user

```
curl --location --request POST 'http://localhost:8080/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Juan",
    "lastName": "Perez",
    "email": "juan.perez@gmail.com",
    "password": "A1aaaaa%",
    "role": "admin"
}'
```

#### Authenticate with an user's credentials

```
curl --location --request POST 'http://localhost:8080/auth' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "juan.perez@gmail.com",
    "password": "A1aaaaa%"
}'
```

If the credentials are ok, it'll return an accessToken.

### Endpoints that require authentication

#### Create a tutorial

```
curl --location --request POST 'http://localhost:8080/tutorials' \
--header 'X-Access-Token: <your access token>' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "A title",
    "videoUrl": "http://klsdfklksldf.com",
    "description": "A description for the tutorial",
    "status": "published"
}'
```

#### Get a tutorial

```
curl --location --request GET 'http://localhost:8080/tutorials/<tutorialId>' \
--header 'X-Access-Token: <your access token>'
```

#### List tutorials

```
curl --location --request GET 'http://localhost:8080/tutorials?offset=0&limit=50&title=test&description=test&sortBy=id' \
--header 'X-Access-Token: <your access token>'
```

Notes
| Query param name | Description | Possible values | Default |
| ---------------- | ----------- | --------------- | ------- |
| title | Filters the tutorials by title using SQL LIKE operator | any string | undefined
| description | Filters the tutorials by description using SQL LIKE operator | any string | undefined
| offset | Sets an offset for the query | any number | 0
| limit | Sets a limit for the query | any string between 0 and 200 | undefined
| sortBy | Allows sorting by a field in ascending or descending order | `id` or `-id` | `id`

Note: The sortBy operator uses will sort tutorials in descending order if the value has the prefix `-`. Otherwise it'll sort tutorials in ascending order.

#### Delete a tutorial

```
curl --location --request DELETE 'http://localhost:8080/tutorials/<tutorialId>' \
--header 'X-Access-Token: <your access token>'
```

Note: If the tutorial exists and it's removed, the response's status code will be 200, otherwise it will be 204.

#### Delete all your tutorials

```
curl --location --request DELETE 'http://localhost:8080/tutorials/mass_delete' \
--header 'X-Access-Token: <your access token>'
```

# Development

## Stack:

- NodeJS
- TypeScript
- Express
- Sequelize
- Mysql
- Jest

## Pre-requisites:

1. The api was developed using node `v16.14.0`. So please, make sure to use that version or at least, another `16.x.y` version.
2. When the app starts it alters the database to create all the necessary tables, indexes, etc. But it assumes mysql is up and running and the schema exists, so please, before running it for the first time make sure to create a schema called `tutorials`.
3. For security reasons, the app requires some environment variables that needs to set for it to work. in [env.sample](/.env.sample) You'll find all the required env variables as well an example value for each one of them. Make sure to create an `.env` file in the root of the project and set them up (you can execute `cp .env.sample .env`)

## Start

1. `npm i` to install dependencies
2. `npm run dev` to run the app in development mode (with hot reloading)

or

1. `npm i` to install dependencies
2. `npm run build` to build the app. # It will generate a dist folder that can be be deployed.
3. `npm start` to run the latest build.

If every pre-requisite was meet, then the app should be and running at http://localhost:8080 !

## Tests

- `npm run test` to launch tests with hot reloading.
  `npm run test:ci` to run all tests as you would do it in the CI environment.

Note: I didn't write tests for everything since it's super time consuming. In a real life scenario I would make sure to do it. But I assumed that testing a sample of the files/functions was enough for the purposes of this demo.

I like to have the specs next to the source files they target, that's why you'll note that the files that has a spec are placed into a dedicated folder. Example:

```
- folderA
   - fileA.ts
   - fileA.spec.ts
```
