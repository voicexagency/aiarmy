import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const tasksPath = path.join(process.cwd(), 'data', 'tasks.json');

async function getTasks() {
  try {
    const data = await fs.readFile(tasksPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function saveTasks(tasks: any[]) {
  await fs.writeFile(tasksPath, JSON.stringify(tasks, null, 2));
}

export async function GET() {
  const tasks = await getTasks();
  return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const tasks = await getTasks();
  const newTask = {
    id: Date.now().toString(),
    ...body,
    createdAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  await saveTasks(tasks);
  return NextResponse.json(newTask);
}