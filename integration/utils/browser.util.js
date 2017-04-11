/**
 * Browser utils
 */

export function getBaseUrl(pro) {
  if (pro) {
    return `${process.env.HOST}:${process.env.PRO_PORT}`;
  }

  return `${process.env.HOST}:${process.env.PORT}`;
}
