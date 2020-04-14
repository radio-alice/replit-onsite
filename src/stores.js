import { writable } from 'svelte/store'

const createQuestionsStore = () => {
  const { subscribe, set, update } = writable([])
  return {
    subscribe,
    fetch: async () => set(await initQuestions()),
    search: async (searchString) =>
      set(await getNewQuestions(searchString, qs)),
  }
}

const initQuestions = async () => {
  const res = await (await fetch('https://search-api.moudy.repl.co/')).json()
  return res.posts
}
const getNewQuestions = async (searchString) => {
  const res = await (await fetch('https://search-api.moudy.repl.co/')).json()
  const filtered = simpleSearch(searchString, res.posts)
  return filtered.map(highlightPost)
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
        matchTerms.add(term.toLowerCase())
      }
    })
  return matchTerms
}
const comparePosts = (postA, postB) => postA.keyTerms.size - postB.keyTerms.size

const highlightPost = (post) => ({
  ...post,
  title: highlightKeyTerms(post.keyTerms, post.title),
  body: highlightKeyTerms(post.keyTerms, post.body),
})

// weaknesses - cannot highlight partial matches only exact
const highlightKeyTerms = (terms, string) =>
  string
    .split(/([^\w])/)
    .map((word) => {
      if (terms.has(word.toLowerCase())) {
        return `<span class="keyword">${word}</span>`
      } else {
        return word
      }
    })
    .join('')

export const questionsStore = createQuestionsStore()
