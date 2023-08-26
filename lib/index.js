const { execSync } = require('child_process');
const { GitHub } = require('@actions/github');
const core = require('@actions/core');

async function run() {
    try {
        const today = new Date().toISOString().split('T')[0];
        const branchName = `update-precommit-hooks-${today}`;

        execSync(`git checkout -b ${branchName}`);

        execSync('pre-commit autoupdate');

        execSync('git add -A');
        execSync(`git commit -m "Update pre-commit hooks on ${today}"`);

        execSync(`git push origin ${branchName}`);

        const token = core.getInput('github-token');
        const octokit = new GitHub(token);
        const context = GitHub.context;

        const pr = await octokit.pulls.create({
            owner: context.repo.owner,
            repo: context.repo.repo,
            title: `Update Pre-Commit Hooks - ${today}`,
            head: branchName,
            base: 'master',
            body: `Pre-commit hooks updated automatically by the update-precommit-hooks-action on ${today}.`
        });

        console.log(`PR created: ${pr.data.html_url}`);

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
