<script>
  export let body, id, title, voteCount, accepted, createdAt
</script>
<div class="question stack">
  <div class="row">
    <h3 class="title">{title}</h3>
    <p>{createdAt.substring(0,10)}</p>
  </div>
  <p class="body">{body}</p>
  <div class="row">
    <a href="https://search-api.moudy.repl.co/" class="openQuestion"
      >Open full question thread →</a
    >
    {#if accepted}
    <p class="accepted">✓ Answered!</p>
    {/if}
    <p class="voteCount">up-votes: {voteCount}</p>
  </div>
</div>
<style>
  .question {
    background-color: var(--light-grey);
    padding: var(--s0);
  }
  .row {
    display: flex;
    align-items: center;
  }
  .row > * + * {
    margin-left: var(--s0);
  }
  .accepted {
    background-color: var(--green);
    /* line-height: var(--s1); */
    padding: var(--s-3);
    white-space: nowrap;
  }
  .title {
    flex: auto;
  }
  .voteCount {
    font-style: italic;
  }
  .openQuestion {
    background-color: var(--blue);
    color: var(--light-grey);
    font-size: var(--s0);
    padding: var(--s-3);
    align-self: center;
  }
</style>
