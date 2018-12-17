// Note app 전역
var Note = {
  $wrap: $(document.body),
  storageKey: 'notes'
};


// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
// http://ejohn.org/blog/javascript-micro-templating/
(function(){
  var cache = {};

  this.tmpl = function tmpl(str, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
      tmpl(document.getElementById(str).innerHTML) :

      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +

          // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +

          // Convert the template into pure JavaScript
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
        + "');}return p.join('');");

    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
  };
})();

(function(app, $){

  var data = [];

  app.collection = {
    set: function(arr){
      data = arr;
      app.$wrap.trigger("addCollection", [data]);
    },
    toJSON: function() {
      return data;
    },
    add: function (note) {
      data.push(note);
      app.$wrap.trigger("addCollection", [data]);
    },
    remove: function (id) {

      for (var i = 0; i < data.length; i++) {

        if (data[i].id === id) {
          console.log('find', i)
          //data에서  note를 지워야해
          data.splice(i, 1);
          break;
        }

      }//end for

      app.$wrap.trigger("removeCollection", [data]);

    }

  };
})(Note, jQuery);

(function(app){

  app.model = {

    id: '',
    content: ''
    

  };
})(Note);


(function($, app){


  var $listDom = $('#noteList');
  var noteTemplateHtml = $('#noteTemplate').html();

  app.view ={
    newNote: function(event){
      var $field = $("#memo");
      var fieldValue = $field.val();
      console.log('field value : ', fieldValue);

      if (event.type != 'click' || fieldValue === "") {
        console.log('event stop');
        return false;
      }
      
      $field.val('');
    },
    saveNote: function(event){
      var $field = $("#memo");
      var fieldValue = $field.val();
      console.log('field value : ', fieldValue);

      if (event.type != 'click' || fieldValue === "") {
        console.log('event stop');
        return false;
      }

      $field.val('');

      var note = $.extend({}, app.model, {
        id: app.util.uniqId(),
        content: fieldValue
      });

      //console.log('new​ note.model:', note);
      app.collection.add(note);
    },
    render: function(){
      $listDom.html(tmpl( noteTemplateHtml, {notes: app.collection.toJSON() } ));
    }
  };

  app.$wrap.on('addCollection', app.view.render);

})(jQuery, Note);





(function(app) {

  app.util = {
    uniqId: function() {
      return new Date().getTime();
    },
    storage : {
      load: function () {
        console.log('storage.load()');
        return JSON.parse(localStorage.getItem(app.storageKey) || "[]");
      },
      save: function (event, data) {
        console.log('storage.save()');
        localStorage.setItem(app.storageKey, JSON.stringify(data));

      }
    }
  };


  app.$wrap.on('addCollection', app.util.storage.save);
  app.$wrap.on('removeCollection', app.util.storage.save);

})(Note);



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
