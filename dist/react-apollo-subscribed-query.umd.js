(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react-apollo')) :
	typeof define === 'function' && define.amd ? define(['react-apollo'], factory) :
	(global['react-apollo-subscribed-query'] = factory(global.reactApollo));
}(this, (function (reactApollo) { 'use strict';

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

const graphqlSubscribedQuery = ({ variables, query, subscription, options }) => {
  return reactApollo.graphql(query, {
    options,
    props: props => {
      const unsubscribe = props.data.subscribeToMore({
        document: subscription,
        variables: props.data.variables,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data.data) {
            return prev;
          }
          return subscriptionData.data.data;
        }
      });
      return _extends({
        data: props.data,
        unsubscribe
      }, props.ownProps);
    }
  });
};

return graphqlSubscribedQuery;

})));
