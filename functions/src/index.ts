import * as functions from 'firebase-functions'

import { IBaseItem, ICategory } from './data.models'

// Static data to be served by the Firebase Functions

const categories: ICategory[] = []
const baseItems: IBaseItem[] = []

// Firebase Functions that serve back the static data

export const getCategories = functions.https.onRequest((request, response) => {
  response.send(categories)
})

export const getBaseItems = functions.https.onRequest((request, response) => {
  response.send(baseItems)
})
