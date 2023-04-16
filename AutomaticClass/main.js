$(function(){
    // # == css的id
    $("#courseTable").append("<tr><th>場次</th><th>時間</th><th>主題</th></tr>");
    let topicCount = topic.length;

    let millisecsRerDay = 24*60*60*1000;

    
    // for(let x=0; x<topicCount; x++){
    //     $("#courseTable").append(
    //         "<tr>"+
    //         `<td>${x+1}</td>`+
    //         `<td>${(new Date (startDate.getTime() + 7*x*millisecsRerDay))}</td>`+ // getTime()到現在多少秒
    //         `<td>${topic[x]}</td>`+
    //         `</tr>`
    //     );

    for(let x=0; x<topicCount; x++){
        let dateObject = new Date (startDate.getTime() + 7*x*millisecsRerDay)
        $("#courseTable").append(
            "<tr>"+
            `<td>${x+1}</td>`+
            `<td>${dateObject.getMonth() + "/" + dateObject.getDate()}</td>`+ // getTime()到現在多少秒
            `<td>${topic[x]}</td>`+
            `</tr>`
        );    
    }
});