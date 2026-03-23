import { useState, useEffect } from 'react';

type Nombre = {
  id: number;
  nombre: string;
};

function App() {
  const [nombres, setNombres] = useState<Nombre[]>([]);
  const [inputNombre, setInputNombre] = useState("");

  // Corrección: Usar React.FormEvent
  async function crearNombre(e: React.FormEvent) {
    e.preventDefault();
    if (inputNombre.trim() === "") return;

    try {
      const respuesta = await fetch("http://localhost:3000/nuevo", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: inputNombre })
      });

      if (respuesta.ok) {
        // En una app real, el ID debería venir del servidor tras el POST
        const nuevoNombre: Nombre = {
          id: Date.now(), // ID más fiable que un random pequeño
          nombre: inputNombre
        };

        setNombres(prev => [...prev, nuevoNombre]);
        setInputNombre('');
      }
    } catch (e) {
      console.error("Error en el servidor", e);
    }
  }

  async function borrarNombre(id: number, textoNombre: string) {
    try {
      const respuesta = await fetch("http://localhost:3000/eliminar", {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: textoNombre })
      });

      if (respuesta.ok) {
        setNombres(prev => prev.filter(n => n.id !== id));
      }
    } catch (e) {
      console.error("Error al borrar en el servidor", e);
    }
  }

  useEffect(() => {
    // Asegúrate de que la URL sea correcta (añadido localhost:3000)
    fetch("http://localhost:3000/nombres")
      .then(res => res.json())
      .then((data: string[]) => {
        const nombresFormateados = data.map((n, index) => ({
          id: index + Date.now(), 
          nombre: n
        }));
        setNombres(nombresFormateados);
      })
      .catch(err => console.error("Error al cargar nombres", err));
  }, []);

  return <>
    <div style={{ padding: '20px', fontFamily: "monospace" }} className="contenedor">
      <form onSubmit={crearNombre}>
        <input 
          type="text" 
          placeholder="Añadir nombre" 
          onChange={(e) => setInputNombre(e.target.value)} 
          value={inputNombre}
        />
        <input type="submit" value="Añadir" />
      </form>

      <h1>Lista de Nombres</h1>
      
      {nombres.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>No hay nombres que mostrar</p>
      ) : (
        <ul>
          {nombres.map((n) => (
            <li key={n.id}>
              {n.nombre}
              <button 
                className="btn-borrar" 
                onClick={() => borrarNombre(n.id, n.nombre)}
              >
                Borrar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  </>
}

export default App;