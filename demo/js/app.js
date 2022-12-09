const app=Vue.createApp({
    data(){
        return{
            idPartido:"",
            categoria:"",
            evento:"",
            equipolocal:"",
            equipovisitante:"",
            marcador:"",
            partidos:[],
            categoriaBuscar:"",
            eventoBuscar:"",
            equipoBuscar:""
        }
    },

    methods:{
        guardarPartido(){
            const endpoint="http://localhost:8080/partido/guardar";
            const opciones={
                method:"POST",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    idPartido:this.idPartido,
                    categoria:this.categoria,
                    evento:this.evento,
                    equipolocal:this.equipolocal,
                    equipovisitante:this.equipovisitante,
                    marcador:this.marcador
                })
            };

            fetch(endpoint,opciones).then(async Response=>{
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Partido Guardado!',
                    showConfirmButton: false,
                    timer: 2500               
            })

        
            this.idPartido="";
            this.categoria="",
            this.evento="",
            this.equipolocal="",
            this.equipovisitante="",
            this.marcador=""

        })
    },

    verPartidos(){
        const endpoint="http://localhost:8080/partido/consultar";
        const opciones={method:"GET"}

        fetch(endpoint,opciones).then(async Response=>{
            this.partidos=await Response.json();
    
        })
    },

    buscarxcategoria(){
        const endpoint="http://localhost:8080/partido/buscarpartidoxcategoria/"+this.categoriaBuscar;
        const opciones={method:"GET"};

        fetch(endpoint,opciones).then(async Response=>{
            this.partidos=await Response.json();
        })
    },

    buscarxevento(){
        const endpoint="http://localhost:8080/partido/buscarpartidoxevento/"+this.eventoBuscar;
        const opciones={method:"GET"};

        fetch(endpoint,opciones).then(async Response=>{
            this.partidos=await Response.json();
        })
    },

    buscarxequipo(){
        const endpoint="http://localhost:8080/partido/buscarpartidoxequipo/"+this.equipoBuscar;
        const opciones={method:"GET"};

        fetch(endpoint,opciones).then(async Response=>{
            this.partidos=await Response.json();
        })
     }

 }

});
app.mount("#aplicacion");