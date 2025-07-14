import { createAuthClient } from 'better-auth/svelte';
const { accountInfo, signIn, signOut, signUp, useSession } = createAuthClient();
const googleLogin = signIn.social({ provider: 'google', callbackURL: '/chat' });

export { accountInfo, signIn, signUp, signOut, googleLogin, useSession };
