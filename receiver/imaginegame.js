var mycontainer;
var mycanvas;
var mycontext;
var mycanvas2;
var mycontext2;
var myImages = {};
var modeOmbreChinoise = 0;
var phone_gameAreaSize = [1024,760];
var cast_gameAreaSize = [1024,760];
var cast_divers_droiteAreaSize = [1024,760];
var img_phoneSize = 100;
var ratio_img = img_phoneSize/512;
const numImages = 41;
var timerTest = Date.now();
var dateTemp = Date.now();
var i_display = 1;
var intervalSend = undefined;

var datestart= Date.now();


var buibuiGlobal =0 ;
// var origin = 0 ; // origine en haut à gauche du canevas pour les translations
var origin = 1 ; // origine au centre du canevas pour les translations


function newImagineBoard() {
    // window.location.reload(true);
    
    if (document.body)
        {
        var larg = window.innerWidth;
        console.log("larg",larg);
        var haut = window.innerHeight;
        console.log("haut",haut);
        cast_gameAreaSize = [haut, Math.round(phone_gameAreaSize[1]*haut/phone_gameAreaSize[0])];
        cast_divers_droiteAreaSize = [haut, Math.round(window.innerWidth-cast_gameAreaSize[1])];

        var temps9 = window.devicePixelRatio; 
        var temps1 = window.innerHeight; 
        var temps2 = window.innerWidth;
        var temps3 = window.availHeight;
        var temps4 = window.availWidth;  
        var temps5 = screen.height; 
        var temps6 = screen.width;
        var temps7 = screen.availHeight;
        var temps8 = screen.availWidth;

        // document.getElementById('display_score').innerHTML = document.getElementById('display_score').innerHTML + '<br>' + ' screen.width = ' + screen.width;
        // document.getElementById('display_score').innerHTML = document.getElementById('display_score').innerHTML + '<br>' + ' screen.height = ' + screen.height;
        // document.getElementById('display_score').innerHTML = document.getElementById('display_score').innerHTML + '<br>' + ' document.querySelector(html).clientWidth = ' + document.querySelector('html').clientWidth;
        // document.getElementById('display_score').innerHTML = document.getElementById('display_score').innerHTML + '<br>' + ' document.querySelector(html).clientHeight = ' + document.querySelector('html').clientHeight;
        // document.getElementById('display_score').innerHTML = document.getElementById('display_score').innerHTML + '<br>' + ' window.innerWidth = ' + window.innerWidth;
        // document.getElementById('display_score').innerHTML = document.getElementById('display_score').innerHTML + '<br>' + ' window.innerHeight = ' + window.innerHeight;
        // document.getElementById('display_score').innerHTML = document.getElementById('display_score').innerHTML + '<br>' + ' screen.availWidth = ' + screen.availWidth;
        // document.getElementById('display_score').innerHTML = document.getElementById('display_score').innerHTML + '<br>' + ' screen.availHeight = ' + screen.availHeight;
        // document.getElementById('display_score').innerHTML = document.getElementById('display_score').innerHTML + '<br>' + ' window.devicePixelRatio = ' + window.devicePixelRatio;

        

        }
    console.log("cast_gameAreaSize = ",cast_gameAreaSize);
    console.log("cast_divers_droiteAreaSize = ",cast_divers_droiteAreaSize);

    document.getElementById('imagineBoard').remove();
    document.getElementById('imagineBoard-container').style.width = cast_gameAreaSize[1]+"px";
    document.getElementById('imagineBoard-container').style.height = cast_gameAreaSize[0]+"px";
    document.getElementById('divers_droite').style.width = cast_divers_droiteAreaSize[1]+"px";
    document.getElementById('divers_droite').style.height = cast_divers_droiteAreaSize[0]+"px";
    
    document.getElementById('imagineBoard-container').innerHTML = "<canvas id='imagineBoard' style='width:100%;height: 100%;'></canvas>";
    mycanvas = document.getElementById('imagineBoard');
    console.log('Mise à jour de la taille de l ecran')
    mycanvas.width=phone_gameAreaSize[1];
    mycanvas.height=phone_gameAreaSize[0];
    mycontext = mycanvas.getContext('2d');
    if(modeOmbreChinoise ==1){
        mycontext.filter="brightness(0%)";
    }
    mycontext.font = "bold 20px sans-serif";
    
    //Chargement du tableau de toutes les images
    var loadedImages = 0;
    
    for (var i=0; i<numImages; i++) { 
        myImages[i] = new Image();
        myImages[i].src = 'img/'+i+'.png';
        // myImages[current_image_id].style="filter: brightness(0.4);"
        // myImages[i].width = '50px';
        // myImages[i].height = '50px';
        myImages[i].id = i;
        // myImages[i].onload = function() {
        //     if(++loadedImages >= numImages) {
        //         displayImages(myData, mySenderId);
        //     }
        // }
    }   

    setInterval(() => {
        displayTimer();
    }, 5000);
       
}




