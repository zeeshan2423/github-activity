const { test } = require('node:test'); // Import the built-in test module
const assert = require('node:assert'); // Import assert for making test assertions
const { formatEvent } = require('./index.js'); // Import the function to be tested

/**
 * Test: Ensure `formatEvent` correctly formats a PushEvent.
 * Expected output: "Pushed X commits to repo-name"
 */
test('Format PushEvent correctly', () => {
  const event = {
    type: 'PushEvent',
    repo: { name: 'test-user/repo' }, // Repository name
    payload: { commits: [{}, {}, {}] }, // Simulating 3 commits
  };

  assert.strictEqual(
    formatEvent(event),
    'Pushed 3 commits to test-user/repo' // Expected output format
  );
});

/**
 * Test: Ensure `formatEvent` formats an IssuesEvent when an issue is opened.
 * Expected output: "Opened a new issue in repo-name"
 */
test('Format IssuesEvent opened action', () => {
  const event = {
    type: 'IssuesEvent',
    repo: { name: 'test-user/repo' }, // Repository name
    payload: { action: 'opened' }, // Simulating an issue being opened
  };

  assert.strictEqual(
    formatEvent(event),
    'Opened a new issue in test-user/repo' // Expected output format
  );
});

/**
 * Test: Ensure `formatEvent` formats a WatchEvent correctly.
 * Expected output: "Starred repo-name"
 */
test('Format WatchEvent correctly', () => {
  const event = {
    type: 'WatchEvent',
    repo: { name: 'test-user/repo' }, // Repository name
  };

  assert.strictEqual(
    formatEvent(event),
    'Starred test-user/repo' // Expected output format
  );
});

/**
 * Test: Ensure `formatEvent` returns `null` for unknown event types.
 * Expected output: `null`
 */
test('Return null for unknown event type', () => {
  const event = { type: 'UnknownEvent' }; // Simulating an unsupported event type

  assert.strictEqual(
    formatEvent(event),
    null // Expected output is `null`
  );
});
