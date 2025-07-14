import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './db';
import {
	GOOGLE_OAUTH_CLIENTID,
	GOOGLE_OAUTH_CLIENT_SECRET,
	GOOGLE_OAUTH_SCOPES
} from '$env/static/private';

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: 'sqlite'
	}),
	socialProviders: {
		google: {
			enabled: true,
			clientId: GOOGLE_OAUTH_CLIENTID,
			clientSecret: GOOGLE_OAUTH_CLIENT_SECRET,
			scope: GOOGLE_OAUTH_SCOPES.split(',')
		}
	},
	advanced:{
		cookiePrefix:'persochatta_',
	}
});
