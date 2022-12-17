import {
	ApolloClient,
	DefaultOptions,
	gql,
	InMemoryCache,
} from '@apollo/client';
import { RestLink } from 'apollo-link-rest';

const restLink = new RestLink({ uri: 'http://140.238.180.226:5005/' });

const defaultOptions: DefaultOptions = {
	watchQuery: {
		fetchPolicy: 'no-cache',
		errorPolicy: 'ignore',
	},
	query: {
		fetchPolicy: 'no-cache',
		errorPolicy: 'all',
	},
};

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: restLink,
	defaultOptions,
});

export { client };
