<script>
  import { isLoading } from '$lib/stores/loading';
</script>

{#if $isLoading}
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div class="h-12 w-12 animate-spin rounded-full border-4 border-orange-200 border-t-orange-600"></div>
  </div>
{/if}