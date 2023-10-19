var replacements = [
  { original: 'UE', recommended: 'device' },
  { original: 'MSISDN', recommended: 'phone number' },
  { original: 'mobile network', recommended: 'network' }
];

function includesNumber(value) {
  return /\d/.test(value);
}

export default async function (input) {
  const no_special_characters = input.replace(/[^\w\s]/gi, '');
  const words = no_special_characters.split(/\s/);

  const errors = [];

  for (const word of words) {
    for (const replacement of replacements) {
      if (word === replacement.original) {
        errors.push(replacement);
        break; // No need to check further replacements for this word
      }
    }
  }

  if (errors.length > 0) {
    const suggestions = errors.map((error) => {
      return `Consider replacing '${error.original}' with '${error.recommended}'.`;
    });

    return [
      {
        message: 'Telco-specific terminology found: ' + suggestions.join(', '),
      },
    ];
  }

  return [];
}
