-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-05-2023 a las 12:30:42
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `expenses`
--
CREATE DATABASE IF NOT EXISTS `expenses` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `expenses`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `category`
--

CREATE TABLE `category` (
  `id` int(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `category`
--

INSERT INTO `category` (`id`, `img`, `name`) VALUES
(1, '', 'vivienda y suministros'),
(2, '', 'Alimentos y Bebidas'),
(3, '', 'hoteles, cafés y restaurantes'),
(4, '', 'Otros bienes y servicios'),
(5, '', 'Ocio, espectáculos y cultura'),
(6, '', 'Vestido y calzado'),
(7, '', 'Mobiliario y otros vivienda'),
(8, '', 'Salud'),
(9, '', 'Comunicaciones y ADSL'),
(10, '', 'Cuotas e impuestos'),
(11, '', 'Educación'),
(12, '', 'Transportes y viajes'),
(13, '', 'Salario'),
(14, '', 'Otros ingresos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `expense`
--

CREATE TABLE `expense` (
  `id` int(255) NOT NULL,
  `description` varchar(100) NOT NULL,
  `expensedate` date NOT NULL,
  `price` float NOT NULL,
  `category_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `expense`
--

INSERT INTO `expense` (`id`, `description`, `expensedate`, `price`, `category_id`, `user_id`) VALUES
(1, 'viaje a Cuenca', '2023-04-16', -260, 12, 2),
(2, 'Pago mensual Honda Civic', '2023-04-15', -250, 10, 2),
(3, 'Cine', '2023-04-15', -15, 5, 2),
(5, 'salario abril', '2023-04-01', 1250, 13, 2),
(8, 'Salario mayo', '2023-05-02', 1200, 13, 2),
(9, 'Pago mensual Honda Civic', '2023-05-11', -250, 10, 2),
(10, 'multa tráfico', '2023-05-19', -100, 10, 2),
(11, 'compra semanal', '2023-04-08', -113.15, 2, 2),
(13, 'hipoteca', '2023-04-05', -550, 10, 2),
(14, 'hipoteca', '2023-05-05', -550, 10, 2),
(15, 'compra semanal', '2023-05-13', -97.56, 2, 2),
(16, 'recibo del agua', '2023-05-10', -60.1, 1, 2),
(17, 'bono transporte', '2023-04-06', -20, 12, 3),
(18, 'sueldo abril', '2023-04-01', 400.87, 13, 3),
(19, 'concierto Cannibal Corpse', '2023-04-14', -30, 5, 3),
(20, 'Sudadera Cannibal Corpse gira', '2023-04-14', -45, 6, 3),
(21, 'cervezas con los amigos', '2023-04-22', -15.75, 3, 3),
(22, 'sueldo mayo', '2023-05-02', 400.65, 13, 3),
(23, 'atraco farmacia', '2023-05-04', 425.98, 14, 3),
(24, 'bono transporte', '2023-05-01', -20, 12, 3),
(25, 'ordenador portatil', '2023-05-20', -550, 11, 3),
(26, 'festejos atraco', '2023-05-05', -156.5, 3, 3),
(27, 'salario abril', '2023-04-03', 603.67, 13, 4),
(28, 'gasolina', '2023-04-12', -67.34, 4, 4),
(29, 'pago wiffi', '2023-04-19', -43.9, 9, 4),
(30, 'traje graduación', '2023-04-29', -225.7, 6, 4),
(31, 'alquiler habitación', '2023-04-04', -200, 1, 4),
(32, 'alquiler habitación', '2023-05-02', -250, 1, 4),
(33, 'gasolina', '2023-05-19', -78.94, 4, 4),
(34, 'salario mayo', '2023-05-04', 650.43, 13, 4),
(35, 'zapatos graduación', '2023-05-27', -225, 6, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `password` varchar(10) NOT NULL,
  `role` enum('user','admin') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `email`, `name`, `password`, `role`) VALUES
(1, 'adam@adam.com', 'adam', 'admin', 'admin'),
(2, 'raul@raul.com', 'Raúl', '12345', 'user'),
(3, 'pau@pau.com', 'Pau', '12345', 'user'),
(4, 'alejandro@alejandro.com', 'Alejandro', '12345', 'user');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `expense`
--
ALTER TABLE `expense`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `expense`
--
ALTER TABLE `expense`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `expense`
--
ALTER TABLE `expense`
  ADD CONSTRAINT `expense_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `expense_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
