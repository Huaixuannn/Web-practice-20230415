// window.onload = function(){
//     // alert("hi");
// };

// let imageURL_ARRAY = [
//     "https://storage.googleapis.com/www-cw-com-tw/article/202101/article-5ff76e12dff12.jpg",
//     "https://cpok.tw/wp-content/uploads/2023/01/unnamed-file-12.png",
//     "https://storage.googleapis.com/cw-com-tw/article/201805/article-5b0f62dfa1a57.jpg"
// ];

// var previous = -1

// $(function(){
//     $("input").on("click",function(){
//         // alert("hi");
//         // $("h1").text("Hello");
//         // $("h1").text($("li:first").text()); // 輸出h1的第一列文字
//         var numberOfListItem = $("li").length; // 清單項目的數量
//         // ramdom() => (0~1)*(0~3) 
//         // floor => 取向下整數
        
//         var randomChildNumber = Math.floor(Math.random()*numberOfListItem); 
//         // 不與上一筆重複
//         while(randomChildNumber ==  previous){
//             randomChildNumber = Math.floor(Math.random()*numberOfListItem);
//         };
//         previous = randomChildNumber;

//         $("h1").text($("li").eq(randomChildNumber).text()); // eq()從0開始
//         // change image -> chang image element's src
//         $("img").attr("src",imageURL_ARRAY[randomChildNumber]);
// });
// })

let container = document.querySelector(".container");
let spinBtn = document.getElementById("spin");
let number = Math.ceil(Math.random() * 1000);

const spinValues = [720, 675, 630, 585, 540, 495, 450, 405];
let food = ["拉麵", "麥當勞", "水餃", "炒飯", "炸雞", "Pizza", "火鍋", "鐵板燒"]

let imageURL_ARRAY = ["https://storage.googleapis.com/www-cw-com-tw/article/202109/article-613031bda0783.jpg",
                      "https://doqvf81n9htmm.cloudfront.net/data/crop_article/141527/035698.jpg_1140x855.jpg",
                      "https://fs1.shop123.com.tw/012111/upload/product/0121113283pic_outside_661613.jpg",
                      "https://d3l76hx23vw40a.cloudfront.net/recipe/whk090-095b.jpg",
                      "https://www.foodnext.net/dispPageBox/getFile/GetImg.aspx?FileLocation=%2FPJ-FOODNEXT%2FFiles%2F&FileName=photo-08348-i.jpg",
                      "https://assets.blog.engoo.com/wp-content/uploads/sites/3/2022/12/22090555/pizza_english_vocabulary_toppings_crust.jpg",
                      "https://live.staticflickr.com/65535/52201104936_96bc990448_b.jpg",
                      "https://images.deliveryhero.io/image/fd-tw/LH/e9ez-hero.jpg"]


var previous = -1;
let rotationAngle = 0;
spinBtn.onclick = function () {
    container.style.transform = "rotate(" + 0 + "deg)";
    
    console.log(container.style.transform)

    $("p").text("今天晚餐吃什麼?");
    var numberOfListItem = spinValues.length;
    let randomDegree = Math.floor(Math.random() * numberOfListItem);
    while(randomDegree ==  previous){
        randomDegree = Math.floor(Math.random() * numberOfListItem);
    };
    previous = randomDegree;

    
    let rotationInterval = window.setInterval(() => {
    rotationAngle = spinValues[randomDegree] ;

    container.style.transform = "rotate(" + rotationAngle  + "deg)";
    console.log(container.style.transform)        
    $("p").text("今天晚餐吃" + food[randomDegree]);
    $("img").attr("src",imageURL_ARRAY[randomDegree]);
    clearInterval(rotationInterval);
    }, 2000);
}