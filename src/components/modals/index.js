import React from 'react';
import { connect } from 'react-redux';
import ManageWorkout from './ManageWorkout';
import ManageTrack from './ManageTrack';
import TrackTab from './TrackTab';
import HiddenMetronomeSounds from './HiddenMetronomeSounds';
import { closeModal as closeModalAction } from '../../redux/modules/general/actions';
import { modals } from '../../shared/constants';

function Modals({ closeModal, opened, meta }) {
  console.log(opened);
  return (
    <>
      {opened === modals.MANAGE_WORKOUT && (
        <ManageWorkout meta={meta} closeModal={closeModal} />
      )}
      {opened === modals.MANAGE_TRACK && (
        <ManageTrack meta={meta} closeModal={closeModal} />
      )}
      {opened === modals.TRACK_TAB && (
        <TrackTab meta={meta} closeModal={closeModal} />
      )}
      {opened === modals.HIDDEN_METRONOME_SOUNDS && (
        <HiddenMetronomeSounds meta={meta} closeModal={closeModal} />
      )}
    </>
  );
}

function mapStateToProps({ general }) {
  const { modal } = general;
  return {
    ...modal
  };
}

const actions = {
  closeModal: closeModalAction
};

export default connect(
  mapStateToProps,
  actions
)(Modals);
