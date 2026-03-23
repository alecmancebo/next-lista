'use client';
import './globals.css'; // Añade esta línea
import { useState, useEffect } from 'react';

type Nombre = {
  id: number;
  nombre: string;
};

export default function App() {
  const [nombres, setNombres] = useState<Nombre[]>([]);
  const [inputNombre, setInputNombre] = useState("");

  useEffect(() => {
    fetch("/api/nombres") // URL corregida
      .then(res => res.json())
      .then((data: Nombre[]) => setNombres(data))
      .catch(err => console.error("Error al cargar nombres", err));
  }, []);

  async function crearNombre(e: React.FormEvent) {
    e.preventDefault();
    if (inputNombre.trim() === "") return;

    try {
      const respuesta = await fetch("/api/nombres", { // URL corregida
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: inputNombre })
      });

      if (respuesta.ok) {
        const nuevoNombre = await respuesta.json();
        setNombres(prev => [...prev, nuevoNombre]);
        setInputNombre('');
      }
    } catch (e) {
      console.error("Error en el servidor", e);
    }
  }

  async function borrarNombre(id: number) {
    try {
      const respuesta = await fetch("/api/nombres", { // URL corregida
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      if (respuesta.ok) {
        setNombres(prev => prev.filter(n => n.id !== id));
      }
    } catch (e) {
      console.error("Error al borrar", e);
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: "monospace" }}>
      <form onSubmit={crearNombre}>
        <input 
          type="text" 
          placeholder="Añadir nombre" 
          onChange={(e) => setInputNombre(e.target.value)} 
          value={inputNombre}
        />
        <button type="submit">Añadir</button>
      </form>

      <h1>Lista de Nombres</h1>
      
      {nombres.length === 0 ? (
        <p style={{ color: '#888' }}>No hay nombres que mostrar</p>
      ) : (
        <ul>
          {nombres.map((n) => (
            <li key={n.id}>
              {n.nombre} 
              <button onClick={() => borrarNombre(n.id)} style={{ marginLeft: '10px' }}>
                Borrar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}