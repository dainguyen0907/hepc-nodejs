-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 03, 2023 lúc 03:08 AM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `hepc`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `id_catalogue` int(11) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `article_link` text DEFAULT NULL,
  `article_heading` text DEFAULT NULL,
  `article_summarize` text DEFAULT NULL,
  `article_content` text DEFAULT NULL,
  `article_view` int(11) DEFAULT NULL,
  `article_file` text DEFAULT NULL,
  `article_image` text DEFAULT NULL,
  `article_status` int(11) DEFAULT NULL,
  `article_censor` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `articles`
--

INSERT INTO `articles` (`id`, `id_catalogue`, `id_user`, `article_link`, `article_heading`, `article_summarize`, `article_content`, `article_view`, `article_file`, `article_image`, `article_status`, `article_censor`, `createdAt`, `updatedAt`) VALUES
(2, 7, 1, 'Dao-tao-van-hanh-duong-day-220kV-Kien-Binh-–-Phu-Quoc', 'Đào tạo vận hành đường dây 220kV Kiên Bình – Phú Quốc', '  ABC XYZ', '<p>12345678</p>', 0, '', '', 1, 1, '2023-08-31 14:41:22', '2023-09-05 08:07:02');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `banners`
--

CREATE TABLE `banners` (
  `id` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `banner_content` text DEFAULT NULL,
  `banner_status` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `banners`
--

INSERT INTO `banners` (`id`, `id_user`, `banner_content`, `banner_status`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'https://lh3.googleusercontent.com/pw/AIL4fc9U6nxB-ZP8UmpeOiO6RK6SwgCV8wbTd6Xi6hB2R2DwCSTB3qW5J1h-n_X5ftdvJ-pp6lS9-uBkhYlr4hvTLSYhXxz9lCGMXmgXh4L9RBXmezdjdspJ_ZiYwhYo5vSjxperb7ZmIwNLgtpuYsUiS3M=w1366-h384-s-no?authuser=0', 1, '2023-08-28 09:22:16', '2023-08-28 09:22:21');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `catalogues`
--

CREATE TABLE `catalogues` (
  `id` int(11) NOT NULL,
  `id_department` int(11) DEFAULT NULL,
  `catalogue_name` text DEFAULT NULL,
  `catalogue_link` text DEFAULT NULL,
  `catalogue_status` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `catalogues`
--

INSERT INTO `catalogues` (`id`, `id_department`, `catalogue_name`, `catalogue_link`, `catalogue_status`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Tin tức HEPC', NULL, 1, '2023-08-30 11:06:42', '2023-08-30 11:06:42'),
(2, 1, 'Thông báo HEPC', NULL, 1, '2023-08-30 11:06:42', '2023-08-30 11:06:42'),
(3, 2, 'Giới thiệu công đoàn', NULL, 1, '2023-08-30 11:06:42', '2023-08-30 11:06:42'),
(4, 2, 'Tin tức công đoàn', NULL, 1, '2023-08-30 11:06:42', '2023-08-30 11:06:42'),
(5, 3, 'Giới thiệu đoàn thanh niên', NULL, 1, '2023-08-30 11:06:42', '2023-08-30 11:06:42'),
(6, 3, 'Tin tức đoàn thanh niên', NULL, 1, '2023-08-30 11:06:42', '2023-08-30 11:06:42'),
(7, 4, 'Giới thiệu phòng Tổ chức', NULL, 1, '2023-08-30 11:06:42', '2023-08-30 11:06:42'),
(8, 4, 'Tin tức phòng tổ chức', NULL, 1, '2023-08-30 11:06:42', '2023-08-30 11:06:42'),
(9, 5, 'Giới thiệu phòng Đào tạo', NULL, 1, '2023-08-30 11:06:42', '2023-08-30 11:06:42'),
(10, 5, 'Tin tức phòng đào tạo', NULL, 1, '2023-08-30 11:06:42', '2023-08-30 11:06:42'),
(11, 6, 'Giới thiệu phòng Kế hoạch Tài chính', NULL, 1, '2023-08-30 11:06:42', '2023-08-30 11:06:42'),
(12, 6, 'Tin tức phòng KHTC', NULL, 1, '2023-08-30 11:06:42', '2023-08-30 11:06:42'),
(13, 7, 'Giới thiệu phòng QLKH_QHQT', NULL, 1, '2023-08-30 11:06:42', '2023-08-30 11:06:42'),
(14, 7, 'Tin tức phòng QLKH_QHQT', NULL, 1, '2023-08-30 11:06:42', '2023-08-30 11:06:42'),
(15, 8, 'Giới thiệu phòng QLHSSV', NULL, 1, '2023-08-30 11:06:42', '2023-08-30 11:06:42'),
(16, 8, 'Tin tức phòng QLHSSV', NULL, 1, '2023-08-30 11:06:42', '2023-08-30 11:06:42'),
(17, 9, 'Giới thiệu Khoa Hệ thống điện', NULL, 1, '2023-08-30 11:06:42', '2023-08-30 11:06:42'),
(18, 9, 'Tin tức khoa HTĐ', NULL, 1, '2023-08-30 11:06:42', '2023-08-30 11:06:42'),
(19, 10, 'Giới thiệu Khoa Kỹ thuật cơ sở', NULL, 1, '2023-08-30 11:06:42', '2023-08-30 11:06:42'),
(20, 10, 'Tin tức khoa KTCS', NULL, 1, '2023-08-30 11:06:42', '2023-08-30 11:06:42'),
(21, 11, 'Giới thiệu Khoa Điện công nghiệp', NULL, 1, '2023-08-30 11:06:42', '2023-08-30 11:06:42'),
(22, 11, 'Tin tức khoa ĐCN', NULL, 1, '2023-08-30 11:06:42', '2023-08-30 11:06:42'),
(23, 12, 'Giới thiệu Khoa KH cơ bản - kinh tế', NULL, 1, '2023-08-30 11:06:42', '2023-08-30 11:06:42'),
(24, 12, 'Tin tức khoa KHCB-KT', NULL, 1, '2023-08-30 11:06:42', '2023-08-30 11:06:42'),
(25, 13, 'Giới thiệu Khoa CN điện tử - Tự động hóa', NULL, 1, '2023-08-30 11:06:42', '2023-08-30 11:06:42'),
(26, 13, 'Tin tức khoa CNĐT-TĐH', NULL, 1, '2023-08-30 11:06:42', '2023-08-30 11:06:42'),
(27, 14, 'Giới thiệu Khoa Đào tạo nâng cao', NULL, 1, '2023-08-30 11:06:42', '2023-08-30 11:06:42'),
(28, 14, 'Tin tức khoa ĐTNC', NULL, 1, '2023-08-30 11:06:42', '2023-08-30 11:06:42'),
(29, 15, 'Giới thiệu Trung tâm ngoại ngữ tin học', NULL, 1, '2023-08-30 11:06:42', '2023-08-30 11:06:42'),
(30, 15, 'Tin tức TT NNTH', NULL, 1, '2023-08-30 11:06:42', '2023-08-30 11:06:42'),
(31, 16, 'Giới thiệu Trung tâm công nghệ năng lượng', NULL, 1, '2023-08-30 11:06:42', '2023-08-30 11:06:42'),
(32, 16, 'Tin tức TT CNNL', NULL, 1, '2023-08-30 11:06:42', '2023-08-30 11:06:42');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `departments`
--

CREATE TABLE `departments` (
  `id` int(11) NOT NULL,
  `department_name` text DEFAULT NULL,
  `department_status` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `departments`
--

INSERT INTO `departments` (`id`, `department_name`, `department_status`, `createdAt`, `updatedAt`) VALUES
(1, 'Bộ phận truyền thông', 1, '2023-08-18 15:45:38', '2023-08-18 15:45:38'),
(2, 'Công đoàn', 1, '2023-08-18 15:45:38', '2023-08-18 15:45:38'),
(3, 'Đoàn thanh niên', 1, '2023-08-18 15:45:38', '2023-08-18 15:45:38'),
(4, 'Phòng Tổ chức Hành Chính', 1, '2023-08-18 15:45:38', '2023-08-18 15:45:38'),
(5, 'Phòng Đào tạo', 1, '2023-08-18 15:45:38', '2023-08-18 15:45:38'),
(6, 'Phòng Kế hoạch Tài chính', 1, '2023-08-18 15:45:38', '2023-08-18 15:45:38'),
(7, 'Phòng QLKH - QHQT', 1, '2023-08-18 15:45:38', '2023-08-18 15:45:38'),
(8, 'Phòng Quản lí HSSV', 1, '2023-08-18 15:45:38', '2023-08-18 15:45:38'),
(9, 'Khoa Hệ thống điện', 1, '2023-08-18 15:45:38', '2023-08-18 15:45:38'),
(10, 'Khoa Kỹ thuật cơ sở', 1, '2023-08-18 15:45:38', '2023-08-25 16:40:59'),
(11, 'Khoa Điện công nghiệp', 1, '2023-08-18 15:45:38', '2023-08-18 15:45:38'),
(12, 'Khoa KH Cơ bản - Kinh tế', 1, '2023-08-18 15:45:38', '2023-08-18 15:45:38'),
(13, 'Khoa CN Điện tử - Tự động hóa', 1, '2023-08-18 15:45:38', '2023-08-18 15:45:38'),
(14, 'Khoa Đào tạo nâng cao', 1, '2023-08-18 15:45:38', '2023-08-18 15:45:38'),
(15, 'Trung tâm Ngoại ngữ Tin học', 1, '2023-08-18 15:45:38', '2023-08-18 15:45:38'),
(16, 'Trung tâm Công nghệ Năng lượng', 0, '2023-08-18 15:45:38', '2023-08-25 16:25:26');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `histories`
--

CREATE TABLE `histories` (
  `id` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `history_content` text DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `histories`
--

INSERT INTO `histories` (`id`, `id_user`, `history_content`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Tài khoản có id=2 đã được cập nhật thông tin bởi Administrator', '2023-08-24 15:41:41', '2023-08-24 15:41:41'),
(2, 1, 'Tài khoản có id=undefined đã được reset mật khẩu bởi Administrator', '2023-08-24 15:44:16', '2023-08-24 15:44:16'),
(3, 1, 'Tài khoản có id=2 đã được reset mật khẩu bởi Administrator', '2023-08-24 15:45:51', '2023-08-24 15:45:51'),
(4, 1, 'Tài khoản có id=2 đã được cập nhật thông tin bởi Administrator', '2023-08-24 16:25:52', '2023-08-24 16:25:52'),
(5, 1, 'Tài khoản có id=2 đã được cập nhật thông tin bởi Administrator', '2023-08-25 13:55:22', '2023-08-25 13:55:22'),
(6, 1, 'Phòng ban có id=17 đã được cập nhật thông tin bởi Administrator', '2023-08-25 14:03:50', '2023-08-25 14:03:50'),
(7, 1, 'Phòng ban có id=17 đã được cập nhật thông tin bởi Administrator', '2023-08-25 14:05:36', '2023-08-25 14:05:36'),
(8, 1, 'Phòng ban có id=17 đã được cập nhật thông tin bởi Administrator', '2023-08-25 14:07:34', '2023-08-25 14:07:34'),
(9, 1, 'Phòng ban có id=17 đã được cập nhật thông tin bởi Administrator', '2023-08-25 14:07:45', '2023-08-25 14:07:45'),
(10, 1, 'Tài khoản có id=2 đã được cập nhật thông tin bởi Administrator', '2023-08-25 15:53:35', '2023-08-25 15:53:35'),
(11, 1, 'Tài khoản có id=2 đã được cập nhật thông tin bởi Administrator', '2023-08-25 15:53:42', '2023-08-25 15:53:42'),
(12, 1, 'Phòng ban có id=16 đã được cập nhật thông tin bởi Administrator', '2023-08-25 16:25:26', '2023-08-25 16:25:26'),
(13, 1, 'Tài khoản có id=2 đã được reset mật khẩu bởi Administrator', '2023-08-25 16:35:20', '2023-08-25 16:35:20'),
(14, 1, 'Phòng ban có id=10 đã được cập nhật thông tin bởi Administrator', '2023-08-25 16:40:55', '2023-08-25 16:40:55'),
(15, 1, 'Phòng ban có id=10 đã được cập nhật thông tin bởi Administrator', '2023-08-25 16:40:59', '2023-08-25 16:40:59'),
(16, 1, 'Administrator đã thêm một banner mới', '2023-08-28 09:22:16', '2023-08-28 09:22:16'),
(17, 1, 'Banner có id=1 đã được cập nhật thông tin bởi Administrator', '2023-08-28 09:22:21', '2023-08-28 09:22:21'),
(18, 1, 'Administrator đã thêm một chuyên mục mới', '2023-08-28 12:57:55', '2023-08-28 12:57:55'),
(19, 1, 'Administrator đã thêm một chuyên mục mới', '2023-08-28 13:12:14', '2023-08-28 13:12:14'),
(20, 1, 'Administrator đã thêm một chuyên mục mới', '2023-08-28 13:13:25', '2023-08-28 13:13:25'),
(21, 1, 'Administrator đã thêm một chuyên mục mới', '2023-08-28 13:13:55', '2023-08-28 13:13:55'),
(22, 1, 'Administrator đã thêm một chuyên mục mới', '2023-08-28 13:14:32', '2023-08-28 13:14:32'),
(23, 1, 'Administrator đã thêm một chuyên mục mới', '2023-08-28 13:15:07', '2023-08-28 13:15:07'),
(24, 1, 'Administrator đã thêm một chuyên mục mới', '2023-08-28 13:33:00', '2023-08-28 13:33:00'),
(25, 1, 'Administrator đã thêm một chuyên mục mới', '2023-08-28 13:38:09', '2023-08-28 13:38:09'),
(26, 1, 'Administrator đã thêm một chuyên mục mới', '2023-08-28 13:38:31', '2023-08-28 13:38:31'),
(27, 1, 'Chuyên mục có id=1 đã được cập nhật thông tin bởi Administrator', '2023-08-28 14:07:49', '2023-08-28 14:07:49'),
(28, 1, 'Chuyên mục có id=1 đã được cập nhật thông tin bởi Administrator', '2023-08-28 14:09:21', '2023-08-28 14:09:21'),
(29, 1, 'Administrator đã thêm một chuyên mục mới', '2023-08-28 14:41:29', '2023-08-28 14:41:29'),
(30, 1, 'Administrator đã thêm một chuyên mục mới', '2023-08-28 14:41:33', '2023-08-28 14:41:33'),
(31, 1, 'Administrator đã thêm một chuyên mục mới', '2023-08-28 14:45:05', '2023-08-28 14:45:05'),
(32, 1, 'Administrator đã thêm một chuyên mục mới', '2023-08-28 14:45:14', '2023-08-28 14:45:14'),
(33, 1, 'Chuyên mục có id=6 đã bị xóa bởi Administrator', '2023-08-28 14:45:17', '2023-08-28 14:45:17'),
(34, 1, 'Chuyên mục có id=5 đã bị xóa bởi Administrator', '2023-08-28 14:45:21', '2023-08-28 14:45:21'),
(35, 1, 'Administrator đã đăng một ảnh mới', '2023-08-29 10:02:20', '2023-08-29 10:02:20'),
(36, 1, 'Administrator đã đăng một ảnh mới', '2023-08-29 10:02:54', '2023-08-29 10:02:54'),
(37, 1, 'Administrator đã đăng một ảnh mới', '2023-08-29 10:03:25', '2023-08-29 10:03:25'),
(38, 1, 'Administrator đã đăng một ảnh mới', '2023-08-29 10:03:29', '2023-08-29 10:03:29'),
(39, 1, 'Administrator đã đăng một ảnh mới', '2023-08-29 10:06:03', '2023-08-29 10:06:03'),
(40, 1, 'Administrator đã đăng một ảnh mới', '2023-08-29 10:07:07', '2023-08-29 10:07:07'),
(41, 1, 'Hình ảnh có id=6 đã bị xóa bởi Administrator', '2023-08-29 10:29:57', '2023-08-29 10:29:57'),
(42, 1, 'Hình ảnh có id=5 đã bị xóa bởi Administrator', '2023-08-29 10:30:00', '2023-08-29 10:30:00'),
(43, 1, 'Hình ảnh có id=4 đã bị xóa bởi Administrator', '2023-08-29 10:30:05', '2023-08-29 10:30:05'),
(44, 1, 'Hình ảnh có id=3 đã bị xóa bởi Administrator', '2023-08-29 10:33:09', '2023-08-29 10:33:09'),
(45, 1, 'Hình ảnh có id=2 đã bị xóa bởi Administrator', '2023-08-29 10:33:29', '2023-08-29 10:33:29'),
(46, 1, 'Administrator đã đăng một ảnh mới', '2023-08-29 15:30:01', '2023-08-29 15:30:01'),
(47, 1, 'Ảnh có id=7 đã được cập nhật thông tin bởi Administrator', '2023-08-30 08:05:47', '2023-08-30 08:05:47'),
(48, 1, 'Ảnh có id=1 đã được cập nhật thông tin bởi Administrator', '2023-08-30 08:05:59', '2023-08-30 08:05:59'),
(49, 1, 'Ảnh có id=1 đã được cập nhật thông tin bởi Administrator', '2023-08-30 08:06:04', '2023-08-30 08:06:04'),
(50, 1, 'Administrator đã đăng một ảnh mới', '2023-08-30 08:23:54', '2023-08-30 08:23:54'),
(51, 1, 'Administrator đã đăng một ảnh mới', '2023-08-30 08:24:21', '2023-08-30 08:24:21'),
(52, 1, 'Hình ảnh có id=1 đã bị xóa bởi Administrator', '2023-08-30 08:43:39', '2023-08-30 08:43:39'),
(53, 1, 'Ảnh có id=8 đã được cập nhật thông tin bởi Administrator', '2023-08-30 08:45:58', '2023-08-30 08:45:58'),
(54, 1, 'Hình ảnh có id=8 đã bị xóa bởi Administrator', '2023-08-30 08:46:22', '2023-08-30 08:46:22'),
(55, 1, 'Ảnh có id=9 đã được cập nhật thông tin bởi Administrator', '2023-08-30 08:50:54', '2023-08-30 08:50:54'),
(56, 1, 'Hình ảnh có id=9 đã bị xóa bởi Administrator', '2023-08-30 08:51:12', '2023-08-30 08:51:12'),
(57, 1, 'Ảnh có id=7 đã được cập nhật thông tin bởi Administrator', '2023-08-30 08:52:40', '2023-08-30 08:52:40'),
(58, 1, 'Administrator đã đăng một ảnh mới', '2023-08-30 08:52:50', '2023-08-30 08:52:50'),
(59, 1, 'Administrator đã đăng một ảnh mới', '2023-08-30 08:52:53', '2023-08-30 08:52:53'),
(60, 1, 'Hình ảnh có id=7 đã bị xóa bởi Administrator', '2023-08-30 08:54:43', '2023-08-30 08:54:43'),
(61, 1, 'Ảnh có id=10 đã được cập nhật thông tin bởi Administrator', '2023-08-30 08:55:38', '2023-08-30 08:55:38'),
(62, 1, 'Ảnh có id=11 đã được cập nhật thông tin bởi Administrator', '2023-08-30 08:55:42', '2023-08-30 08:55:42'),
(63, 1, 'Ảnh có id=10 đã được cập nhật thông tin bởi Administrator', '2023-08-30 09:15:52', '2023-08-30 09:15:52'),
(64, 1, 'Ảnh có id=10 đã được cập nhật thông tin bởi Administrator', '2023-08-30 09:32:21', '2023-08-30 09:32:21'),
(65, 1, 'Ảnh có id=11 đã được cập nhật thông tin bởi Administrator', '2023-08-30 09:32:24', '2023-08-30 09:32:24'),
(66, 1, 'Ảnh có id=11 đã được cập nhật thông tin bởi Administrator', '2023-08-30 09:32:33', '2023-08-30 09:32:33'),
(67, 1, 'Ảnh có id=11 đã được cập nhật thông tin bởi Administrator', '2023-08-30 09:52:14', '2023-08-30 09:52:14'),
(68, 1, 'Ảnh có id=11 đã được cập nhật thông tin bởi Administrator', '2023-08-30 09:57:06', '2023-08-30 09:57:06'),
(69, 1, 'Ảnh có id=10 đã được cập nhật thông tin bởi Administrator', '2023-08-30 09:57:33', '2023-08-30 09:57:33'),
(70, 1, 'Ảnh có id=10 đã được cập nhật thông tin bởi Administrator', '2023-08-30 09:57:39', '2023-08-30 09:57:39'),
(71, 1, 'Tài khoản có id=3 đã được cập nhật thông tin bởi Administrator', '2023-08-30 11:10:13', '2023-08-30 11:10:13'),
(72, 1, 'Tài khoản có id=3 đã được cập nhật thông tin bởi Administrator', '2023-08-31 14:08:55', '2023-08-31 14:08:55');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `photos`
--

CREATE TABLE `photos` (
  `id` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_department` int(11) DEFAULT NULL,
  `photo_content` text DEFAULT NULL,
  `photo_status` int(11) DEFAULT NULL,
  `photo_censor` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `role_name` text DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `roles`
--

INSERT INTO `roles` (`id`, `role_name`, `createdAt`, `updatedAt`) VALUES
(1, 'Administrator', '2023-08-18 15:45:38', '2023-08-18 15:45:38'),
(2, 'Censor', '2023-08-18 15:45:38', '2023-08-18 15:45:38'),
(3, 'User', '2023-08-18 15:45:38', '2023-08-18 15:45:38');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20230818020833-create-role.js'),
('20230818022928-create-department.js'),
('20230818024900-create-user.js'),
('20230824082802-create-history.js'),
('20230825081435-create-video.js'),
('20230825081611-create-banner.js'),
('20230828022717-create-photo.js'),
('20230828030922-create-catalogue.js'),
('20230830032259-create-article.js');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `id_department` int(11) DEFAULT NULL,
  `id_role` int(11) DEFAULT NULL,
  `user_email` text DEFAULT NULL,
  `user_password` text DEFAULT NULL,
  `user_name` text DEFAULT NULL,
  `user_gender` int(11) DEFAULT NULL,
  `user_dob` text DEFAULT NULL,
  `user_address` text DEFAULT NULL,
  `user_status` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `id_department`, `id_role`, `user_email`, `user_password`, `user_name`, `user_gender`, `user_dob`, `user_address`, `user_status`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 'dainq.hepc@gmail.com', '$2b$10$aQz8PPK2kPl44AuwPSWKQunkIcqldvnW7Nf3e0WG3tpDKiKt5sSi6', 'Administrator', 1, '1998-07-09', '554 Hà Huy Giáp', 1, '2023-08-18 15:45:38', '2023-08-24 14:59:16'),
(2, 4, 2, 'dainq.hepc@evnspc.vn', '$2b$10$lq5o2bOpob.LA5PcHsGg.e6yxOYM10C/1ezvnp7TDEStLjmtepIPa', 'Nguyễn Quốc Đại', 1, '1998-07-09', '554 Hà huy Giáp', 1, '2023-08-24 14:56:53', '2023-08-25 16:35:20'),
(3, 4, 3, 'dainq.hepc@gmail.gh', '$2a$10$kzG1II8uovceGkvxd7LlPOxecqqSOhdSr3MXt2KbrGCBRIHOCKksu', 'Nguyễn Quốc Đại', 1, '1998-07-09', '', 1, '2023-08-30 11:06:42', '2023-08-31 14:08:55');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `videos`
--

CREATE TABLE `videos` (
  `id` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `video_name` text DEFAULT NULL,
  `video_content` text DEFAULT NULL,
  `video_status` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `catalogues`
--
ALTER TABLE `catalogues`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `histories`
--
ALTER TABLE `histories`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `banners`
--
ALTER TABLE `banners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `catalogues`
--
ALTER TABLE `catalogues`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT cho bảng `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `histories`
--
ALTER TABLE `histories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT cho bảng `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
