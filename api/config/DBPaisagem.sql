--Executing (default): 
CREATE TABLE IF NOT EXISTS `Classificacoes` (`id_classificacao` INTEGER auto_increment , `nome` VARCHAR(255), `descricao` VARCHAR(255), `createdAt` DATETIME NOTNULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id_classificacao`)) ENGINE=InnoDB;
--Executing (default): 
SHOW INDEX FROM `Classificacoes` FROM `ages-paisagem`
--Executing (default): 
CREATE TABLE IF NOT EXISTS `Familias` (`id_familia` INTEGER auto_increment , `nome` VARCHAR(255), `descricao` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id_familia`)) ENGINE=InnoDB;
--Executing (default): 
SHOW INDEX FROM `Familias` FROM `ages-paisagem`
--Executing (default): 
CREATE TABLE IF NOT EXISTS `Especies` (`id_especie` INTEGER auto_increment , `id_familia` INTEGER, `id_classificacao` INTEGER, `nome_cientifico` VARCHAR(255), `nome_popular` VARCHAR(255), `naturalidade` VARCHAR(255), `porte` VARCHAR(255), `genero` VARCHAR(255), `populacao` VARCHAR(255), `foto` VARCHAR(255), `desenho` VARCHAR(255), `qtd_individuos` INTEGER, `outono` TINYINT(1), `verao` TINYINT(1), `primavera` TINYINT(1), `inverno` TINYINT(1), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id_especie`), FOREIGN KEY (`id_familia`) REFERENCES `Familias` (`id_familia`), FOREIGN KEY (`id_classificacao`) REFERENCES `Classificacoes` (`id_classificacao`)) ENGINE=InnoDB;
--Executing (default): 
SHOW INDEX FROM `Especies` FROM `ages-paisagem`
--Executing (default): 
CREATE TABLE IF NOT EXISTS `nomesPopulares` (`id_nome_popular` INTEGER auto_increment , `id_especie` INTEGER, `descricao` VARCHAR(255), `createdAt` DATETIME NOTNULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id_nome_popular`), FOREIGN KEY (`id_especie`) REFERENCES `Especies` (`id_especie`)) ENGINE=InnoDB;
--Executing (default): 
SHOW INDEX FROM `nomesPopulares` FROM `ages-paisagem`
--Executing (default): 
CREATE TABLE IF NOT EXISTS `Users` (`id_usuario` INTEGER auto_increment , `nome` VARCHAR(255), `username` VARCHAR(255) UNIQUE, `email` VARCHAR(255), `matricula`VARCHAR(255), `cargo` VARCHAR(255), `formacao` VARCHAR(255), `profissao` VARCHAR(255), `especialidade` VARCHAR(255), `senha` VARCHAR(255) NOT NULL, `salt` VARCHAR(255) NOT NULL, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id_usuario`)) ENGINE=InnoDB;
--Executing (default): 
SHOW INDEX FROM `Users` FROM `ages-paisagem`