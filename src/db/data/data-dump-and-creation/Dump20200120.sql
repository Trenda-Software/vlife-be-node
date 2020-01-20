CREATE DATABASE IF NOT EXISTS `vlife`
/*!40100 DEFAULT CHARACTER SET latin1 */
/*!80016 DEFAULT ENCRYPTION='N' */;
USE `vlife`;
-- MySQL dump 10.13  Distrib 8.0.12, for macos10.13 (x86_64)
--
-- Host: database-1.ckxgxe21zsrx.us-east-1.rds.amazonaws.com    Database: vlife
-- ------------------------------------------------------
-- Server version	8.0.16
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET
  NAMES utf8;
  /*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
  /*!40103 SET TIME_ZONE='+00:00' */;
  /*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
  /*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
  /*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
  /*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET
  @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET
  @@SESSION.SQL_LOG_BIN = 0;
--
  -- GTID state at the beginning of the backup
  --
SET
  @@GLOBAL.GTID_PURGED =
  /*!80000 '+'*/
  '';
--
  -- Table structure for table `especialidad`
  --
  DROP TABLE IF EXISTS `especialidad`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
SET
  character_set_client = utf8mb4;
CREATE TABLE `especialidad` (
    `idespecialidad` int(11) NOT NULL AUTO_INCREMENT,
    `codigo` int(11) DEFAULT NULL,
    `especialidad` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    PRIMARY KEY (`idespecialidad`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = latin1 COLLATE = latin1_bin;
  /*!40101 SET character_set_client = @saved_cs_client */;
--
  -- Dumping data for table `especialidad`
  --
  LOCK TABLES `especialidad` WRITE;
  /*!40000 ALTER TABLE `especialidad` DISABLE KEYS */;
INSERT INTO `especialidad`
VALUES
  (1, 1, 'Medico Clinico'),(2, 2, 'Enfermeria');
  /*!40000 ALTER TABLE `especialidad` ENABLE KEYS */;
UNLOCK TABLES;
--
  -- Table structure for table `listaprecios`
  --
  DROP TABLE IF EXISTS `listaprecios`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
SET
  character_set_client = utf8mb4;
CREATE TABLE `listaprecios` (
    `idlistaprecios` int(11) NOT NULL AUTO_INCREMENT,
    `codigo` int(11) DEFAULT NULL,
    `idprofesional` int(11) DEFAULT NULL,
    `idpractica` int(11) DEFAULT NULL,
    `precio` double DEFAULT NULL,
    `fecha` datetime DEFAULT NULL,
    PRIMARY KEY (`idlistaprecios`),
    KEY `fk_ListaPrecios_Profesional1_idx` (`idprofesional`),
    KEY `fk_ListaPrecios_Practica1_idx` (`idpractica`),
    CONSTRAINT `fk_listaprecios_practica1` FOREIGN KEY (`idpractica`) REFERENCES `practica` (`idpractica`) ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT `fk_listaprecios_profesional1` FOREIGN KEY (`idprofesional`) REFERENCES `profesional` (`idprofesional`) ON DELETE RESTRICT ON UPDATE RESTRICT
  ) ENGINE = InnoDB DEFAULT CHARSET = latin1 COLLATE = latin1_bin;
  /*!40101 SET character_set_client = @saved_cs_client */;
--
  -- Dumping data for table `listaprecios`
  --
  LOCK TABLES `listaprecios` WRITE;
  /*!40000 ALTER TABLE `listaprecios` DISABLE KEYS */;
  /*!40000 ALTER TABLE `listaprecios` ENABLE KEYS */;
UNLOCK TABLES;
--
  -- Table structure for table `pago`
  --
  DROP TABLE IF EXISTS `pago`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
SET
  character_set_client = utf8mb4;
CREATE TABLE `pago` (
    `idpago` int(11) NOT NULL AUTO_INCREMENT,
    `codigo` int(11) DEFAULT NULL,
    `idsolicitud` int(11) NOT NULL,
    `fecha` date DEFAULT NULL,
    `hora` time DEFAULT NULL,
    `monto` double DEFAULT NULL,
    `formapago` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `estado` int(11) DEFAULT NULL,
    PRIMARY KEY (`idpago`, `idsolicitud`),
    KEY `fk_Pago_Solicitud1_idx` (`idsolicitud`),
    CONSTRAINT `fk_pago_solicitud1` FOREIGN KEY (`idsolicitud`) REFERENCES `solicitud` (`idsolicitud`) ON DELETE RESTRICT ON UPDATE RESTRICT
  ) ENGINE = InnoDB DEFAULT CHARSET = latin1 COLLATE = latin1_bin;
  /*!40101 SET character_set_client = @saved_cs_client */;
--
  -- Dumping data for table `pago`
  --
  LOCK TABLES `pago` WRITE;
  /*!40000 ALTER TABLE `pago` DISABLE KEYS */;
  /*!40000 ALTER TABLE `pago` ENABLE KEYS */;
UNLOCK TABLES;
--
  -- Table structure for table `pais`
  --
  DROP TABLE IF EXISTS `pais`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
SET
  character_set_client = utf8mb4;
CREATE TABLE `pais` (
    `idpais` int(11) NOT NULL AUTO_INCREMENT,
    `codigo` int(11) DEFAULT NULL,
    `nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    PRIMARY KEY (`idpais`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = latin1 COLLATE = latin1_bin;
  /*!40101 SET character_set_client = @saved_cs_client */;
--
  -- Dumping data for table `pais`
  --
  LOCK TABLES `pais` WRITE;
  /*!40000 ALTER TABLE `pais` DISABLE KEYS */;
INSERT INTO `pais`
VALUES
  (1, 1, 'Argentina'),(2, 2, 'Colombia');
  /*!40000 ALTER TABLE `pais` ENABLE KEYS */;
UNLOCK TABLES;
--
  -- Table structure for table `practica`
  --
  DROP TABLE IF EXISTS `practica`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
SET
  character_set_client = utf8mb4;
CREATE TABLE `practica` (
    `idpractica` int(11) NOT NULL AUTO_INCREMENT,
    `codigo` int(11) DEFAULT NULL,
    `practica` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `idespecialidad` int(11) DEFAULT NULL,
    `precio` double DEFAULT NULL,
    PRIMARY KEY (`idpractica`),
    KEY `fk_Practica_Especialidad1_idx` (`idespecialidad`),
    CONSTRAINT `fk_practica_especialidad1` FOREIGN KEY (`idespecialidad`) REFERENCES `especialidad` (`idespecialidad`) ON DELETE RESTRICT ON UPDATE RESTRICT
  ) ENGINE = InnoDB AUTO_INCREMENT = 4 DEFAULT CHARSET = latin1 COLLATE = latin1_bin;
  /*!40101 SET character_set_client = @saved_cs_client */;
--
  -- Dumping data for table `practica`
  --
  LOCK TABLES `practica` WRITE;
  /*!40000 ALTER TABLE `practica` DISABLE KEYS */;
INSERT INTO `practica`
VALUES
  (1, 1, 'Cambio de Bolsa de colosiomia', 2, 600),(2, 2, 'Inyeccion Intramuscular', 2, 300),(3, 3, 'Higiene de Paciente', 2, 200);
  /*!40000 ALTER TABLE `practica` ENABLE KEYS */;
UNLOCK TABLES;
--
  -- Table structure for table `profesional`
  --
  DROP TABLE IF EXISTS `profesional`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
SET
  character_set_client = utf8mb4;
CREATE TABLE `profesional` (
    `idprofesional` int(11) NOT NULL AUTO_INCREMENT,
    `codigo` int(11) DEFAULT NULL,
    `nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `apellido` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `celular` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `mail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `idprofesp` int(11) DEFAULT NULL,
    `coordenadas` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `direccion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `ciudad` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `idprovincia` int(11) DEFAULT NULL,
    `idpais` int(11) DEFAULT NULL,
    `idlistaprecio` int(11) DEFAULT NULL,
    `foto` varbinary(255) DEFAULT NULL,
    `reputacion` int(11) DEFAULT NULL,
    `descripcion` multilinestring DEFAULT NULL,
    PRIMARY KEY (`idprofesional`)
  ) ENGINE = InnoDB DEFAULT CHARSET = latin1 COLLATE = latin1_bin;
  /*!40101 SET character_set_client = @saved_cs_client */;
--
  -- Dumping data for table `profesional`
  --
  LOCK TABLES `profesional` WRITE;
  /*!40000 ALTER TABLE `profesional` DISABLE KEYS */;
  /*!40000 ALTER TABLE `profesional` ENABLE KEYS */;
UNLOCK TABLES;
--
  -- Table structure for table `profesionalespecialidad`
  --
  DROP TABLE IF EXISTS `profesionalespecialidad`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
SET
  character_set_client = utf8mb4;
CREATE TABLE `profesionalespecialidad` (
    `idprofesionalespecialidad` int(11) NOT NULL AUTO_INCREMENT,
    `idprofesional` int(11) DEFAULT NULL,
    `idespecialidad` int(11) DEFAULT NULL,
    PRIMARY KEY (`idprofesionalespecialidad`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 16 DEFAULT CHARSET = latin1 COLLATE = latin1_bin;
  /*!40101 SET character_set_client = @saved_cs_client */;
--
  -- Dumping data for table `profesionalespecialidad`
  --
  LOCK TABLES `profesionalespecialidad` WRITE;
  /*!40000 ALTER TABLE `profesionalespecialidad` DISABLE KEYS */;
INSERT INTO `profesionalespecialidad`
VALUES
  (12, 1, 1),(13, 1, 2),(14, 2, 2),(15, 3, 2);
  /*!40000 ALTER TABLE `profesionalespecialidad` ENABLE KEYS */;
UNLOCK TABLES;
--
  -- Table structure for table `provincia`
  --
  DROP TABLE IF EXISTS `provincia`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
SET
  character_set_client = utf8mb4;
CREATE TABLE `provincia` (
    `idprovincia` int(11) NOT NULL AUTO_INCREMENT,
    `codigo` int(11) DEFAULT NULL,
    `nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `idpais` int(11) NOT NULL,
    PRIMARY KEY (`idprovincia`, `idpais`),
    KEY `fk_Provincia_Pais1_idx` (`idpais`),
    CONSTRAINT `fk_provincia_pais1` FOREIGN KEY (`idpais`) REFERENCES `pais` (`idpais`) ON DELETE RESTRICT ON UPDATE RESTRICT
  ) ENGINE = InnoDB AUTO_INCREMENT = 5 DEFAULT CHARSET = latin1 COLLATE = latin1_bin;
  /*!40101 SET character_set_client = @saved_cs_client */;
--
  -- Dumping data for table `provincia`
  --
  LOCK TABLES `provincia` WRITE;
  /*!40000 ALTER TABLE `provincia` DISABLE KEYS */;
INSERT INTO `provincia`
VALUES
  (1, 123, 'Buenos Aires', 1),(2, 123, 'Mendoza', 1),(3, 453, 'Medellin', 2),(4, 4567, 'Bogota', 2);
  /*!40000 ALTER TABLE `provincia` ENABLE KEYS */;
UNLOCK TABLES;
--
  -- Table structure for table `rangoedad`
  --
  DROP TABLE IF EXISTS `rangoedad`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
SET
  character_set_client = utf8mb4;
CREATE TABLE `rangoedad` (
    `idrangoedad` int(11) NOT NULL AUTO_INCREMENT,
    `codigo` int(11) DEFAULT NULL,
    `descripcion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    PRIMARY KEY (`idrangoedad`)
  ) ENGINE = InnoDB DEFAULT CHARSET = latin1 COLLATE = latin1_bin;
  /*!40101 SET character_set_client = @saved_cs_client */;
--
  -- Dumping data for table `rangoedad`
  --
  LOCK TABLES `rangoedad` WRITE;
  /*!40000 ALTER TABLE `rangoedad` DISABLE KEYS */;
  /*!40000 ALTER TABLE `rangoedad` ENABLE KEYS */;
UNLOCK TABLES;
--
  -- Table structure for table `reputacion`
  --
  DROP TABLE IF EXISTS `reputacion`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
SET
  character_set_client = utf8mb4;
CREATE TABLE `reputacion` (
    `idreputacion` int(11) NOT NULL AUTO_INCREMENT,
    `codigo` int(11) DEFAULT NULL,
    `idprofesional` int(11) DEFAULT NULL,
    `idusuario` int(11) DEFAULT NULL,
    `comentario` multilinestring DEFAULT NULL,
    `like` int(11) DEFAULT NULL,
    PRIMARY KEY (`idreputacion`),
    KEY `fk_Reputacion_Usuario1_idx` (`idusuario`),
    KEY `fk_Reputacion_Profesional1_idx` (`idprofesional`),
    CONSTRAINT `fk_reputacion_profesional1` FOREIGN KEY (`idprofesional`) REFERENCES `profesional` (`idprofesional`) ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT `fk_reputacion_usuario1` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`idusuario`) ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT `fk_reputacion_usuario2` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`idusuario`) ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT `fk_reputacion_usuario3` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`idusuario`) ON DELETE RESTRICT ON UPDATE RESTRICT
  ) ENGINE = InnoDB DEFAULT CHARSET = latin1 COLLATE = latin1_bin;
  /*!40101 SET character_set_client = @saved_cs_client */;
--
  -- Dumping data for table `reputacion`
  --
  LOCK TABLES `reputacion` WRITE;
  /*!40000 ALTER TABLE `reputacion` DISABLE KEYS */;
  /*!40000 ALTER TABLE `reputacion` ENABLE KEYS */;
UNLOCK TABLES;
--
  -- Table structure for table `solicitud`
  --
  DROP TABLE IF EXISTS `solicitud`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
SET
  character_set_client = utf8mb4;
CREATE TABLE `solicitud` (
    `idsolicitud` int(11) NOT NULL AUTO_INCREMENT,
    `codigo` int(11) DEFAULT NULL,
    `idusuario` int(11) DEFAULT NULL,
    `idprofesional` int(11) DEFAULT NULL,
    `idpractica` int(11) DEFAULT NULL,
    `fecha` date DEFAULT NULL,
    `hora` datetime(6) DEFAULT NULL,
    `comentario` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `estado` int(11) DEFAULT NULL,
    PRIMARY KEY (`idsolicitud`),
    KEY `fk_Solicitud_Usuario_idx` (`idusuario`),
    KEY `fk_Solicitud_Profesional1_idx` (`idprofesional`),
    KEY `fk_Solicitud_Practica1_idx` (`idpractica`),
    CONSTRAINT `fk_solicitud_practica1` FOREIGN KEY (`idpractica`) REFERENCES `practica` (`idpractica`) ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT `fk_solicitud_profesional1` FOREIGN KEY (`idprofesional`) REFERENCES `profesional` (`idprofesional`) ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT `fk_solicitud_usuario` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`idusuario`) ON DELETE RESTRICT ON UPDATE RESTRICT
  ) ENGINE = InnoDB DEFAULT CHARSET = latin1 COLLATE = latin1_bin;
  /*!40101 SET character_set_client = @saved_cs_client */;