function log_test(msg) {
    if (true) {
        var debug = document.getElementById('debug');
        var tmpHTML = debug.innerHTML;
        debug.innerHTML = '';
        debug.innerHTML = msg + '<br/>' + tmpHTML;
    }
}

function generateMessageNicho(data){
    switch (data) {
        // Protocole:
        // 1er champ = type de message (I_full = image, I_delta = move, S = score, C = chat, T = timer)
        // Pour les images I    
        // Séparateur d'images: "|"
            // Sous-séparateur de champs: ":"
            // 0ème champ: Instance de la carte de 0 à n
            // 1er champ: Numéro d'image (lié au nom du fichier .png)
            // 2nd champ: Coordonnées X du centre de l'image par rapport à l'origine du canvas (en haut à gauche / ou au milieu de l'image en fonction du paramètre origin)
            // 3ème champ: Coordonnées Y du centre de l'image par rapport à l'origine du canvas (en haut à gauche / ou au milieu de l'image en fonction du paramètre origin)
            // 4ème champ: Scale X - nombre entier en pourcentage
            // 5ème champ: Scale Y - nombre entier en pourcentage
            // 6ème champ: Rotation - en degré dans le sens horaire
            
            // 7ème champ : xRotate - flip horizontal (1= no flip, -1 = flip)
            // 8ème champ : yRotate - flip vertical (1= no flip, -1 = flip)
            // Nota : pas de zindex car les images sont envoyées dans l'ordre i.e. la 1ère image est celle affichée au premier plan

        // Pour le Display D  
            // 1er champ: résolution du téléphone hauteur:largeur en nombre de pixels x10
            // 2ème champ : 1 pour mode "Ombre chinoise", 0 sinon 

        case 'left':
          console.log('Direction = gauche');
        //   var intervalID = window.setInterval(handleMessage, 20, 'I|16:0:0:100:100:0:1:1|25:375:375:20:20:45:1:1|13:375:175:50:50:75:-1:1', 'Nicho_Id');

        //   var timerintervalID = window.setInterval(handleMessage, 100, 'T|05:49', 'Nicho_Id');
        handleMessage('D|5300:3600|1', 'Nicho_Id');
        handleMessage('S|nicho:2|buibui:7|tonio:-2|guigui:11|nicho2:11|buibui2buibui2buibui2buibui2buibui2buibui2:7|tonio2:0|guigui2:110|buibui:7|tonio:-2|guigui:11|nicho2:11|buibui2:7|tonio2:0|guigui2:110');
        // handleMessage('S|nicho:20000|buibuibuibuibuibuibuibuibuibui:7');
        
        handleMessage('T|04:32|#FF0000', 'Nicho_Id');
        handleMessage('C|expression', 'Nicho_Id');
        
        
        
        // await delay(1000);
        // handleMessage('T|05:49', 'Nicho_Id');
        // handleMessage('P|Nicho&Tonio', 'Nicho_Id');
        
        // setTimeout(() => {
        //     handleMessage('I|1:0:0:200:200:0:1:1|2:90:132:100:100:60:1:1|3:-90:-100:50:50:-75:-1:1', 'Nicho_Id');
        // }, 200); 

        let i = 1;
        let refreshPeriod = 100;
        intervalSend = setTimeout(function run() {
          let messageTest = 'I|1:0:0:200:200:0:1:1|2:90:132:100:100:60:1:1|3:-90:-100:50:50:-75:-1:1';
            // if(i%1==0){
            //     // console.log('timerTest Avant',timerTest);
            //     timerTest = Date.now()-dateTemp;
            //     dateTemp=Date.now();
            //     // console.log('timerTest Après',timerTest);
            //     console.log("i = ",i," messageTest = ",messageTest, "timerTest =", timerTest);
            // }
            i++;
            messageTest = 'I|14:'+Math.round(-0.2*i)+':'+Math.round(-0.1*i)+':200:200:0:1:1|2:90:132:'+(100+i)+':'+(100+i)+':60:1:1|3:-90:-100:50:50:'+i+':-1:1';
            // console.log("i = ",i," messageTest = ",messageTest, "timerTest =", timerTest);
          handleMessage(messageTest,'Nicho_Id');
            // handleMessage('I|1:0:0:200:200:0:1:1|2:90:132:100:100:60:1:1', 'Nicho_Id');
            // handleMessage('I', 'Nicho_Id');

          intervalSend = setTimeout(run, refreshPeriod);
        }, refreshPeriod);
        
        //   handleMessage('I|18:275:375:100:100:-30:1:1|24:375:375:100:100:45:1:1','Nicho_Id')
        //   if (leftGlobal<300)
          {
            // window.requestAnimationFrame(handleMessage(leftGlobal));
          }

          break;
        case 'right':
            console.log('Direction = droite');
            if(intervalSend!=undefined){
                console.log("Arret de l'envoi périodique des castMessage");
                clearInterval(intervalSend);	//Permet de supprimer la commande régulière de createCastMessage
              }
            break;
        case 'up':
            console.log('Direction = haut');
            break;
        case 'down' :
            console.log('Direction = bas');
            break;
        default:
          console.log(`Sorry, we are out of ${data}.`);
      }
}


