# react-apollo-subscribed-query

This module exports a single function that you can use like so
to wrap a React component with a graphql query and a subscription
that will update its results.

## Example

```
import React, { Component } from 'react';
import {
  ApolloClient,
  gql,
  graphql,
  ApolloProvider,
} from 'react-apollo';
import ProcessOrder from './ProcessOrder';
import graphqlSubscribedQuery from 'react-apollo-subscribed-query';

class OrderDetail extends Component {

  render() {
    const {match} = this.props;
    const {loading, error, order} = this.props.data;
    if (loading) {
     return <p>Loading ...</p>;
    }
    if (error) {
     return <p>{error.message}</p>;
    }
    return (
      <div className="OrderDetail">
        <dl>
          <dt>Purchase Order Number</dt>
          <dd>{order.purchaseOrderNumber}</dd>
        </dl>
        <dl>
          <dt>Status</dt>
          <dd>{order.status}</dd>
        </dl>
        <dl>
          <dt>Production Quantity</dt>
          <dd>{order.productionQuantity}</dd>
        </dl>
        <dl>
          <dt>Test Quantity</dt>
          <dd>{order.testQuantity}</dd>
        </dl>
        <dl>
          <dt>Item Schema</dt>
          <dd>{order.itemSchema}</dd>
        </dl>
        <ProcessOrder order={order} />
      </div>
    );
  }
}

export const orderQuery = gql`
   query OrderQuery($orderId: ID) {
     order(orderId: $orderId) {
       id
       purchaseOrderNumber
       status
       testQuantity
       productionQuantity
       itemSchema
     }
   }
 `;

export const orderSubscription = gql`
  subscription subscribeToOrders($orderId:ID!) {
    orderStatusChange(orderId: $orderId) {
      id
      status
      itemSchema
      testQuantity
      productionQuantity
      purchaseOrderNumber
    }
  }
`;
const OrderDetailWithQuery = graphqlSubscribedQuery({
  options: ({ match }) => ({ variables: { orderId: match.params.orderId } }),
  query: orderQuery,
  subscription: orderSubscription
})(OrderDetail);
export default OrderDetailWithQuery;
```

Caveats:

* query and subscription must take the same variables
* subscription data will replace query data
* This is really just a spike. It appears to work but there are no tests
