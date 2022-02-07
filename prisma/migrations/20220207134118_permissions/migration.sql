-- CreateTable
CREATE TABLE "permissions" (
    "description" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "role_id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("role_id")
);
