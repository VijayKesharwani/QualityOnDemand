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
    dictionary ((err, dict) => {
        if (err) {
            throw err;
        }
        var spell = nspell(dict)
        var no_special_characters= input.replace(/[^\w\s]/gi, '')
        const words = no_special_characters.split(separatorsRegex);
        var errors= words
          .filter((word) => !spell.correct(word))
          .filter((word) => !word == '')
          .filter((word) => !includesNumber(word));

        if ((errors.length > 0) && (mistakes[mistakes.length-1] != errors[errors.length-1])) {
            mistakes.push(errors);
            errors = [];
            console.log("\n There was a spelling mistake: " + mistakes);
        }
    })
};
