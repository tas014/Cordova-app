//adb devices;  => 
var users=[];
var currentProfile=null;
var secondProfile=null;

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

function getProfiles() {
    let userList=JSON.parse(localStorage.getItem("usuarios"));
    if (userList!=null) {
        let actualProfile=JSON.parse(localStorage.getItem("loggedUser"));
        users=userList;
        currentProfile=actualProfile;
            if (users.length>1) {
                secondProfile=JSON.parse(localStorage.getItem("secondUser"))
            }
        }
}

function goProfile() {
    window.location.replace("profiles.html")
}

function playTicTacToe() {
    if (Valid()) {
        window.location.replace("tictactoe/index.html")
    } else {
        window.location.replace("profiles.html")
    }
}

function playMemotest() {
    if (Valid()) {
        window.location.replace("memotest/index.html")
    } else {
        window.location.replace("profiles.html")
    }
}

function playChess() {
    if (Valid()) {
        window.location.replace("chess/index.html")
    } else {
        window.location.replace("profiles.html")
    }
}

function Valid() {
    if (users!=null & users.length>1) {
        return true
        } else {
            return false
    }
}

function loadCurrentProfile () {
    document.getElementById("currentProfile").innerHTML='<img alt="imagen de '+currentProfile.nick+'" class="currentimg" src="'+currentProfile.profilepic+'"><span class="currentnick">'+currentProfile.nick+'</span>';
}

function loadLeaderboard () {
    let posholder=[];
    for (let i=0;i<users.length;i++) {
        posholder.push(users[i]);
    }
    posholder.sort(function (a,b) {
        let first=a.score1+a.score2+a.score3;
        let second=b.score1+b.score2+b.score3;
        if (second>first) {return 1};
        if (first>second) {return -1};
        return 0;
    });
    let elemen=document.getElementById("leaderboard");
    for (let i=0;i<users.length;i++) {
        elemen.innerHTML+='<tr class="leaderboarditem"><td><img class="leaderboardimage" alt="imagen de '+posholder[i].nick+'" src="'+posholder[i].profilepic+'"></td><td class="leaderboardnick">'+posholder[i].nick+'</td><td class="leaderboardscore">'+(posholder[i].score1*50+users[i].score2+posholder[i].score3)+'</td></tr>'
    }
}

function startup () {
    getProfiles();
    if (users!=null & users.length>0) {
        loadCurrentProfile();
        loadLeaderboard();
    }
}

startup();