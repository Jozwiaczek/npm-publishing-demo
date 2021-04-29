console.log('\n\n---------------\n\n');
console.log('Node build script');

console.log('L:4 | process.argv: ', process.argv);

const [nextRelease] = process.argv.slice(2);
console.log(nextRelease);
const nextNotes = nextRelease.notes;
console.log('L:6 | nextNotes: ', nextNotes);

const releaseNote = nextNotes.split('\n').slice(2).join('\n');
console.log('Release note:', releaseNote);
console.log('\n\n---------------\n\n');
