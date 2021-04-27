const fs = require('fs');
console.log('Node build script');
const [nextVersion] = process.argv.slice(2);
console.log(nextVersion);
console.log(process.env.TMP);
const changelog = fs.readFileSync(`./CHANGELOG.md`, 'utf8');
console.log(changelog);
throw Error('Quick check');
