# precommit-hooks-dependency-updating
## Intro
Checkout the repo called by this action, update pre-commit hook dependencies and generate a pull request.

## What it does
This action:
- checksout a new branch like this: `update-precommit-hooks-${today}`
- updates hook dependencies for this branch
- adds all of the affected files and commits them
- opens a new pull request

## How to use it
This action is designed to be run on schedule.
- ensure branch calling this action has a `.pre-commit-config.yaml` file
- ensure you are passing a valid github-token via your secrets to this action

## Trigger
This workflow can be triggered as follows:

```yaml
    - name: Update dependencies and open MR
      uses: JanAdamiak/precommit-hooks-dependency-updating/action@main
      with:
        github-token: ${{ secrets.GITHUB_TOKEN }}
```

## Why this is beneficial
It relieves your team from doing manual updates, now it can be do automatically!
