const replacements = [
  { original: 'UE', recommended: 'device' },
  { original: 'MSISDN', recommended: 'phone number' },
  { original: 'mobile network', recommended: 'network' }
];

export default async function (input) {
  const errors = new Set(); // Use a Set to store unique errors
  const suggestionSet = new Set(); // Use a Set to store unique suggestions

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
          const errorInfo = {
            original,
            recommended,
            line: value // Add the input line to the error information
          };
          errors.add(errorInfo);
          suggestionSet.add(`Consider replacing '${original}' with '${recommended}'.`);
        }
      }
    }
  }

  // Convert the Sets to arrays before logging
  const uniqueErrors = Array.from(errors);
  const uniqueSuggestions = Array.from(suggestionSet);

  // Check if any word from 'replacements' is in the suggestions
  if (uniqueErrors.length > 0) {
    uniqueErrors.forEach(error => {
      console.log(`Hint: Telco-specific terminology '${error.original}' found in input line: ${error.line}`);
    });
    console.log('Suggestions: ' + uniqueSuggestions.join(', '));
  }
};
