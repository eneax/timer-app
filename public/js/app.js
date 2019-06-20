class TimerDashboard extends React.Component {
  render() {
    return (
      <div className="ui three column centered grid">
        <div className="column">
          <EditableTimerList />
          <ToggleableTimerForm 
            isOpen={true} // it's used by the child component to determine whether to render a “+” or TimerForm”
          />
        </div>
      </div>
    );
  }
}


class ToggleableTimerForm extends React.Component {
  render() {
    if (this.props.isOpen) {
      return (
        <TimerForm />
      );
    } else {
      <div className="ui basic content center aligned segment">
        <button className="ui basic button icon">
          <i className="plus icon" />
        </button>
      </div>;
    }
  }
}


class EditableTimerList extends React.Component {
  render() {
    return (
      <div id="timers">
        <EditableTimer 
          title='Learn React'
          project='Web Domination'
          elapsed='8986300'
          runningSince={null}
          editFormOpen={false}  // 'editFormOpen' determines which sub-component to render
        />

        <EditableTimer 
          title='Learn extreme ironing'
          project='World Domination'
          elapsed='3890985'
          runningSince={null}
          editFormOpen={true}
        />
      </div>
    );
  }
}


// “EditableTimer returns either a TimerForm or a Timer based on the prop 'editFormOpen'
class EditableTimer extends React.Component {
  render() {
    if (this.props.editFormOpen) {
      return (
        <TimerForm 
          title={this.props.title}
          project={this.props.project}
        />
      )
    } else {
      return (
        <Timer 
          title={this.props.title}
          project={this.props.project}
          elapsed={this.props.elapsed}
          runningSince={this.props.runningSince}
        />
      )
    }
  }
}


class Timer extends React.Component {
  render() {
    // elapsed is in milliseconds, but we use a helper function to render it as 'HH:MM:SS'
    const elapsedString = helpers.renderElapsedString(this.props.elapsed);

    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='header'>
            {this.props.title}
          </div>
          <div className='meta'>
            {this.props.project}
          </div>
          <div className='center aligned description'>
            <h2>
              {elapsedString}
            </h2>
          </div>
          <div className='extra content'>
            <span className='right floated edit icon'>
              <i className='edit icon' />
            </span>
            <span className='right floated trash icon'>
              <i className='trash icon' />
            </span>
          </div>
        </div>
        <div className='ui bottom attached blue basic button'>
          Start
        </div>
      </div>
    );
  }
}


class TimerForm extends React.Component {
  render() {
    const submitText = this.props.title ? 'Update' : 'Create';

    return (
      <div className="ui centered card">
        <div className="content">
          <div className="ui form">
            <div className="field">
              <label>Title</label>
              <input type="text" defaultValue={this.props.title} />
            </div>

            <div className="field">
              <label>Project</label>
              <input type="text" defaultValue={this.props.project} />
            </div>

            <div className="ui two bottom attached buttons">
              <button className="ui basic blue button">
                {submitText}
              </button>
              <button className="ui basic red button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


