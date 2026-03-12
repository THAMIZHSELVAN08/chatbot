import { NextRequest, NextResponse } from 'next/server';
import { findSchemesByProfile } from '@/lib/schemes';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const age = parseInt(searchParams.get('age') || '0');
    const income = parseInt(searchParams.get('income') || '0');
    const occupation = searchParams.get('occupation') || '';
    const state = searchParams.get('state') || 'All';

    const results = findSchemesByProfile({ age, income, occupation, state });

    return NextResponse.json({
      success: true,
      count: results.length,
      schemes: results,
      query: { age, income, occupation, state },
    });
  } catch (error) {
    console.error('Scheme Finder Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to find schemes' },
      { status: 500 }
    );
  }
}
