# JBook

This project is an interactive browser-based coding environment, like a Jupyter Notebook, but for Javascript.
This tool it's about bundling and transpiling code directly in the browser, so that's possible to execute users' code safely in the browser just like how services like CodeSandBox and CodePen do.

The project is deployed using a multi-package architecture to NPM, so that it can be easily downloaded and run.

I built this for the sake of practice programming concepts, such as:

- Integrate React and Redux together with Typescript
- Simplify Redux state updates with the Immer library
- Build a complex app (in-browser transpiler + bundler) using a package-based architecture
- Understand the challenges of in-browser code transpiling and and processing
- Safely execute user-provided code directly in the browser
- Run a code editor directly in the browser, using the same editor used by VSCode
- Use Redux middlewares to handle complicated business logic flows
- Leverage Web Assembly to run a code bundler directly and faster in the browser
- Automate multi package management and publishing using the Lerna CLI
- Deploy an app to the NPM registry

## Description

The project is split in three packages, each one representing a different application layer:

- **Local Client**: is the React/Redux app that contains the logic of the transpiler. You can add/move/delete blocks of formatted text or javascript code as you wish in your browser.
- **Local API**: is a basic Express API that exposes the app features, and handles the persistence of users' notebook in a json file in the local machine.
- **CLI**: command line tool to execute the application. By default it launches a server listening on port 4005 and creates a file called _notebook.js_ to store your blocks of text and/or code in the order you define. You can pass a different file name and a different port number if yuou wish.

As you go on adding javascript code to your code blocks, you can use them or reference them in the following ones, as the whole code added is accumulative.

Besides, you can use a custom function called show() to add anything to the DOM, like this:

![image](https://github.com/gmateosAWS/jbook/assets/123112743/d7822527-2842-423b-8993-9714aaa6b0c1)

## Getting Started

### Installing

Use the npm installer to install everything you need to use the three packages.

```bash
npm i gmateos-jbook
```

### Executing program

Or yoy can just use **npx** to run it locally:

```bash
npx gmateos-jbook serve
```

This command will launch the app listening on local port 4005 and creating a notes file called _notebook.js_. If you want you can pass your own arguments to the function. Examples:

```bash
npx gmateos-jbook serve mybook.js --port 4000
```

```bash
npx gmateos-jbook serve -p 4050
```

### Dependencies

- [@gmateos-jbook/local-client](https://www.npmjs.com/package/%40gmateos-jbook%2Flocal-client)

### DevDependencies

- [@gmateos-jbook/local-api](https://www.npmjs.com/package/%40gmateos-jbook%2Flocal-api)
- [@types/node](https://www.npmjs.com/package/%40types%2Fnode)
- [commander](https://www.npmjs.com/package/commander)
- [esbuild](https://www.npmjs.com/package/esbuild)
- [typescript](https://www.npmjs.com/package/typescript)

## Authors

Contributors names and contact info

ex. [Gustavo Mateos](https://www.linkedin.com/in/gustavomateossantos/)

## ToDo list

This project is just a basic practice app. In order to scale it to a production platform, there are a few things that would need to be developed:

- Unit testing.
- User management: register, login,...
- Persist user notebooks in a proper backend database, MongoDB style.
- Extend API features to let users handle more than one notebook from their user account and manage them with the option to create, edit, remove, archive, and so on.
- CI/CD deployment and Cloud setup for scalability and reliability.
