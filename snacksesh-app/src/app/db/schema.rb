BEGIN;

DROP TABLE IF EXISTS user_favorite_restaurants CASCADE;
DROP TABLE IF EXISTS user_favorite_deals CASCADE;
DROP TABLE IF EXISTS requests CASCADE;
DROP TABLE IF EXISTS deals CASCADE;
DROP TABLE IF EXISTS restaurants CASCADE;
DROP TABLE IF EXISTS users CASCADE;

COMMIT;

BEGIN;

CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE restaurants (
  restaurant_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(255),
  phone VARCHAR(20),
  website VARCHAR(255),
  cuisine_type VARCHAR(100),
  opening_hours VARCHAR(100),
  latitude DECIMAL(9, 6),
  longitude DECIMAL(9, 6),
  photo VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON restaurants
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE deals (
  deal_id SERIAL PRIMARY KEY,
  restaurant_id INT REFERENCES restaurants(restaurant_id) ON DELETE CASCADE,
  description VARCHAR(255) NOT NULL,
  day_of_week VARCHAR(10) NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON deals
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE requests (
    request_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    restaurant_id INT REFERENCES restaurants(restaurant_id),
    deal_id INT REFERENCES deals(deal_id),
    request_type VARCHAR(50) NOT NULL,
    details TEXT,
    status VARCHAR(20) DEFAULT 'pending' NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON requests
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TABLE user_favorite_deals (
  user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
  deal_id INT REFERENCES deals(deal_id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, deal_id)
);

CREATE TABLE user_favorite_restaurants (
  user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
  restaurant_id INT REFERENCES restaurants(restaurant_id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, restaurant_id)
);

COMMIT;