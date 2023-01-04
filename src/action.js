const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
  const GITHUB_TOKEN = core.getInput("GITHUB_TOKEN");
  const oktokit = github.getOctokit(GITHUB_TOKEN);

  const { context = {} } = github;
  const { pull_request } = context.payload;

  await oktokit.issues.createComment({
    ...context.repo,
    issue_number: pull_request.number,
    body: "Thank you for Submitting the pull request",
  });
}

run();
