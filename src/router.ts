import { Router } from 'express';
import users from "./users/users.controller"
import tasks from "./tasks/tasks.controller"
import { authenticateToken } from './auth/auth.service';

const router = Router();

router.get('/', (req, res) => {
  console.log('GET /');
  res.send('Welcome to the ToDoList API!');
  return;
});

router.post('/register', users.register);

router.post('/login', users.login);

router.get('/tasks', authenticateToken, tasks.getTasks);

router.post('/tasks', authenticateToken, tasks.addTask);

router.put('/tasks/:id', authenticateToken, tasks.updareTask);

router.delete('/tasks/:id', authenticateToken, tasks.deleteTask);

export default router;
