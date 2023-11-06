import { Link } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa6";
import Opciones from "./Opciones";
import { useEffect, useState } from "react";
import useCotizador from "../hooks/useCotizador";
import useHistorial from "../hooks/useHistorial";
import Swal from "sweetalert2";
import Header from "./Header";

const Cotizador = () =>{
    
    const [precio, setPrecio] = useState(0);
    const {elementos, setElementos} = useCotizador();
    const [datos, setDatos] = useState([]);
    const {historial, setHistorial} = useHistorial();
    const costoM2 = 35.86
     
    const realizarCotizacion = () =>{
               
        const {metrosCuadrados, propiedad, ubicacion} = elementos
        if(metrosCuadrados < 20 ||  propiedad == 0 || ubicacion == 0 ){
            Swal.fire("Error","Debes completas los datos","error")
        }
        const cuenta = costoM2 * metrosCuadrados * propiedad * ubicacion;
        setPrecio(cuenta);
    };

    const guardar = () => {
        setHistorial([...historial, {
            fecha:new Date().toDateString(),
            ...elementos,
            cuenta: costoM2 * elementos.metrosCuadrados * elementos.propiedad * elementos.ubicacion
         },
        ]);
        setPrecio(0);
    };

    useEffect(() => {

        const leer = async () => setDatos( await(await fetch("/data.json")).json());
        leer();
    }, []);
    
    return (
    <>
        <nav>
            <Link to={"/historial"}>
                <FaClipboardList />
             
            </Link>
            <Header /><h1>Cotizador de seguros UNTREF</h1>
            
        </nav>

        <form action="" onSubmit={(e) => e.preventDefault()}>
            <Opciones 
                datos={datos.filter(({categoria}) => categoria == "propiedad")} 
                label={"Propiedad"}
                tipo={"propiedad"}
                 />
            
            <Opciones 
                datos={datos.filter(({categoria})=> categoria == "ubicacion")} 
                label={"Ubicacion"} 
                tipo={"ubicacion"}
                />
            <label htmlFor="metros">Cantidad de metros cuadrados</label>
            <input 
                type="number" 
                name="metrosCuadrados" 
                id="metrosCuadrados"
                min={20}
                defaultValue={20}
                onInput={(e) => setElementos({
                    ...elementos, 
                    metrosCuadrados: isNaN( parseInt(e.target.value)) 
                    ? 20 
                    : parseInt(e.target.value) < 20 
                    ? 20 
                    : parseInt(e.target.value),
                    })
                }
                />
            <button type="button" onClick={realizarCotizacion}>Cotizar</button>
        </form>

        {precio != 0 && (
        <> 
            <p>El precio estimado es ${precio.toFixed(2)}</p>
            <form onSubmit={(e) => e.preventDefault()}>
                <button type="button" onClick={guardar}>Guardar</button>
            </form>
        </>
        )}
    </>
    );    
};

export default Cotizador;

