import * as React from 'react'
import Spinner from "react-spinkit"

class Loading extends React.Component<any, any> {

  render() {
    return (
      <div className="app flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">

            <Spinner
              name="ball-grid-pulse"
              noFadeIn={false}
              color="red"
            />

          </div>
        </div>
      </div>
    )
  }

}

export default Loading
