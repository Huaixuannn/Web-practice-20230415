// $(function(){
//     // # == css的id
//     $("#courseTable").append("<tr><th>場次</th><th>時間</th><th>主題</th></tr>");
//     let topicCount = topic.length;

//     let millisecsRerDay = 24*60*60*1000;

    
//     // for(let x=0; x<topicCount; x++){
//     //     $("#courseTable").append(
//     //         "<tr>"+
//     //         `<td>${x+1}</td>`+
//     //         `<td>${(new Date (startDate.getTime() + 7*x*millisecsRerDay))}</td>`+ // getTime()到現在多少秒
//     //         `<td>${topic[x]}</td>`+
//     //         `</tr>`
//     //     );

//     for(let x=0; x<topicCount; x++){
//         let dateObject = new Date (startDate.getTime() + 7*x*millisecsRerDay)
//         $("#courseTable").append(
//             "<tr>"+
//             `<td>${x+1}</td>`+
//             `<td>${dateObject.getMonth() + "/" + dateObject.getDate()}</td>`+ // getTime()到現在多少秒
//             `<td>${topic[x]}</td>`+
//             `</tr>`
//         );    
//     }
// });

function refreshCourseTable() {
    $("#courseTable").empty();
    $("#courseTable").append("<tr><th>場次</th><th>時間</th><th>課程</th></tr>");
    let topicCount = topic.length;
    let millisecsPerDay = 24*60*60*1000;
    let currentDate = new Date(startDate.getTime());
    for(let x=0; x<topicCount; x++) {
        
        if (topic[x] == '停課') {
            $("#courseTable").append(
                `<tr class="breakRow">` +
                `<td>${x+1}</td>` +
                `<td>${currentDate.getMonth() + 1}/${currentDate.getDate()}</td>` +
                `<td>${topic[x]}</td>` +
                `</tr>`
            );
        } else {
            let rowClass = x % 2 === 0 ? 'evenRow' : 'oddRow';
            $("#courseTable").append(
                `<tr class="${rowClass}">` +
                `<td>${x+1}</td>` +
                `<td>${currentDate.getMonth() + 1}/${currentDate.getDate()}</td>` +
                `<td>${topic[x]}</td>` +
                `</tr>`
            );
        }
        currentDate.setTime(currentDate.getTime() + millisecsPerDay * 7);
    }
}

$(function(){
    $("#startDatePicker").val(startDate.getFullYear() + '-' + ('0' + (startDate.getMonth() + 1)).slice(-2) + '-' + ('0' + startDate.getDate()).slice(-2));
    
    $("#setStartDateButton").click(function() {
        let dateValue = $("#startDatePicker").val();
        let setDateCheckbox = document.getElementById("setDateCheckbox");
        if (dateValue !== "") {
            let parts = dateValue.split("-");
            setMonthAndDay(parseInt(parts[1])-1, parseInt(parts[2]));
            refreshCourseTable();
            setDateCheckbox.checked = true;
            setDateCheckbox.disabled = false;
        }
    });

    refreshCourseTable();

    $("#addTopicButton").click(function() {
        let topicInput = $("#topicInput");
        if (topicInput.val() !== "") {
            topic.push(topicInput.val());
            topicInput.val("");
            refreshCourseTable();
            setDateCheckbox.disabled = true;
        }
    });
});
