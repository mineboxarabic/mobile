-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: mds_paris
-- ------------------------------------------------------
-- Server version	9.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bet`
--

DROP TABLE IF EXISTS `bet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bet` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `outcome_id` bigint NOT NULL,
  `potential_return` double NOT NULL,
  `pourcenatge` double NOT NULL,
  `stake` double NOT NULL,
  `placed_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `outcome_id` (`outcome_id`),
  CONSTRAINT `bet_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `bet_ibfk_2` FOREIGN KEY (`outcome_id`) REFERENCES `outcome` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bet`
--

LOCK TABLES `bet` WRITE;
/*!40000 ALTER TABLE `bet` DISABLE KEYS */;
INSERT INTO `bet` VALUES (1,1,1,281.69,35.5,100,'2025-01-16 14:30:00','active'),(2,1,7,233.64,42.8,100,'2025-02-02 10:15:00','active'),(3,1,13,425.53,23.5,100,'2025-02-16 16:45:00','active'),(4,2,2,354.61,28.2,100,'2025-01-17 09:20:00','active'),(5,2,8,174.83,57.2,100,'2025-02-03 11:30:00','active'),(6,2,19,190.11,52.6,100,'2025-01-11 13:45:00','active'),(7,3,3,534.76,18.7,100,'2025-01-18 15:10:00','active'),(8,3,9,657.89,15.2,100,'2025-01-21 12:00:00','active'),(9,3,20,257.07,38.9,100,'2025-01-21 14:20:00','active'),(10,4,4,781.25,12.8,100,'2025-01-19 08:45:00','active'),(11,4,10,1179.49,8.5,100,'2025-01-22 16:30:00','active'),(12,4,21,389.11,25.7,100,'2025-02-02 09:15:00','active'),(13,5,5,1886.79,5.3,100,'2025-01-20 17:25:00','active'),(14,5,11,1052.63,9.5,100,'2025-01-23 10:40:00','active'),(15,5,22,318.47,31.4,100,'2025-01-26 15:50:00','active'),(16,6,6,452.49,22.1,100,'2025-01-21 11:15:00','active'),(17,6,12,507.61,19.7,100,'2025-01-06 14:20:00','active'),(18,6,23,529.1,18.9,100,'2025-02-11 12:30:00','active'),(19,7,14,657.89,15.2,100,'2025-02-17 09:30:00','active'),(20,7,15,242.72,41.2,100,'2025-01-16 13:45:00','active'),(21,7,16,190.11,52.6,100,'2025-01-11 15:20:00','active'),(22,8,17,148.59,67.3,100,'2025-01-02 08:00:00','active'),(23,8,18,305.25,32.7,100,'2025-01-02 08:05:00','active'),(24,8,24,529.1,18.9,100,'2025-02-11 16:45:00','active');
/*!40000 ALTER TABLE `bet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `market`
--

DROP TABLE IF EXISTS `market`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `market` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `desciption` varchar(255) DEFAULT NULL,
  `popularity` int DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `ended_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `market_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `market`
--

LOCK TABLES `market` WRITE;
/*!40000 ALTER TABLE `market` DISABLE KEYS */;
INSERT INTO `market` VALUES (1,1,'Qui remportera les élections présidentielles françaises 2027 ?','active','binary','politique','Prédiction sur le vainqueur des prochaines élections présidentielles en France',5,'2025-01-15 10:00:00','2027-04-15 20:00:00'),(2,2,'Le RN dépassera-t-il 35% aux européennes 2025 ?','active','binary','politique','Prédiction sur le score du Rassemblement National aux élections européennes',2,'2025-02-01 09:30:00','2025-06-09 20:00:00'),(3,3,'Macron démissionnera-t-il avant la fin de son mandat ?','active','binary','politique','Prédiction sur une éventuelle démission du président Macron',2,'2025-01-20 14:15:00','2027-05-13 20:00:00'),(4,9,'Qui remportera la Coupe du Monde 2026 ?','active','multiple','sport','Prédiction sur le vainqueur de la prochaine Coupe du Monde de football',6,'2025-01-10 08:00:00','2026-07-19 20:00:00'),(5,5,'Le PSG remportera-t-il la Ligue des Champions 2025 ?','active','binary','sport','Prédiction sur la victoire du PSG en Ligue des Champions cette saison',2,'2025-02-15 16:45:00','2025-06-01 20:00:00'),(6,6,'Qui sera le meilleur buteur de Ligue 1 2024-2025 ?','active','multiple','sport','Prédiction sur le joueur qui marquera le plus de buts cette saison',5,'2025-01-05 12:00:00','2025-05-25 20:00:00'),(7,7,'Le Bitcoin dépassera-t-il 150 000$ en 2025 ?','active','binary','economie','Prédiction sur le prix du Bitcoin atteignant 150 000 dollars',2,'2025-01-01 00:00:00','2025-12-31 23:59:59'),(8,9,'L\'inflation en France sera-t-elle inférieure à 2% en 2025 ?','active','binary','economie','Prédiction sur le taux d\'inflation annuel en France',0,'2025-01-15 10:30:00','2025-12-31 23:59:59'),(9,1,'Le CAC 40 dépassera-t-il 9000 points en 2025 ?','active','binary','economie','Prédiction sur l\'indice boursier français',0,'2025-01-10 09:00:00','2025-12-31 23:59:59'),(10,2,'ChatGPT dépassera-t-il 3 milliards d\'utilisateurs en 2025 ?','active','binary','technologie','Prédiction sur le nombre d\'utilisateurs de ChatGPT',0,'2025-01-20 11:00:00','2025-12-31 23:59:59'),(11,3,'Apple lancera-t-il un iPhone pliable en 2025 ?','active','binary','technologie','Prédiction sur le lancement d\'un iPhone pliable par Apple',0,'2025-02-01 14:20:00','2025-12-31 23:59:59'),(12,9,'La France légalisera-t-elle le cannabis récréatif en 2025 ?','active','binary','societe','Prédiction sur la légalisation du cannabis récréatif en France',0,'2025-01-25 15:30:00','2025-12-31 23:59:59'),(13,9,'Le télétravail sera-t-il obligatoire 3 jours/semaine en 2025 ?','active','binary','societe','Prédiction sur l\'obligation du télétravail en France',0,'2025-02-10 10:15:00','2025-12-31 23:59:59'),(14,9,'Match de Football PSG vs OM','active','binary','sports','Prédiction du vainqueur du match',0,'2025-09-23 14:46:02','2024-02-15 19:00:00');
/*!40000 ALTER TABLE `market` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `outcome`
--

DROP TABLE IF EXISTS `outcome`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `outcome` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `market_id` bigint NOT NULL,
  `pourcentage` double NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `market_id` (`market_id`),
  CONSTRAINT `outcome_ibfk_1` FOREIGN KEY (`market_id`) REFERENCES `market` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `outcome`
--

LOCK TABLES `outcome` WRITE;
/*!40000 ALTER TABLE `outcome` DISABLE KEYS */;
INSERT INTO `outcome` VALUES (1,1,35.5,'MACRON','Emmanuel Macron'),(2,1,28.2,'LE_PEN','Marine Le Pen'),(3,1,18.7,'MELENCHON','Jean-Luc Mélenchon'),(4,1,12.3,'OTHER','Autre candidat'),(5,1,5.3,'BLANK','Vote blanc/nul'),(6,2,42.8,'YES',NULL),(7,2,57.2,'NO',NULL),(8,3,15.2,'YES',NULL),(9,3,84.8,'NO',NULL),(10,4,22.1,'FRANCE','France'),(11,4,18.7,'BRAZIL','Brésil'),(12,4,15.3,'ARGENTINA','Argentine'),(13,4,12.8,'GERMANY','Allemagne'),(14,4,9.4,'SPAIN','Espagne'),(15,4,21.7,'OTHER','Autre équipe'),(16,5,23.5,'YES',NULL),(17,5,76.5,'NO',NULL),(18,6,28.4,'MBAPPE','Kylian Mbappé'),(19,6,19.7,'LACAZETTE','Alexandre Lacazette'),(20,6,15.2,'BEN_YEDDER','Wissam Ben Yedder'),(21,6,12.8,'TERRIER','Martin Terrier'),(22,6,23.9,'OTHER','Autre joueur'),(23,7,67.3,'YES',NULL),(24,7,32.7,'NO',NULL),(25,8,41.2,'YES',NULL),(26,8,58.8,'NO',NULL),(27,9,52.6,'YES',NULL),(28,9,47.4,'NO',NULL),(29,10,38.9,'YES',NULL),(30,10,61.1,'NO',NULL),(31,11,25.7,'YES',NULL),(32,11,74.3,'NO',NULL),(33,12,31.4,'YES',NULL),(34,12,68.6,'NO',NULL),(35,13,18.9,'YES',NULL),(36,13,81.1,'NO',NULL),(37,14,60,'WIN_PSG','PSG gagne'),(38,14,40,'WIN_OM','OM gagne');
/*!40000 ALTER TABLE `outcome` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `outcome_history`
--

DROP TABLE IF EXISTS `outcome_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `outcome_history` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `outcome_id` bigint NOT NULL,
  `pourcentage` double NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `outcome_id` (`outcome_id`),
  CONSTRAINT `outcome_history_ibfk_1` FOREIGN KEY (`outcome_id`) REFERENCES `outcome` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `outcome_history`
--

LOCK TABLES `outcome_history` WRITE;
/*!40000 ALTER TABLE `outcome_history` DISABLE KEYS */;
INSERT INTO `outcome_history` VALUES (1,1,40,'2025-01-15 10:00:00'),(2,1,38.5,'2025-01-16 14:30:00'),(3,1,37.2,'2025-01-18 09:15:00'),(4,1,35.5,'2025-01-20 16:45:00'),(5,2,25,'2025-01-15 10:00:00'),(6,2,26.8,'2025-01-17 09:20:00'),(7,2,27.5,'2025-01-19 11:30:00'),(8,2,28.2,'2025-01-21 14:20:00'),(9,17,45,'2025-01-01 00:00:00'),(10,17,52.3,'2025-01-15 10:30:00'),(11,17,58.7,'2025-01-30 14:20:00'),(12,17,67.3,'2025-02-15 16:45:00'),(13,13,30,'2025-02-15 16:45:00'),(14,13,27.8,'2025-02-16 16:45:00'),(15,13,25.2,'2025-02-18 10:30:00'),(16,13,23.5,'2025-02-20 14:15:00');
/*!40000 ALTER TABLE `outcome_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `balance` double NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `bets_won` int DEFAULT '0',
  `profit` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,1000,'Alice','Martin','alice.martin@email.com','$2a$10$encrypted_password_1',2,150.25),(2,750.5,'Bob','Dupont','bob.dupont@email.com','$2a$10$encrypted_password_2',1,-50),(3,1200,'Claire','Bernard','claire.bernard@email.com','$2a$10$encrypted_password_3',3,275.8),(4,850.25,'David','Moreau','david.moreau@email.com','$2a$10$encrypted_password_4',0,-200),(5,950.75,'Emma','Petit','emma.petit@email.com','$2a$10$encrypted_password_5',1,75.5),(6,1100,'François','Robert','francois.robert@email.com','$2a$10$encrypted_password_6',2,180.3),(7,800,'Gabrielle','Richard','gabrielle.richard@email.com','$2a$10$encrypted_password_7',1,-100.25),(8,1300.5,'Hugo','Durand','hugo.durand@email.com','$2a$10$encrypted_password_8',4,420.75),(9,0,'John','Doe','john@example.com','$2a$10$0jAhZsA51Wbr6KiDfN9PDuza40sWxUntnDwzMPL0mtE4rH/kA3Fla',NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-24  8:57:28
