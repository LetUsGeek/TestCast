var leftGlobal=0;
var mycontainer;
var mycanvas;
var mycontext;
var theMaze = null;
var colors = ['#0099CC', '#9933CC', '#669900', '#FF8A00', '#CC0000', '#33B5E5', '#AA66CC', '#99CC00', '#FFBB33', '#FF4444', '#A8DFF4',
    '#DDBCEE', '#D3E992', '#FFE3A0', '#FFCACA', '#00008B', '#008B8B', '#B8860B', '#A9A9A9', '#006400', '#BDB76B', '#8B008B', '#556B2F',
    '#FF8C00', '#8B0000', '#E9967A', '#8FBC8F'];
var ui = {};

function bindUi() {
    ui.firstColor = $('#first-victory-color');
    ui.firstWin = $('#first-victory-count');
    ui.secondColor = $('#second-victory-color');
    ui.secondWin = $('#second-victory-count');
    ui.thirdColor = $('#third-victory-color');
    ui.thirdWin = $('#third-victory-count');
}

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
            // 2nd champ: Offet X
            // 3ème champ: Offet Y
            // 4ème champ: Scale X
            // 5ème champ: Scale X
            // 6ème champ: Rotation
            
            // 7ème champ : xRotate
            // 8ème champ : yRotate

        case 'left':
          console.log('Direction = gauche');
          handleMessage('I|0:0:0:1:1:45:0:0|1:100:100:0:1:1:45:0:0','Nicho_Id')
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

         // Protocole:
        // 1er champ = type de message (I = image, S = score, C = chat, H = horloge)
            // Séparateur d'images: "|"
            // Sous-séparateur de champs: ":"
            // 0ème champ: Id de la carte
            // 1er champ: Numéro d'image (lié au nom du fichier .svg)
            // 2nd champ: Offet X
            // 3ème champ: Offet Y
            // 4ème champ: Scale X
            // 5ème champ: Scale X
            // 6ème champ: Rotation
            
            // 7ème champ : xRotate
            // 8ème champ : yRotate

    // var myImage = new Image();

    var myImages = {};
    var tableau_parametres_images = myData.split("|");
    
    mycontext.clearRect(0,0, mycanvas.width,mycanvas.height);

    for (var i=1; i<tableau_parametres_images.length; i++) { 
        var current_image_parameters = tableau_parametres_images[i].split(":");
        myImages[i] = new Image();
        myImages[i].src = 'img/'+current_image_parameters[0]+'.png';
        myImages[i].id = i;
        // myImages[i].Offset_X = current_image_parameters[1];
        // myImages[i].Offset_Y = current_image_parameters[2];
        // myImages[i].Scale_X = current_image_parameters[3];
        // myImages[i].Scale_Y = current_image_parameters[4];
        // myImages[i].Rotate = current_image_parameters[5];
        
        myImages[i].onload = function() {
            var current_image_parameters = tableau_parametres_images[this.id].split(":");
            console.log("dans onload i="+this.id);
            mycontext.drawImage(this, current_image_parameters[1], current_image_parameters[2]);
            // mycontext.drawImage(this, 0, 0, myImage.width, myImage.height, leftGlobal, leftGlobal, mycanvas.width/2, mycanvas.height/2);
        }
    }

    // var myImage1 = new Image();
    // var myImage2 = new Image();
    // log_test("myData="+myData);

    // console.log("myData="+myData);
    // console.log("mesimages[0]="+mesimages[0]);
    // console.log("mesimages[1]="+mesimages[1]);
    // log_test("mesimages="+mesimages);
    
    // mycontext.clearRect(0,0, mycanvas.width,mycanvas.height);
    // for (var i=0; i<mesimages.length; i++) {
    //     console.log("i="+i);
    //     myImages[i]= new Image ;
    //     // var myImage = new Image();
    //     myImages[i].onload = function() {
    //         console.log("dans onload i="+i);
    //         mycontext.drawImage(this, 0, 0);
    //     }
    //     myImages[i].src = 'img/'+mesimages[i]+'.png';  
    //     // if(i==0)
    //     // {
    //     //     console.log("avant onload i="+i);
    //     //     myImage1.onload = function() {
    //     //     // mycontext.save();
    //     //     console.log("dans onload i="+i);
    //     //     mycontext.drawImage(myImage1, i*50, i*50);
    //     //     // mycontext.drawImage(myImage1, 0, 0);
    //     //     // mycontext.drawImage(myImage, 0, 0, myImage.width, myImage.height, leftGlobal, leftGlobal, mycanvas.width/2, mycanvas.height/2);
    //     //     // mycontext.drawImage(myImage, 0, 0, myImage.width, myImage.height, leftGlobal+i*mycanvas.width/2, leftGlobal+i*mycanvas.height/2, mycanvas.width*(i+1/2), mycanvas.height*(i+1/2));
    //     //     // mycontext.restore();
    //     //     }
    //     //     myImage1.src = 'img/'+mesimages[i]+'.png';   
    //     // }
    //     // else
    //     // {
    //     //     console.log("dans else avant onload i="+i);
    //     //     myImage2.onload = function() {
    //     //         console.log("dans else dans onload i="+i);
    //     //         // mycontext.save();
    //     //         mycontext.drawImage(myImage2, i*50, i*50);
    //     //         // mycontext.drawImage(myImage1, 0, 0);
    //     //         // mycontext.drawImage(myImage, 0, 0, myImage.width, myImage.height, leftGlobal, leftGlobal, mycanvas.width/2, mycanvas.height/2);
    //     //         // mycontext.drawImage(myImage, 0, 0, myImage.width, myImage.height, leftGlobal+i*mycanvas.width/2, leftGlobal+i*mycanvas.height/2, mycanvas.width*(i+1/2), mycanvas.height*(i+1/2));
    //     //         // mycontext.restore();
    //     //         }
    //     //         myImage2.src = 'img/'+mesimages[i]+'.png';   
    //     // }
    //     // alert('coucou');
        
    //     // myImage1.src = 'img/'+'0'+'.png';   
    
    // // myImage.src = 'img/0.svg';
    // }
        



    
