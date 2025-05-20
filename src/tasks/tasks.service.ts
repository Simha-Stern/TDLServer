import { pool } from "../db";

// CRUD for tasks (protected)
async function getTasks(userId: number) {
    const [tasks] = await pool.query('SELECT id, title, completed FROM tasks WHERE user_id = ?', [userId]);
    return tasks;
}

async function addTask(userId: number, title: string) {
    const [result] = await pool.query('INSERT INTO tasks (user_id, title, completed) VALUES (?, ?, ?)', [userId, title, false]);
    return { id: (result as any).insertId, title, completed: false };
}

async function updareTask(userId: number, id: string, title: string, completed: boolean) {
    const [result] = await pool.query('UPDATE tasks SET title = ?, completed = ? WHERE id = ? AND user_id = ?', [title, completed, parseInt(id), userId]);
    return { message: 'Task updated' };
}

async function deleteTask(userId: number, id: string) {
    await pool.query('DELETE FROM tasks WHERE id = ? AND user_id = ?', [parseInt(id), userId]);
    return { message: 'Task deleted' }
}
export default { getTasks, addTask, updareTask, deleteTask };