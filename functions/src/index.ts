import * as functions from 'firebase-functions'

// Import static data from assets folder
import { baseItems } from './assets/base-item.data'
import { categories } from './assets/category.data'

// Firebase Functions that serve back the static data

export const getCategories = functions.https.onRequest((request, response) => {
  response.send(categories)
})

export const getBaseItems = functions.https.onRequest((request, response) => {
  response.send(baseItems)
})
