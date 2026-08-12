export function requireRole(allowedRoles = []) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required.' });
    }

    const userRole = req.user.role || 'Editor';

    // Super Admin always has full access
    if (userRole === 'Super Admin') {
      return next();
    }

    if (allowedRoles.includes(userRole)) {
      return next();
    }

    return res.status(403).json({
      error: `Access denied. Role '${userRole}' does not have permission to perform this action.`
    });
  };
}
