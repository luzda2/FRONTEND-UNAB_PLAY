const app=Vue.createApp({
    data(){
        return{
            categoria:"",
            evento:"",
            equipolocal:"",
            equipovisitante:"",
            marcador:"",
            partidos:[],
            buscaCategoria:"",
            buscaEquipo:"",
            buscaEvento:"",
            partido:{}
        }
    },
    
    methods:{
        guardarPartido(){
            const endpoint="http://localhost:8080/partido/guardar/";
            const opciones={
                method:"POST",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({
                    categoria:this.categoria,
                    evento:this.evento,
                    equipolocal:this.equipolocal,
                    equipovisitante:this.equipovisitante,
                    marcador:this.marcador
                })
            };

            fetch(endpoint,opciones).then(async response=>{

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Partido Guardado',
                    showConfirmButton: false,
                    timer: 2500
                  });
                this.categoria="";
                this.evento="";
                this.equipolocal="";
                this.equipovisitante="";
                this.marcador=""
            })
            
        },
        buscarxcategoria(){
            const endpoint="http://localhost:8080/partido/buscarpartidoxcategoria/"+this.buscaCategoria;
            const opciones={method:"GET"};

            fetch(endpoint,opciones).then(async response=>{
                this.partido=await response.json();
            })

        },
        buscarxevento(){
            const endpoint="http://localhost:8080/partido/buscarpartidoxevento/"+this.buscaEvento;
            const opciones={method:"GET"};

            fetch(endpoint,opciones).then(async response=>{
                this.partido=await response.json();
            })

        },
        buscarxequipo(){
            const endpoint="http://localhost:8080/partido/buscarpartidoxequipo/"+this.buscaEquipo;
            const opciones={method:"GET"};

            fetch(endpoint,opciones).then(async response=>{
                this.partido=await response.json();
            })

        }        
    }
});
app.mount("#aplicacion");
