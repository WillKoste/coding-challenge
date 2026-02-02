-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "whitelisted_location" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "country_name" TEXT NOT NULL,
    "user_id" INTEGER,
    "is_valid" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "whitelisted_location_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