--
  -- Dumping data for table `solicitud`
  --
  LOCK TABLES `solicitud` WRITE;
  /*!40000 ALTER TABLE `solicitud` DISABLE KEYS */;
  /*!40000 ALTER TABLE `solicitud` ENABLE KEYS */;
UNLOCK TABLES;
--
  -- Table structure for table `usuario`
  --
  DROP TABLE IF EXISTS `usuario`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
SET
  character_set_client = utf8mb4;
CREATE TABLE `usuario` (
    `idusuario` int(11) NOT NULL AUTO_INCREMENT,
    `codigo` int(11) DEFAULT NULL,
    `usuario` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `clave` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `coordenadas` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `nombre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `apellido` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `foto` varbinary(255) DEFAULT NULL,
    `mail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `celular` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `direccion` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `ciudad` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
    `idprovincia` int(11) NOT NULL,
    `idpais` int(11) NOT NULL,
    PRIMARY KEY (`idusuario`, `idprovincia`, `idpais`),
    KEY `fk_Usuario_Provincia1_idx` (`idprovincia`),
    KEY `fk_Usuario_Pais1_idx` (`idpais`),
    CONSTRAINT `fk_usuario_pais1` FOREIGN KEY (`idpais`) REFERENCES `pais` (`idpais`) ON DELETE RESTRICT ON UPDATE RESTRICT,
    CONSTRAINT `fk_usuario_provincia1` FOREIGN KEY (`idprovincia`) REFERENCES `provincia` (`idprovincia`) ON DELETE RESTRICT ON UPDATE RESTRICT
  ) ENGINE = InnoDB AUTO_INCREMENT = 3 DEFAULT CHARSET = latin1 COLLATE = latin1_bin;
  /*!40101 SET character_set_client = @saved_cs_client */;