function handleMessage(myData, mySenderId) {


    // var tableau_parametres_images = myData.split("|");
    // console.log("myData[0]",myData[0]);
    // document.getElementById('log_nicho').innerHTML += Date.now()+'\n';
    
    var timeElapsed = Date.now();
    var today = new Date(timeElapsed);
    // document.getElementById('div_timer').innerHTML = document.getElementById('div_timer').innerHTML+'<br/>'+today.toISOString();
    
    switch (myData[0]) {
        case 'I' :
            // console.log('myData = ',myData);
            displayImages(myData, mySenderId);
            // //Affichage des logs à la place du timer
            // i_display++;
            // let modulo=2;
            // console.log("i_display=",i_display);
            // if(i_display%modulo==0){
            //     timerTest = Date.now()-dateTemp;
            //     dateTemp=Date.now();
            //     let dateTemp2 = new Date;
            //     let dateTempFormated = String(dateTemp2.getHours()).padStart(2,'0') + ":" + String(dateTemp2.getMinutes()).padStart(2,'0') + ":" + String(dateTemp2.getSeconds()).padStart(2,'0');
            //     document.getElementById('div_timer').innerHTML = 'last I message date : '+ dateTempFormated + '<br>' +  'last I message raw date : '+ dateTemp +'<br>'+ 'delay between ' + modulo + ' I messages = ' + timerTest +'<br>'+ 'last I message received = ' + myData.substring(0,50) + '...';
            // }
            break;
        case 'T' :
            displayTimer(myData, mySenderId);
            break;
        case 'C' :
            displayClue(myData, mySenderId);
            break;
        case 'D' :
            updateGameAreaSize(myData, mySenderId);
            break;
        case 'S' :
            updateScorePlayer(myData, mySenderId);
            break;
        default :
            console.log('Undefined message received '+myData);
    }
    // document.getElementById('log_nicho').innerHTML += Date.now()+'\n';
    
};

function truncate(str, n){
    return (str.length > n) ? str.substr(0, n-1) + '&hellip;' : str;
  };

