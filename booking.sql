-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 20, 2023 at 12:22 PM
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

CREATE TABLE `employee` (
  `id` int(11) NOT NULL,
  `fullname` varchar(50) DEFAULT NULL,
  `phonenumber` varchar(20) DEFAULT NULL,
  `code` varchar(20) DEFAULT NULL,
  `passwordHash` varchar(255) NOT NULL,
  `address` text DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  `avatar` blob DEFAULT NULL,
  `status` tinyint(1) NOT NULL,
  `email` varchar(50) NOT NULL,
  `role_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`id`, `fullname`, `phonenumber`, `code`, `passwordHash`, `address`, `birthday`, `avatar`, `status`, `email`, `role_id`, `createdAt`, `updatedAt`) VALUES
(20, 'Bùi Quang Minh', '0362592858', '034201000421715', '$2b$10$w1tJZQim7lqCr6AZcV210OMhqqocGTGK.bvpl3NDP7iOVx7iGhR3S', 'Thái Bình', '2001-10-30 15:30:00', 0x53637265656e73686f7420323032332d30382d3134203133343034382e706e67, 1, 'bqminh30@gmail.com', 1, '2023-09-20 14:44:39', '0000-00-00 00:00:00');

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
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `unit` varchar(100) NOT NULL,
  `price` double NOT NULL,
  `type_service_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`id`, `name`, `unit`, `price`, `type_service_id`) VALUES
(1, 'Thuê xe máy', 'Số lượng', 50000, 1),
(2, 'Thuê ô tô', 'Số lượng', 200000, 1),
(3, 'Thuê xe đạp', 'Số lượng', 20000, 1);

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
(1, 'Thuê xe');

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
(2, 'Giảm giá, khuyến mãi 20%', 20, 1, '2023-09-25', '2023-09-30', '2023-09-20 16:12:42', '2023-09-20 16:12:42');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`),
  ADD KEY `code` (`code`,`email`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `facilities`
--
ALTER TABLE `facilities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `service`
--
ALTER TABLE `service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `type_room`
--
ALTER TABLE `type_room`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `type_service`
--
ALTER TABLE `type_service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `vouchers`
--
ALTER TABLE `vouchers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `service`
--
ALTER TABLE `service`
  ADD CONSTRAINT `service_ibfk_1` FOREIGN KEY (`type_service_id`) REFERENCES `type_service` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
