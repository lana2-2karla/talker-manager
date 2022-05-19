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
  const arrNotNewTalker = talkers.filter((talker) => talker.id !== +id);
  const edit = { id, ...newTalker };
  await writeTalker([...arrNotNewTalker, edit]);
  return edit;
};

const deleteTalker = async (id) => {
  const talkers = await readTalker();
  const arrNotNewTalker = talkers.filter((talker) => talker.id !== +id);
  await writeTalker(arrNotNewTalker);
};

module.exports = {
    readTalker,
    writeTalker,
    editTalker,
    deleteTalker,
  };