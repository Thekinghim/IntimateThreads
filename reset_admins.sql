DELETE FROM admins;
INSERT INTO admins (username, password_hash, name, is_active) VALUES 
('admin1', '$2b$12$T9UyGieENLUmkVa692RHC.TcvAsDRQ4zRkNGwPK6ZoCx5PTCGa72q', 'Admin 1', true),
('admin2', '$2b$12$T9UyGieENLUmkVa692RHC.TcvAsDRQ4zRkNGwPK6ZoCx5PTCGa72q', 'Admin 2', true);
