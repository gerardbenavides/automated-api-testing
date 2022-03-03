# Automated API Tests Framework

## Features

- BDD-style test automation with Mocha
- Page Object Model pattern
- Organized test file structure
- Continuous testing CI/CD with GitHub Actions
- Slack report notification
- Parallel test runs on local or in cloud
- Spec and Mochawesome reporters
- Run on different environments
- Test data generators

## Installation

### Pre-requisites

This uses [yarn](https://yarnpkg.com/) package manager.

- In order to install **yarn**, you need **npm** package manager from [NodeJs](https://nodejs.org/en/download/). Download the LTS version of NodeJS.
- Once downloaded install NodeJS. Once done, `npm` is available on your machine.
- You may install **yarn** now by opening your terminal _(CMD for Windows and Terminal for Mac)_ and run the following command `npm install yarn`

You may verifiy if yarn is available on your machine by running the following command on your terminal `yarn --v`. This should show the version of yarn installed on your machine.

### Getting started

1. Clone the [Automated API Testing repository](https://github.com/gerardbenavides/automated-api-testing) from Github
2. To install project dependencies, go to the cloned repository directory folder from your machine
3. Open terminal from there and run command `yarn`. This will start installing the dependencies

### Running tests

- Run the entire suite with `yarn test:dev` or `yarn test:stage`
- Or run a subset with e.g. `yarn test:dev-subset specs/users/`

### Technologies used

#### Core

- [Mocha](https://mochajs.org/) - For testing framework
- [Supertest](https://www.npmjs.com/package/supertest) - For sending API requests and also comes with built-in assertions
- [Chai](https://www.chaijs.com/) - For more wider range of assertions

### Folder structure as of June 2021:

```
/api
```

- This folder contains classes that have reusable functions that can be used on test files
- `_api.js` is the base class that contains common functions that are reusable by any tests
- The rest of the files inside this folder are also classes that are more specific to only resources. Let's call these **resource-specific** files e.g. Superuser resource is to `superuser.js` resource file. `superuser.js` contains reusable functions that are specific to **Superuser** tests. (You may use this on non-Superuser tests but that's uncommon scenario)
- These resource-specific files extends the `_api.js`, meaning, all functions that are in `_api.js` can also be used as if the resource-specific files owned them.

```
/environments
```

- This folder contains configurations files intended to use on specific environment (stage, prod, etc.)
- Each environment is configured separately. One improvement for this is to have a base environment configuration file and just use that to extend to environment-specific configuration
- Also in the configuration files, environment-specific data that are being used in tests are stored here e.g. user, event, merch data, etc are stored here

```
/specs
```

- This folder contains all test files
- Naming convention would be `{resource}.spec.js` e.g. for Supueruser, it would be `superuser.spec.js`. the `.spec` extension is for easily identify test files when executing test runs

### Test/spec file structure

We use **Mocha framework** `async` for our API tests and the basic structure for this is the `describe` - `it` blocks

```
describe() {
    it()
}
```

But in our case, I would prefer the `describe` - `describe` - `it` blocks.

- First `describe` = The first describe block is the resource name
- Second `describe` = Method type of request (GET, POST, PATCH, DELETE)
- Third `describe` = Endpoint with more details in the following format = {`METHOD`} {`endpoint`} - {`Description`}
- `it` = Actual test blocks

```
describe ('ACCESS CODES') {
  describe('POST) {
    describe('POST /access_codes - Generate Access Code') {

        it('Can generate an access code for a valid event ID and valid artist brand ID') {
            // test code block
        }
        it('Can generate an access code with a desired discount value') {
            // test code block
        }
    }
  }
}
```

**NOTE:** We can have only **one** `1st describe` block, but **multiple** `2nd describe` and `it` blocks.

```
/utils
```

- This folder contains helpful utilities can be used on tests e.g. image files, random data generating files, etc.
