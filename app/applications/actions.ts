"use server";

import { prisma } from "@/lib/prisma";
import { applicationSchema } from "@/lib/validations/application";
import { revalidatePath } from "next/cache";

export const updateApplicationStatus = async (id: number, status: string) => {
  const validStatus = applicationSchema
    .pick({ status: true })
    .safeParse({ status });

  if (!validStatus.success) throw new Error("Failed validating status");

  try {
    await prisma.application.update({
      where: {
        id,
      },
      data: validStatus.data,
    });
    revalidatePath(`/applications/${id}`);
  } catch {
    throw new Error("Failed to update status");
  }
};
