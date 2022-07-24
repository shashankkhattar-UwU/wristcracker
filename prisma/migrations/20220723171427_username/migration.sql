/*
  Warnings:

  - You are about to drop the column `firstName` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Player` table. All the data in the column will be lost.
  - Added the required column `username` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
INSERT INTO "new_Player" ("id", "password") SELECT "id", "password" FROM "Player";
DROP TABLE "Player";
ALTER TABLE "new_Player" RENAME TO "Player";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
