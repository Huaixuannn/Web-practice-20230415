let mapArray, ctx, currentImagMain;
let imgMountian, imgMain, imgEnemy,imgFinal;
const gridLength = 100;


function loadImages(sources, callback){
    var images = {}
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for(var src in sources) {
        numImages++;
    }
    for(var src in sources){
        images[src] = new Image();
        images[src].onload = function() {
            if(++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
}

//initial
$(function(){
    // 0 : available, 1 : Moutain, 2 : Final Stop, 3 : Enemy 
    mapArray = [
        [0, 1, 1, 0, 3, 2],
        [0, 0, 0, 0, 0, 1],
        [3, 1, 0, 1, 3, 0],
        [0, 1, 0, 0, 0, 0],
        [0, 0, 0, 3, 0, 1],
        [0, 1, 3, 1, 0, 2],
    ];
    ctx = $("#myCanvas")[0].getContext("2d");

    imgMain = new Image();
    imgMain.src = "images/spriteSheet.png";
    currentImagMain = {
        x:0,
        y:0
    };
    

    imgMain.onload = function(){
        //drawImage(image, sx, sy(裁切圖片的起點), sWidth, sHeight(裁切的寬高), dx, dy(繪製的起點), dWidth, dHeight(繪製的寬高))
        ctx.drawImage(imgMain,0,0,80,130,currentImagMain.x,currentImagMain.y, gridLength,gridLength)
        //ctx.drawImage(imgMain,250,0,80,130,200,200,gridLength,gridLength)
    };

    let sources = {
        mountian:"images/material.png",
        enemy:"images/Enemy.png",
        final:"images/material.png",
    };

    
//     // 放障礙物
//     imgMountian = new Image();
//     imgMountian.src = "images/material.png";
//     imgEnemy = new Image();
//     imgEnemy.src = "images/Enemy.png";

    loadImages(sources, function(images){
        for(let x in mapArray){
            for(let y in mapArray){
                if(mapArray[x][y] == 1 ){
                    ctx.drawImage(images.mountian, 32,65,32,32,y*gridLength,x*gridLength,gridLength,gridLength);
                }    
                else if(mapArray[x][y] == 2){
                    ctx.drawImage(images.final, 128,96,32,32,y*gridLength,x*gridLength,gridLength,gridLength);
                }
                else if(mapArray[x][y] == 3){
                    ctx.drawImage(images.enemy, 7,40,104,135,y*gridLength,x*gridLength,gridLength,gridLength);
                }
            }
        }
    });

//     imgMountian.onload = function(){
//         imgEnemy.onload = function(){
//             for(let x in mapArray){
//                 for(let y in mapArray){
//                     if(mapArray[x][y] == 1){
//                         ctx.drawImage(imgMountian, 32,65,32,32,y*gridLength,x*gridLength,gridLength,gridLength);
//                     }
//                     else if(mapArray[x][y] == 3){
//                         ctx.drawImage(imgEnemy, 7,40,104,135,y*gridLength,x*gridLength,gridLength,gridLength);
//                     }
//                 }
//             }
//         }
//     }


// });

        
});

//Click Event
$(document).on("keydown", function(event){
    //console.log(event.key);
    let targetImg, targetBlock,cutImagePositionX;
    // cutImagePositionX - 決定主角臉朝向哪個方向
    targetImg = { // 主角的目標座標
        "x":-1,
        "y":-1
    };
    targetBlock = { // 主角的目標(對應2維陣列)
        "x":-1,
        "y":-1
    };
    event.preventDefault(); //按上下鍵 網頁不會上下捲動 避免鍵盤預設行為發生，如捲動/放大/換頁...

    switch(event.code){
        case "ArrowLeft":
            targetImg.x = currentImagMain.x - gridLength;
            targetImg.y = currentImagMain.y;
            cutImagePositionX = 175; // face left
            break;
        case "ArrowUp":
            targetImg.x = currentImagMain.x;
            targetImg.y = currentImagMain.y - gridLength;
            cutImagePositionX = 355; // face up
            break;
        case "ArrowRight":
            targetImg.x = currentImagMain.x + gridLength;
            targetImg.y = currentImagMain.y;
            cutImagePositionX = 540; // face right
            break;
        case "ArrowDown":
            targetImg.x = currentImagMain.x;
            targetImg.y = currentImagMain.y + gridLength;
            cutImagePositionX = 0; // face down
            break;
        default: // 其他按鍵不處理
            return;
    };
     // 確認目標不超過地圖
    if(targetImg.x<600 && targetImg.x>=0 && targetImg.y<600 && targetImg.y>=0){
        targetBlock.x = targetImg.y / gridLength;
        targetBlock.y = targetImg.x / gridLength;
    }
    else{
        targetBlock.x = -1;
        targetBlock.y = -1;
    }
    //console.log();
    // 清空主角原本在的位置
    ctx.clearRect(currentImagMain.x, currentImagMain.y, gridLength, gridLength);

    if (targetBlock.x !=-1 && targetBlock.y !=-1){
        switch(mapArray[targetBlock.x][targetBlock.y]){
            case 0: // 可行走的路
                $("#talkBox").text("");
                currentImagMain.x = targetImg.x;
                currentImagMain.y = targetImg.y;
                break;
            case 1: // 障礙物
                $("#talkBox").text("⛰️⛰️⛰️有山⛰️⛰️⛰️");
                break;
            case 2: // final stop
                ctx.clearRect(targetImg.x, targetImg.y, gridLength, gridLength);
                currentImagMain.x = targetImg.x;
                currentImagMain.y = targetImg.y;
                $("#talkBox").text("Win😎😎🎉🎉");
                break;
            case 3: // 有敵人
                $("#talkBox").text("還不快逃!!!!😈😈😈");
                break;
        }
    }
    else{
        $("#talkBox").text("沒有路了❎❎❎");
    }

    // 重畫主角
    ctx.drawImage(imgMain,cutImagePositionX,0,80,130,currentImagMain.x,currentImagMain.y, gridLength,gridLength)

});