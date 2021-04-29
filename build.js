console.log('\n\n---------------\n\n');
console.log('Node build script');

const [nextRelease] = process.argv.slice(2);
const nextNotes = nextRelease.notes;
const releaseNote = nextNotes.split('\n').slice(2).join('\n');
console.log('Release note:', releaseNote);
console.log('\n\n---------------\n\n');
