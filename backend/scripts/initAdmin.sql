-- ============================================
-- ENTERPRISE ADMIN PANEL - DATABASE SCHEMA
-- ============================================

-- Admin Roles
CREATE TABLE IF NOT EXISTS admin_roles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  display_name VARCHAR(200) NOT NULL,
  description TEXT,
  permissions JSON,
  is_system TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Admin Users
CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(200) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  mobile VARCHAR(20),
  password_hash VARCHAR(255) NOT NULL,
  role_id INT NOT NULL,
  avatar_url VARCHAR(500),
  status ENUM('active', 'suspended', 'inactive') DEFAULT 'active',
  last_login DATETIME,
  login_attempts INT DEFAULT 0,
  two_factor_enabled TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (role_id) REFERENCES admin_roles(id) ON DELETE RESTRICT,
  INDEX idx_email (email),
  INDEX idx_status (status)
);

-- Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  admin_id INT,
  admin_name VARCHAR(200),
  action VARCHAR(100) NOT NULL,
  module VARCHAR(100),
  entity_type VARCHAR(100),
  entity_id INT,
  description TEXT,
  ip_address VARCHAR(45),
  user_agent TEXT,
  metadata JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (admin_id) REFERENCES admin_users(id) ON DELETE SET NULL,
  INDEX idx_admin (admin_id),
  INDEX idx_action (action),
  INDEX idx_created (created_at)
);

-- CMS Content
CREATE TABLE IF NOT EXISTS cms_content (
  id INT AUTO_INCREMENT PRIMARY KEY,
  page VARCHAR(100) NOT NULL,
  section VARCHAR(100) NOT NULL,
  key_name VARCHAR(200) NOT NULL,
  content LONGTEXT,
  content_type ENUM('text', 'json', 'html', 'image', 'link') DEFAULT 'text',
  status ENUM('published', 'draft') DEFAULT 'published',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_section_key (page, section, key_name),
  INDEX idx_page (page)
);

-- Coupons
CREATE TABLE IF NOT EXISTS coupons (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  type ENUM('percentage', 'flat') NOT NULL DEFAULT 'percentage',
  value DECIMAL(10,2) NOT NULL,
  min_booking_amount DECIMAL(10,2) DEFAULT 0,
  max_discount DECIMAL(10,2),
  usage_limit INT DEFAULT 0,
  used_count INT DEFAULT 0,
  valid_from DATE,
  valid_until DATE,
  status ENUM('active', 'inactive', 'expired') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_code (code),
  INDEX idx_status (status)
);

-- Offers
CREATE TABLE IF NOT EXISTS offers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  type ENUM('homepage', 'popup', 'banner', 'festival') DEFAULT 'homepage',
  image_url VARCHAR(500),
  link_url VARCHAR(500),
  start_date DATE,
  end_date DATE,
  status ENUM('active', 'inactive') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_type (type),
  INDEX idx_status (status)
);

-- System Settings
CREATE TABLE IF NOT EXISTS system_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  key_name VARCHAR(200) NOT NULL UNIQUE,
  value LONGTEXT,
  category VARCHAR(100) DEFAULT 'general',
  data_type ENUM('string', 'json', 'boolean', 'number') DEFAULT 'string',
  description TEXT,
  is_public TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_key (key_name),
  INDEX idx_category (category)
);

-- Chatbot Settings
CREATE TABLE IF NOT EXISTS chatbot_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  key_name VARCHAR(200) NOT NULL UNIQUE,
  value LONGTEXT,
  data_type ENUM('string', 'json', 'boolean', 'number') DEFAULT 'string',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Support Tickets
CREATE TABLE IF NOT EXISTS support_tickets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  subject VARCHAR(500) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
  status ENUM('open', 'in_progress', 'resolved', 'closed') DEFAULT 'open',
  assigned_to INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_priority (priority)
);

-- ============================================
-- DEFAULT DATA
-- ============================================

-- Default Super Admin Role
INSERT IGNORE INTO admin_roles (name, display_name, description, permissions, is_system) VALUES (
  'super_admin',
  'Super Admin',
  'Full access to all modules and settings',
  JSON_OBJECT(
    'all', true
  ),
  1
);

