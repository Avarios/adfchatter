<script lang="ts">
  import LoadingSpinner from "$lib/components/LoadingSpinner.svelte";
  import { useSession, signInGoogle, logout } from "$lib/auth-client";
  import "../app.css";

  const session = useSession();
  let { children } = $props();
  
  async function handleGoogleLogin() {
    await signInGoogle();
  }
  
  function handleSignOut() {
    logout();
  }
</script>

<div class="min-h-screen bg-gray-900 text-gray-100">
  <!-- Top Navigation -->
  <header class="sticky top-0 z-40 border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm">
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center">
          <a href="/"> <h1 class="text-xl font-bold text-orange-500">Adf Chatter</h1></a>
        </div>
        
        <div class="flex items-center">
          {#if $session?.data}
            <button
              onclick={handleSignOut}
              class="rounded-lg bg-gray-800 px-4 py-2 font-medium text-gray-100 transition-colors hover:bg-gray-700"
            >
              Sign Out
            </button>
          {:else}
            <button
              onclick={handleGoogleLogin}
              class="flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 font-medium text-gray-100 transition-colors hover:bg-gray-700"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Login with Google
            </button>
          {/if}
        </div>
      </div>
    </div>
  </header>

  <!-- Main Content -->
  <main class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    {@render children()}
  </main>
</div>

<LoadingSpinner />
