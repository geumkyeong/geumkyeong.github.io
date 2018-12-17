
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

