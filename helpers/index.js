const fs = require('fs/promises');

const readTalker = async () => {
  const stringTalker = await fs.readFile('./talker.json', 'utf8');
  const talker = JSON.parse(stringTalker);

  return talker;
};

const writeTalker = async (talker) => {
  const stringTalker = JSON.stringify(talker);

  await fs.writeFile('./talker.json', stringTalker, 'utf8');
};

module.exports = {
    readTalker,
    writeTalker,
  };