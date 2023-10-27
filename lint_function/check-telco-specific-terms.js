export default async function (input) {
  const errors = [];
  const suggestions = [];
  const replacements = [
    { original: 'mobile network', recommended: 'network' },
    { original: 'MSISDN', recommended: 'phone number' }
  ];

  const termFlags = {}; // Store flags for each replacement term

  // Initialize flags to false for all replacement terms
  replacements.forEach(replacement => {
    termFlags[replacement.original] = false;
  });

  // Iterate over properties of the input object
  for (const path in input) {
    const value = input[path];

    // Check if the value is a string
    if (typeof value === 'string') {
      for (const replacement of replacements) {
        const original = replacement.original;

        // Check if the term is not flagged and exists in the value
        if (!termFlags[original] && value.includes(original)) {
          errors.push(replacement);
          suggestions.push(`Consider replacing '${original}' with '${replacement.recommended}'.`);
          termFlags[original] = true; // Set the flag to true
        }
      }
    }
  }

  // Check if any words from 'replacements' are in the suggestions
  if (errors.length > 0) {
    console.log('Hint: Telco-specific terminology found in input: ' + suggestions.join(', '));
  }
};
