import * as React from 'react'
import AuthProvider from "src/config/auth_provider"

class Dashboard extends React.Component {

  handleLogin = async () => {
    await new Promise((f,r) => {
      setTimeout(() => {
        return f("zzz")
      }, 2000 )
    })

    AuthProvider.saveToken("role")
  }

  render() {
    return (
      <div className="animated fadeIn">

        <div className="row">
          <div className="col-lg-12">
            <div className="card">

              <div className="card-header">
                <i className="fa fa-align-justify" />
                Description
              </div>

              <div className="card-block">
                Description
              </div>

            </div>
          </div>
        </div>


                    <div className="row">
                      <div className="col-6">
                        <button
                          type="button"
                          className="btn btn-primary px-4"
                          onClick={this.handleLogin}
                        >
                          Login
                        </button>
                      </div>
                    </div>


      </div>
    )
  }
}

export default Dashboard
