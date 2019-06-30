import React from "react";
import { List, Dropdown, Icon, Menu, Button, Row, Col } from "antd";
import { reorder, openFullscreen, byId } from "../shared/utils";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import Track from "../components/Track";
import {
  activateWorkout as activateWorkoutAction,
  pauseWorkout as pauseWorkoutAction,
  nextWorkout as nextWorkoutAction,
  reorderTracks as reorderTracksAction,
  deleteTrack as deleteTrackAction
} from "../redux/modules/workouts/actions";
import { getTracksList } from "../redux/modules/workouts/selectors";
import { openModal as openModalAction } from "../redux/modules/general/actions";
import { modals } from "../shared/constants";
import { DiscussionEmbed } from "disqus-react";

class Workout extends React.Component {
  onDragEnd = result => {
    const { tracks, workout, reorderTracks } = this.props;

    if (!result.destination) {
      return;
    }

    const reorderedTracks = reorder(
      tracks,
      result.source.index,
      result.destination.index
    );

    reorderTracks(workout.id, byId(reorderedTracks));
  };

  render() {
    const {
      workout,
      activateWorkout,
      pauseWorkout,
      nextWorkout,
      tracks,
      openModal,
      deleteTrack
    } = this.props;

    return (
      <div>
        <div>
          <Row type="flex" justify="space-between" align="middle">
            <Col span={23}>
              <h2 style={{ margin: "0" }}>{workout.name}</h2>
            </Col>
            <Col span={1}>
              <Dropdown
                trigger={["click"]}
                placement="bottomRight"
                overlay={
                  <Menu>
                    <Menu.Item
                      onClick={() =>
                        openModal({
                          modal: modals.MANAGE_WORKOUT,
                          meta: workout
                        })
                      }
                    >
                      <Icon type="edit" />
                      Edit Workout
                    </Menu.Item>

                    <Menu.Item
                      onClick={() =>
                        openFullscreen(
                          document.getElementById("root-container")
                        )
                      }
                    >
                      <Icon type="user" />
                      No distraction mode
                    </Menu.Item>
                  </Menu>
                }
                icon={<Icon type="user" />}
              >
                <Button icon="setting" shape="circle-outline" />
              </Dropdown>
            </Col>
          </Row>
          <p>{workout.description}</p>
        </div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppablet">
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <List itemLayout="horizontal">
                  {tracks.map((track, trackIndex) => (
                    <Draggable
                      key={track.id}
                      draggableId={track.id}
                      index={trackIndex}
                    >
                      {provided => (
                        <div
                          className="draggable"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Track
                            {...track}
                            workoutId={workout.id}
                            openModal={openModal}
                            deleteTrack={deleteTrack}
                            isActive={
                              workout.currentTrackId === track.id &&
                              workout.isActive
                            }
                            onFinish={() => nextWorkout(workout.id, track.id)}
                            onPlay={() => activateWorkout(workout.id, track.id)}
                            onPause={() => pauseWorkout(workout.id)}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  <List.Item style={{ background: "white" }}>
                    <Button
                      onClick={() =>
                        openModal({
                          modal: modals.MANAGE_TRACK,
                          meta: { workoutId: workout.id }
                        })
                      }
                      icon="plus"
                      type="primary"
                    >
                      Add new track
                    </Button>
                  </List.Item>
                </List>
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <DiscussionEmbed
          shortname="guitar-workout"
          config={{
            url: window.location.href,
            identifier: workout.id,
            title: workout.name
          }}
        />
      </div>
    );
  }
}

function mapStateToProps(state, { match: { params } }) {
  const workout = state.workouts.byId[params.id];
  return {
    workout,
    tracks: getTracksList(workout)
  };
}

const actions = {
  activateWorkout: activateWorkoutAction,
  pauseWorkout: pauseWorkoutAction,
  nextWorkout: nextWorkoutAction,
  reorderTracks: reorderTracksAction,
  openModal: openModalAction,
  deleteTrack: deleteTrackAction
};

export default connect(
  mapStateToProps,
  actions
)(Workout);
