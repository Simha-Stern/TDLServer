import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../db';


const register = async (email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [rows] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if ((rows as any[]).length > 0) {
        return { status: 409, error: 'User already exists' };
    }
    await pool.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
    return { status: 201, message: 'User registered' };
}

const login = async (email: string, password: string) => {

        const [rows] = await pool.query('SELECT id, password FROM users WHERE email = ?', [email]);
        if ((rows as any[]).length === 0) {
            return {status: 401, error: 'Invalid credentials' };
        }
        const user = (rows as any[])[0];
        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return {status: 401,  error: 'Invalid credentials' };
        }
        const JWT_SECRET = process.env.JWT_SECRET || '';
        const token = jwt.sign({ userId: user.id, email }, JWT_SECRET, { expiresIn: '1h' });
        return {status: 200, token };
    
}

export default { register, login };