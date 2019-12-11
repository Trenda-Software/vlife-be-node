CREATE DATABASE  IF NOT EXISTS `VLife` /*!40100 DEFAULT CHARACTER SET utf8mb4*/;
USE `VLife`;
-- MySQL dump 10.13  Distrib 8.0.12, for macos10.13 (x86_64)
--
-- Host: localhost    Database: VLife
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Especialidad`
--

DROP TABLE IF EXISTS `Especialidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Especialidad` (
  `idEspecialidad` int(11) NOT NULL AUTO_INCREMENT,
  `Codigo` int(11) DEFAULT NULL,
  `Especialidad` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idEspecialidad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Especialidad`
--

LOCK TABLES `Especialidad` WRITE;
/*!40000 ALTER TABLE `Especialidad` DISABLE KEYS */;
/*!40000 ALTER TABLE `Especialidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ListaPrecios`
--

DROP TABLE IF EXISTS `ListaPrecios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `ListaPrecios` (
  `idListaPrecios` int(11) NOT NULL AUTO_INCREMENT,
  `Codigo` int(11) DEFAULT NULL,
  `IdProfesional` int(11) DEFAULT NULL,
  `IdPractica` int(11) DEFAULT NULL,
  `Precio` double DEFAULT NULL,
  `Fecha` datetime DEFAULT NULL,
  PRIMARY KEY (`idListaPrecios`),
  KEY `fk_ListaPrecios_Profesionales1_idx` (`IdProfesional`),
  KEY `fk_ListaPrecios_Practica1_idx` (`IdPractica`),
  CONSTRAINT `fk_ListaPrecios_Practica1` FOREIGN KEY (`IdPractica`) REFERENCES `practica` (`idpractica`),
  CONSTRAINT `fk_ListaPrecios_Profesionales1` FOREIGN KEY (`IdProfesional`) REFERENCES `profesionales` (`idprofesionales`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ListaPrecios`
--

LOCK TABLES `ListaPrecios` WRITE;
/*!40000 ALTER TABLE `ListaPrecios` DISABLE KEYS */;
/*!40000 ALTER TABLE `ListaPrecios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Pagos`
--

DROP TABLE IF EXISTS `Pagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Pagos` (
  `idPagos` int(11) NOT NULL AUTO_INCREMENT,
  `Codigo` int(11) DEFAULT NULL,
  `IdSolicitud` int(11) DEFAULT NULL,
  `Fecha` date DEFAULT NULL,
  `Hora` time DEFAULT NULL,
  `Monto` double DEFAULT NULL,
  `FormaPago` varchar(255) DEFAULT NULL,
  `Estado` int(11) DEFAULT NULL,
  `Solicitud_idSolicitud` int(11) NOT NULL,
  PRIMARY KEY (`idPagos`,`Solicitud_idSolicitud`),
  KEY `fk_Pagos_Solicitud1_idx` (`Solicitud_idSolicitud`),
  CONSTRAINT `fk_Pagos_Solicitud1` FOREIGN KEY (`Solicitud_idSolicitud`) REFERENCES `solicitud` (`idsolicitud`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Pagos`
--

LOCK TABLES `Pagos` WRITE;
/*!40000 ALTER TABLE `Pagos` DISABLE KEYS */;
/*!40000 ALTER TABLE `Pagos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Pais`
--

DROP TABLE IF EXISTS `Pais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Pais` (
  `idPais` int(11) NOT NULL AUTO_INCREMENT,
  `Codigo` int(11) DEFAULT NULL,
  `Nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idPais`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Pais`
--

LOCK TABLES `Pais` WRITE;
/*!40000 ALTER TABLE `Pais` DISABLE KEYS */;
INSERT INTO `Pais` VALUES (1,1,'Argentina'),(2,2,'Colombia');
/*!40000 ALTER TABLE `Pais` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Practica`
--

DROP TABLE IF EXISTS `Practica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Practica` (
  `idPractica` int(11) NOT NULL AUTO_INCREMENT,
  `Codigo` int(11) DEFAULT NULL,
  `Practica` varchar(255) DEFAULT NULL,
  `IdEspecialidad` int(11) DEFAULT NULL,
  `Precio` double DEFAULT NULL,
  PRIMARY KEY (`idPractica`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Practica`
--

LOCK TABLES `Practica` WRITE;
/*!40000 ALTER TABLE `Practica` DISABLE KEYS */;
/*!40000 ALTER TABLE `Practica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Profesionales`
--

DROP TABLE IF EXISTS `Profesionales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Profesionales` (
  `idProfesionales` int(11) NOT NULL AUTO_INCREMENT,
  `Codigo` int(11) DEFAULT NULL,
  `Nombre` varchar(255) DEFAULT NULL,
  `Apellido` varchar(255) DEFAULT NULL,
  `Celular` varchar(255) DEFAULT NULL,
  `mail` varchar(255) DEFAULT NULL,
  `IdProfEsp` int(11) DEFAULT NULL,
  `Coordenadas` varchar(255) DEFAULT NULL,
  `Direccion` varchar(255) DEFAULT NULL,
  `Ciudad` varchar(255) DEFAULT NULL,
  `IdProvincia` int(11) DEFAULT NULL,
  `IdPais` int(11) DEFAULT NULL,
  `IdListaPrecio` int(11) DEFAULT NULL,
  `Foto` varbinary(255) DEFAULT NULL,
  `Reputacion` int(11) DEFAULT NULL,
  `Descripcion` multilinestring DEFAULT NULL,
  PRIMARY KEY (`idProfesionales`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Profesionales`
--

LOCK TABLES `Profesionales` WRITE;
/*!40000 ALTER TABLE `Profesionales` DISABLE KEYS */;
/*!40000 ALTER TABLE `Profesionales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProfesionalEspecialidad`
--

DROP TABLE IF EXISTS `ProfesionalEspecialidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `ProfesionalEspecialidad` (
  `idProfesionalEspecialidad` int(11) NOT NULL AUTO_INCREMENT,
  `IdProfesional` int(11) DEFAULT NULL,
  `IdEspacialidad` int(11) DEFAULT NULL,
  PRIMARY KEY (`idProfesionalEspecialidad`),
  KEY `fk_ProfesionalEspecialidad_Profesionales1_idx` (`IdProfesional`),
  KEY `fk_ProfesionalEspecialidad_Especialidad1_idx` (`IdEspacialidad`),
  CONSTRAINT `fk_ProfesionalEspecialidad_Especialidad1` FOREIGN KEY (`IdEspacialidad`) REFERENCES `especialidad` (`idespecialidad`),
  CONSTRAINT `fk_ProfesionalEspecialidad_Profesionales1` FOREIGN KEY (`IdProfesional`) REFERENCES `profesionales` (`idprofesionales`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProfesionalEspecialidad`
--

LOCK TABLES `ProfesionalEspecialidad` WRITE;
/*!40000 ALTER TABLE `ProfesionalEspecialidad` DISABLE KEYS */;
/*!40000 ALTER TABLE `ProfesionalEspecialidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Provincias`
--

DROP TABLE IF EXISTS `Provincias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Provincias` (
  `idProvincias` int(11) NOT NULL AUTO_INCREMENT,
  `Codigo` int(11) DEFAULT NULL,
  `Nombre` varchar(255) DEFAULT NULL,
  `Pais_idPais` int(11) NOT NULL,
  PRIMARY KEY (`idProvincias`,`Pais_idPais`),
  KEY `fk_Provincias_Pais1_idx` (`Pais_idPais`),
  CONSTRAINT `fk_Provincias_Pais1` FOREIGN KEY (`Pais_idPais`) REFERENCES `pais` (`idpais`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Provincias`
--

LOCK TABLES `Provincias` WRITE;
/*!40000 ALTER TABLE `Provincias` DISABLE KEYS */;
INSERT INTO `Provincias` VALUES (1,123,'Buenos Aires',1),(2,123,'Mendoza',1),(3,453,'Medellin',2),(4,4567,'Bogota',2);
/*!40000 ALTER TABLE `Provincias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RangoEdad`
--

DROP TABLE IF EXISTS `RangoEdad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `RangoEdad` (
  `idRangoEdad` int(11) NOT NULL AUTO_INCREMENT,
  `Codigo` int(11) DEFAULT NULL,
  `Descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idRangoEdad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RangoEdad`
--

LOCK TABLES `RangoEdad` WRITE;
/*!40000 ALTER TABLE `RangoEdad` DISABLE KEYS */;
/*!40000 ALTER TABLE `RangoEdad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reputacion`
--

DROP TABLE IF EXISTS `Reputacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Reputacion` (
  `idReputacion` int(11) NOT NULL AUTO_INCREMENT,
  `Codigo` int(11) DEFAULT NULL,
  `IdProfesional` int(11) DEFAULT NULL,
  `IdUsuario` int(11) DEFAULT NULL,
  `Comentario` multilinestring DEFAULT NULL,
  `Like` int(11) DEFAULT NULL,
  PRIMARY KEY (`idReputacion`),
  KEY `fk_Reputacion_Usuarios1_idx` (`IdUsuario`),
  KEY `fk_Reputacion_Profesionales1_idx` (`IdProfesional`),
  CONSTRAINT `fk_Reputacion_Profesionales1` FOREIGN KEY (`IdProfesional`) REFERENCES `profesionales` (`idprofesionales`),
  CONSTRAINT `fk_Reputacion_Usuarios1` FOREIGN KEY (`IdUsuario`) REFERENCES `usuarios` (`idusuario`),
  CONSTRAINT `fk_Reputacion_Usuarios2` FOREIGN KEY (`IdUsuario`) REFERENCES `usuarios` (`idusuario`),
  CONSTRAINT `fk_Reputacion_Usuarios3` FOREIGN KEY (`IdUsuario`) REFERENCES `usuarios` (`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reputacion`
--

LOCK TABLES `Reputacion` WRITE;
/*!40000 ALTER TABLE `Reputacion` DISABLE KEYS */;
/*!40000 ALTER TABLE `Reputacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Solicitud`
--

DROP TABLE IF EXISTS `Solicitud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Solicitud` (
  `idSolicitud` int(11) NOT NULL AUTO_INCREMENT,
  `Codigo` int(11) DEFAULT NULL,
  `IdUsuario` int(11) DEFAULT NULL,
  `IdProfesional` int(11) DEFAULT NULL,
  `IdPractica` int(11) DEFAULT NULL,
  `Fecha` date DEFAULT NULL,
  `Hora` datetime(6) DEFAULT NULL,
  `Comentario` varchar(255) DEFAULT NULL,
  `Estado` int(11) DEFAULT NULL,
  PRIMARY KEY (`idSolicitud`),
  KEY `fk_Solicitud_Usuarios_idx` (`IdUsuario`),
  KEY `fk_Solicitud_Profesionales1_idx` (`IdProfesional`),
  KEY `fk_Solicitud_Practica1_idx` (`IdPractica`),
  CONSTRAINT `fk_Solicitud_Practica1` FOREIGN KEY (`IdPractica`) REFERENCES `practica` (`idpractica`),
  CONSTRAINT `fk_Solicitud_Profesionales1` FOREIGN KEY (`IdProfesional`) REFERENCES `profesionales` (`idprofesionales`),
  CONSTRAINT `fk_Solicitud_Usuarios` FOREIGN KEY (`IdUsuario`) REFERENCES `usuarios` (`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Solicitud`
--

LOCK TABLES `Solicitud` WRITE;
/*!40000 ALTER TABLE `Solicitud` DISABLE KEYS */;
/*!40000 ALTER TABLE `Solicitud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Usuarios`
--

DROP TABLE IF EXISTS `Usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Usuarios` (
  `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `Codigo` int(11) DEFAULT NULL,
  `Usuario` varchar(255) DEFAULT NULL,
  `Clave` varchar(255) DEFAULT NULL,
  `Coordenadas` varchar(255) DEFAULT NULL,
  `Nombre` varchar(255) DEFAULT NULL,
  `Apellido` varchar(255) DEFAULT NULL,
  `Foto` varbinary(255) DEFAULT NULL,
  `Mail` varchar(255) DEFAULT NULL,
  `Celular` varchar(255) DEFAULT NULL,
  `Direccion` varchar(255) DEFAULT NULL,
  `Ciudad` varchar(255) DEFAULT NULL,
  `Provincias_idProvincias` int(11) NOT NULL,
  `Pais_idPais` int(11) NOT NULL,
  PRIMARY KEY (`idUsuario`,`Provincias_idProvincias`,`Pais_idPais`),
  KEY `fk_Usuarios_Provincias1_idx` (`Provincias_idProvincias`),
  KEY `fk_Usuarios_Pais1_idx` (`Pais_idPais`),
  CONSTRAINT `fk_Usuarios_Pais1` FOREIGN KEY (`Pais_idPais`) REFERENCES `pais` (`idpais`),
  CONSTRAINT `fk_Usuarios_Provincias1` FOREIGN KEY (`Provincias_idProvincias`) REFERENCES `provincias` (`idprovincias`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuarios`
--

LOCK TABLES `Usuarios` WRITE;
/*!40000 ALTER TABLE `Usuarios` DISABLE KEYS */;
INSERT INTO `Usuarios` VALUES (1,1,'maca','pepe01','145','Mariano','Escudero',_binary 'tenia_rulos.com','m@gmail.com','1135679876','Olmos 134','Chascomus',1,1),(2,2,'jhack','pep01','134','Javier','Hack',_binary 'una_foto.com','j@gmail.com','1135679876','Olmos 567','Medellin',3,2);
/*!40000 ALTER TABLE `Usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'VLife'
--

--
-- Dumping routines for database 'VLife'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-03 17:48:49
