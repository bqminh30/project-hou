-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 25, 2023 at 01:25 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `booking`
--

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE employee (
  id INT(11) NOT NULL AUTO_INCREMENT,
  fullname VARCHAR(50) DEFAULT NULL,
  phonenumber VARCHAR(20) DEFAULT NULL,
  code VARCHAR(20) DEFAULT NULL,
  passwordHash VARCHAR(255) NOT NULL,
  address TEXT DEFAULT NULL,
  birthday DATETIME DEFAULT NULL,
  avatar BLOB DEFAULT NULL,
  status TINYINT(1) NOT NULL,
  email VARCHAR(50) NOT NULL,
  role_id INT(11) NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY unique_code (code),
  UNIQUE KEY unique_email (email),
  FOREIGN KEY (role_id) REFERENCES roles(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `fullname`, `phonenumber`, `code`, `passwordHash`, `address`, `birthday`, `avatar`, `status`, `email`, `role_id`, `createdAt`, `updatedAt`) VALUES
(20, 'Bùi Quang Minh', '0362592858', '034201000421715', '$2b$10$w1tJZQim7lqCr6AZcV210OMhqqocGTGK.bvpl3NDP7iOVx7iGhR3S', 'Thái Bình', '2001-10-30 15:30:00', 0x53637265656e73686f7420323032332d30382d3134203133343034382e706e67, 1, 'bqminh30@gmail.com', 0, '2023-09-20 14:44:39', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `facilities`
--

CREATE TABLE `facilities` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` text NOT NULL,
  `location` text DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `title` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `facilities`
--

INSERT INTO `facilities` (`id`, `name`, `image`, `location`, `phone`, `logo`, `title`, `createdAt`, `updatedAt`) VALUES
(2, 'Khách sạn Marriott', 'iVBORw0KGgoAAAANSUhEUgAAAx8AAAUZCAYAAAACLbyCAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAJOgAACToAYJjBRwAAP+lSURBVHhe7J0FgBzHlf7fsrQr7WrFuGJmBkuywLYso8wYJw4nl0uO7/I/8mGOL7lLcmEnZrZly5JtocXMzIwrWrG08K/vddeod7ZndmZ3phf0/azxDnZXV1dXv6/qvVcpBV36lQkhhBB', NULL, NULL, NULL, 'Khách sạn số 1 Việt Nam', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'Khách sạn Marriott', 'Screenshot 2023-09-18 144237.png', 'Hà Nội', '0989547564', '3', 'Khách sạn số 3 Việt Nam', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'Khách sạn Marriott', 'Screenshot 2023-08-16 170034.png', 'Hà Nội', '0989547564', '1', 'Khách sạn số 1 Việt Nam', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 'Khách sạn Marriott', 'Screenshot 2023-09-14 115844.png', 'Hà Nội', '0989547564', '1', 'Khách sạn số 1 Việt Nam', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 'Khách sạn Marriott', 'Screenshot 2023-09-14 115844.png', 'Hà Nội', '0989547564', '1', 'Khách sạn số 1 Việt Nam', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 'Khách sạn Marriott', 'Screenshot 2023-09-14 115844.png', 'Hà Nội', '0989547564', '1', 'Khách sạn số 1 Việt Nam', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(8, 'Khách sạn Marriott', 'Screenshot 2023-09-14 115844.png', 'Hà Nội', '0989547564', '1', 'Khách sạn số 1 Việt Nam', '0000-00-00 00:00:00', '0000-00-00 00:00:00');


-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE customer (
  id INT(11) NOT NULL AUTO_INCREMENT,
  fullname VARCHAR(50) DEFAULT NULL,
  phonenumber VARCHAR(20) DEFAULT NULL,
  code VARCHAR(20) DEFAULT NULL,
  passwordHash VARCHAR(255) NOT NULL,
  address VARCHAR(20) DEFAULT NULL,
  birthday DATE DEFAULT NULL,
  email VARCHAR(50) NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY unique_code (code),
  UNIQUE KEY unique_email (email)
);



-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE reviews (
  id INT(11) NOT NULL AUTO_INCREMENT,
  content VARCHAR(255) DEFAULT NULL,
  image VARCHAR(255) DEFAULT NULL,
  rating FLOAT,
  room_id int(11) NOT NULL,
  customer_id int(11) NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (room_id) REFERENCES room(id),
  FOREIGN KEY (customer_id) REFERENCES customer(id)
);


-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE orders (
  id INT(11) NOT NULL AUTO_INCREMENT,
  createdDate DATETIME NOT NULL,
  status int NOT NULL,
  total double NOT NULL,
  note text NOT NULL,
  customer_id int(11) NOT NULL,
  employee_id int(11) NOT NULL,
  createdAt DATETIME NOT NULL,
  updatedAt DATETIME NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (customer_id) REFERENCES customer(id),
  FOREIGN KEY (employee_id) REFERENCES employee(id)
);


  CREATE TABLE order_detail (
    id INT(11) NOT NULL AUTO_INCREMENT,
    createdDate DATETIME NOT NULL,
    checkinDate DATETIME NOT NULL,
    checkoutDate DATETIME NOT NULL,
    status int NOT NULL,
    dateCount int NOT NULL,
    total double NOT NULL,
    personCount int NOT NULL,
    order_id int(11) NOT NULL,
    room_id int(11) NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (room_id) REFERENCES room(id)
  );

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'staff');

-- --------------------------------------------------------

--
-- Table structure for table `room_service`
--

CREATE TABLE room_service (
  id INT(11) NOT NULL AUTO_INCREMENT,
  quantity double DEFAULT NULL,
  room_id INT(11) NOT NULL,
  service_id INT(11) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (room_id) REFERENCES room (id),
  FOREIGN KEY (service_id) REFERENCES service (id)
);

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` double NOT NULL,
  `priceSale` double DEFAULT NULL,
  `rating` float DEFAULT NULL,
  `totalRating` int(10) DEFAULT NULL,
  `totalReview` int(10) DEFAULT NULL,
  `numberBed` int(10) NOT NULL,
  `numberPeople` int(10) NOT NULL,
  `status` int(10) NOT NULL,
  `label` int(20) NOT NULL,
  `isLiked` tinyint(1) NOT NULL,
  `image` varchar(255) NOT NULL,
  `voucher_id` int(11) DEFAULT NULL,
  `type_room_id` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`id`, `name`, `title`, `description`, `price`, `priceSale`, `rating`, `totalRating`, `totalReview`, `numberBed`, `numberPeople`, `status`, `label`, `isLiked`, `image`, `voucher_id`, `type_room_id`, `createdAt`, `updatedAt`) VALUES
(32, 'Phòng 202', 'Phòng ở tầng 2', 'Phòng đặc biệt, rộng rãi, sạch sẽ', 2000, 0, 0, 0, 0, 2, 4, 1, 1, 1, 'Screenshot 2023-08-19 141435.png', 4, 1, '2023-09-25 10:50:46', '2023-09-25 10:50:46'),
(33, 'Phòng 201', 'Phòng ở tầng 2', 'Phòng đặc biệt, rộng rãi, sạch sẽ', 3000, 0, 0, 0, 0, 2, 4, 1, 1, 1, 'Screenshot 2023-08-14 134048.png', 2, 2, '2023-09-25 09:57:40', '2023-09-25 09:57:40'),
(34, 'Phòng 202', 'Phòng ở tầng 2', 'Phòng đặc biệt, rộng rãi, sạch sẽ', 3000, 0, 0, 0, 0, 2, 4, 1, 1, 1, 'Screenshot 2023-08-14 134048.png', 1, NULL, '2023-09-25 09:57:43', '2023-09-25 09:57:43'),
(35, 'Phòng 203', 'Phòng ở tầng 2', 'Phòng đặc biệt, rộng rãi, sạch sẽ', 2400, 0, 0, 0, 0, 2, 4, 1, 1, 1, 'Screenshot 2023-08-14 134048.png', 3, NULL, '2023-09-25 09:57:49', '2023-09-25 09:57:49');

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `unit` varchar(100) NOT NULL,
  `price` double NOT NULL,
  `type_service_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- --------------------------------------------------------

--
-- Table structure for table `room_image`
--

CREATE TABLE `room_image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `data` BLOB,
  `room_id` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (id),
  FOREIGN KEY (room_id) REFERENCES room (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`id`, `name`, `unit`, `price`, `type_service_id`) VALUES
(1, 'Thuê xe máy', 'Số lượng', 50000, 1),
(2, 'Thuê ô tô', 'Số lượng', 200000, 1),
(3, 'Thuê xe đạp', 'Số lượng', 20000, 1),
(5, 'Tắm bể nước nóng', 'Số lượng', 40000, 2);

-- --------------------------------------------------------

--
-- Table structure for table `type_room`
--

CREATE TABLE `type_room` (
  `id` int(100) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `type_room`
--

INSERT INTO `type_room` (`id`, `name`) VALUES
(1, 'Vip'),
(2, 'Normal'),
(3, 'New');

-- --------------------------------------------------------

--
-- Table structure for table `type_service`
--

CREATE TABLE `type_service` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `type_service`
--

INSERT INTO `type_service` (`id`, `name`) VALUES
(1, 'Thuê xe'),
(2, 'Bể bơi');

-- --------------------------------------------------------

--
-- Table structure for table `vouchers`
--

CREATE TABLE `vouchers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `value` double DEFAULT NULL,
  `isShow` tinyint(1) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vouchers`
--

INSERT INTO `vouchers` (`id`, `name`, `value`, `isShow`, `startDate`, `endDate`, `createdAt`, `updatedAt`) VALUES
(1, 'Giảm giá, khuyến mãi 15%', 15, 1, '2023-09-10', '2023-09-30', '2023-09-20 16:11:44', '2023-09-20 17:18:40'),
(2, 'Giảm giá, khuyến mãi 20%', 20, 1, '2023-09-25', '2023-09-30', '2023-09-20 16:12:42', '2023-09-20 16:12:42'),
(3, 'Khuyến mãi 50%', 50, 0, '0000-00-00', '0000-00-00', '2023-09-25 17:56:14', '2023-09-25 17:56:14'),
(4, 'Khuyến mãi 50%', 50, 1, '2023-09-01', '2023-09-15', '2023-09-25 17:56:32', '2023-09-25 17:56:32');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`),
  ADD UNIQUE KEY `code` (`code`,`email`);

--
-- Indexes for table `facilities`
--
ALTER TABLE `facilities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type_room_id` (`type_room_id`),
  ADD KEY `voucher_id` (`voucher_id`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`),
  ADD KEY `type_service_id` (`type_service_id`);

--
-- Indexes for table `type_room`
--
ALTER TABLE `type_room`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `type_service`
--
ALTER TABLE `type_service`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vouchers`
--
ALTER TABLE `vouchers`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `facilities`
--
ALTER TABLE `facilities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `room`
--
ALTER TABLE `room`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `service`
--
ALTER TABLE `service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `type_room`
--
ALTER TABLE `type_room`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `type_service`
--
ALTER TABLE `type_service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `vouchers`
--
ALTER TABLE `vouchers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `service`
--
ALTER TABLE `service`
  ADD CONSTRAINT `service_ibfk_1` FOREIGN KEY (`type_service_id`) REFERENCES `type_service` (`id`);
COMMIT;

ALTER TABLE `room`
  ADD CONSTRAINT `room_ibfk_1` FOREIGN KEY (`type_room_id`) REFERENCES `type_room` (`id`);
COMMIT;

ALTER TABLE `room`
ADD CONSTRAINT `room_ibfk_2` FOREIGN KEY (`voucher_id`) REFERENCES `vouchers` (`id`);
COMMIT;

ALTER TABLE `employee`
ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;


-- GET ALL 
SELECT r.*, GROUP_CONCAT(s.name SEPARATOR ', ') AS service 
FROM room r 
LEFT JOIN room_service rs ON r.id = rs.room_id 
LEFT JOIN service s ON rs.service_id = s.id 
LEFT JOIN room_image rm ON rm.room_id = r.id
GROUP BY r.id;

SELECT r.*, GROUP_CONCAT(s.name SEPARATOR ', ') AS service, room_image.room_image
FROM room r 
LEFT JOIN room_service rs ON r.id = rs.room_id 
LEFT JOIN service s ON rs.service_id = s.id 
LEFT JOIN (
    SELECT room_id, GROUP_CONCAT(name SEPARATOR ', ') AS room_image
    FROM room_image
    GROUP BY room_id
) room_image ON room_image.room_id = r.id
GROUP BY r.id;

SELECT r.* , 
        CONCAT('[', GROUP_CONCAT('{"id":', s.id, ',"name":"', s.name, '"}' SEPARATOR ','), ']') AS service,
        room_image.roomImages
        FROM room r 
          LEFT JOIN room_service rs ON r.id = rs.room_id 
          LEFT JOIN service s ON rs.service_id = s.id 
          LEFT JOIN (
            SELECT room_id, CONCAT('[', GROUP_CONCAT('{"id":', room_image.id, ',"name":"', room_image.data, '" }' SEPARATOR ','), ']') AS roomImages
        FROM room_image
          GROUP BY room_id
        ) room_image ON room_image.room_id = r.id WHERE r.id = ${id}
    GROUP BY r.id

SELECT od.* ,
  CONCAT('[', GROUP_CONCAT('{"fullname":"', cus.fullname, '", "email":"', cus.email, '"}' SEPARATOR ','), ']') AS customer
  FROM orders od
    LEFT JOIN customer cus ON od.customer_id = cus.id 
GROUP BY od.id


SELECT od.*,
  CONCAT('[', GROUP_CONCAT('{"checkinDate":"', od_detail.checkinDate, '",
  "checkoutDate":"', od_detail.checkoutDate, '",
  "status":"', od_detail.status, '",
  "dateCount":"', od_detail.dateCount, '",
  "total":"', od_detail.total, '",
  "personCount":"', od_detail.personCount, '",
  "room_name":"', r.name, '"}' SEPARATOR ','), ']') AS od_detail,
  c.fullname,
  c.email,
  c.phonenumber
FROM orders od
LEFT JOIN order_detail od_detail ON od_detail.order_id = od.id 
LEFT JOIN room r ON r.id = od_detail.room_id
LEFT JOIN customer c ON c.id = od.customer_id
WHERE od.id = 4
GROUP BY od.id;


LEFT JOIN (
      SELECT fullname, email, phonenumber AS customer_profile FROM customer
      GROUP BY id
    ) customer ON od.customer_id = customer.id 


-- INSERT INTO rooms WHERE 
SELECT COUNT(*) FROM orders LEFT JOIN order_detail od ON od.room_id = 32 WHERE checkoutDate > '2023-09-29'

-- GET DETAIL
SELECT r.*, GROUP_CONCAT(s.name SEPARATOR ', ') AS service 
FROM room r 
LEFT JOIN room_service rs ON r.id = rs.room_id 
LEFT JOIN service s ON rs.service_id = s.id WHERE r.id = 32
GROUP BY r.id ORDER BY rs.createdAt;


SELECT COUNT(*) AS cnt
FROM orders
LEFT JOIN order_detail od ON orders.id = od.order_id
LEFT JOIN room r ON od.room_id = r.id
WHERE (orders.checkoutDate > '2023-10-12' OR r.numberPeople <= 10 OR  orders.checkinDate < '2023-10-15')
-- ORDER BY r.name;


SELECT order_detail.checkinDate, order_detail.checkoutDate
FROM order_detail
LEFT JOIN orders od ON od.id = order_detail.order_id
LEFT JOIN room r ON order_detail.room_id = r.id
WHERE r.id = 33

SELECT * 
FROM orders
RIGHT JOIN order_detail od ON order.id = od.order_id
RIGHT JOIN room r ON order_detail.room_id = r.id
WHERE employee_id = AND room_id = 

SELECT COUNT(*) AS cnt
FROM orders
RIGHT JOIN order_detail od ON orders.id = od.order_id
RIGHT JOIN room r ON od.room_id = r.id
WHERE employee_id = 3 AND room_id = 34

SELECT COUNT(*) AS cnt
    FROM orders
    RIGHT JOIN order_detail od ON orders.id = od.order_id
    RIGHT JOIN room r ON od.room_id = r.id
    WHERE customer_id = 2 AND room_id = 34 AND orders.status = 2

  -- => cnt = 0

SELECT COUNT(*) AS cnt
    FROM orders
    RIGHT JOIN order_detail od ON orders.id = od.order_id
    RIGHT JOIN room r ON od.room_id = r.id
    WHERE customer_id = 2 AND room_id = 34 AND orders.status = 1


SELECT cus.fullname, cus.phonenumber, cus.email, reviews.content, reviews.image, reviews.rating, reviews.status FROM reviews
    INNER JOIN customer cus ON cus.id = reviews.customer_id
 WHERE status = 1 AND room_id = ?


[
  {
    checkinDate: '2023-10-23 00:00:00',
    checkoutDate: '2023-10-25 00:00:00',
    room_id: 40
  },
  {
    checkinDate: '2023-10-25 00:00:00',
    checkoutDate: '2023-10-28 00:00:00',
    room_id: 40
  },
  {
    checkinDate: '2023-10-28 00:00:00',
    checkoutDate: '2023-10-31 00:00:00',
    room_id: 41
  }
]
SELECT room.id
FROM room
WHERE room.id NOT IN (
    SELECT chi_tiet_don_hang.room_id
    FROM order_detail AS chi_tiet_don_hang
    INNER JOIN orders AS don_hang ON chi_tiet_don_hang.order_id = don_hang.id
    WHERE '2023-10-27 00:00:00' >= chi_tiet_don_hang.checkinDate
    AND '2023-11-06 00:00:00' <= chi_tiet_don_hang.checkoutDate
)

SELECT *
FROM room
WHERE room.id NOT IN (
    SELECT chi_tiet_don_hang.room_id
    FROM order_detail AS chi_tiet_don_hang
    WHERE (
        '2023-11-01 00:00:00' >= chi_tiet_don_hang.checkinDate
        AND '2023-11-06 00:00:00' <= chi_tiet_don_hang.checkoutDate
    ) OR (
        '2023-11-01 00:00:00' >= chi_tiet_don_hang.checkinDate
        AND '2023-11-01 00:00:00' <= chi_tiet_don_hang.checkoutDate
    )
    OR (
        '2023-11-06 00:00:00' >= chi_tiet_don_hang.checkinDate
        AND '2023-11-06 00:00:00' <= chi_tiet_don_hang.checkoutDate
    )
)

SELECT * FROM room WHERE voucher_id IS NOT NULL  (
  SELECT * 
  FROM vouchers as vou 
  WHERE (
    vou.startDate <= '2023-10-31 00:00:00'
    AND vou.endDate >= '2023-10-31 00:00:00'
  )
)



UPDATE room
JOIN vouchers ON room.voucher_id = vouchers.id
SET room.priceSale = room.price * ((100 - vouchers.value) / 100)
WHERE room.voucher_id IS NOT NULL
  AND vouchers.startDate <= '2023-10-31 00:00:00'
  AND vouchers.endDate >= '2023-10-31 00:00:00'
  AND vouchers.isShow = 1;



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

SELECT r.*,
        CONCAT('[', IFNULL(GROUP_CONCAT(DISTINCT s.id ORDER BY s.id SEPARATOR ','), ''), ']') AS service,
        IFNULL(room_image.roomImages, '[]') AS roomImages,
        IFNULL(service_data.service_data, '[]') AS service_data
    FROM room r
    LEFT JOIN room_service rs ON r.id = rs.room_id
    LEFT JOIN service s ON rs.service_id = s.id
    LEFT JOIN (
        SELECT room_id, CONCAT('[', GROUP_CONCAT('{"id":', id, ',"name":"', data, '" }' SEPARATOR ','), ']') AS roomImages
        FROM room_image
        GROUP BY room_id
    ) room_image ON room_image.room_id = r.id
    LEFT JOIN (
        SELECT r.id AS room_id, CONCAT('[', GROUP_CONCAT('{"id":', s.id, ',"name":"', s.name, '" }' SEPARATOR ','), ']') AS service_data
        FROM room r
        LEFT JOIN room_service rs ON r.id = rs.room_id
        LEFT JOIN service s ON rs.service_id = s.id
        WHERE r.id = ${id}
        GROUP BY r.id
    ) service_data ON service_data.room_id = r.id
    WHERE r.id = ${id}
    GROUP BY r.id;


/*Widget chart data*/
SELECT CONCAT('[', IFNULL(GR) ,']')