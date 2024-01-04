import React, { useState, useEffect } from "react";

function App() {
  const [divContenido, setDivContenido] = useState([]);

  useEffect(() => {
    const divContent = document.getElementById("divcontent");
    const childrenArray = Array.from(divContent.children);

    const childrenData = childrenArray.map((child, index) => ({
      id: index, 
      type: child.nodeName,
      content: child.textContent,
    }));

    setDivContenido(childrenData);
  }, []); 

  const traducirContenido = async () => {
    try {
      const contenido = divContenido.map((item) => item.content);

      const response = await fetch("/api/traducir", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contenido }),
      });

      if (!response.ok) {
        throw new Error("Error al traducir el contenido");
      }

      const data = await response.json();

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

  return (
    <div id="divcontent">
      {divContenido.map((item) => (
        <div key={item.id}>
          <h1>{item.title}</h1>
          <p>{item.content}</p>
        </div>
      ))}
      <button onClick={traducirContenido}>Traducir de inglés a español</button>
    </div>
  );
}

export default App;
