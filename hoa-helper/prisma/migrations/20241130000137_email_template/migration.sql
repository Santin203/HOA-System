-- CreateTable
CREATE TABLE "EmailTamplates" (
    "id" SERIAL NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "EmailTamplates_pkey" PRIMARY KEY ("id")
);
