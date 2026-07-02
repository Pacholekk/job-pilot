import { prisma } from "@/lib/prisma";
import { applicationSchema } from "@/lib/validations/application";
import { NextResponse } from "next/server";
import z from "zod";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const applicationId = Number(id);

  if (Number.isNaN(applicationId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const body = await request.json();
  const parsed = applicationSchema.safeParse(body);

  if (!parsed.success)
    return NextResponse.json(
      {
        errors: z.flattenError(parsed.error).fieldErrors,
      },
      { status: 400 },
    );

  try {
    const application = await prisma.application.update({
      where: {
        id: applicationId,
      },
      data: parsed.data,
    });
    return NextResponse.json(application, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Application not found" },
      { status: 404 },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const applicationId = Number(id);

  if (Number.isNaN(applicationId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const body = await request.json();
  const parsed = applicationSchema.partial().safeParse(body);

  if (!parsed.success)
    return NextResponse.json(
      {
        errors: z.flattenError(parsed.error).fieldErrors,
      },
      { status: 400 },
    );

  try {
    if (Object.keys(parsed.data).length === 0)
      return NextResponse.json({ error: "Notging to update" }, { status: 400 });
    const application = await prisma.application.update({
      where: {
        id: applicationId,
      },
      data: parsed.data,
    });

    return NextResponse.json(application, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        error: "Application not found",
      },
      { status: 404 },
    );
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const applicationId = Number(id);

  if (Number.isNaN(applicationId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    await prisma.application.delete({ where: { id: applicationId } });

    return NextResponse.json({
      message: "Application deleted successfully",
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to delete application" },
      { status: 404 },
    );
  }
}
