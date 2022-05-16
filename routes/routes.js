const route = require('express').Router();
const express = require('express');
const { readTalker } = require('../helpers');

route.use(express.json());

route.get('/talker', async (_req, rest) => {
    const talker = await readTalker();
    rest.status(200).json(talker);
});

module.exports = route;