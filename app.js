document.getElementById('formTask').addEventListener('submit', saveTask);
//console.log(document.getElementById('formTask'));

function saveTask(e){
    
    
    //creamos una variable con let
    let title= document.getElementById('title').value;
    let description= document.getElementById('description').value;
    //console.log(title, description);

    //vamos a crear una variable objeto con 2 valores
    let task = {
        //versiones mas modernas de javascript
        title: title,  //title,
        description: description //description
    };
    //console.log(task);

    //vamos a almacenar datos en el navegador con localStorage

    //localStorage.setItem('tasks', task); //el primer argumento el nombre qu queremos y el segundo el objeto de task
    //tenemos que convertirlo a un string sino se almacena como objetc
    //con JSON.stringify() funcion del navegador convertirmos un objeto en un string
    //localStorage.setItem('tasks', JSON.stringify(task));
    //para obtener este evento, ademas tenemos que convertirlo a objet con JSON.parse()
    // console.log(JSON.parse(localStorage.getItem('tasks')));

    if(localStorage.getItem('tasks') === null){
        let tasks = []; //tenemos este arreglo y lo llenamos con push
        tasks.push(task);
        localStorage.setItem('tasks' , JSON.stringify(tasks));

    } else {
        //si tenemos una tarea que se llama asi, la obtenemos y la actualizamos y la registramos
        
        let tasks = JSON.parse(localStorage.getItem('tasks'));
    
        tasks.push(task); //me daba error porque task no estaba como variable sino como constante
       
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    //vamos a resetear el formulario
    document.getElementById('formTask').reset();

    //ejecutamos el metodo de ver las tareas cada vez que añadimos una
    getTasks();

    //para que no se refresque la pagina
    e.preventDefault();
}

function getTasks() {
    //hacemos una consulta a localStorage y cuando los tengamos los mostramos por pantalla
    let tasks= JSON.parse(localStorage.getItem('tasks'));
    //lo vamos a mostrar en el div llamado task
    let tasksView = document.getElementById('tasks');

    //limpiamos por si tiene algun dato el div    
    tasksView.innerHTML = '';
    //vamos a recorrer el array de tasks 
   
    for(let i = 0; i< tasks.length ; i++){
        let title = tasks[i].title;
        let description = tasks[i].description;
       //mb-3 margen de 3
        tasksView.innerHTML +=`
            <div class="card mb-3"> 
                <div class="card-body">
                   <p> ${title} - ${description} </p>
                   <a class="btn btn-danger" onclick="deleteTask('${title}')">Delete</a>
                </div>
            </div>    
        `;
       // console.log(description,title);
    }

}

function deleteTask(title){
    //le pasamos un titulo y lo borramos
    
    //cogemos todas las tareas para coger el titulo
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    
    for(let i=0; i<tasks.length; i++){
        if(tasks[i].title == title) {//== es igual === es exactamente igual
           //splice quita un dato al arreglo, tenemos que decirle uen que indice y los datos que tiene que quitar 1
            tasks.splice(i,1);
        }
        
    }
    //ahora tenemos que volver a almacenar esos datos con ese dato quitado
    localStorage.setItem('tasks',JSON.stringify(tasks));
    //queremos que vuelva a ejecutar la funcion gettask
    getTasks();
}

getTasks();