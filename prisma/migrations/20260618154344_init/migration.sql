-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('Hybrid', 'Onsite', 'Remote');

-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "company" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "offerUrl" TEXT,
    "jobType" "JobType" NOT NULL,
    "techStack" TEXT NOT NULL,
    "salary" INTEGER,
    "jobDescription" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);
