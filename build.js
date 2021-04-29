const fs = require('fs');
console.log('Node build script');
const [nextRelease] = process.argv.slice(2);
console.table(nextRelease);
console.log('ENV:', process.env.TMP);
const changelog = fs.readFileSync(`./CHANGELOG.md`, 'utf8');
console.log('Changelog:', changelog);
const currentRelease = changelog.split('# [')[1];
const releaseNote = currentRelease.split('\n').slice(2).join('\n');
console.log('Release note:', releaseNote);
