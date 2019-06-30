import React from "react";
import { connect } from "react-redux";
import ManageWorkout from "./ManageWorkout";
import ManageTrack from "./ManageTrack";
import { closeModal as closeModalAction } from "../../redux/modules/general/actions";
import { modals } from "../../shared/constants";

function Modals({ closeModal, opened, meta }) {
  return (
    <>
      <ManageWorkout
        visible={opened === modals.MANAGE_WORKOUT}
        meta={meta}
        closeModal={closeModal}
      />
      <ManageTrack
        visible={opened === modals.MANAGE_TRACK}
        meta={meta}
        closeModal={closeModal}
      />
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
