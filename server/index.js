const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());
require('dotenv').config();

router.post('/login', async (req, res) => {
    try {
        const { cpf, password } = req.body;

        const user = await prisma.user.findUnique({ where: { cpf } });

        if (!user) {
            res.status(401).send({ msg: 'Unauthorized' });
        } else {
            bcrypt.compare(password, user.password, function (err, result) {
                if (result) {
                    const token = jwt.sign({ id: user.id }, 'secret_key', { expiresIn: '1h' });
                    res.status(200).send({ msg: 'Login successful', token });
                } else {
                    res.status(401).send({ msg: 'Unauthorized' });
                }
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'An error occurred during login' });
    }
});

router.post('/register', async (req, res) => {
    const { name, cpf, email, func, password } = req.body;

    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: email },
                    { cpf: cpf }
                ]
            }
        });

        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(409).send({ msg: 'User with same email already exists' });
            }

            if (existingUser.cpf === cpf) {
                return res.status(409).send({ msg: 'User with same CPF already exists' });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await prisma.user.create({
            data: {
                name,
                cpf,
                email,
                func,
                password: hashedPassword
            }
        });

        res.status(200).send({ msg: 'Registration successful' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'An error occurred during registration', message: err.message });
    }
});

app.use('/', router);

const port = 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
