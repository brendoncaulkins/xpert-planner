# How to Contribute to this Project

## How to Submit an Issue

Please submit an issue on our Github issues page at <http://github.com/brendoncaulkins/xpert-planner/issues/new>.

We'll do our best to work with you and help you, whatever the issue is. For the best possible results:

- Try to make your issue as specific as possible
- Provide steps you can take to reproduce the issue
- Include your expectation of what _should_ happen, as well as what _actually_ happened. Lots of issues can be resolved by understanding a user's expectations.
- If you're a coder and you can provide a failing unit test, this would be perfect. :) But not everyone's a coder, and we'll help you regardless of what you're able to provide.

## Have an Idea / Request for Improvement?

That's great! We love to hear feedback on how we can improve things.

Please know, however, that we may not be able to immediately implement your ideas or suggestions. OSS work is sometimes limited by time and other constraints.

We suggest [submitting an issue](http://github.com/brendoncaulkins/xpert-planner/issues/new) with the idea or improvement so that we can discuss it first. At that point, assuming we agree it's a good fit, we will attempt to implement it, or guide you to help you do so within your own pull request(s).

## Contributing Code via a Pull Request

So you've got some code you'd like to contribute to the project. First off -- Thank you! It means a lot to us that you'd take your time to help improve this project.

We'll try to avoid being super strict about accepting PRs because we value contributions from others, but some general guidelines are below:

- You should [submit an issue](http://github.com/brendoncaulkins/xpert-planner/issues/new) before beginning a pull request. This makes sure that we have a good heads up that you want to contribute, and also makes sure that if we don't think the idea is a good fit, you don't spend time writing code only to have the PR rejected later.
- You should fork the project first and create a branch for your changes off of the `master` branch
- You should do your best to add automated tests that cover your changes. We're not striving for 100% coverage or anything, but the more well-defined tests there are, the higher our confidence will be. Don't worry about asking for help on this if you need it; that's what we're here for!
- We suggest creating a PR early in the progress and placing `WIP` or `In Progress` in the title of the PR (you can edit it later). This way, as you add changes, we can see the progress, and might be able to jump in to help if we see things going off the rails. This one's your call, though; do whatever suits you.
- Try to make many small commits, with notes, at each step of the way. This will help us understand your thought process when we review the PR. We'll squash these changes at the end of the process, so no worries about being verbose throughout.
- Similarly, don't worry about pre-squashing your changes for us. We'll use Github's functionality at the end of the PR to do that when accepting it.
- Before asking for a review or declaring the PR to be ready, make sure the CI build passes. You'll receive updates on this as you go, so the status at any given time should hopefully be clear.

# Development

### Local Development (live reloading)

1. In `src/app/environments/environment.ts`, set `authMode` to `AuthMode.IN_MEMORY`, and ensure `production` is set to `false`
1. Run `npm run json-server` to start the [json-server](https://www.npmjs.com/package/json-server) powered API. Data is stored in `src/assets/db.json`.
1. Run `npm start` for the Angular dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

**NOTE:** Because Firebase is wired into the app even when not toggled on, the app will crash if the Firebase modules cannot latch into a real project. Make sure to add your own Firebase credentials in `src/environments/firebase.config.ts`. This will allow the app to run locally. A sample file is provided, and the format is identical to what firebase provides.

### Local Development (with Firebase)

1. Configre your Firebase account in `src/environments/environment.ts`.
1. At the root folder, run `npm run firebase:serve`
1. Navigate to `http://localhost:5000/`. The app will **NOT** automatically reload.

## Testing

### Unit Tests

1. Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Code Coverage

1. Run `npm run test:coverage` to run tests with coverage reports (`/coverage`)

## Continuous Integration

The project uses [CircleCI](https://circleci.com/) to check PRs and [Coveralls](https://coveralls.io/) to check that code coverage does not drop. Their respective statuses can be found at the top of the [README](README.md).

## Deployment

### Deploy to Firebase

`npm run firebase:deploy` will compile the app (but not the firebase functions), and then deploy everything to Firebase. Ensure your own Firebase credentials are configured properly in the `src/environments/environment.prod.ts`
