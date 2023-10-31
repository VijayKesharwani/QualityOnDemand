// lint_function/camara-casing-convention.js

export default async function (input) {
  const errors = [];
  const suggestions = [];

  // Iterate over the paths in the API definition
  for (const path in input.paths) {
    for (const method in input.paths[path]) {
      const operation = input.paths[path][method];
      if (operation.operationId) {
        const operationId = operation.operationId;
        // Check if operationId is not in camelCase
        if (!isCamelCase(operationId)) {
          errors.push(operationId);
          suggestions.push(`OperationId '${operationId}' should be in camelCase.`);
        }
      } else {
        errors.push('OperationId missing');
        suggestions.push(`OperationId is missing for the ${method} operation on path '${path}'.`);
      }
    }
  }

  // Check if any errors were found
  if (errors.length > 0) {
    console.log('Hint: OperationId casing convention issues found: ' + suggestions.join(', '));
  }
}

function isCamelCase(str) {
  // Check if a string is in camelCase
  return /^[a-z][a-zA-Z0-9]*$/.test(str);
}
