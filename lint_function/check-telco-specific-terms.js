export default async function (input) {
  const errors = [];
  const suggestions = [];
  let mobileNetworkFound = false;
  let msisdnFound = false;

  // Iterate over properties of the input object
  for (const path in input) {
    const value = input[path];

    // Check if the value is a string
    if (typeof value === 'string') {
      if (value.includes('mobile network') && !mobileNetworkFound) {
        errors.push({ original: 'mobile network', recommended: 'network' });
        suggestions.push(`Consider replacing 'mobile network' with 'network'.`);
        mobileNetworkFound = true;
      }

      if (value.includes('MSISDN') && !msisdnFound) {
        errors.push({ original: 'MSISDN', recommended: 'phone number' });
        suggestions.push(`Consider replacing 'MSISDN' with 'phone number'.`);
        msisdnFound = true;
      }
    }
  }

  // Check if any word from 'replacements' is in the suggestions
  if (errors.length > 0) {
    console.log('Hint: Telco-specific terminology found in input: ' + suggestions.join(', '));
  }
};
