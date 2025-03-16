-- CreateEnum
CREATE TYPE "City" AS ENUM ('BOKARO', 'DEOGHAR', 'DHANBAD', 'EAST_SINGHBHUM', 'GIRIDIH', 'HAZARIBAGH', 'KODARMA', 'RAMGARH', 'RANCHI', 'SARAIKELA', 'WEST_SINGHBHUM', 'OTHERS');

-- CreateEnum
CREATE TYPE "Property" AS ENUM ('ONE_BHK', 'TWO_BHK', 'THREE_BHK', 'FOUR_BHK_OR_DUPLEX');

-- CreateTable
CREATE TABLE "Design" (
    "id" SERIAL NOT NULL,
    "Category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Design_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FreeDesignConsultation" (
    "id" SERIAL NOT NULL,
    "property" "Property" NOT NULL,
    "city" "City" NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "isConsultationDone" BOOLEAN NOT NULL DEFAULT false,
    "whatsappUpdates" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "designId" INTEGER NOT NULL,

    CONSTRAINT "FreeDesignConsultation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "workDetails" TEXT NOT NULL,
    "customers" TEXT[],
    "imageUrls" TEXT[],

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 4,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Design_id_key" ON "Design"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FreeDesignConsultation_id_key" ON "FreeDesignConsultation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Project_id_key" ON "Project"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Review_id_key" ON "Review"("id");

-- AddForeignKey
ALTER TABLE "FreeDesignConsultation" ADD CONSTRAINT "FreeDesignConsultation_designId_fkey" FOREIGN KEY ("designId") REFERENCES "Design"("id") ON DELETE CASCADE ON UPDATE CASCADE;
