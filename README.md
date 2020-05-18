# Xpert Planner

Plan your future and track your success!

## Status

| Build Status | Code Coverage |
| ------------ | ------------- |
| [![CircleCI](https://circleci.com/gh/brendoncaulkins/xpert-planner.svg?style=svg&circle-token=3430129b997adb773cc1cdb052d0d9201711875a)](https://circleci.com/gh/brendoncaulkins/xpert-planner) | [![Coverage Status](https://coveralls.io/repos/github/brendoncaulkins/xpert-planner/badge.svg?branch=master)](https://coveralls.io/github/brendoncaulkins/xpert-planner?branch=master) |

# About

This application is meant to aid Xperts and Xpert candidates in planning their Xpertship and tracking their progress. It currently focuses on analysis of the plan itself, rather than being fully-featured.

The Xpertship program weighs tasks via assigning them points, as a metric for the various contributions to the community, to [Excella](http://www.excella.com), and others you work with.

## Xpert Plan

The Xpert Plan has two views: Displa mode and Edit Mode (toggled via the slide-toggle in the upper right corner).

### Display Mode

Until additional work is done and exporting as a PDF is possible, the Display View for your plan is likely the best way to view all the items you've entered into the system.

The plan is split into two in this view: Completed on top, and Forecasted below.

### Edit Mode

Edit mode prefers breaking up the plan by task category. The categories are each given an accordian section, so you can focus on one category at a time, if you wish.

#### Adding a task

1. **Select a "Base Item" using the drop-down.** These are examples of some tasks from this category, and will auto-populate the points field with the initial point value for that "base item".
1. **Enter a description.** This should briefly describe the task or accomplishment.
1. **Adjust the poiint value.** Working with your supervisor, set the number of points for the task.
1. **Save the plan** by clicking on the "Save" button at the bottom of the page.

#### Completing a task

1. **Find the task** to be completed by opening the accordion.
1. **Check the "Done" checkbox.**
1. **Enter the date** the task was completed in the newly added date field.
1. **Save the plan** by clicking on the "Save" button at the bottom of the page.

## Overview

The overview page has four analyses of the plan:

- **All Plan Contributions by Category** - Breaks down all (completed and uncompleted) tasks by category, as a way to understand how well-rounded your overall plan is.
- **Earned Plan Contributions by Category** - Breaks down just the completed tasks by category, in order to understand what categories might be best to work on next (ie, ones that are under-represented)
- **Plan Contributions by Month** - Shows completed points by month, over the past year. This shows peaks and gaps as work is done and completed. Keeping this even shows stability and sustainability with the way you work. If there are many spikes and empty columns, consider finding ways to even out your work-load, or break it up into smaller pieces.
- **Completions & Plan Forecasts** - Shows the ratio of points completed vs points planned. This can show progress through a large chunk of work, or if the forecasted points are low, that you have accomplished quite a lot and should spend some time thinking about what's next!

## Import/Export Plan

These tabs allow you to save/load your pla from a file. Currently, `.csv` and `.json` are supported. **The plan is not saved inside the application**, so be sure to export once you are done making any changes!

# Contributing

If you'd like to contribute to the project, please read the Contributing guidelines, [here](CONTRIBUTING.md).
