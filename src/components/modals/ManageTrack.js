import React from "react";
import { connect } from "react-redux";
import { Modal, Form, Input, Button, InputNumber } from "antd";
import {
  createTrack as createTrackAction,
  updateTrack as updateTrackAction
} from "../../redux/modules/workouts/actions";

const formItemLayout = {
  labelCol: {
    xs: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 19 }
  }
};

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class ManageTrack extends React.Component {
  handleSubmit = e => {
    e && e.preventDefault();
    const {
      form,
      createTrack,
      updateTrack,
      closeModal,
      track,
      meta
    } = this.props;

    form.validateFields(async (err, values) => {
      if (!err) {
        if (!track) {
          createTrack(meta.workoutId, values);
        } else {
          updateTrack(meta.workoutId, track.id, values);
        }

        closeModal();
      }
    });
  };

  render() {
    const { closeModal, visible, form } = this.props;
    const { getFieldDecorator, getFieldsError } = form;

    return (
      <Modal
        title="Create Track"
        visible={visible}
        onCancel={closeModal}
        footer={[
          <Button key="cancel" onClick={closeModal}>
            Cancel
          </Button>,
          <Button
            key="create"
            type="primary"
            disabled={hasErrors(getFieldsError())}
            onClick={this.handleSubmit}
          >
            Create
          </Button>
        ]}
      >
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="Name">
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "Please add a name to your new track"
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Description">
            {getFieldDecorator("description")(<Input />)}
          </Form.Item>
          <Form.Item label="BPM">
            {getFieldDecorator("bpm", {
              initialValue: 120,
              rules: [
                {
                  required: true,
                  message: "Please set the BPM for this track"
                }
              ]
            })(<InputNumber style={{ width: "100%" }} />)}
          </Form.Item>
          <Form.Item label="Timer">
            {getFieldDecorator("timer", {
              initialValue: 30,
              rules: [
                {
                  required: true,
                  message: "Please set a timer for this track"
                }
              ]
            })(<InputNumber style={{ width: "100%" }} />)}
          </Form.Item>
          <button type="submit" style={{ display: "none" }} />
        </Form>
      </Modal>
    );
  }
}

const actions = {
  createTrack: createTrackAction,
  updateTrack: updateTrackAction
};

function mapStateToProps({ workouts }, { meta }) {
  if (!meta || !meta.trackId) return {};
  const { workoutId, trackId } = meta;
  const track = workouts.byId[workoutId].tracks.byId[trackId];
  return {
    track
  };
}

export default connect(
  mapStateToProps,
  actions
)(
  Form.create({
    name: "manage-track",
    mapPropsToFields({ track }) {
      if (!track) return {};

      return {
        name: Form.createFormField({
          value: track.name
        }),
        description: Form.createFormField({
          value: track.description
        }),
        bpm: Form.createFormField({
          value: track.bpm
        }),
        timer: Form.createFormField({
          value: track.timer
        })
      };
    }
  })(ManageTrack)
);
