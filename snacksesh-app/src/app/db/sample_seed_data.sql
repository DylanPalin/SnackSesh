-- Start by clearing the data in the tables
BEGIN;

-- Insert sample data into users table
INSERT INTO users (username, password_hash, email, registration_date, created_at, updated_at)
VALUES 
('alice', 'password_hash_1', 'alice@example.com', NOW(), NOW(), NOW()),
('bob', 'password_hash_2', 'bob@example.com', NOW(), NOW(), NOW()),
('charlie', 'password_hash_3', 'charlie@example.com', NOW(), NOW(), NOW());

-- Insert sample data into restaurants table
INSERT INTO restaurants (name, address, phone, website, cuisine_type, opening_hours, latitude, longitude, photo, created_at, updated_at)
VALUES 
('Pizza Place', '123 Pizza St', '555-1234', 'http://pizzaplace.example.com', 'Italian', '10:00-22:00', 40.712776, -74.005974, 'http://pizzaplace.example.com/photo.jpg', NOW(), NOW()),
('Sushi Spot', '456 Sushi Ave', '555-5678', 'http://sushispot.example.com', 'Japanese', '11:00-23:00', 34.052235, -118.243683, 'http://sushispot.example.com/photo.jpg', NOW(), NOW()),
('Burger Joint', '789 Burger Blvd', '555-9876', 'http://burgerjoint.example.com', 'American', '09:00-21:00', 37.774929, -122.419418, 'http://burgerjoint.example.com/photo.jpg', NOW(), NOW());

-- Insert sample data into deals table
INSERT INTO deals (restaurant_id, description, day_of_week, start_time, end_time, created_at, updated_at)
VALUES 
(1, '50% off all pizzas', 'Monday', '17:00', '20:00', NOW(), NOW()),
(2, 'All you can eat sushi for $20', 'Wednesday', '18:00', '21:00', NOW(), NOW()),
(3, 'Buy one get one free burgers', 'Friday', '19:00', '22:00', NOW(), NOW());

-- Insert sample data into requests table
INSERT INTO requests (user_id, restaurant_id, deal_id, request_type, details, status, created_at, updated_at)
VALUES 
(1, 1, 1, 'special_request', 'Please add extra cheese', 'pending', NOW(), NOW()),
(2, 2, 2, 'complaint', 'Too much salt in the sushi', 'pending', NOW(), NOW()),
(3, 3, 3, 'compliment', 'The burgers were awesome!', 'pending', NOW(), NOW());

-- Insert sample data into user_favorite_deals table
INSERT INTO user_favorite_deals (user_id, deal_id, created_at, updated_at)
VALUES 
(1, 1, NOW(), NOW()),
(2, 2, NOW(), NOW()),
(3, 3, NOW(), NOW());

-- Insert sample data into user_favorite_restaurants table
INSERT INTO user_favorite_restaurants (user_id, restaurant_id, created_at, updated_at)
VALUES 
(1, 1, NOW(), NOW()),
(2, 2, NOW(), NOW()),
(3, 3, NOW(), NOW());

-- Commit the transaction to finalize the insertion of sample data
COMMIT;