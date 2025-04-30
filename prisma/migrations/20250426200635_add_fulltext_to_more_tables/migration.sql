-- CreateIndex
CREATE FULLTEXT INDEX `companies_name_idx` ON `companies`(`name`);

-- CreateIndex
CREATE FULLTEXT INDEX `departments_name_idx` ON `departments`(`name`);

-- CreateIndex
CREATE FULLTEXT INDEX `divisions_name_idx` ON `divisions`(`name`);

-- CreateIndex
CREATE FULLTEXT INDEX `fields_name_idx` ON `fields`(`name`);

-- CreateIndex
CREATE FULLTEXT INDEX `projects_name_idx` ON `projects`(`name`);

-- CreateIndex
CREATE FULLTEXT INDEX `roles_name_idx` ON `roles`(`name`);

-- CreateIndex
CREATE FULLTEXT INDEX `teams_name_idx` ON `teams`(`name`);
