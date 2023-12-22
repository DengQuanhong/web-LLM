new Vue({
    el: '#app',
    data: {
        left: {
            active: true
        },
        right: {
            leftcla: true
        },
        divHei: 0,
        he: 0,
        ct: 0,
        lm: 0,
    },
    methods: {
        getHtmlHeight() {
            this.he = window.innerHeight;
            this.ct = window.innerHeight - 270;
            this.divHei = window.innerHeight - 50;
            this.lm = window.innerHeight - 270;
        },
        change(e) {

            $('.ow').hide();
            console.log("e的值是", e)
            $('.dom').show("slow");
        },
    },
    mounted() {
        this.getHtmlHeight();

    }
})

$(document).keypress(function (e) {
    if ((e.which == 13 && e.ctrlKey) || (e.which == 10 && e.ctrlKey)) {
        // 这里实现换行

        var content = $(".answer").val();

    }
});
// $(document).off('click', '.add').on('click',".add",function () {
//     let content;
//     let now = new Date();
//
//     let year = now.getFullYear(); //得到年份
//
//     let month = now.getMonth()+1;//得到月份
//
//     let date = now.getDate();//得到日期
//
//     let hour= now.getHours();//得到小时数
//
//     let minute= now.getMinutes();//得到分钟数
//
//     let second= now.getSeconds();//得到秒数
//
//     let time=year+'/'+month+'/'+date+' '+hour+':'+minute+':'+second;
//
//     let num=parseInt(localStorage.getItem('num'))+1;
//     localStorage.setItem('num',num)
//     content="      <div class=\"li\" id="+num+"   >\n" +
//         "            <div class=\"xin\">新的聊天</div>\n" +
//         "            <div style=\"display: flex; justify-content: space-between\">\n" +
//         "                <div class=\"yitiao\">1条对话</div>\n" +
//         "                <div class=\"time\">"+time+"</div>\n" +
//         "            </div>\n" +
//         "        </div>";
//     $('.addct').append(content)
// });

$("body").on("click", ".li", function () {


    $(".li").removeClass("onli");
    $(this).addClass('onli');
    $('.ow').hide();
    $('.dom').show("slow");
});
$('.ow').hide();
$('.dom').show();

if (!localStorage.getItem('num')) {
    localStorage.setItem('num', 56)
}

$('#search').on('change', function () {
    while (navileft.hasChildNodes()) {
        navileft.removeChild(navileft.firstChild)
    }
    src_text = document.getElementById('search').value;
    console.log("search的值是"+src_text)
    $.ajax({
        type: "GET",
        url: 'http://210.30.97.215:51677/api/search?q=' + src_text,
        success: function (data) {
            // console.log(data)
            // console.log(data)
            var navileft = document.getElementById('navileft');
            for (var i = 0; i < data.length; i++) {
                var fm = `<div class="li" id="${data[i]['sessid']}" onclick="changedom(this)">
                <div class="xin">${data[i]['name']}</div>
                <div style="display: flex; justify-content: space-between">
                    <div class="yitiao">共有${data[i]['length']}条对话</div>
                </div>
            </div>`
                var fm_ = `<div class="li" id="${data[i]['sessid']}" onclick="changedom(this)">
                <div class="xin">${data[i]['name']}</div>
                <div style="display: flex; justify-content: space-between">
                    <div class="yitiao">共有${data[i]['length']}条对话</div>
                </div>
            </div>`
                if (i == 0) {
                    navileft.insertAdjacentHTML('afterbegin', fm);
                } else {
                    navileft.insertAdjacentHTML('afterbegin', fm_);
                }

            }
        }
    })
})

// $('#search').on('blur', function () {
//     $.ajax({
//         type: "GET",
//         url: 'http://210.30.97.215:51677/api/sessinfo',
//         success: function (data) {
//             console.log(data)
//             var navileft = document.getElementById('navileft');
//             for (var i = 0; i < data.length; i++) {
//                 var fm = `<div class="li onli" id="${data[i]['sessid']}" onclick="changedom(this)">
//                 <div class="xin">${data[i]['name']}</div>
//                 <div style="display: flex; justify-content: space-between">
//                     <div class="yitiao">共有${data[i]['length']}条对话</div>
//                 </div>
//             </div>`
//                 var fm_ = `<div class="li" id="${data[i]['sessid']}" onclick="changedom(this)">
//                 <div class="xin">${data[i]['name']}</div>
//                 <div style="display: flex; justify-content: space-between">
//                     <div class="yitiao">共有${data[i]['length']}条对话</div>
//                 </div>
//             </div>`
//                 if (i == 0) {
//                     navileft.insertAdjacentHTML('afterbegin', fm);
//                 } else {
//                     navileft.insertAdjacentHTML('afterbegin', fm_);
//                 }

