

INSERT INTO `resource_types` (`id`, `type`,`createdAt`, `updatedAt`)

VALUES
	(1,'video', '20161120', '20161120'),
	(2,'pdf', '20161120', '20161120'),
	(3,'link', '20161120', '20161120');

# ------------------------------------------------------------


-- INSERT INTO `resource_types` (`id`, `type`, `createdAt`, `updatedAt`)
-- VALUES
-- 	(1, 'VIDEO', '20161120', '20161120');

INSERT INTO `technologies` (`id`, `tech`, `description`, `createdAt`, `updatedAt`)

VALUES
	(1,'html',NULL, '20161120', '20161120'),
	(2,'css',NULL, '20161120', '20161120'),
	(3,'javascript',NULL, '20161120', '20161120'),
	(4,'jquery',NULL, '20161120', '20161120'),
	(5,'api',NULL, '20161120', '20161120'),
	(6,'node.js',NULL, '20161120', '20161120'),
	(7,'npm',NULL, '20161120', '20161120'),
	(8,'mysql',NULL, '20161120', '20161120'),
	(9,'sequelize',NULL, '20161120', '20161120'),
	(10,'express.js',NULL, '20161120', '20161120'),
	(11,'mongodb',NULL, '20161120', '20161120'),
	(12,'react',NULL, '20161120', '20161120'),
	(13,'hadnlebars',NULL, '20161120', '20161120'),
	(14,'github',NULL, '20161120', '20161120'),
	(15,'heroku',NULL, '20161120', '20161120'),
	(16,'security',NULL, '20161120', '20161120'),
	(17,'debug',NULL, '20161120', '20161120'),
	(18,'testing',NULL, '20161120', '20161120'),
	(19,'tools',NULL, '20161120', '20161120');


INSERT INTO `libraries` (`id`, `resource`, `resource_name`, `createdAt`, `updatedAt`)
VALUES
	(3,'https://www.youtube.com/playlist?list=PLqGj3iMvMa4KOekRWjjajinzlRK879Ksn','Learn jQuery in 15 Playlist','2016-11-29 18:33:26','2016-11-29 18:33:26'),
	(5,'https://www.youtube.com/watch?v=Pt49y1gm0jw&index=1&list=PLqGj3iMvMa4KOekRWjjajinzlRK879Ksn','Learn jQuery in 15 - Series Welcome','2016-11-29 18:36:00','2016-11-29 18:36:00'),
	(6,'https://www.youtube.com/watch?v=v-RC3kJCL4c&index=2&list=PLqGj3iMvMa4KOekRWjjajinzlRK879Ksn','Learn jQuery in 15 - Part 1, Selectors','2016-11-29 18:36:45','2016-11-29 18:36:45'),
	(7,'https://www.youtube.com/watch?v=OqF0kjNwDSI&index=3&list=PLqGj3iMvMa4KOekRWjjajinzlRK879Ksn','Learn jQuery in 15 - Part 2, Classes, Image Swap, Methods','2016-11-29 18:37:29','2016-11-29 18:37:29'),
	(8,'https://www.youtube.com/watch?v=WVvdw-f4Ygo&index=4&list=PLqGj3iMvMa4KOekRWjjajinzlRK879Ksn','Learn jQuery in 15 - Part 3, Event Binding, Dom Traversal','2016-11-29 18:38:10','2016-11-29 18:38:10'),
	(9,'http://api.jquery.com/jquery.ajax/','jQuery.ajax()','2016-11-29 18:40:18','2016-11-29 18:40:18'),
	(10,'http://docs.sequelizejs.com/en/latest/docs/querying/','Sequelize, Querying','2016-11-29 18:41:40','2016-11-29 18:41:40'),
	(11,'http://docs.sequelizejs.com/en/latest/docs/associations/','Sequelize, Associations','2016-11-29 18:42:05','2016-11-29 18:42:05'),
	(12,'http://docs.sequelizejs.com/en/latest/docs/migrations/','Sequelize, Migrations','2016-11-29 18:42:44','2016-11-29 18:42:44'),
	(13,'https://nodejs.org/api/fs.html','Node.js v7.2.0 Documentation','2016-11-29 18:44:02','2016-11-29 18:44:02'),
	(14,'API_Resources.pdf','List of some great APIs','2016-11-29 18:46:53','2016-11-29 18:46:53'),
	(15,'GitPullGuide.pdf','Create, Checkout, and Pull Git Merges','2016-11-29 18:47:31','2016-11-29 18:47:31'),
	(16,'HerokuSteps.pdf','Deploying Your Static Website to Heroku','2016-11-29 18:47:58','2016-11-29 18:47:58'),
	(17,'MySQLHerokuDeploymentProcess.pdf','Heroku Deployment Process For MySQL Projects','2016-11-29 18:48:32','2016-11-29 18:48:32'),
	(18,'StepsToUploadtoGithub.pdf','Steps to Uploading Your Code to GitHub','2016-11-29 18:49:10','2016-11-29 18:49:10');


	INSERT INTO `resourceLibrary` (`createdAt`, `updatedAt`, `libraryId`, `resourceTypeId`)
