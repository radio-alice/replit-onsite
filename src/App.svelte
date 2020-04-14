<script>
  import Question from './Question.svelte'
  import { store } from './stores.js'
  let questionText = ''
  const handleSubmit = () => {
    console.log('posting question: ', questionText)
  }
  const resetQuestion = () => {
    questionText = ''
  }
</script>
<main>
  <form on:submit|preventDefault="{handleSubmit}">
    <textarea bind:value="{questionText}"></textarea>
    <div>
      <button type="submit">Submit</button>
      <button on:click="{resetQuestion}">Cancel</button>
    </div>
  </form>
  <code>{questionText}</code>
  <Question date={'01/01/01'} asker={"Zach"} title={'How do I get a job'}></Question>
</main>
<style>
  main {
    margin: var(--s2);
  }
</style>
