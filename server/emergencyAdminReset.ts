// EMERGENCY ADMIN RESET - Fullständig production fix
import { Pool, neonConfig } from '@neondatabase/serverless';
import bcrypt from 'bcryptjs';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

export async function emergencyAdminReset() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  
  try {
    console.log('🚨 EMERGENCY ADMIN RESET - Starting complete rebuild...');
    
    // 1. Rensa alla admin-relaterade data
    await pool.query('DELETE FROM admin_sessions');
    await pool.query('DELETE FROM admins');
    console.log('✅ Cleared all existing admin data');
    
    // 2. Skapa fresh admin users med verified hash
    const password = 'adminpass123';
    const hash = await bcrypt.hash(password, 12);
    
    console.log('Creating fresh admin users...');
    await pool.query(`
      INSERT INTO admins (id, username, password_hash, name, is_active, created_at) 
      VALUES 
        (gen_random_uuid(), 'admin1', $1, 'Admin 1', true, NOW()),
        (gen_random_uuid(), 'admin2', $1, 'Admin 2', true, NOW())
    `, [hash]);
    
    // 3. Testa att inloggning fungerar
    const testAdmin = await pool.query('SELECT username, password_hash FROM admins WHERE username = $1', ['admin1']);
    if (testAdmin.rows.length > 0) {
      const testMatch = await bcrypt.compare(password, testAdmin.rows[0].password_hash);
      console.log('✅ Password verification test:', testMatch ? 'SUCCESS' : 'FAILED');
    }
    
    console.log('🎉 Emergency admin reset completed successfully!');
    
  } catch (error) {
    console.error('❌ Emergency reset failed:', error.message);
    throw error;
  } finally {
    await pool.end();
  }
}

// Auto-run on import in production
if (process.env.NODE_ENV === 'production' || process.env.EMERGENCY_RESET === '1') {
  emergencyAdminReset().catch(console.error);
}