// Pour charger plusieurs images
// http://www.html5canvastutorials.com/tutorials/html5-canvas-image-loader/
    // function loadImages(sources, callback) {
    //     var images = {};
    //     var loadedImages = 0;
    //     var numImages = 0;
    //     // get num of sources
    //     for(var src in sources) {
    //       numImages++;
    //     }
    //     for(var src in sources) {
    //       images[src] = new Image();
    //       images[src].onload = function() {
    //         if(++loadedImages >= numImages) {
    //           callback(images);
    //         }
    //       };
    //       images[src].src = sources[src];
    //     }
    //   }
    //   var canvas = document.getElementById('myCanvas');
    //   var context = canvas.getContext('2d');

    //   var sources = {
    //     darthVader: 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg',
    //     yoda: 'http://www.html5canvastutorials.com/demos/assets/yoda.jpg'
    //   };

    //   loadImages(sources, function(images) {
    //     context.drawImage(images.darthVader, 100, 30, 200, 137);
    //     context.drawImage(images.yoda, 350, 55, 93, 104);
    //   });










    // var myImage2 = new Image();
    // myImage2.onload = function() {
    //     mycontext.clearRect(0,0, mycanvas.width,mycanvas.height);
    //     mycontext.drawImage(myImage2, 0, 0, myImage2.width, myImage2.height, leftGlobal, leftGlobal, mycanvas.width/2, mycanvas.height/2);
    // }

    // // myImage.src = 'img/'+myData+'.svg';
    // myImage2.src = 'img/1.svg';
  

    
        // Protocole:
        // 1er champ = type de message (I = image, S = score, C = chat, H = horloge)
            // Séparateur d'images: "|"
            // Sous-séparateur de champs: ":"
            // 0ème champ: Id de la carte
            // 1er champ: Numéro d'image (lié au nom du fichier .svg)
            // 2nd champ: Offet X
            // 3ème champ: Offet Y
            // 4ème champ: Scale
            // 5ème champ: Rotation
            // 6ème champ: zIndex ==> facultatif si images envoyées dans l'ordre
            // 7ème champ : xRotate
            // 8ème champ : yRotate

        // Autres types de message : chronomètre, chat

        // var str = "12:36:28:0.6:45|18:12:6:0.1:12";
        // var mesimages = str.split("|");
        // for (i=0; i<mesimages.length; i++) {
        //   document.getElementById("demo").innerHTML = document.getElementById("demo").innerHTML+"<br/>"+mesimages[i];
        // }
      

};







