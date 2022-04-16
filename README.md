## Full Stack open 2022 Course Repo

This repo consists of my learning journey through https://fullstackopen.com/en/ which is generously made free by the University of Helsinki.

>Learn React, Redux, Node.js, MongoDB, GraphQL and TypeScript in one go! This course will introduce you to modern JavaScript-based web development. The main focus is on building single page applications with ReactJS that use REST APIs built with Node.js.

#### Part 0 Fundamentals of Web apps
- Intro to how HTTP requests are made to the server and how servers respond
- Intro to HTML, CSS, and forms

#### Part 1 Introduction to React
- ES6 syntax let, const, arrow notation, etc.
- React functional components
- Passing props, rendering components, useState hook, immutable state handling

#### Part 2 Communicating with server
- Using map to render collections with key attribute
- controlled inputs
- Fetch and axios, and promises
- useEffect hook and its dependency array
- REST api GET, POST, Put replace, PATCH update
- Styling using inline and .className syntax

#### Part 3 Programming a server with NodeJS and Express
- REST api using Node and Express with data in MongoDB
- Middleware for handling req and res objects
- CORs
- Deploying to Heroku, procfile
- dotenv configurations
- Mongoose model methods find()
- linting using eslint

#### Part 4 Testing Express servers, user administration
- backend controllers for handling routes
- Jest testing toBe(), describe blocks, beforeEach() and afterAll()
- async/await syntax
- bcrypt password hashing
- model.populate() to simulate joins of relational database
- jsonwebtoken for user authentication stored in authorization header
- alternatives: server side sessions and/or cookies

#### Part 5 Testing React apps
- local storage for non-sensitive settings, JSON.stringify() to save objects
- props.children
- useRef, forwardRef and useImperativeHandle
- prop-types
- Jest testing library, user-event input simulation, mocking dependencies, findByText, queryByText, expect(div).toBe
- End to End (E2E) testing using Cypress, cy.get, chaining should, cy.visit, cy.get("#ele").type("text")

#### Part 6 State management with Redux
- flux architecture
- reducers to define impact of actions to state, type and field data
- action creators
- store provider
- useDispatch and useSelector hooks
- combineReducers or configureStore
- createSlice to create reducers and actions
- redux thunk async action creators to further abstract away logic from presentational components
- older form instead of hooks using connect, mapStateToProps, and mapDispatchToProps

#### Part 7 React router, custom hooks, styling app with CSS and webpack
- react-router-dom, BrowserRouter, Routes, Link, path, to
- useParams, useMatch, useNavigate hooks
- rule of hooks: same initalization, use in react functional components
- custom hooks start with use and follow rule of hooks, can group hooks
- UI frameworks such as Bootstrap or MaterialUI, Styled Components
- Webpack bundling, loaders, babel transpilation, polyfill to add browser missing functionality
- older React code using classes: constructor, super, this, and render method
- Open Web Application Security Project OWASP for security best practices, SQL injection, XSS, broken auth - add Helmet to backend
- mentioned server side rendering, progressive web app to make site mobile, and backend composed of microservices service workers

#### Part 8 GraphQL
- alternative to rest to help simplify complex data requests
- Apollo Server and GraphQL
- schemas, queries, mutations, resolvers
- Apollo error handling mechanism UserInputError
- Apollo client for frontend, wrap app in ApolloProvider
- useQuery and useMutation hooks, refetchQueries param, onError option
- GraphQL variables prefixed $
- resolvers have 4 params: (root, args, context, info)
- setup server object with typeDefs, resolvers, context
- useApolloClient hook, caching, fragments to simplify queries, and subscriptions using websockets useSubscription hook
- n+1 problem causing many queries and using DataLoaders as a possible solution

#### Part 9 TypeScript
- Superset of js for type safety, static code analysis, etc.
- interfaces, type, union, utility types, unknown, void, any, type guards, enums, extending interfaces
- ts-node and ts-node-dev
- tsconfig.json with eslint to further enforce coding style
- npx create-react-app my-app --template typescript and make react components end in *.tsx or *.ts
- interface for component props to replace prop-types library
- set expected type of incoming data axios.get<Type[]>
- Formik to simplify handling forms

I have not gone through the course material for the topics below this line. Though if I want to learn a topic below then I'll know where to pick up.

---
#### Part 10 React Native

#### Part 11 CI/CD

#### Part 12 Containers

#### Part 13 Using relational databases