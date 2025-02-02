import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export { publicRuntimeConfig };

/**
 * For the module being currently viewed, get the API reference URL associated
 * with the module.
 *
 * @param {string} moduleName - The module's name (e.g., "Drash"). This gets
 * lowercased so that it's used correctly against the configs.
 *
 * @returns {string} - The API reference URL for the given module.
 */
export function getApiReferenceUrl(moduleName) {
  return publicRuntimeConfig.docDenoLandUrls[moduleName.toLowerCase()];
}

/**
 * Get the URL to create a GitHub issue.
 *
 * @param {string} pageUri - This URI is sent as a URL query param to the GitHub
 * issue URL. It ends up in the GitHub issue's title.
 *
 * @returns {string} - The GitHub issue URL.
 */
export function getGitHubCreateIssueUrl(pageUri) {
  return `${publicRuntimeConfig.gitHubUrls.website}/issues/new?assignees=&labels=Priority:%20Medium,%20Remark:%20Investigation%20Needed%2C+documentation&template=documentation_page_issue.md&title=Issue%20on%20${pageUri} page`;
}

/**
 * Get the GitHub URL for the given module.
 *
 * @param {string} moduleName - The module's name (e.g., "Drash"). This gets
 * lowercased so that it's used correctly against the configs.
 *
 * @returns {string} - The GitHub URL for the given module.
 */
export function getGitHubUrl(moduleName) {
  // If there is no module, then it probably means we're on the homepage. If
  // we're on the homepage, then we want the GitHub URL to be the Drash Land
  // org page.
  if (!moduleName) {
    return "https://github.com/drashland";
  }

  return publicRuntimeConfig.gitHubUrls[moduleName.toLowerCase()];
}

/**
 * For the module being currently viewed, get the Roadmaps URL associated with the module.
 *
 * @param {string} moduleName - The module's name (e.g., "Drash"). This gets
 * lowercased so that it's used correctly against the configs.
 *
 * @returns {string} - The roadmaps URL for the given module.
 */
export function getRoadmapsUrl(moduleName) {
  if (!publicRuntimeConfig.roadmapsUrls[moduleName.toLowerCase()]) {
    return false;
  }

  return publicRuntimeConfig.roadmapsUrls[moduleName.toLowerCase()];
}
