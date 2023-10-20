const replacements = [
  { original: 'UE', recommended: 'device' },
  { original: 'MSISDN', recommended: 'phone number' },
  { original: 'mobile network', recommended: 'network' }
];

function includesNumber(value) {
  return /\d/.test(value);
}

export default async function (input) {
  const errors = [];
  const suggestions = [];

  // Iterate over properties of the input object
  for (const path in input) {
    const value = input[path];

    // Check if the value is a string
    if (typeof value === 'string') {
      for (const replacement of replacements) {
        const original = replacement.original;
        const recommended = replacement.recommended;

        // Check if the original word exists in the value
        if (value.includes(original)) {
          errors.push(replacement);
        }
      }
    }
  }

  if (errors.length > 0) {
    errors.forEach((error) => {
      suggestions.push(`Consider replacing '${error.original}' with '${error.recommended}'.`);
    });

    console.log('Telco-specific terminology found in input: ' + suggestions.join(', '));
  }
};
