import React, { useState, useEffect } from "react";

function App() {
  const [divContenido, setDivContenido] = useState([]);
  const [language, setLanguage] = useState("es"); // Inicialmente español

  useEffect(() => {
    // Simular el contenido de la BD en español
    const contenidoBD = {
      h1: "hola",
      p: "esto es un texto que se va a traducir en diversos idiomas de manera dinámica",
      button: "Alternar idioma",
    };

    // Crea un objeto para cada hijo con su contenido y tipo
    const childrenData = Object.entries(contenidoBD).map(([type, content], index) => ({
      id: index,
      type,
      content,
    }));

    // Actualiza el estado con el array de objetos en español
    setDivContenido(childrenData);
  }, []); // El segundo argumento [] asegura que useEffect se ejecute solo una vez al montar el componente

  const traducirContenido = async () => {
    try {
      const contenido = divContenido.map((item) => item.content);

      // Realizar la solicitud de traducción
      const response = await fetch("http://localhost:3001/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contenido, language }),
      });

      if (!response.ok) {
        throw new Error("Error al traducir el contenido");
      }

      const data = await response.json();

      // Actualizar el estado con el contenido traducido
      setDivContenido((prevContenido) =>
        prevContenido.map((item, index) => ({
          ...item,
          content: data.traduccion[index].texto,
        }))
      );
    } catch (error) {
      console.error("Error al traducir:", error.message);
    }
  };

  const cambiaIdioma = async () => {
    // Cambia el idioma
    setLanguage((prevLanguage) => (prevLanguage === "es" ? "en" : "es"));

    // Traduce el contenido cuando se cambia el idioma
    await traducirContenido();
  };

  return (
    <div id="divcontent">
      {divContenido.map((item) => (
        <div key={item.id}>
          {item.type === "h1" && <h1>{item.content}</h1>}
          {item.type === "p" && <p>{item.content}</p>}
          {item.type === "button" && <button onClick={cambiaIdioma}>{item.content}</button>}
        </div>
      ))}
    </div>
  );
}

export default App;
