-- CreateTable
CREATE TABLE "Guide" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Guide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GuideContent" (
    "id" SERIAL NOT NULL,
    "heading" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "guideId" INTEGER NOT NULL,

    CONSTRAINT "GuideContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Guide_id_key" ON "Guide"("id");

-- CreateIndex
CREATE UNIQUE INDEX "GuideContent_id_key" ON "GuideContent"("id");

-- AddForeignKey
ALTER TABLE "GuideContent" ADD CONSTRAINT "GuideContent_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "Guide"("id") ON DELETE CASCADE ON UPDATE CASCADE;
