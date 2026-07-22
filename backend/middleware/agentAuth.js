// Agent role authorization middleware
// Must be used AFTER authMiddleware (which sets req.user)
export function agentAuth(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Authentication required' })
  }

  if (req.user.role !== 'agent') {
    return res.status(403).json({ success: false, message: 'Agent access only. This resource is not available for your role.' })
  }

  next()
}
