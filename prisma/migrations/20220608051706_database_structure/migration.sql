/*
  Warnings:

  - You are about to drop the column `name` on the `Department` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Project` table. All the data in the column will be lost.
  - Added the required column `dept_name` to the `Department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `project_name` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Department" DROP COLUMN "name",
ADD COLUMN     "dept_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "name",
ADD COLUMN     "project_name" TEXT NOT NULL;
