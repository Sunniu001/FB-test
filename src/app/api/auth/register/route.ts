import { NextRequest, NextResponse } from 'next/server';
import { wcFetch } from '@/lib/api/client';

function parseWooError(error: unknown): { message: string; code?: string; status: number } {
  const fallback = {
    message: 'Server error. Please try again.',
    status: 500,
  };

  if (!(error instanceof Error)) {
    return fallback;
  }

  const message = error.message || '';
  const bodyMatch = message.match(/Body:\s*(\{[\s\S]*\})$/);

  if (bodyMatch) {
    try {
      const parsed = JSON.parse(bodyMatch[1]);
      const code = typeof parsed?.code === 'string' ? parsed.code : undefined;
      const parsedMessage = typeof parsed?.message === 'string' ? parsed.message : undefined;
      const status = typeof parsed?.data?.status === 'number' ? parsed.data.status : 500;

      return {
        message: (parsedMessage || 'Registration failed').replace(/<[^>]+>/g, ''),
        code,
        status,
      };
    } catch {
      // Fall through to generic handler.
    }
  }

  return {
    message: message.replace(/<[^>]+>/g, '') || fallback.message,
    status: 500,
  };
}

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, password } = await req.json();

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    const data = await wcFetch<{ id: number; email: string }>('customers', {
      method: 'POST',
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        username: email,
      }),
    });

    return NextResponse.json({ id: data.id, email: data.email });
  } catch (err: unknown) {
    const parsed = parseWooError(err);
    return NextResponse.json(
      { message: parsed.message, code: parsed.code },
      { status: parsed.status }
    );
  }
}
