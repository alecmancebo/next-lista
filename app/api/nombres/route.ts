import { NextResponse } from 'next/server';

let nombresDB = [
  { id: 1, nombre: "Primer Nombre" }
];

// MÉTODOS GET y POST
export async function GET() {
  return NextResponse.json(nombresDB);
}

export async function POST(request: Request) {
  const body = await request.json();
  const nuevo = { id: Date.now(), nombre: body.nombre };
  nombresDB.push(nuevo);
  return NextResponse.json(nuevo);
}

// MÉTODO DELETE
export async function DELETE(request: Request) {
  const { id } = await request.json();
  nombresDB = nombresDB.filter(n => n.id !== id);
  return NextResponse.json({ mensaje: "Borrado" });
}