import { readFileSync } from 'fs';

export const commentPR = async ({ github, context }: { github: any; context: any }) => {
  let changelog = '';
  try {
    changelog = JSON.parse(readFileSync(`${__dirname}/CHANGELOG.md`, 'utf8'));
  } catch (error) {
    throw Error('Missing changelog.');
  }

  const newMessage = `
  	👋 Thanks for testing#5!\n
  	<details>
  		<summary>Changelog:</summary>
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
