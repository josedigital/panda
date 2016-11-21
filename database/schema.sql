### Schema
CREATE DATABASE panda_db;
USE panda_db;

# ------------------------------------------------------------

CREATE TABLE `job_search` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `api_name` varchar(50) NOT NULL DEFAULT '',
  `api_uri` varchar(250) NOT NULL DEFAULT '',
  `search_params` varchar(250) NOT NULL DEFAULT '',
  `default_city` varchar(25) NOT NULL DEFAULT '',
  `key_word` varchar(25) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

# ------------------------------------------------------------

CREATE TABLE `library` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `resource` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

# ------------------------------------------------------------

CREATE TABLE `resource_type` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `type` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

# ------------------------------------------------------------

CREATE TABLE `technology` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `tech` char(250) NOT NULL DEFAULT '',
  `description` char(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

# ------------------------------------------------------------

CREATE TABLE `user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_name` char(50) NOT NULL DEFAULT '',
  `display_name` char(50) NOT NULL DEFAULT '',
  `email` char(50) NOT NULL DEFAULT '',
  `git_link` char(50) NOT NULL DEFAULT '',
  `technologies` char(50) NOT NULL DEFAULT '',
  `main_text` text NOT NULL,
  `git_repo1` char(50) DEFAULT '',
  `git_text1` char(250) DEFAULT NULL,
  `git_repo2` char(50) DEFAULT NULL,
  `git_text2` char(250) DEFAULT NULL,
  `git_repo3` char(50) DEFAULT NULL,
  `git_text3` char(250) DEFAULT NULL,
  `avitar_link` char(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
