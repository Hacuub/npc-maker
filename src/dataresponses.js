const characters = [
  {
    name: 'base',
    gender: 'base',
    race: 'base',
    class: 'base',
    alignment: 'base',
    disposition: 'base',
    Combat: {
      //  challenge rating
      CR: 'base',
      //  12 + 1/2 CR
      AC_DC: 'base',
      //  3 + 1/2 CR
      AttackBonus_PrimarySaves: 'base',
      //  15 + 15 x CR
      HP: 'base',
      //  5 + 5 x CR
      BaseDMG: 'base',
    },
  },
  {
    name: 'example',
    gender: 'male',
    race: 'human',
    class: 'fighter',
    alignment: 'neutral good',
    disposition: 'friendly',
    Combat: {
      CR: '1',
      AC_DC: '12',
      AttackBonus_PrimarySaves: '3',
      HP: '30',
      BaseDMG: '10',
    },
  },
  {
    name: 'example2',
    gender: 'female',
    race: 'elf',
    class: 'rogue',
    alignment: 'chaotic neutral',
    disposition: 'impatient',
    Combat: {
      CR: '2',
      AC_DC: '13',
      AttackBonus_PrimarySaves: '4',
      HP: '45',
      BaseDMG: '15',
    },
  },
  {
    name: 'example3',
    gender: 'male',
    race: 'dwarf',
    class: 'cleric',
    alignment: 'lawful good',
    disposition: 'angry',
    Combat: {
      CR: '3',
      AC_DC: '13',
      AttackBonus_PrimarySaves: '4',
      HP: '60',
      BaseDMG: '20',
    },
  },
];

//  found online at:
//  https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// ALWAYS GIVE CREDIT - in your code comments and documentation
// Source: https://stackoverflow.com/questions/2219526/how-many-bytes-in-a-javascript-string/29955838
// Refactored to an arrow function by ACJ
const getBinarySize = (string) => Buffer.byteLength(string, 'utf8');

const getRandomCharJSON = () => {
  shuffleArray(characters);
  const char = characters[0];
  return JSON.stringify(char);
};
const getRandomCharXML = () => {
  shuffleArray(characters);
  const char = characters[0];
  const characterXML = `
        <character>
            <name>${char.name}</name>
            <gender>${char.gender}</gender>
            <race>${char.race}</race>
            <class>${char.class}</class>
            <alignment>${char.alignment}</alignment>
            <disposition>${char.disposition}</disposition>
            <combat>
                <cr>${char.Combat.CR}</cr>
                <ac_dc>${char.Combat.AC_DC}</ac_dc>
                <attackbonus_promarysaves>${char.Combat.AttackBonus_PrimarySaves}</attackbonus_primarysaves>
                <hp>${char.Combat.HP}</hp>
                <basedmg>${char.Combat.BaseDMG}</basedmg>
            </combat>
        </character`;
  return characterXML;
};

const getRandomChar = (request, response, type) => {
  //    xml and json
  if (type.includes('text/xml')) {
    if (request.method === 'HEAD') {
      response.writeHead(200, {
        'Content-Type': 'text/xml',
        'Content-Length': getBinarySize(getRandomCharXML()),
      });
    } else {
      response.writeHead(200, { 'Content-Type': 'text/xml' });
      response.write(getRandomCharXML());
    }
  } else if (request.method === 'HEAD') {
    response.writeHead(200, {
      'Content-Type': 'application/json',
      'Content-Length': getBinarySize(getRandomCharJSON()),
    });
  } else {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(getRandomCharJSON());
  }
  response.end();
};

const getNamedCharXML = (name = '') => {
  let char;
  for (let i = 0; i < characters.length; i++) {
    if (name === characters[i].name) {
      char = characters[i];
    }
  }
  const characterXML = `
    <character>
        <name>${char.name}</name>
        <gender>${char.gender}</gender>
        <race>${char.race}</race>
        <class>${char.class}</class>
        <alignment>${char.alignment}</alignment>
        <disposition>${char.disposition}</disposition>
        <combat>
            <cr>${char.Combat.CR}</cr>
            <ac_dc>${char.Combat.AC_DC}</ac_dc>
            <attackbonus_promarysaves>${char.Combat.AttackBonus_PrimarySaves}</attackbonus_primarysaves>
            <hp>${char.Combat.HP}</hp>
            <basedmg>${char.Combat.BaseDMG}</basedmg>
        </combat>
    </character`;
  return characterXML;
};

const getNamedCharJSON = (name = '') => {
  let char;
  for (let i = 0; i < characters.length; i++) {
    if (name === characters[i].name) {
      char = characters[i];
    }
  }
  return JSON.stringify(char);
};

const getNamedChar = (request, response, type, params) => {
  //    xml and json
  if (type.includes('text/xml')) {
    if (request.method === 'HEAD') {
      response.writeHead(200, {
        'Content-Type': 'text/xml',
        'Content-Length': getBinarySize(getNamedCharXML(params)),
      });
    } else {
      response.writeHead(200, { 'Content-Type': 'text/xml' });
      response.write(getNamedCharXML(params));
    }
  } else if (request.method === 'HEAD') {
    response.writeHead(200, {
      'Content-Type': 'application/json',
      'Content-Length': getBinarySize(getNamedCharJSON(params)),
    });
  } else {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(getNamedCharJSON(params));
  }
  response.end();
};

const getAllChar = () => JSON.stringify(characters);

const submitChar = () => {
  // non functioning rn
};

module.exports = {
  getRandomChar,
  getNamedChar,
  getAllChar,
  submitChar,
};