--
  -- Dumping data for table `usuario`
  --
  LOCK TABLES `usuario` WRITE;
  /*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario`
VALUES
  (
    1,
    1,
    'maca',
    'pepe01',
    '145',
    'Mariano',
    'Escudero',
    _binary 'tenia_rulos.com',
    'm@gmail.com',
    '1135679876',
    'Olmos 134',
    'Chascomus',
    1,
    1
  ),(
    2,
    2,
    'jhack',
    'pep01',
    '134',
    'Javier',
    'Hack',
    _binary 'una_foto.com',
    'j@gmail.com',
    '1135679876',
    'Olmos 567',
    'Medellin',
    3,
    2
  );
  /*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
--
  -- Temporary view structure for view `v_especialidad`
  --
  DROP TABLE IF EXISTS `v_especialidad`;
  /*!50001 DROP VIEW IF EXISTS `v_especialidad`*/;
SET
  @saved_cs_client = @@character_set_client;
SET
  character_set_client = utf8mb4;
  /*!50001 CREATE VIEW `v_especialidad` AS SELECT 
   1 AS `idespecialidad`,
   1 AS `codigo`,
   1 AS `especialidad`,
   1 AS `CantProfesionales`*/;
SET
  character_set_client = @saved_cs_client;
--
  -- Dumping routines for database 'vlife'
  --
  --
  -- Final view structure for view `v_especialidad`
  --
  /*!50001 DROP VIEW IF EXISTS `v_especialidad`*/;
  /*!50001 SET @saved_cs_client          = @@character_set_client */;
  /*!50001 SET @saved_cs_results         = @@character_set_results */;
  /*!50001 SET @saved_col_connection     = @@collation_connection */;
  /*!50001 SET character_set_client      = utf8mb4 */;
  /*!50001 SET character_set_results     = utf8mb4 */;
  /*!50001 SET collation_connection      = utf8mb4_general_ci */;
  /*!50001 CREATE ALGORITHM=UNDEFINED */
  /*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
  /*!50001 VIEW `v_especialidad` AS select `especialidad`.`idespecialidad` AS `idespecialidad`,`especialidad`.`codigo` AS `codigo`,`especialidad`.`especialidad` AS `especialidad`,count(0) AS `CantProfesionales` from (`profesionalespecialidad` join `especialidad` on((`profesionalespecialidad`.`idespecialidad` = `especialidad`.`idespecialidad`))) group by `especialidad`.`idespecialidad` */;
  /*!50001 SET character_set_client      = @saved_cs_client */;
  /*!50001 SET character_set_results     = @saved_cs_results */;
  /*!50001 SET collation_connection      = @saved_col_connection */;
SET
  @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
  /*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
  /*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
  /*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
  /*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
  /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
  /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
  /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
  /*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
-- Dump completed on 2020-01-20 16:50:37