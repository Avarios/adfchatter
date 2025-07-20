<script lang="ts">
  import { onMount } from 'svelte';
  import { isLoading } from '$lib/stores/loading';
  import { marked } from 'marked';
  import hljs from 'highlight.js';
  import 'highlight.js/styles/atom-one-dark.css';
  
  type Message = {
    id: number,
    text: string,
    sender: 'user' | 'bot',
    timestamp: Date
  }

  let messages = $state([] as Message[]);
  let inputMessage = $state('');
  let chatContainer: HTMLElement;
  
  // Initialize highlight.js
  onMount(() => {
    highlightCodeBlocks();
  });
  
  // Function to apply syntax highlighting to code blocks
  function highlightCodeBlocks() {
    document.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightElement(block as HTMLElement);
    });
  }

  async function sendMessage() {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length > 0 ? messages[messages.length - 1].id + 1 : 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    messages = [...messages, userMessage];
    const userQuery = inputMessage;
    inputMessage = '';
    
    // Show loading indicator
    isLoading.set(true);
    
    try {
      // Simulate LLM response (replace with actual API call)
      const response = await simulateLLMResponse(userQuery);
      
      // Add LLM response
      const botMessage: Message = {
        id: Date.now(),
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };
      messages = [...messages, botMessage];
      // Apply highlighting after the message is added
      highlightCodeBlocks();
    } catch (error) {
      console.error('Error getting LLM response:', error);
      messages = [...messages, {
        id: Date.now(),
        text: "Sorry, I encountered an error processing your request.",
        sender: 'bot',
        timestamp: new Date()
      }];
    } finally {
      isLoading.set(false);
      // Scroll to bottom after message is rendered
      setTimeout(() => scrollToBottom(), 100);
    }
  }
  
  // Simulate LLM response (replace with actual API call)
  async function simulateLLMResponse(query: string) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Sample responses with code blocks for demonstration
    if (query.toLowerCase().includes('javascript')) {
      return `Here's a simple JavaScript function:
\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));
\`\`\`
You can use this function to create personalized greetings.`;
    } else if (query.toLowerCase().includes('python')) {
      return `Here's a Python example:
\`\`\`python
def factorial(n):
    if n == 0 or n == 1:
        return 1
    else:
        return n * factorial(n-1)

print(factorial(5))  # Output: 120
\`\`\`
This recursive function calculates the factorial of a number.`;
    } else {
      return `I'm here to help! You can ask me about programming languages like JavaScript or Python, and I'll provide code examples.`;
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }
  
  function scrollToBottom() {
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }
  
  // Parse markdown and render HTML safely
  function renderMessage(text: string) {
    const html = marked(text);
    return html;
  }
  
  // Use Svelte's effect to apply highlighting after DOM updates
  $effect(() => {
    if (messages.length > 0) {
      import('svelte').then(svelte => {
        svelte.tick().then(() => {
          highlightCodeBlocks();
        });
      });
    }
  });
</script>

<div class="flex h-[calc(100vh-8rem)] flex-col rounded-lg bg-gray-800 shadow-xl">
  <!-- Messages -->
  <div bind:this={chatContainer} class="flex-1 overflow-y-auto p-4">
    {#if messages.length === 0}
      <div class="flex h-full items-center justify-center text-gray-400">
        <p>Start a conversation with Adf Chatter...</p>
      </div>
    {:else}
      <div class="space-y-6">
        {#each messages as message (message.id)}
          <div class="flex {message.sender === 'user' ? 'justify-end' : 'justify-start'}">
            <div class="max-w-3xl rounded-lg px-4 py-2 {message.sender === 'user' ? 'bg-orange-600 text-white' : 'bg-gray-700 text-gray-100'}">
              {#if message.sender === 'user'}
                <p>{message.text}</p>
              {:else}
                <div class="prose prose-sm prose-invert max-w-none">
                  {@html renderMessage(message.text)}
                </div>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <!-- Input -->
  <div class="border-t border-gray-700 bg-gray-800 p-4">
    <div class="flex gap-2">
      <textarea
        bind:value={inputMessage}
        on:keydown={handleKeydown}
        placeholder="Type your message..."
        rows="2"
        class="flex-1 resize-none rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-gray-100 placeholder-gray-400 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
      ></textarea>
      <button
        on:click={sendMessage}
        disabled={!inputMessage.trim()}
        class="self-end rounded-lg bg-orange-600 px-4 py-2 text-white transition-colors hover:bg-orange-700 disabled:bg-gray-600 disabled:text-gray-400"
      >
        Send
      </button>
    </div>
  </div>
</div>