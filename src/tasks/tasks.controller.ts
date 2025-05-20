import { Request, Response } from 'express';
import service from "./tasks.service"

async function getTasks(req: Request, res: Response) {
    const userId = (req as any).user.userId;
    try {
        const tasks = await service.getTasks(userId);
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
}

async function addTask(req: Request, res: Response) {
    const userId = (req as any).user.userId;
    const { title } = req.body;
    if (!title) {
        res.status(400).json({ error: 'Title required' });
        return;
    }
    try {
        const result = await service.addTask(userId, title);
        res.status(201).json({ id: (result as any).insertId, title, completed: false });
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
}

async function updareTask(req: Request, res: Response) {
    const userId = (req as any).user.userId;
    const { id } = req.params;
    const { title, completed } = req.body;
    try {
        const result = await service.updareTask(userId, id, title, completed);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
}

async function deleteTask(req: Request, res: Response) {
    const userId = (req as any).user.userId;
    const { id } = req.params;
    try {
        const result = await service.deleteTask(userId, id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
    }
}
export default { getTasks, addTask, updareTask, deleteTask };