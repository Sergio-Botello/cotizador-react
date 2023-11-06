
const Valor = (caracteristicas, index) => {
    
    return ( 
        <li>
            <p key={index}>           
                {caracteristicas.fecha}: se realizó la cotización de una propiedad de tipo {caracteristicas.Propiedad} en la ubicación de {caracteristicas.Ubicacion} de {caracteristicas.metrosCuadrados} metros cuadrados, por un costo de ${caracteristicas.cuenta.toFixed(2)}. 
            </p>
            
        </li>
     );
};
 
export default Valor;
