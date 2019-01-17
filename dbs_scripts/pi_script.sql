-- MySQL Script generated by MySQL Workbench
-- Thu Jan  3 10:26:09 2019
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema smog_pi
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema smog_pi
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `smog_pi` DEFAULT CHARACTER SET utf8 ;
USE `smog_pi` ;

-- -----------------------------------------------------
-- Table `smog_pi`.`smog_sample`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `smog_pi`.`smog_sample` ;

CREATE TABLE IF NOT EXISTS `smog_pi`.`smog_sample` (
  `Id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `PM10_sample` DOUBLE NOT NULL,
  `PM25_sample` DOUBLE NOT NULL,
  `Meassure_timestamp` TIMESTAMP NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE INDEX `Id_UNIQUE` (`Id` ASC) VISIBLE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