VALUES
	('2016-11-29 18:33:26','2016-11-29 18:33:26',3,1),
	('2016-11-29 18:36:00','2016-11-29 18:36:00',5,1),
	('2016-11-29 18:36:46','2016-11-29 18:36:46',6,1),
	('2016-11-29 18:37:29','2016-11-29 18:37:29',7,1),
	('2016-11-29 18:38:10','2016-11-29 18:38:10',8,1),
	('2016-11-29 18:40:18','2016-11-29 18:40:18',9,3),
	('2016-11-29 18:41:40','2016-11-29 18:41:40',10,3),
	('2016-11-29 18:42:05','2016-11-29 18:42:05',11,3),
	('2016-11-29 18:42:44','2016-11-29 18:42:44',12,3),
	('2016-11-29 18:44:02','2016-11-29 18:44:02',13,3),
	('2016-11-29 18:46:54','2016-11-29 18:46:54',14,2),
	('2016-11-29 18:47:31','2016-11-29 18:47:31',15,2),
	('2016-11-29 18:47:58','2016-11-29 18:47:58',16,2),
	('2016-11-29 18:48:33','2016-11-29 18:48:33',17,2),
	('2016-11-29 18:49:11','2016-11-29 18:49:11',18,2);


	INSERT INTO `techLibrary` (`createdAt`, `updatedAt`, `libraryId`, `technologyId`)
VALUES
	('2016-11-29 18:33:26','2016-11-29 18:33:26',3,4),
	('2016-11-29 18:36:00','2016-11-29 18:36:00',5,4),
	('2016-11-29 18:36:46','2016-11-29 18:36:46',6,4),
	('2016-11-29 18:37:29','2016-11-29 18:37:29',7,4),
	('2016-11-29 18:38:10','2016-11-29 18:38:10',8,4),
	('2016-11-29 18:40:18','2016-11-29 18:40:18',9,4),
	('2016-11-29 18:41:40','2016-11-29 18:41:40',10,9),
	('2016-11-29 18:42:05','2016-11-29 18:42:05',11,9),
	('2016-11-29 18:42:44','2016-11-29 18:42:44',12,9),
	('2016-11-29 18:44:02','2016-11-29 18:44:02',13,6),
	('2016-11-29 18:46:54','2016-11-29 18:46:54',14,5),
	('2016-11-29 18:47:31','2016-11-29 18:47:31',15,14),
	('2016-11-29 18:47:58','2016-11-29 18:47:58',16,15),
	('2016-11-29 18:48:33','2016-11-29 18:48:33',17,15),
	('2016-11-29 18:49:11','2016-11-29 18:49:11',18,14);