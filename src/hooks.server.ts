import { auth } from "$lib/server/auth"; // path to your auth file
import { svelteKitHandler } from "better-auth/svelte-kit";
 
export async function handle({ event, resolve }) {
    return svelteKitHandler({ event, resolve, auth });
}