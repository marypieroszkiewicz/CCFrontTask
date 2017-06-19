/* ----- CCFrontTask2.js ---- */

const DEV = true;
const spellsDamage = {
  fe: 1,
  je: 2,
  jee: 3,
  ain: 3,
  dai: 5,
  ne: 2,
  ai: 2
};
const availableSpells = Object.keys(spellsDamage);
const longestSpellLength = Math.max(...availableSpells.map(x => x.length));

function shorterToLonger(spell) {
  let totalDamage = 0;

  mainLoop: for (let i = 0; i < spell.length; i++) {
    for (let j = 1; j <= longestSpellLength; j++) {
      const spellPart = spell.slice(i, i + j);

      if (availableSpells.includes(spellPart)) {
        totalDamage += spellsDamage[spellPart];
        i += j - 1;
        continue mainLoop;
      }
    }

    totalDamage -= 1;
  }

  return totalDamage;
}

function longerToShorter(spell) {
  let totalDamage = 0;

  mainLoop: for (let i = 0; i < spell.length; i++) {
    const spellPart = spell.slice(i, longestSpellLength);

    if (availableSpells.includes(spellPart)) {
      totalDamage += spellsDamage[spellPart];
      i += spellPart.length;
      continue;
    }

    for (let j = 1; j < spellPart.length; j++) {
      if (availableSpells.includes(spellPart.slice(0, -j))) {
        totalDamage += spellsDamage[spellPart.slice(0, -j)];
        i += spellPart.length - j;
        continue mainLoop;
      }
    }

    totalDamage -= 1;
  }

  return totalDamage;
}

exports.damage = function(spellString) {
  const match = /fe(.*)ai/.exec(spellString);
  if (!match || spellString.match(/fe/g).length > 1) {
    if (DEV) console.log(`Spell: '${spellString}' | Invalid spell`);
    return 0;
  }

  const extractedSpell = match[1];
  let totalDamage = spellsDamage["fe"] + spellsDamage["ai"];

  const shorterToLongerDamage = shorterToLonger(extractedSpell);
  const longerToShorterDamage = longerToShorter(extractedSpell);

  if (shorterToLongerDamage > longerToShorterDamage) {
    totalDamage += shorterToLongerDamage;
  } else {
    totalDamage += longerToShorterDamage;
  }

  if (DEV) console.log(`Spell: '${spellString}' | Damage: ${totalDamage}`);

  return totalDamage > 0 ? totalDamage : 0;
};
