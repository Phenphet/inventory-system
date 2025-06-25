-- CreateTable
CREATE TABLE "product" (
    "product_id" SERIAL NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_unit" TEXT NOT NULL,
    "product_reorder_level" INTEGER NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "location" (
    "location_id" SERIAL NOT NULL,
    "location_name" TEXT NOT NULL,

    CONSTRAINT "location_pkey" PRIMARY KEY ("location_id")
);

-- CreateTable
CREATE TABLE "stockmovement" (
    "movement_id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "movement_type" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "movement_date" TIMESTAMP(3) NOT NULL,
    "reference_number" TEXT,
    "remarks" TEXT,
    "source_location_id" INTEGER NOT NULL,
    "destination_location_id" INTEGER NOT NULL,

    CONSTRAINT "stockmovement_pkey" PRIMARY KEY ("movement_id")
);

-- CreateTable
CREATE TABLE "user" (
    "user_id" SERIAL NOT NULL,
    "user_fullname" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "user_status" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_user_email_key" ON "user"("user_email");

-- AddForeignKey
ALTER TABLE "stockmovement" ADD CONSTRAINT "stockmovement_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stockmovement" ADD CONSTRAINT "stockmovement_source_location_id_fkey" FOREIGN KEY ("source_location_id") REFERENCES "location"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stockmovement" ADD CONSTRAINT "stockmovement_destination_location_id_fkey" FOREIGN KEY ("destination_location_id") REFERENCES "location"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;
