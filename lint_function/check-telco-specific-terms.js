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

  // Phrases to check for as whole words
  const phrasesToMatch = replacements.map(replacement => replacement.original);

  // Iterate over properties of the input object
  for (const path in input) {
    const value = input[path];

    // Check if the value is a string
    if (typeof value === 'string') {
      for (const phrase of phrasesToMatch) {
        // Use a regular expression to match the phrase as a whole word
        const regex = new RegExp(`\\b${phrase}\\b`, 'g');

        // Check if the phrase exists in the value
        if (regex.test(value)) {
          const replacement = replacements.find(replacement => replacement.original === phrase);
          errors.push(replacement);
          suggestions.push(`Consider replacing '${phrase}' with '${replacement.recommended}'.`);
        }
      }
    }
  }

  if (errors.length > 0) {
    console.log('Hint: Telco-specific terminology found in input: ' + suggestions.join(', '));
  }
};
