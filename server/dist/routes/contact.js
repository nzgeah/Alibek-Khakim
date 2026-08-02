"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../db/prisma"));
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Submit contact form (public)
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    try {
        const contact = await prisma_1.default.contactMessage.create({
            data: { name, email, message }
        });
        res.status(201).json({ message: 'Message sent successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to send message' });
    }
});
// Get contact messages (admin)
router.get('/', auth_1.authenticateAdmin, async (req, res) => {
    try {
        const messages = await prisma_1.default.contactMessage.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(messages);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});
exports.default = router;
