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
  const handleSubmit = () => {
    console.log('posting question: ', titleText, ': ', questionText)
  }
  const resetQuestion = () => {
    questionText = ''
  }
  questionsStore.fetch()
</script>
<main class="stack">
  <form on:submit|preventDefault="{handleSubmit}">
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
      <button type="submit">Submit</button>
    </div>
  </form>
  <QuestionsList questions="{$questionsStore.questions}"></QuestionsList>
</main>
<style>
  main {
    margin: var(--s2) auto;
    max-width: var(--measure);
  }
  textarea {
    min-width: 100%;
    padding: var(--s-2);
    font-size: var(--s0);
  }
  .titleInput {
    font-size: var(--s0);
  }
  form {
    max-width: var(--measure);
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
