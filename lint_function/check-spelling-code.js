var dictionary = require('dictionary-en')
var nspell = require('nspell')
var separatorsRegex = /\s/; 
var mistakes= [];

function includesNumber(value) {
    return /\d/.test(value);
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export default async function (input) {
    dictionary((err, dict) => {
        if (err) {
            throw err;
        }
        var spell = nspell(dict);
        var no_special_characters = input.replace(/[^\w\s]/gi, '');
        const words = no_special_characters.split(separatorsRegex);
        var errors = words
            .filter((word) => !spell.correct(word))
            .filter((word) => !word == '')
            .filter((word) => !includesNumber(word);

        if (errors.length > 0) {
            // Concatenate the spelling mistakes into a single string
            const mistakesString = errors.join(', ');
            // Print the mistakes and return them in the message
            console.log("There was a spelling mistake: " + mistakesString);
            return [{
                message: `Spelling mistakes found: ${mistakesString}`,
            }];
        } else {
            // Return a message indicating no spelling mistakes found
            return [{
                message: "No spelling mistakes found!",
            }];
        }
    });
    // Sleep and return an empty array if no mistakes were found
    await sleep(150000);
    return [];
};
