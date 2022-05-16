const route = require('express').Router();
const express = require('express');
const { readTalker } = require('../helpers');
const generateToken = require('../utils/token');
// const errorTalker = require('../middleware/errorMiddleware');

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

route.post('/login', (_req, res) => {
const token = generateToken();
res.status(200).json({ token });
});

module.exports = route;