// lint_function/camara-casing-convention.js
export default async function (input) {
  const errors = [];
  const suggestions = [];

  for (const operationId of input) {
    console.log(operationId);
    if (!isCamelCase(operationId)) {
      errors.push(operationId);
      suggestions.push(`OperationId '${operationId}' should be in camelCase.`);
    }
  }

  if (errors.length > 0) {
    console.log('Hint: OperationId casing convention issues found: ' + suggestions.join(', '));
  }
}

function isCamelCase(str) {
  return /^[a-z][a-zA-Z0-9]*$/.test(str);
}
