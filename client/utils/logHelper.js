export const assert = (condition, message) => {
  if (!condition) {
    console.log(message);
  }

  return true;
}
