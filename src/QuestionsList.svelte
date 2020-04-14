<script>
  import Question from './Question.svelte'
  export let questions
</script>
<div class="stack">
  <h3>Possible related questions:</h3>
  <div class="questionsList">
    {#each questions as question}
    <Question {...question}></Question>
    {/each}
  </div>
</div>
<style>
  .stack {
    border: 2px solid var(--dark-blue);
  }
  .questionsList {
    padding: var(--s1);
  }
  h3 {
    background-color: var(--grey);
    padding: var(--s-1);
  }
</style>
