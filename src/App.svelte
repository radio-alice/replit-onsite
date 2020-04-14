<script>
  import QuestionsList from './QuestionsList.svelte'
  import { store } from './stores.js'
  let questionText = ''
  let titleText = ''
  const handleSubmit = () => {
    console.log('posting question: ', titleText, ': ', questionText)
  }
  const resetQuestion = () => {
    questionText = ''
  }
  const dummyQuestions = [
    { date: '01/01/01', asker: 'Zach', title: 'How do I get a job' },
  ]
</script>
<main class="stack">
  <form on:submit|preventDefault="{handleSubmit}">
    <input
      class="titleInput"
      type="text"
      bind:value="{titleText}"
      placeholder="Title"
    />
    <textarea
      bind:value="{questionText}"
      placeholder="your question"
    ></textarea>
    <div class="formButtons">
      <button on:click="{resetQuestion}">Cancel</button>
      <button type="submit">Submit</button>
    </div>
  </form>
  <QuestionsList questions="{dummyQuestions}"></QuestionsList>
</main>
<style>
  main {
    margin: var(--s2);
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
