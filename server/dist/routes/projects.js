"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../db/prisma"));
const auth_1 = require("../middleware/auth");
const upload_1 = require("../middleware/upload");
const router = (0, express_1.Router)();
// Get all projects (public)
router.get('/', async (req, res) => {
    try {
        const projects = await prisma_1.default.project.findMany({
            orderBy: { displayOrder: 'asc' }
        });
        res.json(projects);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});
// Get single project (public)
router.get('/:id', async (req, res) => {
    try {
        const project = await prisma_1.default.project.findUnique({
            where: { id: req.params.id }
        });
        if (!project)
            return res.status(404).json({ error: 'Not found' });
        res.json(project);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch project' });
    }
});
// Create project (admin)
router.post('/', auth_1.authenticateAdmin, upload_1.upload.array('images', 5), async (req, res) => {
    try {
        const { title, shortDescription, fullDescription, technologies, video, status, githubLink, liveDemoLink, downloadLink, dateDeveloped, myRole, isFeatured, displayOrder } = req.body;
        const files = req.files;
        const images = files ? files.map(f => `/uploads/${f.filename}`) : [];
        const project = await prisma_1.default.project.create({
            data: {
                title,
                shortDescription,
                fullDescription,
                technologies: JSON.parse(technologies || '[]'),
                video,
                status,
                githubLink,
                liveDemoLink,
                downloadLink,
                dateDeveloped: dateDeveloped ? new Date(dateDeveloped) : null,
                myRole,
                isFeatured: isFeatured === 'true',
                displayOrder: parseInt(displayOrder) || 0,
                images
            }
        });
        res.status(201).json(project);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create project' });
    }
});
// Update project (admin)
router.put('/:id', auth_1.authenticateAdmin, async (req, res) => {
    try {
        const data = req.body;
        if (data.technologies && typeof data.technologies === 'string') {
            data.technologies = JSON.parse(data.technologies);
        }
        const project = await prisma_1.default.project.update({
            where: { id: req.params.id },
            data
        });
        res.json(project);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update project' });
    }
});
// Delete project (admin)
router.delete('/:id', auth_1.authenticateAdmin, async (req, res) => {
    try {
        await prisma_1.default.project.delete({ where: { id: req.params.id } });
        res.json({ message: 'Deleted' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete project' });
    }
});
exports.default = router;
