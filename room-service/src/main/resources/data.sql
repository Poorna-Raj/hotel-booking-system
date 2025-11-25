INSERT INTO tbl_rooms (name, room_type, bed_type, bed_count, room_status, base_price, created_by, created_at, updated_at) VALUES
-- Standard Rooms (Spring Flowers)
('ROSE', 'STANDARD', 'SINGLE', 2, 'AVAILABLE', 99.99, 3, NOW(), NOW()),
('LILY', 'STANDARD', 'DOUBLE', 1, 'AVAILABLE', 119.99, 3, NOW(), NOW()),
('DAISY', 'STANDARD', 'QUEEN', 1, 'BOOKED', 139.99, 3, NOW(), NOW()),
('IRIS', 'STANDARD', 'QUEEN', 1, 'AVAILABLE', 139.99, 3, NOW(), NOW()),

-- Deluxe Rooms (Summer Flowers)
('ORCHID', 'DELUXE', 'QUEEN', 1, 'AVAILABLE', 159.99, 3, NOW(), NOW()),
('SUNFLOWER', 'DELUXE', 'KING', 1, 'MAINTENANCE', 179.99, 3, NOW(), NOW()),
('TULIP', 'DELUXE', 'KING', 1, 'AVAILABLE', 179.99, 3, NOW(), NOW()),
('DAFFODIL', 'DELUXE', 'KING', 1, 'AVAILABLE', 169.99, 3, NOW(), NOW()),

-- Family Rooms (Fragrant Flowers)
('LAVENDER', 'FAMILY', 'DOUBLE', 2, 'AVAILABLE', 199.99, 3, NOW(), NOW()),
('DAHLIA', 'FAMILY', 'QUEEN', 2, 'BOOKED', 219.99, 3, NOW(), NOW()),
('PEONY', 'FAMILY', 'KING', 2, 'AVAILABLE', 239.99, 3, NOW(), NOW()),
('GARDENIA', 'FAMILY', 'QUEEN', 2, 'AVAILABLE', 229.99, 3, NOW(), NOW()),

-- Suite Rooms (Exotic Flowers)
('LOTUS', 'SUITE', 'KING', 3, 'AVAILABLE', 299.99, 3, NOW(), NOW()),
('MAGNOLIA', 'SUITE', 'KING', 3, 'UNAVAILABLE', 329.99, 3, NOW(), NOW()),
('JASMINE', 'SUITE', 'KING', 3, 'AVAILABLE', 349.99, 3, NOW(), NOW()),
('HIBISCUS', 'SUITE', 'KING', 3, 'AVAILABLE', 359.99, 3, NOW(), NOW());