INSERT IGNORE INTO admin_roles (name, display_name, description, permissions, is_system) VALUES (
  'admin',
  'Admin',
  'Access to most modules except system settings',
  JSON_OBJECT(
    'dashboard', JSON_ARRAY('view'),
    'users', JSON_ARRAY('view', 'create', 'update', 'delete'),
    'bookings', JSON_ARRAY('view', 'create', 'update', 'delete'),
    'reports', JSON_ARRAY('view', 'export'),
    'cms', JSON_ARRAY('view', 'create', 'update', 'delete'),
    'coupons', JSON_ARRAY('view', 'create', 'update', 'delete'),
    'offers', JSON_ARRAY('view', 'create', 'update', 'delete'),
    'support', JSON_ARRAY('view', 'update')
  ),
  1
);

INSERT IGNORE INTO admin_roles (name, display_name, description, permissions, is_system) VALUES (
  'manager',
  'Manager',
  'Manage users, bookings, and view reports',
  JSON_OBJECT(
    'dashboard', JSON_ARRAY('view'),
    'users', JSON_ARRAY('view', 'update'),
    'bookings', JSON_ARRAY('view', 'update'),
    'reports', JSON_ARRAY('view')
  ),
  0
);

-- Default Super Admin User (password: Admin@123456)
-- bcrypt hash will be set by initAdmin script
INSERT IGNORE INTO admin_users (full_name, email, mobile, password_hash, role_id, status) VALUES (
  'Super Admin',
  'admin@travelhub.com',
  '9999999999',
  '$2a$10$N9qo8uLOickgx2ZMRZoMy.MrqJ3k6Z.QYvKq5ZQb1KqZ.QYvKq5ZQ',
  1,
  'active'
);

-- Default System Settings
INSERT IGNORE INTO system_settings (key_name, value, category, data_type, description, is_public) VALUES
('site_name', 'TravelHub', 'general', 'string', 'Website name', 1),
('site_tagline', 'B2B Travel Distribution Platform', 'general', 'string', 'Site tagline', 1),
('currency', 'INR', 'general', 'string', 'Default currency', 1),
('currency_symbol', '₹', 'general', 'string', 'Currency symbol', 1),
('timezone', 'Asia/Kolkata', 'general', 'string', 'Default timezone', 0),
('language', 'en', 'general', 'string', 'Default language', 1),
('maintenance_mode', 'false', 'system', 'boolean', 'Enable maintenance mode', 0),
('smtp_host', '', 'email', 'string', 'SMTP server host', 0),
('smtp_port', '587', 'email', 'string', 'SMTP server port', 0),
('smtp_user', '', 'email', 'string', 'SMTP username', 0),
('smtp_pass', '', 'email', 'string', 'SMTP password', 0),
('sms_provider', '', 'sms', 'string', 'SMS gateway provider', 0),
('sms_api_key', '', 'sms', 'string', 'SMS API key', 0),
('whatsapp_api_key', '', 'whatsapp', 'string', 'WhatsApp API key', 0),
('razorpay_key_id', '', 'payment', 'string', 'Razorpay Key ID', 0),
('razorpay_key_secret', '', 'payment', 'string', 'Razorpay Key Secret', 0),
('stripe_secret_key', '', 'payment', 'string', 'Stripe Secret Key', 0),
('stripe_publishable_key', '', 'payment', 'string', 'Stripe Publishable Key', 0),
('google_maps_key', '', 'integrations', 'string', 'Google Maps API Key', 0),
('google_analytics_id', '', 'integrations', 'string', 'Google Analytics ID', 0),
('firebase_server_key', '', 'integrations', 'string', 'Firebase Server Key', 0);

-- Default Chatbot Settings
INSERT IGNORE INTO chatbot_settings (key_name, value, data_type) VALUES
('ai_name', 'Travel Assistant', 'string'),
('welcome_message', 'Hello! I am your AI Travel Assistant. How can I help you today?', 'string'),
('online_status', 'true', 'boolean'),
('theme_color', '#2563EB', 'string'),
('suggestions', '["Book Flight","Book Hotel","Visa","Travel Insurance","Holiday Packages","Check Booking","Wallet Balance","Latest Offers","Popular Destinations"]', 'json'),
('quick_replies', '["Flights","Hotels","Visa","Insurance","Packages","Support","Bookings","Wallet","Offers"]', 'json'),
('auto_reply_enabled', 'true', 'boolean'),
('typing_delay', '800', 'number');
