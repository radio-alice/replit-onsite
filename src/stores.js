import { writable } from 'svelte/store'

const getNewQuestions = async () => {
  const res = await (await fetch('https://search-api.moudy.repl.co/')).json()
  return res.posts
}
const createQuestionsStore = () => {
  const { subscribe, set, update } = writable([])
  return {
    subscribe,
    fetch: async () => set(await getNewQuestions()),
  }
}
export const questionsStore = createQuestionsStore()
