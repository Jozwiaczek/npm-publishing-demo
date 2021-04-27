const fs = require('fs');
console.log('Node build script');
console.log(process.argv);
console.log(process.env.TMP);
const changelog = fs.readFileSync(`./CHANGELOG.md`, 'utf8');
console.log(changelog);
throw Error('Quick check');
