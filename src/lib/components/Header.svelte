<script lang="ts">
  import { useSession, signInGoogle, logout } from "$lib/auth-client";
  import { goto } from "$app/navigation";
  import { isLoading } from '$lib/stores/loading'
  
  const session = useSession();
  
  let showUserMenu = $state(false);

  function toggleUserMenu(event: MouseEvent) {
    event.stopPropagation();
    showUserMenu = !showUserMenu;
  }

  async function handleGoogleLogin() {
    isLoading.set(true);
    const result = await signInGoogle();
    if(result.error) {
      //TODO: ADD ERROR HANDLING
    }
    isLoading.set(false);
  }

  async function handleLogout() {
    isLoading.set(true);
    showUserMenu = false;
    if(await logout()) {
      isLoading.set(false);
      goto("/")
    }
    
  }

  function closeMenu() {
    showUserMenu = false;
  }
</script>

<svelte:window onclick={closeMenu} />

<header class="sticky top-0 z-50 border-b">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex h-16 items-center justify-between">
      <div class="flex items-center">
        <h1 class="text-xl font-semibold text-gray-900">Adf Chatter</h1>
      </div>
      
      {#if $session?.data}
        <div class="relative">
          <button
            onclick={toggleUserMenu}
            class="flex items-center space-x-2 rounded-lg px-3 py-2 transition-colors hover:bg-gray-100"
          >
            {#if $session?.data?.user?.image}
              <img
                src={$session.data.user.image}
                alt="User avatar"
                class="h-8 w-8 rounded-full"
              />
            {:else}
              <div class="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-white">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                </svg>
              </div>
            {/if}
            <span class="text-sm font-medium text-gray-900">{$session?.data?.user?.name}</span>
            <svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {#if showUserMenu}
            <div class="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
              <button
                onclick={handleLogout}
                class="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          {/if}
        </div>
      {:else}
        <button
          onclick={handleGoogleLogin}
          class="flex items-center gap-2 rounded-lg bg-white border border-gray-300 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-50"
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
</header>