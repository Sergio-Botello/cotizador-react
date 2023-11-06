import { Link } from "react-router-dom";
import {GiHouse} from "react-icons/gi"
import useHistorial from "../hooks/useHistorial";
import Valor from "./Valor";
import Header from "./Header";

const Historial = () =>{
    const { historial } = useHistorial();
    
    const eliminarTodos = () =>{
        localStorage.clear()
        window.location.reload ()
    };

    return(
        <>
            <nav>
                <Link to={"/"}>
                    <GiHouse/>
                </Link>
                <Header/><h1>Historial de cotizaciones</h1>  
            </nav>
            <ul>{historial.map((elemento, indice) => (
            <Valor key={indice} {...elemento}/>
            ))}
            </ul>
            
            {historial == 0 &&(
                <> 
                    <p>No tienes nada en el historial</p>
                    <hr />
                </>
            )}
            {historial != 0 && (
            <> 
                <form onSubmit={(e) => e.preventDefault()}>
                    <button type="button" onClick={eliminarTodos}>Eliminar todo el historial</button>
                </form>
            </>
            )}
        </>
    )
}

export default Historial;
 