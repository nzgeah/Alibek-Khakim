"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../db/prisma"));
const router = (0, express_1.Router)();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password required' });
    }
    try {
        const user = await prisma_1.default.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const match = await bcrypt_1.default.compare(password, user.passwordHash);
        if (!match) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
    }
    catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Setup admin (Run only once to create initial admin)
router.post('/setup', async (req, res) => {
    const { email, password } = req.body;
    const count = await prisma_1.default.user.count();
    if (count > 0) {
        return res.status(400).json({ error: 'Admin already exists' });
    }
    const hash = await bcrypt_1.default.hash(password, 10);
    const user = await prisma_1.default.user.create({
        data: {
            email,
            passwordHash: hash
        }
    });
    res.json({ message: 'Admin created', userId: user.id });
});
exports.default = router;
