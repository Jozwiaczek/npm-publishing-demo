module.exports = {
  branches: [
    'master',
    'next',
    'next-major',
    { name: 'beta', prerelease: true },
    { name: 'alpha', prerelease: true },
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    '@semantic-release/npm',
    [
      '@semantic-release/exec',
      {
        prepareCmd: 'yarn preCheckScript && node ./build.js "${nextRelease.notes}"',
      },
    ],
    '@semantic-release/github',
    '@semantic-release/git',
  ],
  parserOpts: {
    mergePatterns: "Merge branch 'development' into main",
  },
};
