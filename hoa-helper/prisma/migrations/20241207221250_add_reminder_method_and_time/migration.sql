-- AlterTable
ALTER TABLE "User" ADD COLUMN     "remindMethod" TEXT NOT NULL DEFAULT 'email',
ADD COLUMN     "remindTime" TIMESTAMP(3);
