import { createAuthClient } from 'better-auth/svelte';

const { signIn , useSession, signOut } = createAuthClient();

const signInGoogle = async () => {
     return await signIn.social({
        provider: "google"
    })
}

const logout = async ():Promise<boolean> => {
    const result =  await signOut();
    return result.data ? result.data.success : false
}

export {
    signInGoogle,
    useSession,
    logout
}
