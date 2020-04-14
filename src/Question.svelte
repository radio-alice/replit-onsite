<script>
  export let body, id, title
  // numReplies,
  // numUpvotes,
  // acceptedAnswer,
  // asker
</script>
<div class="question stack">
  <div class="titleRow">
    <!-- <p class="asker">{asker}</p> -->
    <h3 class="title">{title}</h3>
    <p>{id}</p>
  </div>
  <p class="body">{body}</p>
  <a href="https://search-api.moudy.repl.co/" class="openQuestion"
    >Open full question thread →</a
  >
</div>
<style>
  .question {
    background-color: var(--light-grey);
    padding: var(--s0);
  }
  .titleRow {
    display: flex;
    align-items: center;
  }
  .title {
    flex: auto;
    /* text-align: center; */
  }
  .openQuestion {
    background-color: var(--blue);
    color: var(--light-grey);
    font-size: var(--s0);
    padding: var(--s-3);
    align-self: center;
  }
</style>