function newMaze() {
    bindUi();
    var players = [];
    if (theMaze) {
        players = theMaze.players;
    }
    document.getElementById('maze').remove();
    document.getElementById('maze-container').innerHTML = "<canvas oncontextmenu='return false;' id='maze' width='750' height='750'></canvas>";
    window.checkDebug();
    canvas = document.getElementById('maze');
    context = canvas.getContext('2d');
    context.font = "bold 20px sans-serif";

    makeMaze();

    theMaze.players = players;

    _.forEach(theMaze.players, function (player) {
        player.x = 0;
        player.y = 0;
    });

    setInterval(function () {
        theMaze.drawPlayers();
    }, 100)
}

$(document).ready(function () {
    // newMaze();
    newImagineBoard();
});

function makeMaze() {
    var rows = 25;
    var columns = 25;
    var gridsize = 25;
    var mazeStyle = "straight";
    /*
     var startColumn = $('#startX').val();
     var startRow = $('#startY').val();
     var endColumn = $('#endX').val();
     var endRow = $('#endY').val();
     */
    var startColumn = 0;
    var startRow = 0;
    var endColumn = columns - 1;
    var endRow = rows - 1;
    var wallR = 0;
    var wallG = 0;
    var wallB = 0;
    var backgroundR = 255;
    var backgroundG = 255;
    var backgroundB = 255;
    var solutionR = 255;
    var solutionG = 200;
    var solutionB = 200;
    var wallColor = "rgb(" + wallR + "," + wallG + "," + wallB + ")";
    var backgroundColor = "rgb(" + backgroundR + "," + backgroundG + "," + backgroundB + ")";
    var solutionColor = "rgb(" + solutionR + "," + solutionG + "," + solutionB + ")";
    theMaze = new maze(rows, columns, gridsize, mazeStyle, startColumn, startRow, endColumn, endRow, wallColor, backgroundColor, solutionColor);
    theMaze.generate();
    theMaze.draw();
    theMaze.players = [];
}

function addPlayer(playerId) {
    var color = colors[theMaze.players.length % colors.length];
    theMaze.players.push({
        id: playerId,
        x: 0,
        y: 0,
        color: color,
        win: 0
    });
    return color;
}

function removePlayer(playerId) {
    var i = _.findIndex(theMaze.players, function (player) {
        return player.id === playerId;
    });
    if (i > -1) {
        var player = theMaze.players[i];
        theMaze.redrawCell(theMaze.grid[player.x][player.y]);
        theMaze.players.splice(i, 1);
    }
}

function updateLeaderBoard() {
    if (theMaze.players.length > 0) {
        var sortedPlayers = _.sortBy(theMaze.players, function (player) {
            return -player.win;
        });
        ui.firstColor.css('background-color', sortedPlayers[0].color);
        ui.firstWin.html(sortedPlayers[0].win);
        var length = sortedPlayers.length;
        if (length > 1) {
            ui.secondColor.css('background-color', sortedPlayers[1].color);
            ui.secondWin.html(sortedPlayers[1].win);
        }
        if (length > 2) {
            ui.thirdColor.css('background-color', sortedPlayers[2].color);
            ui.firstWin.html(sortedPlayers[2].win);
        }
    }
}

