// import Hello from '../../Hello';

import React from 'react'
import { graphql } from 'react-apollo'
import gql from "graphql-tag"
// import { client } from '../../../config/apollo_client'
// import { ApolloProvider } from 'react-apollo'

const withData = graphql(
  gql`
    query hello($who: String) {
      hello(who: $who)
    }
  `,
  {
    options: ({ who }) => ({
      variables: { who }
    })
  }
)

class Hello extends React.Component {
  render() {
    const { data: { loading, error, hello } } = this.props;

    console.log(loading, error, hello)

    if (loading) {
      console.log(111111111111111111)

      return <div>Loading...</div>
    }

    if (error) {
      return (
        <div style={{ color: 'red' }}>
          2222222222222222222222
          {error}
        </div>
      );
    }

    return (

      <div>
        11111111111111111111111
        {hello}
      </div>
    );
  }
}

// export default withData(Hello)

const c = withData(Hello)

export default {
  component: c,

  props: {
    who: 'world!'
  }
}
