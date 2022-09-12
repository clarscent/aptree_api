<%@page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<script src="http://code.jquery.com/jquery-latest.js"></script>
<style>
    *{padding:0;margin:0}
    html, body, .wrap{width: 100%;}
    .clear{clear:both;}
    .wrap>.fileBox{padding: 20px;}
    .fileBox input, textarea{width: 100%;}
    .fileBox textarea{resize:none;}
    .fileBox .fileDrop{display: inline-block;width: 700px;height: 75px;border: 1px solid #000;overflow: auto;}
    .fileDrop .fileList .fileName{padding-left: 20px;}
    .fileDrop .fileList .fileSize{padding-right: 20px; float:right;}
</style>
<script>
var fileList = []; //파일 정보를 담아 둘 배열
var fileIdx = 0;

function onBtnDelete(fileIdx) {
    let $el = $("div.fileList[id=" + fileIdx + "]");
    console.log("$el", $el);

    $el.remove();
}

$(function() {
    //드래그앤드랍
    $("#fileDrop").on("dragenter", function(e) {
        e.preventDefault();
        e.stopPropagation();
    }).on("dragover", function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).css("background-color", "#FFD8D8");
    }).on("dragleave", function(e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).css("background-color", "#FFF");
    }).on("drop", function(e) {
        e.preventDefault();

        var files = e.originalEvent.dataTransfer.files;
        if (files != null && files != undefined) {
            var tag = "";
            for (i = 0; i < files.length; i++) {
                fileIdx++;
                var f = files[i];
                fileList.push(f);
                var fileName = f.name;
                var fileSize = f.size / 1024 / 1024;
                fileSize = fileSize < 1 ? fileSize.toFixed(3) : fileSize.toFixed(1);

                tag += "<div class='fileList' id='" + fileIdx + "'>";
                tag += "<span class='fileName'>" + fileName + "</span>";
                tag += "<span class='fileSize'>" + fileSize + " MB</span>";
                tag += "<button class='fileSize' onclick='onBtnDelete(" + fileIdx + ")'>삭제</button>";
                tag += "<span class='clear'></span>";
                tag += "</div>";
            }
            $(this).append(tag);
        }

        $(this).css("background-color", "#FFF");
    });

    //저장
    $(document).on("click", "#save", function() {
        var formData = new FormData($("#fileForm")[0]);
        if (fileList.length > 0) {
            fileList.forEach(function(f) {
                formData.append("fileList", f);
            });
        }

        console.log("formData", formData);
        console.log("fileList", fileList);

        $.ajax({
            url: "/sa010/uploadTest",
            data: formData,
            type: 'POST',
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            dataType: 'text',
            cache: false,
            success: function(res) {
                console.log("res", res);
                alert("저장에 성공하셨습니다.");
            }, error: function(res) {
                console.log("res", res);
                alert("오류 발생.\n관리자에게 문의해주세요.");
            }
        });
    });
});
</script>
<body>
    <div class="wrap">
        <div class="fileBox">
            <form id="fileForm" name="fileForm" enctype="multipart/form-data" method="post" onsubmit="return false;">
                <table>
                    <tr>
                        <td><input type="text" name="title"></td>
                    </tr>
                    <tr>
                        <td><textarea name="contents"></textarea></td>
                    </tr>
                    <tr>
                        <td><div id="fileDrop" class="fileDrop"></div></td>
                    </tr>
                </table>
                <div class="buttonBox">
                    <button type="button" id="save">저장</button>
                </div>
            </form>
        </div>
    </div>
</body>
</html>