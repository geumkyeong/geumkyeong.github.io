function toggleDropdown(){

   var dropdown = document.getElementById('games-dropdown')

   // ----------vvvvv
   if (dropdown.style.display == "none"){
   // ------------------------^^
     dropdown.style.display = 'block';
   } else {
     dropdown.style.display = "none";
   // --------^^^^^^
   }
}
