import store from '@/store';
import { Octokit } from "@octokit/rest";
const octokit = new Octokit({ auth: store === undefined ? undefined : store.getters.oauthToken });

export const getCommitInfo = (owner: string, repo: string) => {
    return octokit.request(`GET /repos/${owner}/${repo}/stats/commit_activity`);
}

export const getCodebase = (owner: string, repo: string) => {
    return octokit.request(`GET /repos/${owner}/${repo}/stats/code_frequency`);
}

export const getContributors = (owner: string, repo: string) => {
    return octokit.request(`GET /repos/${owner}/${repo}/stats/contributors`);
}