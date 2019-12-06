import React from 'react';
import Metronome from '../shared/metronome';
import { List, Row, Col, Button, Dropdown, Menu, Icon } from 'antd';
import { modals } from '../shared/constants';

export default class Track extends React.Component {
  constructor(props) {
    super();

    this.metronome = new Metronome({ bpm: props.bpm });
    this.state = {
      internalTimer: props.timer
    };
  }

  componentDidMount() {
    const { isActive, timer } = this.props;
    if (isActive) {
      this.setState({
        internalTimer: timer
      });
      this.setTimer();
    }
  }

  componentDidUpdate(prevProps) {
    const { isActive, timer, bpm } = this.props;
    if (prevProps.isActive !== isActive && isActive) {
      this.setState({
        internalTimer: timer
      });
      this.setTimer();
    }

    if (prevProps.isActive !== isActive && !isActive) {
      this.metronome.stop();
      clearInterval(this.interval);
    }

    if (prevProps.bpm !== bpm) {
      this.metronome = new Metronome({ bpm: bpm });
    }
  }

  setTimer() {
    const { onFinish } = this.props;

    this.metronome.start();
    this.interval = setInterval(() => {
      const { internalTimer } = this.state;
      if (internalTimer === 1) {
        onFinish();
        this.metronome.stop();
        clearInterval(this.interval);
      }

      this.setState({
        internalTimer: internalTimer - 1
      });
    }, 1000);
  }

  render() {
    const {
      id,
      name,
      description,
      bpm,
      timer,
      isActive,
      onPlay,
      onPause,
      workoutId,
      openModal,
      deleteTrack
    } = this.props;
    const { internalTimer } = this.state;

    return (
      <List.Item style={{ background: 'white', flexWrap: 'wrap' }}>
        <Row type="flex" align="middle" style={{ width: '100%' }}>
          <Col span={2}>
            <Button
              shape="round"
              type="primary"
              icon={isActive ? 'pause' : 'caret-right'}
              onClick={isActive ? onPause : onPlay}
            />
          </Col>
          <Col span={18}>
            <div>
              <b>{name}</b>
            </div>
            {description} BPM: {bpm}
            <br />
          </Col>
          <Col span={3} align="right">
            {timer} / {internalTimer} sec
          </Col>
          <Col span={1} align="right">
            <Dropdown
              trigger={['click']}
              placement="bottomRight"
              overlay={
                <Menu>
                  <Menu.Item
                    onClick={() =>
                      openModal({
                        modal: modals.MANAGE_TRACK,
                        meta: { workoutId, trackId: id }
                      })
                    }
                  >
                    <Icon type="edit" />
                    Edit Track
                  </Menu.Item>

                  <Menu.Item onClick={() => deleteTrack(workoutId, id)}>
                    <Icon type="delete" />
                    Delete Track
                  </Menu.Item>
                  <Menu.Item
                    onClick={() =>
                      openModal({
                        modal: modals.TRACK_TAB,
                        meta: { file: '/minor-pentatonic.gp5' }
                      })
                    }
                  >
                    <Icon type="database" />
                    Open Tab
                  </Menu.Item>
                </Menu>
              }
              icon={<Icon type="user" />}
            >
              <Button size="small" icon="setting" shape="circle-outline" />
            </Dropdown>
          </Col>
        </Row>

        <Row type="flex" align="middle" style={{ width: '100%' }}>
          <div id={`alpha-tab-${id}`} style={{ width: '713px' }}></div>
        </Row>
      </List.Item>
    );
  }
}
