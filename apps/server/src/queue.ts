/**
 * For general-purpose jobs
 */
export const MAIN_QUEUE = 'main-queue';

export enum MAIN_PROCESSES {
  COLLECT_COLLECTIONS = 'COLLECT_COLLECTIONS',
  ADD_SELECTION = 'ADD_SELECTION',
}

/**
 * Queue for GitHub-related jobs
 */
export const GITHUB_QUEUE = 'github-queue';

export enum GITHUB_PROCESSES {
  DISCOVER = 'DISCOVER',
  DISCOVER_BY_LOCATION = 'DISCOVER_BY_LOCATION',
  DISCOVER_BY_ORG_LOCATION = 'DISCOVER_BY_ORG_LOCATION',
  DISCOVER_BY_ORG_PRESENCE = 'DISCOVER_BY_ORG_PRESENCE',
  DISCOVER_BY_REPO_SEARCH = 'DISCOVER_BY_REPO_SEARCH',

  EXTRACT = 'EXTRACT',

  ADD_OWNER = 'ADD_OWNER',
}
// TODO: make these class based instead of enums?
