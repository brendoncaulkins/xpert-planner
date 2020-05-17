import * as functions from 'firebase-functions'

import { baseItems } from './assets/base-item.data'
import { categories } from './assets/category.data'

const cors = require('cors')({ origin: true })

// Import static data from assets folder

// Firebase Functions that serve back the static data

export const getCategories = functions.https.onRequest((request, response) => {
  return cors(request, response, () => response.status(200).json({ data: categories }))
})

export const getBaseItems = functions.https.onRequest((request, response) => {
  return cors(request, response, () => response.status(200).json({ data: baseItems }))
})
