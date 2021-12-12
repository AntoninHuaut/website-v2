# Automate Updating Dependencies

## Table Of Contents

- [Description](#description)
- [Example](#example)

## Description

You can use Dmm to automatically update your dependencies. As Dmm can update
dependencies, all you need is a new workflow, and every Sunday, the workflow
will run, update your dependencies (if they can be) and make a pull request for
you to review!

Note: This tutorial will explain how to use Dmm as a 'bumper', but will not
explain the ins and outs of a workflow file. For this, refer to GitHub's
documentation.

## Example

```yml
# .github/workflows/bumper.yml

name: Update dependencies and bump version numbers

on:
  schedule:
    # Runs at 00:00 UTC every day
    - cron: '0 0 * * *'

jobs:

  update:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2

    - name: Install Deno
      uses: denoland/setup-deno@v1

    - name: Update dmm
      run: |
        deno install \
          --allow-read=deps.ts,tests/deps.ts \
          --allow-write=deps.ts,tests/deps.ts \
          --allow-net='cdn.deno.land,api.deno.land,x.nest.land,raw.githubusercontent.com,github.com,api.github.com' \
          https://deno.land/x/dmm/mod.ts
        dmm update
        cd tests
        dmm update

    - name: Create pull request
      uses: peter-evans/create-pull-request@v3
      with:
        token: ${{ secrets.TOKEN }}
        commit-message: 'Update dependencies'
        title: 'chore: Update dependencies'
        body: 'This pull request was auto-generated by GitHub Actions.'
        branch: update-dependencies
```