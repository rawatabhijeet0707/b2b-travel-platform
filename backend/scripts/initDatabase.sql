CREATE DATABASE IF NOT EXISTS travel_distrib
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE travel_distrib;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  mobile VARCHAR(15) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  agency_name VARCHAR(255),
  pan_number VARCHAR(20),
  pan_file_path VARCHAR(500),
  gst_number VARCHAR(20),
  gst_file_path VARCHAR(500),
  business_address TEXT,
  business_doc_path VARCHAR(500),
  address_proof_path VARCHAR(500),
  kyc_status ENUM('pending', 'verified', 'rejected') DEFAULT 'pending',
  account_status ENUM('active', 'suspended', 'deactivated') DEFAULT 'active',
  role ENUM('agent', 'admin') DEFAULT 'agent',
  wallet_balance DECIMAL(12, 2) DEFAULT 0.00,
  reward_points INT DEFAULT 0,
  credit_limit DECIMAL(12, 2) DEFAULT 0.00,
  credit_used DECIMAL(12, 2) DEFAULT 0.00,
  is_mobile_verified BOOLEAN DEFAULT FALSE,
  is_email_verified BOOLEAN DEFAULT FALSE,
  last_login DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_mobile (mobile),
  INDEX idx_kyc_status (kyc_status)
);

-- OTP store table
CREATE TABLE IF NOT EXISTS otp_store (
  id INT AUTO_INCREMENT PRIMARY KEY,
  mobile VARCHAR(15) NOT NULL,
  otp_code VARCHAR(10) NOT NULL,
  purpose ENUM('registration', 'login', 'password_reset') DEFAULT 'login',
  expires_at DATETIME NOT NULL,
  is_used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_mobile (mobile)
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_id VARCHAR(20) UNIQUE NOT NULL,
  user_id INT NOT NULL,
  type ENUM('flight', 'hotel', 'package', 'visa', 'insurance') NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  details VARCHAR(500),
  amount DECIMAL(12, 2) NOT NULL,
  commission DECIMAL(12, 2) DEFAULT 0.00,
  status ENUM('confirmed', 'pending', 'processing', 'cancelled') DEFAULT 'pending',
  travel_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_status (status)
);

-- Wallet transactions table
CREATE TABLE IF NOT EXISTS wallet_transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  type ENUM('credit', 'debit') NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  description VARCHAR(500),
  reference_id VARCHAR(100),
  balance_after DECIMAL(12, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)
);

-- Support tickets table
CREATE TABLE IF NOT EXISTS support_tickets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ticket_id VARCHAR(20) UNIQUE NOT NULL,
  user_id INT NOT NULL,
  subject VARCHAR(500) NOT NULL,
  priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
  status ENUM('open', 'in_progress', 'resolved') DEFAULT 'open',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert a default test user
-- Password: Test@1234 (bcrypt hash below)
INSERT IGNORE INTO users (full_name, email, mobile, password_hash, agency_name, kyc_status, is_mobile_verified, is_email_verified, wallet_balance, reward_points, credit_limit)
VALUES (
  'Test Admin',
  'admin@traveldistrib.com',
  '9876543210',
  '$2a$10$N9qo8uLOickgx2ZMRZoMy.MrqJ3k6Z.QYvKq5ZQb1KqZ.QYvKq5ZQ',
  'SkyHigh Travels',
  'verified',
  TRUE,
  TRUE,
  248500.00,
  45200,
  50000.00
);
