-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Saved', 'Applied', 'Screening', 'Interview', 'Ghosted', 'Offer', 'Rejected');

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Saved';
