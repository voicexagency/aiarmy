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

export async function GET() {
  const deals = await getDeals();
  return NextResponse.json(deals);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const deals = await getDeals();
  const newDeal = {
    id: Date.now().toString(),
    ...body,
    startDate: new Date().toISOString().split('T')[0],
    progress: 0,
  };
  deals.push(newDeal);
  await saveDeals(deals);
  return NextResponse.json(newDeal);
}