function checkWinner(player) {
    if (player.x == theMaze.endColumn && player.y == theMaze.endRow) {
        player.win += 1;
        theMaze.pause = true;
        document.getElementById('winner').style.display = 'block';
        document.getElementById('winner-color').style.backgroundColor = player.color;
        updateLeaderBoard();
        launchCountdown();
    }
}

function launchCountdown() {
    var countdown = 10;
    var countdownTime = document.getElementById('countdown-time');
    countdownTime.innerHTML = countdown;
    var countdownCounter = function () {
        if (countdown === 1) {
            document.getElementById('winner').style.display = 'none';
            newMaze();
        } else {
            countdownTime.innerHTML = --countdown;
            setTimeout(countdownCounter, 1000);
        }
    };
    setTimeout(countdownCounter, 1000);
}

function handleKeypress(direction, playerId) {
    if (theMaze.pause) {
        return;
    }
    var player = _.find(theMaze.players, function (player) {
        return player.id === playerId;
    });
    if (!player) {
        return;
    }
    var currentPlayerGrid = theMaze.grid[player.x][player.y];
    var isMoving = false;
    var changeX = 0;
    var changeY = 0;

    switch (direction) {
        case 'left':
        {
            //left key
            if (currentPlayerGrid.leftWall == false) {
                changeX = -1;
                isMoving = true;
            }
            break;
        }
        case 'up':
        {
            //up key
            if (currentPlayerGrid.topWall == false) {
                changeY = -1;
                isMoving = true;
            }
            break;
        }
        case 'right':
        {
            //right key
            if (currentPlayerGrid.rightWall == false) {
                changeX = 1;
                isMoving = true;
            }
            break;
        }
        case 'down':
        {
            //down key
            if (currentPlayerGrid.bottomWall == false) {
                changeY = 1;
                isMoving = true
            }
            break;
        }
        default:
        {
            //not a key we care about
            break;
        }
    }
    if (isMoving == true) {
        theMaze.redrawCell(theMaze.grid[player.x][player.y]);
        player.x += changeX;
        player.y += changeY;
        checkWinner(player);
    }
};

function maze(rows, columns, gridsize, mazeStyle, startColumn, startRow, endColumn, endRow, wallColor, backgroundColor, solutionColor) {
    this.rows = rows;
    this.columns = columns;
    this.gridsize = gridsize;
    this.mazeStyle = mazeStyle;
    this.sizex = gridsize * rows;
    this.sizey = gridsize * columns;
    this.halfgridsize = this.gridsize / 2;
    this.grid = new Array(this.columns);
    this.history = [];
    this.startColumn = parseInt(startColumn);
    this.startRow = parseInt(startRow);
    this.players = [];
    //this.playersCount = 0;
    this.endColumn = parseInt(endColumn);
    this.endRow = parseInt(endRow);
    this.wallColor = wallColor;
    this.backgroundColor = backgroundColor;
    this.solutionColor = solutionColor;
    this.lineWidth = 2;
    this.genStartColumn = Math.floor(Math.random() * (this.columns - 1));
    this.genStartRow = Math.floor(Math.random() * (this.rows - 1));
    this.cellCount = this.columns * this.rows;
    this.generatedCellCount = 0;
    for (var i = 0; i < columns; i++) {
        this.grid[i] = new Array(rows);
    }
    for (var j = 0; j < this.columns; j++) {
        for (k = 0; k < this.rows; k++) {
            var isStart = false;
            var isEnd = false;
            var partOfMaze = false;
            var isGenStart = false;
            if (j == this.startColumn && k == this.startRow) {
                isStart = true;
            }
            if (j == this.genStartColumn && k == this.genStartRow) {
                partOfMaze = true;
                isGenStart = true;
            }
            if (j == this.endColumn && k == this.endRow) {
                isEnd = true;
            }
            this.grid[j][k] = new cell(j, k, partOfMaze, isStart, isEnd, isGenStart);
        }
    }
};

