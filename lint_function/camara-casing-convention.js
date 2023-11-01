// lint_function/camara-casing-convention.js

export default async function (input) {
  const errors = [];
  const suggestions = [];

  for (const path in input) {
    console.log(path);
    for (const method in input[path]) {
      const operation = input[path][method];
      if (operation.operationId) {
        const operationId = operation.operationId;
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

  if (errors.length > 0) {
    console.log('Hint: OperationId casing convention issues found: ' + suggestions.join(', '));
  }
}

function isCamelCase(str) {
  return /^[a-z][a-zA-Z0-9]*$/.test(str);
}
