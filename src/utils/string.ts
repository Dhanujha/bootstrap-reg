export function toTitleCase(str: string) {
  return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
}

export function validateRegext(str: string) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str);
}
