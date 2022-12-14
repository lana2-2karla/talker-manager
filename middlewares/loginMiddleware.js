const validation = (req, res, next) => {
const SIX = 6;
const { email, password } = req.body;
const regex = /\S+@\S+\.\S+/;
const emailValido = regex.test(email);
    
if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
if (password.length < SIX) {
     return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
}
if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });
if (!emailValido) {
    return res.status(400)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
}
next();
};
    
module.exports = validation;