// https://stackoverflow.com/a/13178771/8243590
const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

const emailIsValid = (email) => {
  return email.match(emailRegex);
};

export { emailIsValid };