maze.prototype.generate = function () {
    var theMaze = this;
    var currentCell = this.grid[this.genStartColumn][this.genStartRow];
    var nextCell;
    var leftCellPartOfMaze = false;
    var topCellPartOfMaze = false;
    var rightCellPartOfMaze = false;
    var bottomCellPartOfMaze = false;
    var currentX = this.genStartColumn;
    var currentY = this.genStartRow;
    var changeX = 0;
    var changeY = 0;
    var previousChangeX = 0;
    var previousChangeY = 0;
    var leftCell;
    var topCell;
    var rightCell;
    var bottomCell;
    var direction;
    var leftChoices;
    var rightChoices;
    var downChoices;
    var upChoices;
    var biasDirection;
    var choices;
    while (this.generatedCellCount < this.cellCount - 1) {
        doGeneration();
    }
    function chooseCell() {
        changeX = 0;
        changeY = 0;
        choices = [];
        biasDirection = '';
        if (previousChangeX == -1) {
            biasDirection = 'left';
        } else if (previousChangeX == 1) {
            biasDirection = 'right';
        } else if (previousChangeY == -1) {
            biasDirection = 'up';
        } else if (previousChangeY == 1) {
            biasDirection = 'down';
        }
        direction = '';
        leftChoices = [0, 0, 0, 0, 0];
        upChoices = [1, 1, 1, 1, 1];
        rightChoices = [2, 2, 2, 2, 2];
        downChoices = [3, 3, 3, 3, 3];
        switch (theMaze.mazeStyle) {

            case "curvy":
            {
                if (biasDirection == 'left') {
                    leftChoices = [0, 0];
                } else if (biasDirection == 'right') {
                    rightChoices = [2, 2];
                } else if (biasDirection == 'down') {
                    downChoices = [3, 3];
                } else if (biasDirection == 'up') {
                    upChoices = [1, 1]
                }
                break;
            }
            case "straight":
            {
                leftChoices = [0];
                upChoices = [1];
                rightChoices = [2];
                downChoices = [3];
                if (biasDirection == 'left') {
                    leftChoices = [0, 0, 0, 0, 0, 0, 0, 0];
                } else if (biasDirection == 'right') {
                    rightChoices = [2, 2, 2, 2, 2, 2, 2, 2];
                } else if (biasDirection == 'down') {
                    downChoices = [3, 3, 3, 3, 3, 3, 3, 3];
                } else if (biasDirection == 'up') {
                    upChoices = [1, 1, 1, 1, 1, 1, 1, 1]
                }
                break;
            }
            case "normal":
            {
                leftChoices = [0];
                upChoices = [1];
                rightChoices = [2];
                downChoices = [3];
                break;
            }
        }
        choices = leftChoices.concat(rightChoices.concat(downChoices.concat(upChoices)));
        var rand = Math.floor(Math.random() * choices.length);
        var weightedRand = choices[rand];
        switch (weightedRand) {
            case 0:
            {
                nextCell = leftCell;
                changeX = -1;
                direction = 'left';
                break;
            }
            case 1:
            {
                nextCell = topCell;
                changeY = -1;
                direction = 'up';
                break;
            }
            case 2:
            {
                nextCell = rightCell;
                changeX = 1;
                direction = 'right';
                break;
            }
            case 3:
            {
                nextCell = bottomCell;
                changeY = 1;
                direction = 'down';
                break;
            }
            default:
            {
                nextCell = null;
                changeY = 0;
                changeX = 0;
                break;
            }
        }

        if (nextCell == null || nextCell.partOfMaze == true) {
            chooseCell();
        } else {
            currentX += changeX;
            currentY += changeY;
            previousChangeX = changeX;
            previousChangeY = changeY;
            theMaze.history.push(direction);
        }
    }

    function addToMaze() {
        nextCell.partOfMaze = true;
        if (changeX == -1) {
            currentCell.leftWall = false;
            nextCell.rightWall = false;
        }
        if (changeY == -1) {
            currentCell.topWall = false;
            nextCell.bottomWall = false;
        }
        if (changeX == 1) {
            currentCell.rightWall = false;
            nextCell.leftWall = false;
        }
        if (changeY == 1) {
            currentCell.bottomWall = false;
            nextCell.topWall = false;
        }
    }

    function doGeneration() {
        //stop generation if the maze is full
        if (theMaze.generatedCellCount == theMaze.cellCount - 1) {
            return;
        }
        //do actual generation
        changeX = 0;
        changeY = 0;
        if (currentX > 0) {
            leftCell = theMaze.grid[currentX - 1][currentY];
            leftCellPartOfMaze = leftCell.partOfMaze;
        } else {
            leftCell = null;
            leftCellPartOfMaze = true;
        }
        if (currentY > 0) {
            topCell = theMaze.grid[currentX][currentY - 1];
            topCellPartOfMaze = topCell.partOfMaze;

        } else {
            topCell = null;
            topCellPartOfMaze = true;
        }
        if (currentX < (theMaze.columns - 1)) {
            rightCell = theMaze.grid[currentX + 1][currentY];
            rightCellPartOfMaze = rightCell.partOfMaze;
        } else {
            rightCell = null;
            rightCellPartOfMaze = true;
        }
        if (currentY < (theMaze.rows - 1)) {
            bottomCell = theMaze.grid[currentX][currentY + 1];
            bottomCellPartOfMaze = bottomCell.partOfMaze;
        } else {
            bottomCell = null;
            bottomCellPartOfMaze = true;
        }
        if (leftCellPartOfMaze == true && topCellPartOfMaze == true && rightCellPartOfMaze == true && bottomCellPartOfMaze == true) {
            //go back and check previous cell for generation
            var lastDirection = theMaze.history.pop();
            changeX = 0;
            changeY = 0;
            switch (lastDirection) {
                case 'left':
                {
                    changeX = 1;
                    break;
                }
                case 'up':
                {
                    changeY = 1;
                    break;
                }
                case 'right':
                {
                    changeX = -1;
                    break;
                }
                case 'down':
                {
                    changeY = -1;
                    break;
                }
            }
            nextCell = theMaze.grid[currentX + changeX][currentY + changeY];
            currentX += changeX;
            currentY += changeY;
            currentCell = nextCell;
            doGeneration();

        } else {
            chooseCell();
            addToMaze();
            currentCell = nextCell;
            theMaze.generatedCellCount += 1;
        }
    }
};

