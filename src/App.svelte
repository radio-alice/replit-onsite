<script>
  import QuestionsList from './QuestionsList.svelte'
  import { questionsStore } from './stores.js'
  let questionText = ''
  let titleText = ''

  // could change to a real debounce method
  const updateQuestionsList = (e) => {
    if (e.keyCode < 65 && e.keyCode !== 16)
      questionsStore.search(titleText + ' ' + questionText)
  }
  const handleSubmit = (e) => {
    window.alert(`posting question, ${titleText}: ${questionText}`)
  }
  const resetQuestion = (e) => {
    questionText = ''
    titleText = ''
  }
  questionsStore.fetch()
</script>
<main class="stack">
  <div class="form stack">
    <h2>Ask for help: </h2>
    <input
      class="titleInput"
      type="text"
      bind:value="{titleText}"
      on:keydown="{updateQuestionsList}"
      placeholder="Title"
    />
    <textarea
      bind:value="{questionText}"
      on:keydown="{updateQuestionsList}"
      placeholder="your question"
    ></textarea>
    <div class="formButtons">
      <button on:click="{resetQuestion}">Cancel</button>
      <button on:click="{handleSubmit}">Submit</button>
    </div>
  </div>
  <QuestionsList questions="{$questionsStore}"></QuestionsList>
</main>
<style>
  main {
    margin: var(--s2) auto;
  }
  textarea {
    min-width: 100%;
    padding: var(--s-2);
    font-size: var(--s0);
    font-family: sans-serif;
  }
  .titleInput {
    padding: var(--s-2);
    font-size: var(--s1);
    font-weight: 600;
  }
  .form {
    background-color: var(--grey);
    padding: var(--s1);
    max-width: calc(var(--measure) + (2 * var(--s1)));
    margin: var(--s1) auto;
    width: 100%;
  }
  .formButtons {
    display: flex;
    justify-content: space-between;
  }
  .formButtons button {
    font-size: var(--s0);
    padding: var(--s-3);
    background-color: var(--light-blue);
    color: var(--light-grey);
  }
</style>
