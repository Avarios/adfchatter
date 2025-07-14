<script>
  import { useSession } from "$lib/auth-client";

  const session = useSession();
</script>

<div class="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
  <main class="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
    <div class="text-center">
      <h2 class="mb-8 text-4xl font-bold text-gray-900 sm:text-5xl">
        Welcome to PersoChatta
        <span class="mt-2 block text-orange-600">your personal chatbot</span>
      </h2>
      <div class="mb-12">
        <img
          src="/chat-illustration.svg"
          alt="Three people chatting with AI"
          class="mx-auto h-auto w-full max-w-md"
        />
      </div>

      {#if $session.data}
        <a
          href="/chat"
          class="inline-block rounded-lg bg-orange-600 px-8 py-3 text-lg font-medium text-white shadow-lg transition-colors hover:bg-orange-700 hover:shadow-xl"
        >
          Start Chatting
        </a>
      {/if}
    </div>
  </main>
</div>
