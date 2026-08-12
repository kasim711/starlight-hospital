import db from '../db.js';

export async function logAuditAction(req, action, entity, entityId = null, details = '') {
  try {
    const userId = req?.user?.id || null;
    const userName = req?.user?.name || 'System / Guest';
    const userRole = req?.user?.role || 'Guest';
    const ipAddress = req?.headers['x-forwarded-for'] || req?.socket?.remoteAddress || '127.0.0.1';

    await db.run(`
      INSERT INTO audit_logs (user_id, user_name, user_role, action, entity, entity_id, details, ip_address)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [userId, userName, userRole, action, entity, entityId ? String(entityId) : null, details, ipAddress]);
  } catch (err) {
    console.error('Audit log recording failed:', err);
  }
}
