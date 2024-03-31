-- CreateTable
CREATE TABLE "ProjectModel" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "ProjectModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectsOnUsersModel" (
    "userId" INTEGER NOT NULL,
    "projectId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "ProjectsOnUsersModel_pkey" PRIMARY KEY ("userId","projectId")
);

-- CreateTable
CREATE TABLE "_ProjectModelToUserModel" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectModel_name_key" ON "ProjectModel"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectModelToUserModel_AB_unique" ON "_ProjectModelToUserModel"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectModelToUserModel_B_index" ON "_ProjectModelToUserModel"("B");

-- AddForeignKey
ALTER TABLE "ProjectsOnUsersModel" ADD CONSTRAINT "ProjectsOnUsersModel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectsOnUsersModel" ADD CONSTRAINT "ProjectsOnUsersModel_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "ProjectModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectModelToUserModel" ADD CONSTRAINT "_ProjectModelToUserModel_A_fkey" FOREIGN KEY ("A") REFERENCES "ProjectModel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectModelToUserModel" ADD CONSTRAINT "_ProjectModelToUserModel_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
