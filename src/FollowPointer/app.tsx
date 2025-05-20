import { useEffect, useState } from "react";

export function App(){
  const[enable, setEnable] = useState(false);
  const [position, setPosition] = useState({x: 0, y: 0})

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
        const {clientX, clientY} = event;
        setPosition({x: clientX, y: clientY})
    }
    if(enable){
        window.addEventListener("pointermove", handleMove);
    }
    return () => {
        window.removeEventListener("pointermove", handleMove);
    }
  }, [enable])
  return(
    <main>
        <div style={
            {
                display: `${enable ? '': 'none'}`,
                position: "absolute",
                backgroundColor: "#09f",
                borderRadius: "50%",
                opacity: 0.8,
                pointerEvents: "none",
                left: -20,
                top: -20,
                width: 40,
                height: 40,
                transform: `translate(${position.x}px, ${position.y}px)` 
            }
        }></div>
        <button style={{position: "absolute", top: "20%", left: "50%", transform: "translate(-50%, 50%)"}} onClick={() => setEnable(!enable)}>{enable ? 'Desactivar': 'Activar'} seguir puntero</button>
    </main>
  )
}