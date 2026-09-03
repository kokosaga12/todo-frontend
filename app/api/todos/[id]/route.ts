import { NextRequest, NextResponse } from 'next/server';

import { getTaskById } from '@/lib/tasks';
import { ApiResponse } from '@/types/api-todo';

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};


// GET /api/todos/[id]
export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params;

  try {
    const task = await getTaskById(Number(id));

    if (!task) {
      const notFoundPayload: ApiResponse = {
        success: false,
        message: `Tugas dengan ID ${id} tidak ditemukan di DummyJSON.`,
        timestamp: new Date().toISOString(),
      };

      return NextResponse.json(
        notFoundPayload,
        {
          status: 404,
        }
      );
    }

    const successPayload: ApiResponse = {
      success: true,
      message: `Data Task ID ${id} berhasil diambil.`,
      data: task,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(
      successPayload,
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      `[API /todos/${id}]`,
      error
    );

    const errorPayload: ApiResponse = {
      success: false,
      message: `Gagal mengambil Task ID ${id}.`,
      error:
        error instanceof Error
          ? error.message
          : 'Internal Server Error',
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(
      errorPayload,
      {
        status: 500,
      }
    );
  }
}