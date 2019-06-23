import React from 'react';
import routine from './routine'
import Track from './components/Track'

class  App extends React.Component {
  state = {
    currentTrack: 0,
    working: false,
  }
  render() {

    const {
      currentTrack,
      working
    } = this.state

    return (
      <div>
        <ul>
          {routine.map((r, i) => {
            return (
            <Track
              key={i}
              {...r}
              active={(currentTrack === i && working)}
              onActivate={() => {
                this.setState({
                  currentTrack: i,
                  working: true,
                })
              }}
              onFinish={() => {
                if (!routine[i + 1]) {
                  this.setState({
                    currentTrack: 0,
                    working: false
                  })
                } else {
                  this.setState({
                    currentTrack: i + 1,
                  })
                }
              }}
            />
            )
          })}
        </ul>
      </div>
    );
  }
}

export default App;
