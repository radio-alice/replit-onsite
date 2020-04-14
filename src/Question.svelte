<script>
  export let body,
    id,
    title,
    voteCount,
    createdAt,
    keyTerms = new Set(),
    numMatches = 0,
    accepted = false

  const focus = ({ target }) =>
    target.scrollIntoView({ behavior: 'smooth', block: 'center' })
</script>
<div class="question stack" on:focus="{focus}" tabindex="0">
  <!-- {#if numMatches}
  <p>keyterms: {numMatches}</p>
  {/if} -->
  <h3 class="title">{@html title}</h3>
  <p class="body">{@html body}</p>
  <div class="row flush">
    {#if accepted}
    <p class="accepted">✓ Answered!</p>
    {/if}
    <p class="voteCount">{voteCount} upvotes</p>
    <p>{createdAt.substring(0,10)}</p>
  </div>
  <a href="https://search-api.moudy.repl.co/" class="openQuestion flush"
    >Open full question thread →</a
  >
</div>
<style>
  .question {
    background-color: var(--light-grey);
    padding: var(--s0);
    max-width: var(--measure);
  }
  .question:focus {
    outline: none;
    box-shadow: 0 0 var(--s0) var(--s0) var(--pink);
  }
  .flush {
    margin: var(--s0) calc(-1 * var(--s0)) calc(-1 * var(--s0))
      calc(-1 * var(--s0));
  }
  .row {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: var(--s-4);
    border-top: 2px dashed var(--purple);
  }
  .row > * + * {
    margin-left: var(--s0);
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
    /* margin: calc(-1 * var(--s0)); */
    color: var(--light-grey);
    font-size: var(--s0);
    padding: var(--s-3) var(--s0);
    width: 100% + calc(2 * var(--s0));
  }
</style>
