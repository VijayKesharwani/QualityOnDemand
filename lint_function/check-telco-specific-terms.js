const replacements = [
  { original: 'UE', recommended: 'device' },
  { original: 'MSISDN', recommended: 'phone number' },
  { original: 'mobile network', recommended: 'network' }
];

function includesNumber(value) {
  return /\d/.test(value);
}

export default async function (input) {
  const errors = new Set(); // Use a Set to store unique errors
  const suggestions = new Set(); // Use a Set to store unique suggestions

  // Iterate over properties of the input object
  for (const path in input) {
    const value = input[path];

    // Check if the value is a string
    if (typeof value === 'string') {
      for (const replacement of replacements) {
        const original = replacement.original;
        const recommended = replacement.recommended;

        // Use a regular expression to match 'original' as a standalone word
        const regex = new RegExp(`\\b${original}\\b`, 'g');

        // Check if 'original' exists in the value
        if (regex.test(value)) {
          errors.add(replacement);
          suggestions.add(`Consider replacing '${original}' with '${recommended}'.`);
        }
      }
    }
  }

  // Convert the Sets to arrays before logging
  const uniqueErrors = Array.from(errors);
  const uniqueSuggestions = Array.from(suggestions);

  // Check if any word from 'replacements' is in the suggestions
  if (uniqueErrors.length > 0) {
    console.log('Hint: Telco-specific terminology found in input: ' + uniqueSuggestions.join(', '));
  }
};
