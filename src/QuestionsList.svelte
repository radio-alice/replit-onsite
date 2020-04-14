<script>
  import Question from './Question.svelte'
  export let questions
</script>
{#if questions.length}
<div class="questionsListWrapper">
  <div class="title">
    <h3>Possible related questions:</h3>
    <em>hint: use 'tab' to navigate this list</em>
  </div>
  <div class="questionsList stack">
    {#each questions as question}
    <Question {...question}></Question>
    {/each}
  </div>
</div>
{/if}
<style>
  .questionsListWrapper {
    margin: 0 auto;
    border: 2px solid var(--dark-blue);
    max-width: max-content;
  }
  .questionsList {
    padding: var(--s1);
  }
  .title {
    background-color: var(--grey);
    padding: var(--s-1);
  }
</style>
