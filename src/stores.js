import { writable } from 'svelte/store'

const initQuestions = async () => {
  const res = await (await fetch('https://search-api.moudy.repl.co/')).json()
  return res.posts
}
const getNewQuestions = async (searchString) => {
  const res = await (await fetch('https://search-api.moudy.repl.co/')).json()
  return simpleSearch(searchString, res.posts)
}
const createQuestionsStore = () => {
  const { subscribe, set, update } = writable([])
  return {
    subscribe,
    fetch: async () => set(await initQuestions()),
    search: async (searchString) => set(await getNewQuestions(searchString)),
  }
}

const simpleSearch = (searchString, postsToSearch) =>
  postsToSearch
    .map((post) => {
      return { ...post, keyTerms: stringMatches(searchString, post) }
    })
    .filter((post) => post.keyTerms.size > 0)
    .sort(comparePosts)

const stringMatches = (searchString, postToSearch) => {
  let matchTerms = new Set()
  searchString
    .split(/([^\w])/)
    .filter((term) => !/([^\w])/.test(term))
    .forEach((term) => {
      if (
        term &&
        (postToSearch.body.toLowerCase().includes(term.toLowerCase()) ||
          postToSearch.title.toLowerCase().includes(term.toLowerCase()))
      ) {
        matchTerms.add(term)
      }
    })
  return matchTerms
}
const comparePosts = (postA, postB) => postA.keyTerms.size - postB.keyTerms.size
export const questionsStore = createQuestionsStore()
