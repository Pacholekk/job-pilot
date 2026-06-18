import { prisma } from "@/lib/prisma";
import { applicationSchema } from "@/lib/validations/application";
import { NextResponse } from "next/server";
import { parse } from "path";
import z from "zod";

export async function GET() {
  const application = await prisma.application.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });
  return NextResponse.json(application);
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = applicationSchema.safeParse(body);

  if (!parsed.success)
    return NextResponse.json(
      { errors: z.flattenError(parsed.error).fieldErrors },
      { status: 400 },
    );

  const application = await prisma.application.create({
    data: {
      company: parsed.data.company,
      position: parsed.data.position,
      location: parsed.data.location,
      offerUrl: parsed.data.offerUrl,
      jobType: parsed.data.jobType,
      techStack: parsed.data.techStack,
      salary: parsed.data.salary,
      jobDescription: parsed.data.jobDescription,
    },
  });

  return NextResponse.json(application, { status: 201 });
}
