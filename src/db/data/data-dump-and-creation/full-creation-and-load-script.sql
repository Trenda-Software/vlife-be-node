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
  `IdEspecialidad` int(11) NOT NULL AUTO_INCREMENT,
  `Codigo` int(11) DEFAULT NULL,
  `Especialidad` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`IdEspecialidad`)
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
  `IdListaPrecios` int(11) NOT NULL AUTO_INCREMENT,
  `Codigo` int(11) DEFAULT NULL,
  `IdProfesional` int(11) DEFAULT NULL,
  `IdPractica` int(11) DEFAULT NULL,
  `Precio` double DEFAULT NULL,
  `Fecha` datetime DEFAULT NULL,
  PRIMARY KEY (`IdListaPrecios`),
  KEY `fk_ListaPrecios_Profesional1_idx` (`IdProfesional`),
  KEY `fk_ListaPrecios_Practica1_idx` (`IdPractica`),
  CONSTRAINT `fk_ListaPrecios_Practica1` FOREIGN KEY (`IdPractica`) REFERENCES `practica` (`Idpractica`),
  CONSTRAINT `fk_ListaPrecios_Profesional1` FOREIGN KEY (`IdProfesional`) REFERENCES `profesional` (`Idprofesional`)
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
-- Table structure for table `Pago`
--

