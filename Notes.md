##### Notes from [Fullstack React Book](https://www.fullstackreact.com/)


# Framework for developing a React app

When building a React app, there is a series of steps to follow in order to make the entire process more efficient:

1. Break the app into components
2. Build a static version of the app
3. Determine what should be stateful
4. Determine in which component each piece of state should live 
5. Hard-code initial states
6. Add inverse data flow
7. Add server communication


## 1. Breaking the app into components

When we think about components, we have to consider them as functions or objects. A component should only be responsible for one piece of functionality (single responsibility principle).
The main advantage of the *single responsibility principle* is that it helps keeping components simple and reusable.
