-- CreateTable
CREATE TABLE "roles" (
    "name" TEXT NOT NULL,
    "code" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("code")
);
