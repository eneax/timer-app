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
