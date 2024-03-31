/*
  Warnings:

  - You are about to drop the `ProjectModel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectsOnUsersModel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ProjectModelToUserModel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProjectsOnUsersModel" DROP CONSTRAINT "ProjectsOnUsersModel_projectId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectsOnUsersModel" DROP CONSTRAINT "ProjectsOnUsersModel_userId_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectModelToUserModel" DROP CONSTRAINT "_ProjectModelToUserModel_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProjectModelToUserModel" DROP CONSTRAINT "_ProjectModelToUserModel_B_fkey";

-- DropTable
DROP TABLE "ProjectModel";

-- DropTable
DROP TABLE "ProjectsOnUsersModel";

-- DropTable
DROP TABLE "_ProjectModelToUserModel";
