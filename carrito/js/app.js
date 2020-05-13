// Variables
const carrito= document.getElementById('carrito');
const cursos= document.getElementById('lista-cursos');
const listaCursos= document.querySelector('#lista-carrito tbody');
const vaciarCarritoBTN= document.getElementById('vaciar-carrito');

// Listeners
cargarEventListeners();

function cargarEventListeners(){
    // Dispara cuando se presiona "Agregar Carrito"
    cursos.addEventListener('click', comprarCurso);

    // Cuando se elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Al vaciar el carrito
    vaciarCarritoBTN.addEventListener('click',vaciarCarrito);

    // Al cargar el documento, mostrar LocalStorage
    document.addEventListener('DOMContentLoaded',leerLocalStorage);

}




// Funciones
// Funcion que añade el curso al carrito
function comprarCurso(e){
   e.preventDefault();
   // Delegation para agregar carrito
   if(e.target.classList.contains('agregar-carrito')){
    const curso= e.target.parentElement.parentElement;
    // Enviamos el curso seleccionado para tomar sus datos
    leerDatosCurso(curso);
   }
}

// Lee los datos del curso

function leerDatosCurso(curso){
const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id')
}

    insetarCarrito(infoCurso);

}

// Muestra el curso seleccionado en el carrito

function insetarCarrito(curso){
    const row= document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width=100>
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    `;
    listaCursos.appendChild(row);
    guardarCarritoLocalStorage(curso);

}
// Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
    e.preventDefault();

    let curso, 
        cursoId;
    if(e.target.classList.contains('borrar-curso')){
        e.target.parentElement.parentElement.remove();
        curso=e.target.parentElement.parentElement;
        cursoId=curso.querySelector('a').getAttribute('data-id');

    }
    eliminarCursoLocalStorage(cursoId);
}
// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
    // Forma lenta
  //  listaCursos.innerHTML=""
    // Forma rápida y recomendada
    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
    }
    

    // Vaciar Local Storage
    vaciarLocalStorage();

    return false;
}


// Almacena cursos en el carrito a Local Storage

function guardarCarritoLocalStorage(curso){
    let cursos;
    // toma el valor de un arreglo con datos del LS o vacio
    cursos= obtenerCursosLocalStorage();
    
    // el curso seleccionado se agrega al array
    cursos.push(curso);

    localStorage.setItem('cursos',JSON.stringify(cursos));
}

// Comprueba que haya elementos en Local Storage
function obtenerCursosLocalStorage(){
let cursosLS;

// comprobamos si hay algo en LocalStorage
if(localStorage.getItem('cursos')=== null){
    cursosLS=[];
} else {
    cursosLS= JSON.parse(localStorage.getItem('cursos'));
}
return cursosLS;
}

// Imprime los cursos de Local Storage en el carrito

function leerLocalStorage(){
    let cursosLS;

    cursosLS= obtenerCursosLocalStorage();

    cursosLS.forEach(function(curso){
        // construir el template
        const row= document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width=100>
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    `;
    listaCursos.appendChild(row);
    });
}

// Elimina el curso por el ID en Local Storage

function eliminarCursoLocalStorage(curso){
    let cursosLS;
    // Obtenemos el array de cursos
    cursosLS= obtenerCursosLocalStorage();
    // Iteramos comparando el id del curso borrado con los del LS
    cursosLS.forEach(function(cursoLS,index){
        if(cursoLS.id === curso) {
            cursosLS.splice(index,1);
        }
    });
    // Añadimos el array actual a Storage
    localStorage.setItem('cursos', JSON.stringify(cursosLS));
}

// Elimina todos los cursos de Local Storage

function vaciarLocalStorage(){
    localStorage.clear();
}