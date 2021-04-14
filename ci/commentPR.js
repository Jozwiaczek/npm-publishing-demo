module.exports = async ({ github, context }) => {
  const newMessage = '👋 Thanks for testing#4!';

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
    console.log(c.user.type);
    console.log(c.body.includes(signature));
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
