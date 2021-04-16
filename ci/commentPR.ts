const { readFileSync } = require('fs');

export const commentPR = async ({ github, context }: { github: any; context: any }) => {
  console.log('L:11 | context: ', context);
  const changelog = readFileSync(`${__dirname}/../../CHANGELOG.md`, 'utf8');

  const VERSION = process.env.NPM_PACKAGE_VERSION;
  console.log('L:8 | VERSION: ', VERSION);

  const newMessage = `
	👋 Thanks for testing#6!
	New version ${VERSION}

<details>
	<summary>CHANGELOG.md</summary>
	
${changelog}
	
</details>
  `;

  const commentInfo = {
    ...context.repo,
    issue_number: context.issue.number,
  };
  const signature = 'via JJ GitHub Actions 🇵🇱';
  const comment = {
    ...commentInfo,
    body: `${newMessage}\n\n${signature}`,
  };

  let commentId;
  const comments = (await github.issues.listComments(commentInfo)).data;
  for (let i = comments.length; i--; ) {
    const c = comments[i];
    if (c.user.type === 'Bot' && c.body.includes(signature)) {
      commentId = c.id;
      break;
    }
  }

  if (commentId) {
    await github.issues.updateComment({
      ...context.repo,
      comment_id: commentId,
      body: comment.body,
    });
  }

  if (!commentId) {
    await github.issues.createComment(comment);
  }
};