function updateScorePlayer(myData, mySenderId){
    var tableau_player = [];
    var tableau_player_temp = myData.split("|");
    var max_number_of_player_to_display = 12;
    var fontSizeMin = 8;
    var fontSizeMax = 70;
    // var temp1 = document.getElementById("display_player");
    // var temp2 = document.getElementById("display_player").style.height;
    // var temp3 = document.getElementById("display_player").clientHeight;
    var fontSizeOfTableScore = Math.min(fontSizeMax,Math.max(fontSizeMin,0.9*(document.getElementById("display_player").clientHeight-16)/(Math.min(tableau_player_temp.length,max_number_of_player_to_display+2))-16));
    var tableauHTMLplayer = "<table class=tabledecentrage><tr><td><table class=tablescores style='font-size:"+ fontSizeOfTableScore +"px;'>";

    //tableau_player est un tableau d'objets "player", chaque objet a trois propriétés : name, score, isStacker

    for (var i=1; i<tableau_player_temp.length; i++) { 
        var current_player_parameters = tableau_player_temp[i].split(":");
        tableau_player.push({name:current_player_parameters[0],score:current_player_parameters[1],isStacker:(i==1)});
    }

    tableau_player.sort(function compare(a, b) {
        if (1*a.score < 1*b.score)
           return 1;
        if (1*a.score > 1*b.score)
           return -1;
        if (1*a.score == 1*b.score)
          {
            if (a.name < b.name)
              return -1;
            if (a.name > b.name)
              return 1;
          }
        return 0;
    })
        
    for (var i=0; i<Math.min(max_number_of_player_to_display,tableau_player.length); i++) { 
        if (tableau_player[i].isStacker)
        {
                tableauHTMLplayer = tableauHTMLplayer + "<tr class=rowstacker><td class=colstacker><img src=./img/toque.png height="+ fontSizeOfTableScore+"width="+fontSizeOfTableScore+"></img></td>";
        }
        else {
            tableauHTMLplayer = tableauHTMLplayer + "<tr class=rowpasstacker><td class=colstacker>&nbsp;</td>";
        }
                
        tableauHTMLplayer = tableauHTMLplayer + "<td class=colnames>"+ truncate(tableau_player[i].name,16) + "</td><td class=columnscore>"+ tableau_player[i].score + "</td></tr>";
    }
    if (max_number_of_player_to_display<tableau_player.length)
    {
        tableauHTMLplayer = tableauHTMLplayer + "<tr class=rowpasstacker><td></td><td class=colnames>&hellip;</td></tr>";
    }
    
    tableauHTMLplayer = tableauHTMLplayer+"</table></td></tr></table>";
    
    document.getElementById('display_player').innerHTML = tableauHTMLplayer;
}

function updateGameAreaSize(myData, mySenderId) {
    var tableau_gameAreaSize = myData.split("|");
    var temp_phone_gameAreaSize;
    console.log('traitement nouveau message D=Display du téléphone :',myData)
    temp_phone_gameAreaSize = tableau_gameAreaSize[1].split(":");
    console.log("phone_gameAreaSize",phone_gameAreaSize);
    
    if((0.1*temp_phone_gameAreaSize[0]!=phone_gameAreaSize[0])||(0.1*temp_phone_gameAreaSize[1]!=phone_gameAreaSize[1])) {
        console.log('mie à jour variable phone_gameAreaSize');
        phone_gameAreaSize[0] = 0.1*temp_phone_gameAreaSize[0];
        phone_gameAreaSize[1] = 0.1*temp_phone_gameAreaSize[1];
        console.log("phone_gameAreaSize = ",phone_gameAreaSize);
        newImagineBoard();
    }

    if(tableau_gameAreaSize[2]==1){
        modeOmbreChinoise = 1;
    }
    
}