maze.prototype.draw = function () {
    var totalWidth = this.columns * this.gridsize;
    var totalHeight = this.rows * this.gridsize;
    var mazeDom = document.getElementById('maze');
    mazeDom.width = totalWidth;
    mazeDom.height = totalHeight;
    context.lineWidth = this.lineWidth;
    context.clearRect(0, 0, totalWidth, totalHeight);
    context.strokeStyle = this.wallColor;
    for (var j = 0; j < this.columns; j++) {
        for (var k = 0; k < this.rows; k++) {
            var drawX = (j * this.gridsize);
            var drawY = (k * this.gridsize);
            var pastX = parseInt(drawX) + parseInt(this.gridsize);
            var pastY = parseInt(drawY) + parseInt(this.gridsize);
            var theCell = this.grid[j][k];
            //this.drawColors(theCell);

            if (theCell.partOfSolution == true) {
                context.fillStyle = this.solutionColor;
            } else {
                context.fillStyle = this.backgroundColor;
            }
            if (theCell.isStart == true) {
                context.fillStyle = "#00FF00";
            }
            if (theCell.isEnd == true) {
                context.fillStyle = "#FF0000";
            }
            if (theCell.isGenStart == true) {
                //context.fillStyle = "#0000FF";
            }

            context.fillRect(drawX, drawY, this.gridsize, this.gridsize);
            context.beginPath();
            if (theCell.leftWall == true) {
                //context.strokeRect(drawX, drawY, 1, this.gridsize);
                context.moveTo(drawX, drawY);
                context.lineTo(drawX, pastY);
            }
            if (theCell.topWall == true) {
                //context.strokeRect(drawX, drawY, this.gridsize, 1);
                context.moveTo(drawX, drawY);
                context.lineTo(pastX, drawY);
            }
            if (theCell.rightWall == true) {
                //context.strokeRect((drawX + this.gridsize), drawY, 1, this.gridsize);
                context.moveTo(pastX, drawY);
                context.lineTo(pastX, pastY);
            }
            if (theCell.bottomWall == true) {
                //context.strokeRect(drawX, (drawY + this.gridsize), this.gridsize, 1);
                context.moveTo(drawX, pastY);
                context.lineTo(pastX, pastY);
            }
            context.closePath();
            context.stroke();

        }
    }
};

