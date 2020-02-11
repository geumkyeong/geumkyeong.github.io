function toggle(){
   var toggle = document.getElementById('toggle-bar')
   var menu = document.getElementById('menu-icon')
   var close = document.getElementById('close-icon')

   if (toggle.style.display == "none"){
     close.style.display = "none";
     menu.style.display = "block";
     toggle.style.display = 'block';
   } else {
     menu.style.display = "none";
     close.style.display = "block";
     toggle.style.display = "none";
   }
}
