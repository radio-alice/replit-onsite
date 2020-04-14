import { writable } from 'svelte/store'

const createQuestionsStore = () => {
  const { subscribe, set, update } = writable([])
  return {
    subscribe,
    fetch: async () => set(await initQuestions()),
    search: async (searchString) => set(await getNewQuestions(searchString)),
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
      return { ...post, ...stringMatches(searchString, post) }
    })
    .filter((post) => post.keyTerms.size > 0)
    .sort(comparePosts)

const countMatches = (termRegex, string) => {
  const matches = string.toLowerCase().match(termRegex)
  return matches ? matches.length : 0
}

const stringMatches = (searchString, postToSearch) => {
  let matchTerms = new Set()
  let numMatches = 0
  searchString
    .split(/([^\w])/)
    .filter((term) => !/([^\w])/.test(term))
    .forEach((term) => {
      if (term && !tooCommonWords.has(term.toLowerCase())) {
        const termRegex = new RegExp(term.toLowerCase())
        const termMatches =
          countMatches(termRegex, postToSearch.body) +
          countMatches(termRegex, postToSearch.title)
        if (termMatches > 0) matchTerms.add(term.toLowerCase())
        numMatches += termMatches
      }
    })
  return { keyTerms: matchTerms, numMatches }
}
const comparePosts = (postA, postB) => postB.numMatches - postA.numMatches

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

const tooCommonArray = [
  'i',
  'use',
  'has',
  'is',
  'to',
  'am',
  'not',
  'please',
  'as',
  'of',
  'out',
  'with',
  'the',
  'on',
  'for',
  'would',
  'like',
  'ask',
  'it',
]
const tooCommonWords = new Set()
tooCommonArray.forEach((word) => tooCommonWords.add(word))
export const questionsStore = createQuestionsStore()
