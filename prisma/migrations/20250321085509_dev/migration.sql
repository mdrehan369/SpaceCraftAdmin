/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Design` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Design_title_key" ON "Design"("title");
