import { Request, Response } from 'express';
import service from "./tasks.service"

async function getTasks(req: Request, res: Response) {
    console.log('GET /tasks', { userId: (req as any).user.userId });
    const userId = (req as any).user.userId;
    try {
        const tasks = await service.getTasks(userId);
        res.json(tasks);
        return;
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
        return;
    }
}

async function addTask(req: Request, res: Response) {
    console.log('POST /tasks', { userId: (req as any).user.userId, body: req.body });
    const userId = (req as any).user.userId;
    const { title } = req.body;
    if (!title) {
        res.status(400).json({ error: 'Title required' });
        return;
    }
    try {
        const result = await service.addTask(userId, title);
        res.status(201).json({ id: (result as any).insertId, title, completed: false });
        return;
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
        return;
    }
}

async function updareTask(req: Request, res: Response) {
    console.log('PUT /tasks/:id', { userId: (req as any).user.userId, params: req.params, body: req.body });
    const userId = (req as any).user.userId;
    const { id } = req.params;
    const { title, completed } = req.body;
    try {
        const result = await service.updareTask(userId, id, title, completed);
        res.json(result);
        return;
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
        return;
    }
}

async function deleteTask(req: Request, res: Response) {
    console.log('DELETE /tasks/:id', { userId: (req as any).user.userId, params: req.params });
    const userId = (req as any).user.userId;
    const { id } = req.params;
    try {
        const result = await service.deleteTask(userId, id);
        res.json(result);
        return;
    } catch (err) {
        res.status(500).json({ error: 'Database error' });
        return;
    }
}
export default { getTasks, addTask, updareTask, deleteTask };