maze.prototype.redrawCell = function (theCell) {
    //console.log(theCell);
    var drawX = (theCell.x * this.gridsize);
    var drawY = (theCell.y * this.gridsize);
    var pastX = parseInt(drawX) + parseInt(this.gridsize);
    var pastY = parseInt(drawY) + parseInt(this.gridsize);
    if (theCell.partOfSolution == true) {
        context.fillStyle = "#FFCCCC";
    } else {
        context.fillStyle = this.backgroundColor;
    }
    if (theCell.isStart == true) {
        context.fillStyle = "#00FF00";
    }
    if (theCell.isEnd == true) {
        context.fillStyle = "#FF0000";
    }
    if (theCell.isGenStart == true) {
        //context.fillStyle = "#0000FF";
    }
    context.fillRect(drawX, drawY, this.gridsize, this.gridsize);
    context.beginPath();
    if (theCell.leftWall == true) {
        //context.strokeRect(drawX, drawY, 1, this.gridsize);
        context.moveTo(drawX, drawY);
        context.lineTo(drawX, pastY);
    }
    if (theCell.topWall == true) {
        //context.strokeRect(drawX, drawY, this.gridsize, 1);
        context.moveTo(drawX, drawY);
        context.lineTo(pastX, drawY);
    }
    if (theCell.rightWall == true) {
        //context.strokeRect((drawX + this.gridsize), drawY, 1, this.gridsize);
        context.moveTo(pastX, drawY);
        context.lineTo(pastX, pastY);
    }
    if (theCell.bottomWall == true) {
        //context.strokeRect(drawX, (drawY + this.gridsize), this.gridsize, 1);
        context.moveTo(drawX, pastY);
        context.lineTo(pastX, pastY);
    }
    context.closePath();
    context.stroke();
};

maze.prototype.drawPlayers = function () {
    var that = this;
    _.forEach(theMaze.players, function (player) {
        var drawX = player.x * that.gridsize + (that.gridsize / 2);
        var drawY = player.y * that.gridsize + (that.gridsize / 2);
        context.fillStyle = player.color;
        context.beginPath();
        context.arc(drawX, drawY, (that.gridsize / 4), 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
    });
};

function cell(column, row, partOfMaze, isStart, isEnd, isGenStart) {
    this.x = column;
    this.y = row;
    this.leftWall = true;
    this.topWall = true;
    this.rightWall = true;
    this.bottomWall = true;
    this.partOfMaze = partOfMaze;
    this.isStart = isStart;
    this.isEnd = isEnd;
    this.partOfSolution = false;
    this.visited = false;
    this.isGenStart = isGenStart;
    this.isPlayer = false;
};