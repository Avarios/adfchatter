<script>
  import { useSession } from "$lib/auth-client";

  const session = useSession();
</script>

<div class="text-center">
  <h2 class="mb-8 text-4xl font-bold text-gray-100 sm:text-5xl">
    Welcome to Adf Chatter
    <span class="mt-2 block text-orange-500">your AI-powered assistant</span>
  </h2>

  <div class="mb-12 relative">
    <img
      src="/chat-illustration.svg"
      alt="Three people chatting with AI"
      class="mx-auto h-auto w-full max-w-md filter brightness-90"
    />
    <div
      class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-50"
    ></div>
  </div>

  {#if $session?.data}
    <a
      href="/chat"
      class="inline-block rounded-lg bg-orange-600 px-8 py-3 text-lg font-medium text-white shadow-lg transition-colors hover:bg-orange-700 hover:shadow-xl"
    >
      Start Chatting
    </a>
  {/if}
</div>
