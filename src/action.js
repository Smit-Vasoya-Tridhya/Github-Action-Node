const core = require("@actions/core");
const github = require("@actions/github");
const fetch = require("node-fetch");

async function run() {
  const GITHUB_TOKEN = core.getInput("GITHUB_TOKEN");
  const TENOR_TOKEN = core.getInput("TENOR_TOKEN");
  const oktokit = github.getOctokit(GITHUB_TOKEN);

  const randomPos = Math.round(Math.round() * 1000);
  const url = `https://g.tenor.com/v1/search?q=smile&pos=${randomPos}&key=${TENOR_TOKEN}&limit=1&media_filter=minimal&contentfilter=high`;
  const response = await fetch(url);
  const { results } = await response.json();
  const gifUrl = results[0].media[0].tinygif.url;

  const { context = {} } = github;
  const { pull_request } = context.payload;

  await oktokit.issues.createComment({
    ...context.repo,
    issue_number: pull_request.number,
    body: `Thank you for Submitting the pull request  <img src="${gifUrl}" alt="image" /> `,
  });
}

run();
