import React from 'react';
import { withRouter, generatePath } from 'react-router';
import { connect } from 'react-redux';
import { Modal, Form, Input, Button } from 'antd';
import {
  createWorkout as createWorkoutAction,
  updateWorkout as updateWorkoutAction
} from '../../redux/modules/workouts/actions';
import * as paths from '../../shared/paths';

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

class ManageWorkout extends React.Component {
  handleSubmit = e => {
    e && e.preventDefault();
    const {
      form,
      createWorkout,
      updateWorkout,
      closeModal,
      history,
      workout
    } = this.props;

    form.validateFields(async (err, values) => {
      if (!err) {
        let responseWorkout;

        if (!workout) {
          responseWorkout = await createWorkout(values);
        } else {
          updateWorkout(workout.id, values);
          responseWorkout = workout;
        }

        history.push(generatePath(paths.WORKOUT, responseWorkout));
        closeModal();
      }
    });
  };

  render() {
    const { closeModal, visible, form, workout } = this.props;
    const { getFieldDecorator, getFieldsError } = form;

    return (
      <Modal
        title={`${workout ? 'Edit' : 'Create'} workout`}
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
            {workout ? 'Edit' : 'Create'}
          </Button>
        ]}
      >
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="Name">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: 'Please add a name to your new workout'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Description">
            {getFieldDecorator('description')(<Input />)}
          </Form.Item>
          <button type="submit" style={{ display: 'none' }} />
        </Form>
      </Modal>
    );
  }
}

const actions = {
  createWorkout: createWorkoutAction,
  updateWorkout: updateWorkoutAction
};

function mapStateToProps(state, props) {
  if (!props.meta) return {};

  const workout = state.workouts.byId[props.meta.id];

  return {
    workout
  };
}

export default connect(
  mapStateToProps,
  actions
)(
  Form.create({
    name: 'manage-workout',
    mapPropsToFields({ workout }) {
      if (!workout) return {};

      return {
        name: Form.createFormField({
          value: workout.name
        }),
        description: Form.createFormField({
          value: workout.description
        })
      };
    }
  })(withRouter(ManageWorkout))
);
