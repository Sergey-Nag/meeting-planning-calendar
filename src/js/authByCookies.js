export const authUser = {
  name: null,
};

export default function cookieStringToObject(parseStr) {
  return parseStr.split(';').reduce((prevObj, str) => {
    const obj = prevObj;
    const [key, value] = str.split('=');

    obj[key.trim()] = value.trim();

    return obj;
  }, {});
}

export function getAuthorisedUser() {
  return cookieStringToObject(document.cookie)?.name;
}

export function setAuthorisedUser(name) {
  authUser.name = name;
}

export function authoriseUser(name) {
  document.cookie = `name=${name}; path=/; max-age=2`;
  setAuthorisedUser(name);
}
