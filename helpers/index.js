const fs = require('fs/promises');

const readTalker = async () => {
  const stringTalker = await fs.readFile('./talker.json', 'utf8');
  const talker = JSON.parse(stringTalker);

  return talker;
};

module.exports = {
    readTalker,
  };