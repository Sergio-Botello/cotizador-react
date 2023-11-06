import useCotizador from "../hooks/useCotizador";

const Opciones = ({ datos, label, tipo }) => {
    const { elementos, setElementos } = useCotizador()    
    return ( 
        <>
            <label htmlFor={tipo}>{label}</label>
            <select 
            name={tipo}
            id={tipo} 
            defaultValue={0}
            onChange={(e) => setElementos({
                ...elementos,
                [label]:e.target.options[e.target.selectedIndex].text,
                [tipo]: isNaN( parseFloat (e.target.value)) 
                ? 0 
                : parseFloat (e.target.value),
                })
            }
            >
                <option disabled value={0}>
                Seleccione una opción...
                </option>
                {datos.map((elemento, indice) => (
                    <option key={indice} value={elemento.factor}>{elemento.tipo}</option>
                ))}
            </select>
        </>
    );
}
 
export default Opciones;