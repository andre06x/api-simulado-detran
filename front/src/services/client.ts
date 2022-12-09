import { ApolloClient, gql, InMemoryCache } from '@apollo/client';
import { RestLink } from 'apollo-link-rest';

const restLink = new RestLink({ uri: 'http://140.238.180.226:5005/' });

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: restLink,
});

export { client };
