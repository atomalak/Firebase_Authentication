function openModal(modaltype) {
   $("." + modaltype).trigger("click");
   if (modaltype == "profilmodal") {
      $("#profil-info").append("<li class='list-group-item'>" + auth.currentUser.email + "</li>")
   }
}


$(".todosave").click(function () {
   db.collection("/todos").add({ "item": $(".item").val(), "uid": auth.currentUser.uid }).then((resp) => {
      $(".closemodal").trigger("click");
   }).catch((e) => {
      console.log(e);
   })
})

