const route = require('express').Router();
const express = require('express');
const { readTalker, writeTalker, editTalker, deleteTalker } = require('../helpers');
const generateToken = require('../utils/token');
const validation = require('../middlewares/loginMiddleware');
const tokenMiddleware = require('../middlewares/tokenValidationMiddleware');
const { 
    verifyName,
    verifyAge, 
    verifyTalkWatchedAt, 
    verifyTalkRate, 
    verifyTalk,
} = require('../middlewares/talkerMiddleware');

route.use(express.json());

route.get('/talker', async (_req, rest) => {
    const talker = await readTalker();
    rest.status(200).json(talker);
});

route.get('/talker/:id', async (req, res) => {
    const { id } = req.params;
    const talker = await readTalker();
    const talkerId = talker.find((talk) => talk.id === +id);
    if (!talkerId) res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    res.status(200).json(talkerId);
});

route.post('/login', validation, (_req, res) => {
    const token = generateToken();
    res.status(200).json({ token });
});

route.post(
    '/talker',
    tokenMiddleware,
    verifyName,
    verifyAge,
    verifyTalk,
    verifyTalkRate,
    verifyTalkWatchedAt, async (req, res) => {
const { name, age, talk: { watchedAt, rate } } = req.body;
const talker = await readTalker();
const newTalker = {
    id: Math.max(...talker.map((talk) => talk.id)) + 1, 
    name,
    age,
     talk: { watchedAt, rate },
    };

talker.push(newTalker);
    
await writeTalker(talker);
return res.status(201).json(newTalker);
},
);

route.put('/talker/:id',
tokenMiddleware,
verifyName,
verifyAge,
verifyTalk,
verifyTalkRate,
verifyTalkWatchedAt, async (req, res) => {
const talkersEdit = await editTalker(+req.params.id, req.body);
return res.status(200).json(talkersEdit);
});

route.delete('/talker/:id',
tokenMiddleware, async (req, res) => {
await deleteTalker(+req.params.id);
return res.status(204).json();
});

module.exports = route;