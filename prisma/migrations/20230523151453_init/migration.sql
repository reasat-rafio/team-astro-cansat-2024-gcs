/*
  Warnings:

  - You are about to drop the column `paylaod` on the `Temperature` table. All the data in the column will be lost.
  - Added the required column `payload` to the `Temperature` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Temperature" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "body" INTEGER NOT NULL,
    "core" INTEGER NOT NULL,
    "payload" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Temperature" ("body", "core", "createdAt", "id") SELECT "body", "core", "createdAt", "id" FROM "Temperature";
DROP TABLE "Temperature";
ALTER TABLE "new_Temperature" RENAME TO "Temperature";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