//             }

//             sessid_tag = document.getElementById("sessname")
//             sessid_tag.innerHTML = data[0]['name']
//             sessid = data[0]['sessid']
//             $(function () {

//                 var ready_var = $.ajax({
//                     type: "GET",
//                     url: 'http://210.30.97.215:51677/api/chat?sessid=' + sessid,
//                     success: function (data) {
//                         // ajaxLog('成功, 收到的数据: ' + JSON.stringify(data));
//                         // console.log(JSON.stringify(data));
//                         // 打印历史信息
//                         sessrun = document.getElementById("sesssrun");
//                         // console.log(data)
//                         for (var i = 0; i < data.length; i++) {
//                             var fm1 = `<div class="messageright tmp" style="text-align: right;">
//                         <div style="margin-top:20px;border-radius: 10px; margin-right: 20px">
//                             <img src="./static/img/2.png" width="30">
//                         </div>
//                         <div class="messagerightct">
//                             ${data[i][0]}
//                         </div>
//                     </div>`;
//                             console.log(fm1);
//                             sessrun.insertAdjacentHTML('beforeend', fm1);
//                             sessrun.scrollTop = sessrun.scrollHeight;


//                             var fm2 = `<div class="messageleft tmp">
//                         <div class="messageleftimg">
//                             <img src="./static/img/1.png" width="30">
//                         </div>
//                         <div class="messageleftct">
//                             ${data[i][1]}
//                         </div>
//                     </div>`;
//                             sessrun.insertAdjacentHTML('beforeend', fm2);
//                             sessrun.scrollTop = sessrun.scrollHeight;
//                         }
//                     }
//                 });

//             });
//         }
//     });
// })


$('#home').on('click',function(){
    $.ajax({
        type: "GET",
        url: 'http://210.30.97.215:51677/api/sessinfo',
        success: function (data) {
            console.log(data)
            var navileft = document.getElementById('navileft');
            for (var i = 0; i < data.length; i++) {
                var fm = `<div class="li onli" id="${data[i]['sessid']}" onclick="changedom(this)">
            <div class="xin">${data[i]['name']}</div>
            <div style="display: flex; justify-content: space-between">
                <div class="yitiao">共有${data[i]['length']}条对话</div>
            </div>
        </div>`
                var fm_ = `<div class="li" id="${data[i]['sessid']}" onclick="changedom(this)">
            <div class="xin">${data[i]['name']}</div>
            <div style="display: flex; justify-content: space-between">
                <div class="yitiao">共有${data[i]['length']}条对话</div>
            </div>
        </div>`
                if (i == data.length-1) {
                    navileft.insertAdjacentHTML('afterbegin', fm);
                } else {
                    navileft.insertAdjacentHTML('afterbegin', fm_);
                }

            }

            sessid_tag = document.getElementById("sessname")
            sessid_tag.innerHTML = data[data.length-1]['name']
            sessid = data[data.length-1]['sessid']
            $(function () {

                var ready_var = $.ajax({
                    type: "GET",
                    url: 'http://210.30.97.215:51677/api/chat?sessid=' + sessid,
                    success: function (data) {
                        // ajaxLog('成功, 收到的数据: ' + JSON.stringify(data));
                        // console.log(JSON.stringify(data));
                        // 打印历史信息
                        sessrun = document.getElementById("sesssrun");
                        // console.log(data)
                        for (var i = 0; i < data.length; i++) {
                            var fm1 = `<div class="messageright tmp" style="text-align: right;">
                    <div style="margin-top:20px;border-radius: 10px; margin-right: 20px">
                        <img src="./static/img/2.png" width="30">
                    </div>
                    <div class="messagerightct">
                        ${data[i][0]}
                    </div>
                </div>`;
                            console.log(fm1);
                            sessrun.insertAdjacentHTML('beforeend', fm1);
                            sessrun.scrollTop = sessrun.scrollHeight;


                            var fm2 = `<div class="messageleft tmp">
                    <div class="messageleftimg">
                        <img src="./static/img/1.png" width="30">
                    </div>
                    <div class="messageleftct">
                        ${data[i][1]}
                    </div>
                </div>`;
                            sessrun.insertAdjacentHTML('beforeend', fm2);
                            sessrun.scrollTop = sessrun.scrollHeight;
                        }
                    }
                });

            });
        }
    });
})