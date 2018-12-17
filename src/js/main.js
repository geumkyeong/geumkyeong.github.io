
(function($, global, app){


  var $memoField = $('#memo');
  var $listDom = $('#noteList');

  var $newNote = $('.btn-newnote');
  var $saveNote = $('.btn-savenote');
  var $makeNote = $('.btn-makenote');
  var $about = $('.about');

  $newNote.on('click', app.view.newNote );

  // noteStringField.addEventListener('keyup', addNote);
  $saveNote.on('click', app.view.saveNote );

  $makeNote.on('click', function(event){
    var initData = app.util.storage.load();
    // var save = document.getElementById("sample").value;
    var save = '';
    for(var i=0; i < initData.length; i++){
      console.log(initData[i]);
      save += `id: ${initData[i].id}, `;
      save += `content: ${initData[i].content} `;
    }
    console.log(save);
    var blob = new Blob([save], {
      type: "text/plain;charset=utf-8"
    });
    saveAs(blob, "sample-file.txt");
  });


  // //삭제버튼 이벤트 잡기 위해 상위에서 이벤트 listen 하기
  $listDom.on('click', '.delete', function(event){

    //console.log('delete');

    var $deleteBtn = $(event.target);
    var id = $deleteBtn.parent().data('id');

    app.collection.remove( id );

  });

  // //처음 로딩시에 기존에 저장된 데이터 가져와서 보여주기
  var initData = app.util.storage.load();
  if(initData) {
    console.log(initData)
    
    app.collection.set(initData);
  }



})(jQuery, window, Note);
