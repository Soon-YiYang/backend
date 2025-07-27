-- Create database
CREATE DATABASE IF NOT EXISTS database1;
USE database1;

-- Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('student', 'admin') DEFAULT 'student'
);

-- Issues table
CREATE TABLE issues (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  userEmail VARCHAR(100),
  category VARCHAR(100),
  submittedTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updateTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  updateBy VARCHAR(100),
  latestUpdate TEXT,
  status ENUM('new', 'progress', 'resolved', 'closed') DEFAULT 'new',
  
  FOREIGN KEY (userEmail) REFERENCES users(email) ON DELETE CASCADE
);

-- Attachments table which is used for Amazon S3 file URLs
CREATE TABLE attachments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  issue_id INT,
  file_name VARCHAR(255),
  file_url VARCHAR(500),
  file_size INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (issue_id) REFERENCES issues(id) ON DELETE CASCADE
);

-- Insert admin and student users. Unable to create IAM roles in AWS learner academy account so unable to use AWS Cognito to separate users.
INSERT INTO users (email, password, role) VALUES 
('admin@school.edu', 'admin123', 'admin'),
('student@school.edu', 'student123', 'student');
