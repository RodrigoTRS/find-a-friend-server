-- CreateEnum
CREATE TYPE "State" AS ENUM ('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SP', 'SE', 'TO');

-- CreateEnum
CREATE TYPE "Country" AS ENUM ('Brasil');

-- CreateTable
CREATE TABLE "orgs" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "state" "State" NOT NULL,
    "country" "Country" NOT NULL,
    "postal_code" TEXT NOT NULL,

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "age" INTEGER NOT NULL,
    "energy_level" INTEGER NOT NULL,
    "size" INTEGER NOT NULL,
    "independency" INTEGER NOT NULL,
    "pre_requisites" TEXT[],
    "orgId" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
