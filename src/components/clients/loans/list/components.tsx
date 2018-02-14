import * as React from 'react'

export const ClientInfo = (props) => (
  <div className="card">

    <div className="card-header">
      <i className="fa fa-align-justify" />
      Client
    </div>

    <div className="card-block">
      <div className="form-group row">
        <div className="col-md-12">
          <div className="input-group">
            <span className="input-group-addon">Full name</span>
            <div className="form-control">
              {props.client.full_name}
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
)
