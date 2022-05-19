const moment = require('moment');

const verifyName = (req, res, next) => {
    const { name } = req.body;
    if (!name || name.length === 0) {
        return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) { 
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    next();
};
const verifyAge = (req, res, next) => {
    const { age } = req.body;
    if (!age || age.length === 0) {
        return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (age < 18) {
        return res.status(400)
        .json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    next();
};

const verifyTalk = (req, res, next) => {
    if (!req.body.talk) {
        return res.status(400)
        .json({ message: 
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
    }
    next();
};

const verifyTalkWatchedAt = (req, res, next) => {
    const { talk: { watchedAt } } = req.body;

    if (!watchedAt) {
        return res.status(400)
        .json({ message: 
        'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
    }
    const boolDate = moment(watchedAt, 'DD/MM/YYYY', true).isValid();
    if (boolDate === false) { 
        return res.status(400)
        .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    next();
};

const verifyTalkRate = (req, res, next) => {
    const { talk: { rate } } = req.body;
    if (rate < 1 || rate > 5) {
        return res.status(400)
        .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    if (!rate) {
        return res.status(400).json({ message: 
            'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
        }
    next();
};

module.exports = {
    verifyName,
    verifyAge,
    verifyTalkWatchedAt,
    verifyTalkRate,
    verifyTalk,
};