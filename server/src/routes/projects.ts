import { Router } from 'express';
import prisma from '../db/prisma';
import { authenticateAdmin } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

// Get all projects (public)
router.get('/', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { displayOrder: 'asc' }
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Get single project (public)
router.get('/:id', async (req, res) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: req.params.id }
    });
    if (!project) return res.status(404).json({ error: 'Not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// Create project (admin)
router.post('/', authenticateAdmin, upload.array('images', 5), async (req, res) => {
  try {
    const {
      title, shortDescription, fullDescription, technologies,
      video, status, githubLink, liveDemoLink, downloadLink,
      dateDeveloped, myRole, isFeatured, displayOrder
    } = req.body;

    const files = req.files as Express.Multer.File[];
    const images = files ? files.map(f => `/uploads/${f.filename}`) : [];

    const project = await prisma.project.create({
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Update project (admin)
router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const data = req.body;
    if (data.technologies && typeof data.technologies === 'string') {
        data.technologies = JSON.parse(data.technologies);
    }
    const project = await prisma.project.update({
      where: { id: req.params.id as string },
      data
    });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Delete project (admin)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    await prisma.project.delete({ where: { id: req.params.id as string } });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

export default router;
