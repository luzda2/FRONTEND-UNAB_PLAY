const app=Vue.createApp({
    data(){
        return{
            menu:0,
        }
    },
    methods:{}

})

app.component("registrar-partidos",{
    deta(){
        return{
            idPartido:"",
            categoria:"",
            evento:"",
            equipolocal:"",
            equipovisitante:"",
            marcador:"",   
        }
    },

    template:`
    <div>
    <h3>REGISTRAR PARTIDO</h3>
    <form v-on:submit.prevent="guardarPartido">
        <table>
            <tr>
                <td><label>Id Partido</label></td>
                <td><input type="text" v-model="idPartido"></td>
            </tr>
            <tr>
                <td><label>Categoria</label></td>
                <td><input type="text" v-model="categoria"></td>
            </tr>
            <tr>
                <td><label>Evento</label></td>
                <td><input type="text" v-model="evento"></td>
            </tr>
            <tr>
                <td><label>Equipolocal</label></td>
                <td><input type="text" v-model="equipolocal"></td>
            </tr>
            <tr>
                <td><label>Equipovisitante</label></td>
                <td><input type="text" v-model="equipovisitante"></td>
            </tr>
            <tr>
                <td><label>Marcador</label></td>
                <td><input type="text" v-model="marcador"></td>
            </tr>
        </table>
        <input type="submit" class="btn btn-primary" value="Guardar Partido">
    </form>
    
    </div>`,

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

    },

});

app.component("ver-partidos",{
    data(){
        return{
            partidos:[],
            categoriaBuscar:"",
            eventoBuscar:"",
            equipoBuscar:""
        };
    },

    template:`
    <div>
    <h3>CONSULTAR PARTIDO</h3>
        <hr>
        <input class="btn btn-primary" value="VER PARTIDOS" v-on:click="verPartidos">
        <h3>FILTROS</h3>
        <label>Categoria</label><input type="text" v-model="categoriaBuscar">
        <input type="button" class="btn btn-primary" value="BUSCAR" v-on:click="buscarxcategoria"><br>
        <label>Evento</label><input type="text" v-model="eventoBuscar">
        <input type="button" class="btn btn-primary" value="BUSCAR" v-on:click="buscarxevento"><br>
        <label>Equipo</label><input type="text" v-model="equipoBuscar">
        <input type="button" class="btn btn-primary" value="BUSCAR" v-on:click="buscarxequipo"><br> 
        <table class="table table-striped">
            <thead>
                <th>Id Partido</th>
                <th>Categoria</th>
                <th>Evento</th>
                <th>Equipo 1</th>
                <th>Equipo 2</th>
                <th>Marcador</th>
            </thead>
            <tbody>
                <tr v-for="partido in partidos">
                    <td>{{partido.id}}</td>
                    <td>{{partido.categoria}}</td>
                    <td>{{partido.evento}}</td>
                    <td>{{partido.equipolocal}}</td>
                    <td>{{partido.equipovisitante}}</td>
                    <td>{{partido.marcador}}</td>
                </tr>

            </tbody>
        </table>  
    </div>`,

    methods:{

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