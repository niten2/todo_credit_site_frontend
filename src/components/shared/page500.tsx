import * as React from "react"

class Page500 extends React.Component<{}, {}> {
  render() {
    return (
      <div className="app flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">

              <div className="clearfix">
                <h1 className="float-left display-3 mr-4">500</h1>
                <h4 className="pt-3">Houston, we have a problem!</h4>
                <p className="text-muted">The page you are looking for is temporarily unavailable.</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Page500
