import React from 'react';

export default class Track extends React.Component {
  constructor(props) {
    super();

    this.state = {
      internalTimer: props.timer
    };
  }

  componentDidMount() {
    const { active, timer } = this.props
    if (active) {
      this.setState({
        internalTimer: timer
      });
      this.setTimer()
    }
  }

  componentDidUpdate(prevProps) {
    const { active, timer } = this.props
    if (prevProps.active !== active && active) {
      this.setState({
        internalTimer: timer
      });
      this.setTimer()
    }

    if (prevProps.active !== active && !active) {
      clearInterval(this.interval)
    }
  }

  setTimer() {
    const { onFinish } = this.props

    this.interval = setInterval(() => {
      const { internalTimer } = this.state
      if (internalTimer === 1) {
        onFinish()
        clearInterval(this.interval)
      }

      this.setState({
        internalTimer: internalTimer - 1
      });
    }, 1000)
  }

  render() {
    const {
      label,
      bpm,
      active,
      onActivate
    } = this.props;
    const { internalTimer } = this.state

    return (
      <li onClick={onActivate}>
        {label} - {bpm}bpm - {internalTimer}sec ---- {active}
      </li>
    )
  }
}
