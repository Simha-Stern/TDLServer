import { User } from "../types";
import { Request, Response } from 'express';
import service from "./users.service"
import logger from "../utils/logger";


// Register new user
const register = async (req: Request, res: Response) => {
    const { email, password } = req.body as User;
    if (!email || !password) {
        res.status(400).json({ error: 'Email and password required' });
        return;
    }

    try {
        const result = await service.register(email, password);
        if (result.status === 409) {
            res.status(409).json({ error: result.error });
            return;
        } else if (result.status === 201) {
            res.status(201).json({ message: result.message });
            return;
        }
    } catch (err) {
        logger.error('Database error', err);
        res.status(500).json({ error: 'Database error' });
        return;
    }
}

// Login user
const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: 'Email and password required' });
        return;
    }

    try {
        const result = await service.login(email, password);
        if (result.status === 401) {
            res.status(401).json({ error: result.error });
            return;
        } else if (result.status === 200) {
            res.status(200).json({ token: result.token });
            return;
        }
    } catch (err) {
        logger.error('Database error', err);
        res.status(500).json({ error: 'Database error' });
        return;
    }
}

export default { register, login };
