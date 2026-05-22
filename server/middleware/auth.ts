import { Request, Response, NextFunction } from 'express';
import { getSupabaseAdmin } from '../lib/supabase';

export interface AuthUser {
  id: string;
  email: string;
  isAdmin: boolean;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export async function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return next();
  }

  const token = header.slice(7);
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) return next();

    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin, email')
      .eq('id', data.user.id)
      .single();

    const profileRow = profile as { email?: string; is_admin?: boolean } | null;
    req.user = {
      id: data.user.id,
      email: profileRow?.email || data.user.email || '',
      isAdmin: profileRow?.is_admin ?? false,
    };
  } catch {
    // continue without user
  }
  next();
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required.' });
  }
  next();
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ error: 'Admin privileges required.' });
  }
  next();
}