function displayTimer(myData, mySenderId) {
    var tableau_timer = myData.split("|");

    // var d = new Date();
    // var hours = String(d.getHours()).padStart(2,'0') + ":" + String(d.getMinutes()).padStart(2,'0') + ":" + String(d.getSeconds()).padStart(2,'0');
    // console.log(hours);
    // document.getElementById('div_timer').innerHTML = 'Update heure du receiver = ' + hours + '<br>' + document.getElementById('div_timer').innerHTML;

    document.getElementById('div_timer').innerHTML = "<font style='color:"+tableau_timer[2]+";'>" + tableau_timer[1]+"</font>";
    
}

function displayClue(myData, mySenderId) {
    var tableau_clue = myData.split("|");
    var fontSizeMin = 8;
    var fontSizeMax = 70;
    var fontSizeOfDisplayClue = Math.min(fontSizeMax,Math.max(fontSizeMin,0.9*(document.getElementById("div_indice").clientHeight-16)));
     
    document.getElementById('div_indice').style.fontSize=fontSizeOfDisplayClue.toString()+"px";
    document.getElementById('div_indice').innerHTML = tableau_clue[1];
    
}

function displayImages(myData, mySenderId) {
    
    // buffer canvas
    mycanvas2 = document.createElement('canvas');
    mycanvas2.width = mycanvas.width;
    mycanvas2.height = mycanvas.height;
    mycontext2 = mycanvas2.getContext('2d');


    var tableau_parametres_images = myData.split("|");
    
    buibuiGlobal = buibuiGlobal + 1;
    buibuiGlobal = 0;

    if (tableau_parametres_images.length==1){
        mycontext.clearRect(0,0, mycanvas.width,mycanvas.height);
    }
    


    for (var i=1; i<tableau_parametres_images.length; i++) { 
        var current_image_parameters = tableau_parametres_images[i].split(":");
        var current_image_id = current_image_parameters[0];
            if (i == 1)
            {
                mycontext2.clearRect(0,0, mycanvas.width,mycanvas.height);
                mycontext2.strokeStyle = 'green';
                // mycontext2.strokeRect(0,0, mycanvas.width,mycanvas.height);
            }
            mycontext2.save();
            // console.log('origin',origin);
            // console.log('current_image_parameters',current_image_parameters)
            // console.log('mycanvas.width',mycanvas.width)
            // console.log('mycanvas.height',mycanvas.height)
            
           if (origin==0)
            {
                // mycontext.translate((1*current_image_parameters[1]+1*buibuiGlobal)%mycanvas.width, current_image_parameters[2]); 
                mycontext2.translate((1*current_image_parameters[1]), (1*current_image_parameters[2])); 
            }
            else if (origin==1) 
            {
                // mycontext.translate((1*current_image_parameters[1]+1*buibuiGlobal)%mycanvas.width + 1*mycanvas.width/2, 1*current_image_parameters[2] + 1*mycanvas.height/2);
                // console.log("translate canvas",(1*current_image_parameters[1]) + 1*mycanvas.width/2, (1*current_image_parameters[2]) + 1*mycanvas.height/2);
                mycontext2.translate((1*current_image_parameters[1]) + 1*mycanvas.width/2, (1*current_image_parameters[2]) + 1*mycanvas.height/2);
            }
            // mycontext.rotate(((buibuiGlobal)*1+(current_image_parameters[5])*1)*(2*Math.PI)/360);
            mycontext2.rotate(((current_image_parameters[5])*1)*(2*Math.PI)/360);
            mycontext2.scale(current_image_parameters[6]*current_image_parameters[3]/100,current_image_parameters[7]*current_image_parameters[4]/100);
            mycontext2.drawImage(myImages[current_image_id], -myImages[current_image_id].width*ratio_img/2, -myImages[current_image_id].height*ratio_img/2, img_phoneSize,img_phoneSize);
            // mycontext.drawImage(myImages[current_image_id], -myImages[current_image_id].width/2, -myImages[current_image_id].height/2);
            mycontext2.restore(); 

            mycontext.clearRect(0,0, mycanvas.width,mycanvas.height);
            // mycontext.strokeRect(0,0, mycanvas.width,mycanvas.height);
            mycontext.drawImage(mycanvas2, 0, 0);
    }   

};

// newImagineBoard();
// generateMessageNicho('left');