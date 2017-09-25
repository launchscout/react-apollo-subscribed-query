import { graphql } from 'react-apollo';

const graphqlSubscribedQuery = ({ variables, query, subscription, options}) => {
  return graphql(query, {
    options,
    props: props => {
      const unsubscribe = props.data.subscribeToMore({
         document: subscription,
         variables: props.data.variables,
         updateQuery: (prev, {subscriptionData}) => {
             if (!subscriptionData.data.data) {
                 return prev;
             }
             return subscriptionData.data.data;
         }
      });
      return {
        data: props.data,
        unsubscribe,
        ...props.ownProps
      }
    }
  });
};

export default graphqlSubscribedQuery;
