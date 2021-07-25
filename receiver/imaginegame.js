var mycontainer;
var mycanvas;
var mycontext;
var myImages = {};
const numImages = 31;

var datestart= Date.now();
    

var buibuiGlobal =0 ;
// var origin = 0 ; // origine en haut à gauche du canevas pour les translations
var origin = 1 ; // origine au centre du canevas pour les translations


function newImagineBoard() {
    document.getElementById('imagineBoard').remove();
    document.getElementById('imagineBoard-container').innerHTML = "<canvas id='imagineBoard' width='1000' height='1000' style='width:100%;height: 100%;'></canvas>";
    // document.getElementById('imagineBoard-container').innerHTML = "<div id='toto' style = 'position:absolute;'><img src='img/0.svg' /></div>";
    // window.checkDebug();
    mycanvas = document.getElementById('imagineBoard');
    mycontext = mycanvas.getContext('2d');
    mycontext.font = "bold 20px sans-serif";
    // mycontainer = document.getElementById('imagineBoard-container');

    //Chargement du tableau de toutes les images
    var loadedImages = 0;
  
    for (var i=0; i<numImages; i++) { 
        myImages[i] = new Image();
        myImages[i].src = 'img/'+i+'.png';
        myImages[i].id = i;
        // myImages[i].onload = function() {
        //     if(++loadedImages >= numImages) {
        //         displayImages(myData, mySenderId);
        //     }
        // }
    }   
       
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

        case 'left':
          console.log('Direction = gauche');
        //   var intervalID = window.setInterval(handleMessage, 20, 'I|16:0:0:100:100:0:1:1|25:375:375:20:20:45:1:1|13:375:175:50:50:75:-1:1', 'Nicho_Id');

        //   var timerintervalID = window.setInterval(handleMessage, 1, 'T|05:49', 'Nicho_Id');
          handleMessage('I|13:0:0:100:100:0:1:1|25:375:375:20:20:45:1:1|13:375:175:50:50:75:-1:1', 'Nicho_Id');
        //   handleMessage('I|18:275:375:100:100:-30:1:1|24:375:375:100:100:45:1:1','Nicho_Id')
        //   if (leftGlobal<300)
          {
            // window.requestAnimationFrame(handleMessage(leftGlobal));
          }

          break;
        case 'right':
            console.log('Direction = droite');
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
    switch (myData[0]) {
        case 'I' :
            displayImages(myData, mySenderId);
            break;
        case 'T' :
            displayTimer(myData, mySenderId);
            break;
        default :
            console.log('Undefined message received '+myData);
    }
    
};

function displayTimer(myData, mySenderId) {
    var tableau_timer = myData.split("|");

    var d = new Date();
    var hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    console.log(hours);

    // document.getElementById('div_timer').innerHTML = tableau_timer[1];
    document.getElementById('div_timer').innerHTML = hours;
    
}

function displayImages(myData, mySenderId) {

    var tableau_parametres_images = myData.split("|");
    
    buibuiGlobal = buibuiGlobal + 1;
    buibuiGlobal = 0;
 
    for (var i=1; i<tableau_parametres_images.length; i++) { 
        var current_image_parameters = tableau_parametres_images[i].split(":");
        var current_image_id = current_image_parameters[0];
            if (i == 1)
            {
                mycontext.clearRect(0,0, mycanvas.width,mycanvas.height);
                mycontext.strokeRect(0,0, mycanvas.width,mycanvas.height);
            }
            mycontext.save();
            console.log('origin',origin);
            console.log('current_image_parameters',current_image_parameters)
            console.log('mycanvas.width',mycanvas.width)
            console.log('mycanvas.height',mycanvas.height)
            
            console.log('current_image_parameters[2] + mycanvas.height/2 = ',1*current_image_parameters[2] + 1*mycanvas.height/2)
            if (origin==0)
            {
                mycontext.translate((1*current_image_parameters[1]+1*buibuiGlobal)%mycanvas.width, current_image_parameters[2]); 
            }
            else if (origin==1) 
            {
                mycontext.translate((1*current_image_parameters[1]+1*buibuiGlobal)%mycanvas.width + 1*mycanvas.width/2, 1*current_image_parameters[2] + 1*mycanvas.height/2);
            }
            mycontext.rotate(((buibuiGlobal)*1+(current_image_parameters[5])*1)*(2*Math.PI)/360);
            mycontext.scale(current_image_parameters[6]*current_image_parameters[3]/100,current_image_parameters[7]*current_image_parameters[4]/100);
            mycontext.drawImage(myImages[current_image_id], -myImages[current_image_id].width/2, -myImages[current_image_id].height/2);
            mycontext.restore(); 
    }   

};

newImagineBoard();