DROP TABLE IF EXISTS `Pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Pago` (
  `IdPago` int(11) NOT NULL AUTO_INCREMENT,
  `Codigo` int(11) DEFAULT NULL,
  `IdSolicitud` int(11) NOT NULL,
  `Fecha` date DEFAULT NULL,
  `Hora` time DEFAULT NULL,
  `Monto` double DEFAULT NULL,
  `FormaPago` varchar(255) DEFAULT NULL,
  `Estado` int(11) DEFAULT NULL,
  PRIMARY KEY (`IdPago`,`IdSolicitud`),
  KEY `fk_Pago_Solicitud1_idx` (`IdSolicitud`),
  CONSTRAINT `fk_Pago_Solicitud1` FOREIGN KEY (`IdSolicitud`) REFERENCES `solicitud` (`IdSolicitud`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Pago`
--

LOCK TABLES `Pago` WRITE;
/*!40000 ALTER TABLE `Pago` DISABLE KEYS */;
/*!40000 ALTER TABLE `Pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Pais`
--

DROP TABLE IF EXISTS `Pais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Pais` (
  `IdPais` int(11) NOT NULL AUTO_INCREMENT,
  `Codigo` int(11) DEFAULT NULL,
  `Nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`IdPais`)
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
  `IdPractica` int(11) NOT NULL AUTO_INCREMENT,
  `Codigo` int(11) DEFAULT NULL,
  `Practica` varchar(255) DEFAULT NULL,
  `IdEspecialidad` int(11) DEFAULT NULL,
  `Precio` double DEFAULT NULL,
  PRIMARY KEY (`IdPractica`)
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
-- Table structure for table `Profesional`
--

DROP TABLE IF EXISTS `Profesional`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Profesional` (
  `IdProfesional` int(11) NOT NULL AUTO_INCREMENT,
  `Codigo` int(11) DEFAULT NULL,
  `Nombre` varchar(255) DEFAULT NULL,
  `Apellido` varchar(255) DEFAULT NULL,
  `Celular` varchar(255) DEFAULT NULL,
  `Mail` varchar(255) DEFAULT NULL,
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
  PRIMARY KEY (`IdProfesional`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Profesional`
--

LOCK TABLES `Profesional` WRITE;
/*!40000 ALTER TABLE `Profesional` DISABLE KEYS */;
/*!40000 ALTER TABLE `Profesional` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProfesionalEspecialidad`
--

DROP TABLE IF EXISTS `ProfesionalEspecialidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `ProfesionalEspecialidad` (
  `IdProfesionalEspecialidad` int(11) NOT NULL AUTO_INCREMENT,
  `IdProfesional` int(11) DEFAULT NULL,
  `IdEspecialidad` int(11) DEFAULT NULL,
  PRIMARY KEY (`IdProfesionalEspecialidad`),
  KEY `fk_ProfesionalEspecialidad_Profesional1_idx` (`IdProfesional`),
  KEY `fk_ProfesionalEspecialidad_Especialidad1_idx` (`IdEspecialidad`),
  CONSTRAINT `fk_ProfesionalEspecialidad_Especialidad1` FOREIGN KEY (`IdEspecialidad`) REFERENCES `especialidad` (`IdEspecialidad`),
  CONSTRAINT `fk_ProfesionalEspecialidad_Profesional1` FOREIGN KEY (`IdProfesional`) REFERENCES `profesional` (`IdProfesional`)
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
-- Table structure for table `Provincia`
--

DROP TABLE IF EXISTS `Provincia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Provincia` (
  `IdProvincia` int(11) NOT NULL AUTO_INCREMENT,
  `Codigo` int(11) DEFAULT NULL,
  `Nombre` varchar(255) DEFAULT NULL,
  `IdPais` int(11) NOT NULL,
  PRIMARY KEY (`IdProvincia`,`IdPais`),
  KEY `fk_Provincia_Pais1_idx` (`IdPais`),
  CONSTRAINT `fk_Provincia_Pais1` FOREIGN KEY (`IdPais`) REFERENCES `pais` (`IdPais`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Provincia`
--

LOCK TABLES `Provincia` WRITE;
/*!40000 ALTER TABLE `Provincia` DISABLE KEYS */;
INSERT INTO `Provincia` VALUES (1,123,'Buenos Aires',1),(2,123,'Mendoza',1),(3,453,'Medellin',2),(4,4567,'Bogota',2);
/*!40000 ALTER TABLE `Provincia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RangoEdad`
--

DROP TABLE IF EXISTS `RangoEdad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `RangoEdad` (
  `IdRangoEdad` int(11) NOT NULL AUTO_INCREMENT,
  `Codigo` int(11) DEFAULT NULL,
  `Descripcion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`IdRangoEdad`)
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
  `IdReputacion` int(11) NOT NULL AUTO_INCREMENT,
  `Codigo` int(11) DEFAULT NULL,
  `IdProfesional` int(11) DEFAULT NULL,
  `IdUsuario` int(11) DEFAULT NULL,
  `Comentario` multilinestring DEFAULT NULL,
  `Like` int(11) DEFAULT NULL,
  PRIMARY KEY (`IdReputacion`),
  KEY `fk_Reputacion_Usuario1_idx` (`IdUsuario`),
  KEY `fk_Reputacion_Profesional1_idx` (`IdProfesional`),
  CONSTRAINT `fk_Reputacion_Profesional1` FOREIGN KEY (`IdProfesional`) REFERENCES `profesional` (`Idprofesional`),
  CONSTRAINT `fk_Reputacion_Usuario1` FOREIGN KEY (`IdUsuario`) REFERENCES `usuario` (`IdUsuario`),
  CONSTRAINT `fk_Reputacion_Usuario2` FOREIGN KEY (`IdUsuario`) REFERENCES `usuario` (`IdUsuario`),
  CONSTRAINT `fk_Reputacion_Usuario3` FOREIGN KEY (`IdUsuario`) REFERENCES `usuario` (`IdUsuario`)
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
  `IdSolicitud` int(11) NOT NULL AUTO_INCREMENT,
  `Codigo` int(11) DEFAULT NULL,
  `IdUsuario` int(11) DEFAULT NULL,
  `IdProfesional` int(11) DEFAULT NULL,
  `IdPractica` int(11) DEFAULT NULL,
  `Fecha` date DEFAULT NULL,
  `Hora` datetime(6) DEFAULT NULL,
  `Comentario` varchar(255) DEFAULT NULL,
  `Estado` int(11) DEFAULT NULL,
  PRIMARY KEY (`IdSolicitud`),
  KEY `fk_Solicitud_Usuario_idx` (`IdUsuario`),
  KEY `fk_Solicitud_Profesional1_idx` (`IdProfesional`),
  KEY `fk_Solicitud_Practica1_idx` (`IdPractica`),
  CONSTRAINT `fk_Solicitud_Practica1` FOREIGN KEY (`IdPractica`) REFERENCES `practica` (`Idpractica`),
  CONSTRAINT `fk_Solicitud_Profesional1` FOREIGN KEY (`IdProfesional`) REFERENCES `profesional` (`Idprofesional`),
  CONSTRAINT `fk_Solicitud_Usuario` FOREIGN KEY (`IdUsuario`) REFERENCES `usuario` (`IdUsuario`)
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
-- Table structure for table `Usuario`
--

DROP TABLE IF EXISTS `Usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `Usuario` (
  `IdUsuario` int(11) NOT NULL AUTO_INCREMENT,
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
  `IdProvincia` int(11) NOT NULL,
  `IdPais` int(11) NOT NULL,
  PRIMARY KEY (`IdUsuario`,`IdProvincia`,`IdPais`),
  KEY `fk_Usuario_Provincia1_idx` (`IdProvincia`),
  KEY `fk_Usuario_Pais1_idx` (`IdPais`),
  CONSTRAINT `fk_Usuario_Pais1` FOREIGN KEY (`IdPais`) REFERENCES `pais` (`Idpais`),
  CONSTRAINT `fk_Usuario_Provincia1` FOREIGN KEY (`IdProvincia`) REFERENCES `provincia` (`Idprovincia`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuario`
--

LOCK TABLES `Usuario` WRITE;
/*!40000 ALTER TABLE `Usuario` DISABLE KEYS */;
INSERT INTO `Usuario` VALUES (1,1,'maca','pepe01','145','Mariano','Escudero',_binary 'tenia_rulos.com','m@gmail.com','1135679876','Olmos 134','Chascomus',1,1),(2,2,'jhack','pep01','134','Javier','Hack',_binary 'una_foto.com','j@gmail.com','1135679876','Olmos 567','Medellin',3,2);
/*!40000 ALTER TABLE `Usuario` ENABLE KEYS */;
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
