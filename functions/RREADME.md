# Firebase Functions

This section of the application manages the [Firebase Functions](https://firebase.google.com/docs/functions) that serve the static data needed by the application. These fuinctions serve the `categories` and `base items` that the application provides to all users.

## Static Data

Static Data is stored in `src/assets/`, and defined by `src/data.models.ts`, which is manually kept in sync with the data models in the application code.

See the sample files in `src/assets/` for formatting.

## Functions

The functions themselves live in `src/index.ts`.

# Development

### Local Testing

`npm run serve` will compile and serve the functions such that they are accessible by locally running apps.

### Deploying functions

`npm run deploy` will deploy the functions to Firebase, without deploying the app (but only if run here from the `functions/` folder).
