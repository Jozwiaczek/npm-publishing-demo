const fs = require('fs');
console.log('Node build script');
const [nextVersion] = process.argv.slice(2);
console.log(nextVersion);
console.log(process.env.TMP);
const changelog = fs.readFileSync(`./CHANGELOG.md`, 'utf8');
console.log(changelog);
const currentRelease = changelog.split('# [')[1];
const releaseNote = currentRelease.split('\n').slice(2).join('\n');
console.log(releaseNote);
