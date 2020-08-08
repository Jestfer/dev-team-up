export default (emailInfo, type) => {
  switch (type) {
    case 'pairing':
      return `Hello ${emailInfo.authorName},<br><br> User ${emailInfo.joinerName} just joined you on ${emailInfo.task}.<br><br> This is your pairing partner's email: ${emailInfo.joinerEmail}<br><br> Please get in contact to start on your task. Happy pairing!<br><br> The Dev Team Up team`;
    case 'verifyEmail':
      return `Hello ${emailInfo.name},<br><br> Please click on the link below to verify your account (you will get redirected to the login page):<br><br> <a href="${emailInfo.verificationLink}">Click here to verify</a><br><br> The Dev Team Up team`;
    default:
      return '';
  }
};
