import React from 'react';
import { Modal, Button } from 'antd';

class TrackTab extends React.Component {
  componentDidMount() {
    const { file } = this.props.meta;

    setTimeout(() => {
      // window.at = window.$(`#track-tab`).alphaTab({
      //   file: file,
      //   tracks: [0],
      //   useWorker: true
      // })

      var at = window.$('#track-tab');
      at.alphaTab({
        width: -1, // negative width enables auto sizing
        file: file,
        useWorker: true
      });

      // Initialize Player and Setup Player UI
      // window.as = at.alphaTab('playerInit'); // init alphaSynth
    }, 100);
  }

  render() {
    const { closeModal } = this.props;

    return (
      <Modal
        width="900px"
        visible
        onCancel={closeModal}
        footer={[
          <Button key="close" onClick={closeModal}>
            close
          </Button>
        ]}
      >
        <div id="track-tab"></div>
      </Modal>
    );
  }
}

export default TrackTab;
