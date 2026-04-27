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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const body = await request.json();
  const tasks = await getTasks();
  const index = tasks.findIndex((t: any) => t.id === id);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...body };
    await saveTasks(tasks);
    return NextResponse.json(tasks[index]);
  }
  return NextResponse.json({ error: 'Task not found' }, { status: 404 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const tasks = await getTasks();
  const filtered = tasks.filter((t: any) => t.id !== id);
  if (filtered.length !== tasks.length) {
    await saveTasks(filtered);
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: 'Task not found' }, { status: 404 });
}