# rickmorty-be

## Environment Setup

### Required tools

- Node v14.18.1
- Docker (latest)

### Environment setup (Windows)

1. Download and install Node.js v14.18.1
2. Download and install [Docker](https://www.docker.com/products/docker-desktop)

### Startup

1.  Open two terminals
2.  Navigate to the project directory in both of them `cd path/to/project`
3.  On terminal #1 run `docker-compose up --build`
4.  On terminal #2 run `npm instal`
5.  On terminal #2 run `npm start` to start the development environment

### Libraries used

1. `axios` - for handling HTTP requests
2. `js-sha256` - for hashing passwords
3. `jsonwebtoken` - for generating  JWT tokens
4. `mongoose` - for handling MongoDB
5. `express-mongo-sanitize` - for sanitizing user input
6. `prettier, eslint` - for code formatting and code quality
