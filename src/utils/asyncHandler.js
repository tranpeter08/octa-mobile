export default async function asyncHandlerJSON(promise) {
  try {
    const result = await promise;

    return [JSON.parse(result), null];
  } catch (error) {
    return [null, error];
  }
}
