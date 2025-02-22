const https = require('https'); // Import the built-in HTTPS module for making API requests

/**
 * Capitalizes the first letter of a given string.
 * @param {string} str - The input string to capitalize.
 * @returns {string} - The capitalized string.
 */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Formats a GitHub event into a user-friendly string.
 * @param {Object} event - The GitHub event object.
 * @returns {string | null} - A formatted event description or null for unsupported events.
 */
function formatEvent(event) {
  switch (event.type) {
    case 'PushEvent':
      return `Pushed ${event.payload.commits.length} commits to ${event.repo.name}`;
    case 'IssuesEvent':
      if (event.payload.action === 'opened') {
        return `Opened a new issue in ${event.repo.name}`;
      }
      return `${capitalize(event.payload.action)} an issue in ${event.repo.name}`;
    case 'WatchEvent':
      return `Starred ${event.repo.name}`;
    case 'CreateEvent':
      return `Created repository ${event.repo.name}`;
    case 'ForkEvent':
      return `Forked ${event.repo.name}`;
    case 'PullRequestEvent':
      return `${capitalize(event.payload.action)} a pull request in ${event.repo.name}`;
    default:
      return null; // Ignore unsupported event types
  }
}

/**
 * Fetches recent public GitHub events for a given user.
 * @param {string} username - GitHub username.
 * @returns {Promise<Object[]>} - A promise resolving to an array of event objects.
 */
function fetchUserEvents(username) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: `/users/${encodeURIComponent(username)}/events`, // Encode username to avoid special character issues
      headers: {
        'User-Agent': 'GitHub User Activity CLI', // GitHub API requires a user-agent
      },
    };

    // Make the GET request to GitHub API
    https
      .get(options, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk)); // Collect data chunks
        res.on('end', () => {
          if (res.statusCode === 200) {
            try {
              resolve(JSON.parse(data)); // Parse JSON response
            } catch (error) {
              reject(new Error('Failed to parse API response'));
            }
          } else if (res.statusCode === 404) {
            reject(new Error(`User '${username}' not found`));
          } else if (res.statusCode === 403) {
            reject(new Error('API rate limit exceeded. Please try again later'));
          } else {
            reject(new Error(`API request failed with status code ${res.statusCode}`));
          }
        });
      })
      .on('error', (error) => {
        reject(new Error(`API request failed: ${error.message}`));
      });
  });
}

// If the script is run directly from the command line
if (require.main === module) {
  if (process.argv.length < 3) {
    console.error('Please provide a GitHub username.');
    process.exit(1);
  }

  const username = process.argv[2]; // Read the username from CLI arguments
  
  fetchUserEvents(username)
    .then((events) => {
      const messages = events
        .map((event) => formatEvent(event))
        .filter((message) => message !== null); // Filter out unsupported event types

      if (messages.length === 0) {
        console.log('No recent activity found');
      } else {
        console.log(messages.join('\n'));
      }
    })
    .catch((error) => {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    });
}

// Export functions for testing purposes
module.exports = { formatEvent, fetchUserEvents };
