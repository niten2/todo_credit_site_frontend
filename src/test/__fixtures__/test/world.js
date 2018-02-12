import React from 'react'
import { graphql } from "react-apollo"
import gql from "graphql-tag"

class Hello extends React.Component {
  render() {
    const { loading, error, hello } = this.props.hello

    // console.log(loading, error, hello)
    // console.log(1111, this.props.hello)

    // const loading = "loading"
    // const error = "error"
    // const hello = "2222"

    if (loading) {
      return <div>Loading...</div>
    }

    if (error) {
      return (
        <div style={{ color: 'red' }}>
          {error}
        </div>
      );
    }

    return (

      <div>
        div
        {hello}
      </div>
    );
  }
}

// export default withData(Hello)

const withData = graphql(
  gql`
    query hello($who: String) {
      hello(who: $who)
    }
  `,
  {
    name: "hello",
    options: ({ who }) => ({
      variables: { who }
    })
  }
)



const c = withData(Hello)

export default {
  component: c,

  // props: {
  //   who: 'world!'
  // }
}
