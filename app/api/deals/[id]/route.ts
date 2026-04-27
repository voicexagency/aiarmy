import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dealsPath = path.join(process.cwd(), 'data', 'deals.json');

async function getDeals() {
  try {
    const data = await fs.readFile(dealsPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function saveDeals(deals: any[]) {
  await fs.writeFile(dealsPath, JSON.stringify(deals, null, 2));
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const body = await request.json();
  const deals = await getDeals();
  const index = deals.findIndex((d: any) => d.id === id);
  if (index !== -1) {
    deals[index] = { ...deals[index], ...body };
    await saveDeals(deals);
    return NextResponse.json(deals[index]);
  }
  return NextResponse.json({ error: 'Deal not found' }, { status: 404 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const deals = await getDeals();
  const filtered = deals.filter((d: any) => d.id !== id);
  if (filtered.length !== deals.length) {
    await saveDeals(filtered);
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: 'Deal not found' }, { status: 404 });
}
