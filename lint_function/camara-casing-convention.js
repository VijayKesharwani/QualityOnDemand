// lint_function/camara-casing-convention.js
export default async function (input) {
  const errors = [];
  const suggestions = [];
  if (!isCamelCase(input)) {
    errors.push(input);
    suggestions.push(`OperationId '${input}' should be in camelCase.`);
  }
  if (errors.length > 0) {
    console.log('Hint: OperationId casing convention issues found: ' + suggestions.join(', '));
  }
}

function isCamelCase(str) {
  return /^[a-z][a-zA-Z0-9]*$/.test(str);
}
