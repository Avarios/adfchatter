<script>
	import LoginModal from '$lib/components/LoginModal.svelte';
	import { useSession } from '$lib/auth-client';
	const session = useSession();
	let showModal = $state(false);
</script>

<div class="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
	<!-- Header -->
	<header class="border-b border-orange-200/50 bg-white/80 backdrop-blur-sm">
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 items-center justify-between">
				<div class="flex items-center">
					<h1 class="text-xl font-semibold text-gray-900">PersoChatta</h1>
				</div>
				{#if $session.data}
					LOGGED IN
				{:else}
					<button
						onclick={() => (showModal = true)}
						class="rounded-lg bg-orange-600 px-4 py-2 font-medium text-white transition-colors hover:bg-orange-700"
					>
						Login
					</button>
				{/if}
			</div>
		</div>
	</header>

	<!-- Main Content -->
	<main class="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
		<div class="text-center">
			<!-- Title -->
			<h2 class="mb-8 text-4xl font-bold text-gray-900 sm:text-5xl">
				Welcome to PersoChatta
				<span class="mt-2 block text-orange-600">your personal chatbot</span>
			</h2>

			<!-- Illustration -->
			<div class="mb-12">
				<img
					src="/chat-illustration.svg"
					alt="Three people chatting with AI"
					class="mx-auto h-auto w-full max-w-md"
				/>
			</div>

			<!-- CTA Button -->
			<button
				class="rounded-lg bg-orange-600 px-8 py-3 text-lg font-medium text-white shadow-lg transition-colors hover:bg-orange-700 hover:shadow-xl"
			>
				Start Chatting
			</button>
		</div>
	</main>

	<LoginModal bind:show={showModal} />
</div>
