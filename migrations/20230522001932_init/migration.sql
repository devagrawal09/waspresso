-- CreateTable
CREATE TABLE "Beverage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "cost" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "beverageId" INTEGER NOT NULL,
    "customerId" TEXT NOT NULL,
    "totalCost" REAL NOT NULL,
    CONSTRAINT "Order_beverageId_fkey" FOREIGN KEY ("beverageId") REFERENCES "Beverage" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
