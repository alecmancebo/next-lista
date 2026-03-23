import { NextResponse } from 'next/server';

let nombresDB = [
  { id: 1, nombre: "Alec" }
];

// GET y POST
export async function GET() {
  return NextResponse.json(nombresDB);
}
/*nuevo Crea un objeto usando Date.now() como ID único temporal y el nombre recibido.*/

export async function POST(request: Request) {
  const body = await request.json();
  const nuevo = { id: Date.now(), nombre: body.nombre }; //date.now es un metodo para general id unicos
  nombresDB.push(nuevo);
  return NextResponse.json(nuevo);
}

/*request.json(): Extrae los datos enviados en el cuerpo (body) de la petición.
nuevo Crea un objeto usando Date.now() como ID único temporal y el nombre recibido.
push Inserta el objeto en el array.
Retorno Devuelve el objeto recién creado para confirmar que se procesó con éxito.*/

// DELETE
export async function DELETE(request: Request) {
  const { id } = await request.json();
  nombresDB = nombresDB.filter(n => n.id !== id);
  return NextResponse.json({ mensaje: "Borrado" });
}

/*Extrae el id del cuerpo de la petición. filter Sobrescribe el array nombresDB manteniendo solo aquellos elementos cuyo ID no coincida con el recibido.Retorno: Devuelve un mensaje de confirmación en JSON.*/