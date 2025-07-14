<script lang="ts">
  let messages = $state([]);
  let inputMessage = $state('');

  function sendMessage() {
    if (!inputMessage.trim()) return;
    
    messages.push({
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    });
    
    inputMessage = '';
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }
</script>

<div class="flex h-[calc(100vh-4rem)] flex-col">
  <!-- Messages -->
  <div class="flex-1 overflow-y-auto p-4">
    {#if messages.length === 0}
      <div class="flex h-full items-center justify-center text-gray-500">
        <p>Start a conversation...</p>
      </div>
    {:else}
      <div class="space-y-4">
        {#each messages as message (message.id)}
          <div class="flex {message.sender === 'user' ? 'justify-end' : 'justify-start'}">
            <div class="max-w-xs rounded-lg px-4 py-2 {message.sender === 'user' ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-900'}">
              {message.text}
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <!-- Input -->
  <div class="border-t border-gray-200 p-4">
    <div class="flex gap-2">
      <input
        bind:value={inputMessage}
        onkeydown={handleKeydown}
        placeholder="Type your message..."
        class="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
      />
      <button
        onclick={sendMessage}
        disabled={!inputMessage.trim()}
        class="rounded-lg bg-orange-600 px-4 py-2 text-white transition-colors hover:bg-orange-700 disabled:bg-gray-300"
      >
        Send
      </button>
    </div>
  </div>
</div>