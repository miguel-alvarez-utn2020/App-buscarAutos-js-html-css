//variables
const year = document.querySelector('#year');
const marca = document.querySelector('#marca');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');
const resultado = document.querySelector('#resultado');


const maxYear = new Date().getFullYear();
const minYear = maxYear - 10;

//generar un objeto con la busqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}
//event listener para los select
marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;

    filtrarAuto();
});
year.addEventListener('change', e => {
    datosBusqueda.year = parseInt(e.target.value);

    filtrarAuto();
});
minimo.addEventListener('change', e => {
    datosBusqueda.minimo = parseInt(e.target.value);

    filtrarAuto();
});
maximo.addEventListener('change', e => {
    datosBusqueda.maximo = parseInt(e.target.value);

    filtrarAuto();
});
puertas.addEventListener('change', e => {
    datosBusqueda.puertas = parseInt(e.target.value);

    filtrarAuto();
});
transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;
    
    filtrarAuto();
});
color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;

    filtrarAuto();
});

//eventos
document.addEventListener('DOMContentLoaded', ( ) =>{
    mostrarAutos(autos);

    //llenar las opciones de año
    llenarSelect();

    
})

//Funciones
function mostrarAutos(autos){

    limpiarHTML();//elimina el html previo

    autos.forEach( (auto) => {
        const autoHTML = document.createElement('p');
        const {marca, modelo, year, precio, puertas, color, transmision} = auto;
        autoHTML.textContent = `
            ${marca} - modelo: ${modelo} - Año: ${year} - precio: ${precio} - puertas: ${puertas} - color: ${color} - ${transmision}
        `;


        resultado.appendChild(autoHTML);
    } )
}
//limpiar HTML 
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}


//Genera los años del select
function llenarSelect(){

    for( let i = maxYear; i >= minYear; i--){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);
    }

}

//filta la base de busqueda
function filtrarAuto(){
    const resultado = autos.filter( filtrarMarca ).filter( filtrarYear )
                    .filter( filtrarMinimo ).filter( filtrarMaximo )
                    .filter( filtrarPuertas ).filter( filtrarTransmision ).filter( filtrarColor );

    // console.log(resultado);

    if(resultado.length){
        mostrarAutos(resultado);
    }else{
        noResultado();
        console.log('no hay resultados');
    }

}

function filtrarMarca( auto ) {
    const { marca } = datosBusqueda;
    if( marca ) {
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear(auto){
    const { year } = datosBusqueda;
    if( year ) {
        return auto.year === year;
    }
    return auto;
}

function filtrarMinimo(auto){
    const { minimo } = datosBusqueda;
    if( minimo ) {
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo(auto){
    const { maximo } = datosBusqueda;
    if( maximo ) {
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarPuertas(auto){
    const { puertas } = datosBusqueda;
    if( puertas ) {
        return auto.puertas === puertas;
    }
    return auto;
}

function filtrarTransmision(auto){
    const { transmision } = datosBusqueda;
    if( transmision ) {
        return auto.transmision === transmision;
    }
    return auto;
}

function filtrarColor(auto){
    const { color } = datosBusqueda;
    if( color ) {
        return auto.color === color;
    }
    return auto;
}

function noResultado(){
    limpiarHTML();
    const parrafo = document.createElement('div');
    parrafo.textContent = 'No se encontraron resultados';
    parrafo.classList.add('parrafo-rojo');
    resultado.appendChild(parrafo);

}