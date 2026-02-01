-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whitelisted_location" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

INSERT INTO "user" (
    email, first_name, last_name, password, whitelisted_location
) VALUES (
    'willkoste+2@gmail.com',
    'John',
    'Jacob',
    'Hello1234!',
    'Raleigh'
);

INSERT INTO "user" (
    email, first_name, last_name, password, whitelisted_location
) VALUES (
    'willkoste+1@gmail.com',
    'Will',
    'Koste',
    'Hello1234!',
    'Charleston'
);
