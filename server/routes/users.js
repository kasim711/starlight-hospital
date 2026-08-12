import express from 'express';
import bcrypt from 'bcryptjs';
import db from '../db.js';
import { authenticateToken } from '../middleware/auth.js';
import { requireRole } from '../middleware/rbac.js';
import { logAuditAction } from '../middleware/audit.js';

const router = express.Router();

// Admin: Get users list (Super Admin only)
router.get('/', authenticateToken, requireRole(['Super Admin']), async (req, res) => {
  try {
    const users = await db.all('SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC');
    res.json({ users });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users.' });
  }
});

// Admin: Create user (Super Admin only)
router.post('/', authenticateToken, requireRole(['Super Admin']), async (req, res) => {
  try {
    const { name, email, password, role = 'Editor' } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    const validRoles = ['Super Admin', 'Editor', 'Author', 'Enquiry Manager'];
    const userRole = validRoles.includes(role) ? role : 'Editor';

    const existing = await db.get('SELECT id FROM users WHERE email = ?', [email.trim()]);
    if (existing) {
      return res.status(400).json({ error: 'User with this email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const result = await db.run(
      'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
      [name.trim(), email.trim(), passwordHash, userRole]
    );

    await logAuditAction(req, 'CREATE_USER', 'users', result.lastID, `Created staff user "${name}" with role "${userRole}"`);

    res.status(201).json({ message: 'User created successfully', id: result.lastID });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Failed to create user.' });
  }
});

// Admin: Update user role
router.put('/:id', authenticateToken, requireRole(['Super Admin']), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role } = req.body;

    const existing = await db.get('SELECT * FROM users WHERE id = ?', [id]);
    if (!existing) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const validRoles = ['Super Admin', 'Editor', 'Author', 'Enquiry Manager'];
    const userRole = validRoles.includes(role) ? role : existing.role;

    await db.run(
      'UPDATE users SET name = ?, role = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [name || existing.name, userRole, id]
    );

    await logAuditAction(req, 'UPDATE_USER_ROLE', 'users', id, `Updated user "${existing.email}" role to "${userRole}"`);

    res.json({ message: 'User updated successfully' });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Failed to update user.' });
  }
});

// Admin: Delete user
router.delete('/:id', authenticateToken, requireRole(['Super Admin']), async (req, res) => {
  try {
    const { id } = req.params;
    if (parseInt(id) === req.user.id) {
      return res.status(400).json({ error: 'You cannot delete your own account while logged in.' });
    }

    const existing = await db.get('SELECT email FROM users WHERE id = ?', [id]);
    const result = await db.run('DELETE FROM users WHERE id = ?', [id]);
    if (result.changes === 0) return res.status(404).json({ error: 'User not found' });

    await logAuditAction(req, 'DELETE_USER', 'users', id, `Deleted user "${existing?.email || id}"`);

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Failed to delete user.' });
  }
});

export default router;
