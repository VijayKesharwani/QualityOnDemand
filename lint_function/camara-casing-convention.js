function isCamelCase(str) {
  // Regular expression to match valid camel case identifiers
  const camelCaseRegex = /^[a-z][a-zA-Z0-9]*$/;
  return camelCaseRegex.test(str);
}

export default async function (input) {
  for (const path in input.paths) {
    const pathObject = input.paths[path];
    for (const method in pathObject) {
      const operation = pathObject[method];
      if (operation.operationId) {
        if (!isCamelCase(operation.operationId)) {
          console.log(`WARN: Operation ID "${operation.operationId}" in path "${path}" does not follow camel case convention.`);
        }
      }
    }
  }
};
