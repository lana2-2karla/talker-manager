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

const editTalker = async (id, newTalker) => {
  const talkers = await readTalker();
  const arr = talkers.filter((talker) => talker.id !== +id);
  const edit = { id, ...newTalker };
  await writeTalker([...arr, edit]);
  return edit;
};

module.exports = {
    readTalker,
    writeTalker,
    editTalker,
  };