import * as React from 'react'
import Spinner from "react-spinkit/dist/"

const Loading = () => (
  <div className="app flex-row align-items-center">
    <div className="container">
      <div className="row justify-content-center">
        <Spinner name="ball-grid-pulse"/>
      </div>
    </div>
  </div>
)

export default Loading
