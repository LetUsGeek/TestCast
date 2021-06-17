var mycontainer;
var mycanvas;
var mycontext;

function newImagineBoard() {
    document.getElementById('imagineBoard').remove();
    document.getElementById('imagineBoard-container').innerHTML = "toto<canvas id='imagineBoard' width='750' height='750'></canvas>";
    // document.getElementById('imagineBoard-container').innerHTML = "<div id='toto' style = 'position:absolute;'><img src='img/0.svg' /></div>";
    // window.checkDebug();
    mycanvas = document.getElementById('imagineBoard');
    mycontext = mycanvas.getContext('2d');
    mycontext.font = "bold 20px sans-serif";
    // mycontainer = document.getElementById('imagineBoard-container');
       
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
        // 1er champ = type de message (I = image, S = score, C = chat, H = horloge)
            // Séparateur d'images: "|"
            // Sous-séparateur de champs: ":"
            // 0ème champ: Id de la carte
            // 1er champ: Numéro d'image (lié au nom du fichier .svg)
            // 2nd champ: Coordonnées X du centre de l'image par rapport à l'origine du canvas (en haut à gauche)
            // 3ème champ: Coordonnées Y du centre de l'image par rapport à l'origine du canvas (en haut à gauche)
            // 4ème champ: Scale X - nombre entier en pourcentage
            // 5ème champ: Scale Y - nombre entier en pourcentage
            // 6ème champ: Rotation - en degré dans le sens horaire
            
            // 7ème champ : xRotate - flip horizontal (1= no flip, -1 = flip)
            // 8ème champ : yRotate - flip vertical (1= no flip, -1 = flip)

        case 'left':
          console.log('Direction = gauche');
          handleMessage('I|18:275:375:100:100:-30:1:1|24:375:375:100:100:45:1:1','Nicho_Id')
          if (leftGlobal<300)
          {
            console.log('je lance l animation')
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

    var myImages = {};
    var tableau_parametres_images = myData.split("|");
    
    mycontext.clearRect(0,0, mycanvas.width,mycanvas.height);
    mycontext.strokeRect(0,0, mycanvas.width,mycanvas.height);
    

    for (var i=1; i<tableau_parametres_images.length; i++) { 
        var current_image_parameters = tableau_parametres_images[i].split(":");
        myImages[i] = new Image();
        myImages[i].src = 'img/'+current_image_parameters[0]+'.png';
        myImages[i].id = i;
        
        myImages[i].onload = function() {
            var current_image_parameters = tableau_parametres_images[this.id].split(":");
            console.log("dans onload i="+this.id);
            mycontext.save();
            mycontext.translate(current_image_parameters[1], current_image_parameters[2]);
            mycontext.rotate(current_image_parameters[5]*(2*Math.PI)/360);
            mycontext.scale(current_image_parameters[6]*current_image_parameters[3]/100,current_image_parameters[7]*current_image_parameters[4]/100);
            // mycontext.strokeRect( -this.width/2, -this.height/2, this.width, this.height);
            mycontext.drawImage(this, -this.width/2, -this.height/2);
            mycontext.restore();
        }

  
    }   

};

newImagineBoard();