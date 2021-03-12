const characters = [
  {
    index: 0,
    name: 'base',
    gender: 'base',
    age: 'base',
    race: 'base',
    class: 'base',
    alignment: 'base',
    disposition: 'base',
    backstory: 'base',
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
    index: 1,
    name: 'example',
    gender: 'male',
    age: '1',
    race: 'human',
    class: 'fighter',
    alignment: 'neutral good',
    disposition: 'friendly',
    backstory: 'barkeeper who you met on your adventure',
    Combat: {
      CR: '1',
      AC_DC: '12',
      AttackBonus_PrimarySaves: '3',
      HP: '30',
      BaseDMG: '10',
    },
  },
  {
    index: 2,
    name: 'example2',
    gender: 'female',
    age: '2',
    race: 'elf',
    class: 'rogue',
    alignment: 'chaotic neutral',
    disposition: 'impatient',
    backstory: 'pickpocket from the capital',
    Combat: {
      CR: '2',
      AC_DC: '13',
      AttackBonus_PrimarySaves: '4',
      HP: '45',
      BaseDMG: '15',
    },
  },
  {
    index: 3,
    name: 'example3',
    gender: 'male',
    age: '3',
    race: 'dwarf',
    class: 'cleric',
    alignment: 'lawful good',
    disposition: 'angry',
    backstory: 'priest to Bahamut',
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
  let char;
  if(characters.length > 0){
    char = characters[0];
  }else{
    char = -1;
  }
  return JSON.stringify(char);
};
const getRandomCharXML = () => {
  shuffleArray(characters);
  const char = characters[0];
  let characterXML;
  if(characters.length > 0){
  characterXML = `
        <character>
            <index>${char.index}</name>
            <name>${char.name}</name>
            <gender>${char.gender}</gender>
            <age>${char.age}</age>
            <race>${char.race}</race>
            <class>${char.class}</class>
            <alignment>${char.alignment}</alignment>
            <disposition>${char.disposition}</disposition>
            <backstory>${char.backstory}</backstory>
            <combat>
                <cr>${char.Combat.CR}</cr>
                <ac_dc>${char.Combat.AC_DC}</ac_dc>
                <attackbonus_promarysaves>${char.Combat.AttackBonus_PrimarySaves}</attackbonus_primarysaves>
                <hp>${char.Combat.HP}</hp>
                <basedmg>${char.Combat.BaseDMG}</basedmg>
            </combat>
        </character`;
  }else{
    characterXML = `<character>No characters in database</character>`
  }
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

const getNamedCharXML = (name = null) => {
  const char = [];
  let characterXML = '';
  if(characters.length > 0){
    for (let i = 0; i < characters.length; i++) {
      if (characters[i].name.includes(name)) {
        char.push(characters[i]);
      }
    }
    for (let i = 0; i < char.length; i++) {
      characterXML += `
      <character>
          <index>${char.index}</name>
          <name>${char.name}</name>
          <gender>${char.gender}</gender>
          <age>${char.age}</age>
          <race>${char.race}</race>
          <class>${char.class}</class>
          <alignment>${char.alignment}</alignment>
          <disposition>${char.disposition}</disposition>
          <backstory>${char.backstory}</backstory>
          <combat>
              <cr>${char.Combat.CR}</cr>
              <ac_dc>${char.Combat.AC_DC}</ac_dc>
              <attackbonus_promarysaves>${char.Combat.AttackBonus_PrimarySaves}</attackbonus_primarysaves>
              <hp>${char.Combat.HP}</hp>
              <basedmg>${char.Combat.BaseDMG}</basedmg>
          </combat>
      </character`;
    }
  }else{
    characterXML = null;
  }
  return characterXML;
};

const getNamedCharJSON = (name = null) => {
  let char = [];
  if(characters.length > 0){
    for (let i = 0; i < characters.length; i++) {
      if (characters[i].name.includes(name)) {
        char.push(characters[i]);
      }
    }
  }else{
    char = -1;
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

const getAllChar = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(characters));
  response.end();
};

const submitChar = (request, response, body) => {
  // non functioning rn
  const responseJSON = {
    message: 'All fields are required',
  };

  if (!body.name || !body.gender || !body.age || !body.race || !body.class || !body.alignment || !body.disposition || !body.backstory || !body.cr) {
    responseJSON.id = 'missingParams';
    response.writeHead(400, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(responseJSON));
    response.end();
    return;
  }

  characters.push({
    index: characters.length,
    name: 'base',
    gender: 'base',
    age: 'base',
    race: 'base',
    class: 'base',
    alignment: 'base',
    disposition: 'base',
    backstory: 'base',
    Combat: {
      CR: 'base',
      AC_DC: 'base',
      AttackBonus_PrimarySaves: 'base',
      HP: 'base',
      BaseDMG: 'base',
    },
  });

  characters[characters.length - 1].name = body.name;
  characters[characters.length - 1].gender = body.gender;
  characters[characters.length - 1].race = body.race;
  characters[characters.length - 1].age = body.age;
  characters[characters.length - 1].class = body.class;
  characters[characters.length - 1].alignment = body.alignment;
  characters[characters.length - 1].disposition = body.disposition;
  characters[characters.length - 1].backstory = body.backstory;
  characters[characters.length - 1].Combat.CR = body.cr;
  characters[characters.length - 1].Combat.AC_DC = Math.floor(12 + (parseInt(body.cr, 10) / 2));
  characters[characters.length - 1].Combat.AttackBonus_PrimarySaves = Math.floor(3 + (parseInt(body.cr, 10) / 2));
  characters[characters.length - 1].Combat.HP = 15 + (15 * parseInt(body.cr, 10));
  characters[characters.length - 1].Combat.BaseDMG = 5 + (5 * parseInt(body.cr, 10));

  responseJSON.message = 'New Character Created';
  response.writeHead(201, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(responseJSON));
  response.end();
};

const deleteChar = (request, response, body) => {
  const index = Number(body.index);

  const responseJSON = {
    message: `Unable to Delete character at index: ${index}`,
  };
  characters.splice(index, 1);
  for(let i = 0; i < characters.length; i++){
    characters[i].index = i;
  }

  response.writeHead(204, { 'Content-Type': 'application/json' });
  response.end();
};

module.exports = {
  getRandomChar,
  getNamedChar,
  getAllChar,
  submitChar,
  deleteChar,
};
