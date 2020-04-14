<script>
  export let body,
    id,
    title,
    voteCount,
    createdAt,
    keyTerms = new Set(),
    numMatches = 0,
    accepted = false
</script>
<div class="question stack">
  <!-- {#if numMatches}
  <p>keyterms: {numMatches}</p>
  {/if} -->
  <div class="top row">
    <h3 class="title">{@html title}</h3>
    <p>{createdAt.substring(0,10)}</p>
  </div>
  <p class="body">{@html body}</p>
  <div class="bottom row">
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
  }
  .row > * + * {
    margin-left: var(--s0);
  }
  .top {
    align-items: top;
  }
  .bottom {
    align-items: center;
  }
  .accepted {
    background-color: var(--green);
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
    text-decoration: none;
    background-color: var(--blue);
    color: var(--light-grey);
    font-size: var(--s0);
    padding: var(--s-3);
    align-self: center;
  }
</style>
