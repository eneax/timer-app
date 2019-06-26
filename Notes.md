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


## 2. Build a static version of the app

Our components start off without using any state. 
Just static HTML and CSS with static props that are passed from the parent component to the children.
The bottom-level components are those in charge of holding the majority of the page's HTML and they are called leaf components.
Meanwhile, the components situated above the leaf components have to deal with the orchestration of the app.


## 3: Determine what should be stateful

To understand what exactly should be mutable, we need to look at where we define and use props, because there is where *data* will be.
Once we have identified the data, we need to consider if it is state or not. It is stateful when:

* data is defined within the component and not passed in from a parent
* it changes over time
* it cannot be computed from other state or props
* we have to deal with form (special case)


## 4: Determine in which component each piece of state should live

For each piece of state:

* identify every component that renders something based on that state
* find a common owner component (a single component above all the components that need the state in the hierarchy)
* either the common owner or another component higher up in the hierarchy should own the state
* if you can’t find a component where it makes sense to own the state, create a new component simply for holding the state and add it somewhere in the hierarchy above the common owner component


## 5: Hard-code initial states

Before communicating with a server, we need to define the initial states within the parent components and make sure that the state is passed down to the children.

Props act as a one-way data pipeline. While state is initially managed by parent components, it flows subsequently down to the children as props.

Once the state is updated, the parent component that manages that state calls *render()* and re-renders while causing its children to re-render as well.


### Special Case: Forms

In React, forms are stateful. Forms are made of inputs fields which are modifiable by the user.
All modifications that are made to a component should be handled by React itself and kept in state.

Allowing React to deal with all the modifications, helps us to maintain in sync the visual component that the user is interacting with on the DOM with the state of the React component.

Let's see with an example how to deal with forms:

```
class TimerForm extends React.Component {
  state = {
    title: this.props.title || '',
  };

  ...

  render() {
    <div>
      <label>Title</label>
      <input 
        type='text'
        value={this.state.title}
      />
    </div>
  }
}
```

In this case, we set the state of the property to the value passed down via props. If we are creating a new TimerForm, the title will be empty. If we are editing an existing TimerForm, the title will be taken from the state.

The main problem with this approach is that we don't have a way for the user to modify this state. Initially, the input will be in-sync with the state; however, when the user will make any modification, the input field will become out-of-sync with the component's state.

React provides an easy fix to this issue, allowing us to use the **onChange** attribute for the input element. Every time the input field changes, React will invoke the function that we specify inside the onChange attribute (*handleTitleChange*).

```
class TimerForm extends React.Component {
  state = {
    title: this.props.title || '',
  }

  handleTitleChange = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  render() {
    <div>
      <label>Title</label>
      <input 
        type='text'
        value={this.state.title}
        onChange={this.handleTitleChange}
      />
    </div>
  }
}
```

React invokes the handleTitleChange function, that we pass to onChange, with an event object (e).
The event object will include the updated value of the input field inside the *target.value*, that will be used to update the state to the new value and maintain it in-sync with the input field.


## 6: Add inverse data flow

So far, we saw that children communicate with parents by calling functions that are passed to them via props.
The next step consists in adding *onClick* handlers to the buttons, in order to call functions that are passed down as props from the components that own the state being manipulated.

