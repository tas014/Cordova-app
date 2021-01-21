document.addEventListener("deviceready", onDeviceReady, false);
var tm;
var iWasHere=null;
var users=[];
var currentProfile=null;
var secondProfile=null;

function onDeviceReady() {
    document.getElementById("pImage").setAttribute("onclick","takeThePic()");
    document.getElementById("lImage").setAttribute("onclick","uploadImage()");
};

function takeThePic() {
    navigator.camera.getPicture(popCamera,wentWrong, { 
        quality: 30,
        mediaType: Camera.MediaType.PICTURE,
        destinationType: Camera.DestinationType.DATA_URL,
        targetHeight: 100,
        targetWidth: 100,   
        correctOrientation: true,
        allowEdit: false
        
    })
}

function uploadImage() {
    navigator.camera.getPicture(popCamera,wentWrong, { 
        quality: 30,
        mediaType: Camera.MediaType.PICTURE,
        sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: Camera.DestinationType.DATA_URL,
        targetHeight: 100,
        targetWidth: 100,   
        correctOrientation: true,
        allowEdit: false
        
    })
}

function wentWrong(error) {
    console.log('Fallo por el error '+error);
}

function popCamera(data) {
    document.getElementById("leimg").setAttribute("src",'data:image/jpeg;base64,'+data);
}

function verifyUser() {
    let nameholder=document.getElementById("name");
    let nickholder=document.getElementById("nick");
    let imgholder=document.getElementById("leimg");
    if (users==null) {
        users=[];
    };
    if (nameholder.value!="" & nickholder.value!="" & imgholder.src!="img/defaultUser.png") {
        users.push({
            name:nameholder.value,
            nick:nickholder.value,
            profilepic:imgholder.src,
            score1:0,
            score2:0,
            score3:0
        });
        document.getElementById("userCreator").setAttribute("class","nodisplay");
        updateProfiles();
        getUsers();
    } else {
        alert("Todos los campos son requeridos para crear su perfil")
    }
}

function updateProfiles() {
        if (users.length!=0) {
            let profileList=JSON.stringify(users);
            localStorage.setItem("usuarios",profileList);
            let actual=JSON.stringify(currentProfile);
            localStorage.setItem("loggedUser",actual);
            let Sactual=JSON.stringify(secondProfile);
            localStorage.setItem("secondUser",Sactual);
        }
}

function getUsers () {
    users=JSON.parse(localStorage.getItem("usuarios"));
    let holder=document.getElementById("userlist");
    if (users!=null) {
        holder.innerHTML='<div class="theading"><span>Foto</span><span>Nombre</span><span>Apodo</span></div>'
        for (let i=0;i<users.length;i++) {
            holder.innerHTML+='<div id="usuario'+i+'" onclick="select(id)" class="userdiv"><img class="profileIMG"></img><span class="profilename">'+users[i].name+'</span><span class="profilenick">'+users[i].nick+'</span><button class="edit" onclick="edit('+i+')">Editar</button></div>';
            document.querySelector("#usuario"+i+" img").setAttribute("src",''+users[i].profilepic);
        }
    } else {
        holder.innerHTML="<span>No existen usuarios, sé el primero en crear uno!</span>"
    }
}

function select(id) {
    document.getElementById(id).style.backgroundColor="lightgreen";
    if (localStorage.getItem("instructions")==null){
        currentProfile=users[parseInt(id.substr(7,id.length-6))];
    } else {
        secondProfile=users[parseInt(id.substr(7,id.length-6))];
    };
    updateProfiles();
    tm=setTimeout(function(){
            window.location.replace(giveOrigin())
    },1000)
}

function giveOrigin() {
    let origin=localStorage.getItem("origin");
    if (origin!=null){
        return "index.html"
    } else {
        return "index.html"
    }
}

function edit(num) {
    let id=num+"";
    id="usuario"+id;
    setTimeout(function(){
        clearTimeout(tm);
        document.getElementById(id).style.backgroundColor="cyan";
    },200);
    createUser();
    document.getElementById("confirmer").setAttribute("onclick","modifyUser("+num+")");
    document.getElementById("name").value=users[num].name;
    document.getElementById("nick").value=users[num].nick;
    document.getElementById("leimg").src=users[num].profilepic;
    
}

function modifyUser (num) {

    let nameholder=document.getElementById("name");
    let nickholder=document.getElementById("nick");
    let imgholder=document.getElementById("leimg");
    if (users!=null) {
        if (nameholder.value!="" & nickholder.value!="") {
        users[num].name=nameholder.value;
        users[num].nick=nickholder.value;
        users[num].profilepic=imgholder.src;
        document.getElementById("confirmer").setAttribute("onclick","verifyUser()");
        document.getElementById("userCreator").setAttribute("class","nodisplay");
        updateProfiles();
        getUsers();
        } else {
            alert("Todos los campos son requeridos para crear su perfil")
        }
    } 
}

function createUser() {
    document.getElementById("userCreator").setAttribute("class","creator vertiflex justifycenter aligncenter");
}

function endme() {
    document.getElementById("userCreator").setAttribute("class","nodisplay")
}

function confirmReset() {
    document.getElementById("reseter").setAttribute("class","creator")
}

function cancelReset() {
    document.getElementById("reseter").setAttribute("class","nodisplay")
}

function resetusers () {
    users=[];
    currentProfile=null;
    secondProfile=null;

    localStorage.setItem("usuarios",null);
    localStorage.setItem("loggedUser",null);
    localStorage.setItem("secondUser",null);
    localStorage.setItem("tableroTTT",null);
    localStorage.setItem("TicTacStart",null);
    document.getElementById("reseter").setAttribute("class","nodisplay");
    getUsers();
    alert("usuarios eliminados");
}

getUsers();