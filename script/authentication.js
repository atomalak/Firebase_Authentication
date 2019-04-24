

function closeModal() {
    $(".closemodal").trigger("click");
}

$(".makeadmin").click(function(){
   const adminemail=$(".adminemail").val();
   const addAdminRole=functions.httpsCallable("addAdminRole")
   addAdminRole({email:adminemail}).then(result=>{
       console.log(result);
   }).catch(err=>{
       console.log(err);
   })

})

$(".signupbtn").click(function () {
    const email = $(".signupemail").val();
    const password = $(".signuppassword").val();
    //yeni bir kullanıcı oluşturmak için kullanılır
    auth.createUserWithEmailAndPassword(email, password).then((resp) => {
        console.log(resp.user);
        closeModal();
    }).catch((e) => {
        console.log(e);
    })
})

$(".loginbtn").click(function () {
    const email = $(".loginemail").val();
    const password = $(".loginpwd").val();

    //login işlemi
    auth.signInWithEmailAndPassword(email, password).then((resp) => {
        console.log(resp.user);
        closeModal();
    }).catch((e) => {
        console.log(e);
    })
})



//kullanıcı durumlarını inceler yeni bir kayıt oluştuğunda , login olunduğunda,logout olunduğunda
//bu sayede kullanıcı durumlarını FE bazında loglayabiliriz.
//ne zaman login olmuş ne zaman logout olmuş gibi
auth.onAuthStateChanged(user => {
    if (user) {
        //Bir kullanıcının admin olup olmadığını token result servisini çağırarak anlıyoruz.
        //response nesnesi içinde claims nesnesi yer almaktadır.
        //Firebase consoleda kontrolü ise allow write: if request.auth.token.admin==true şekilde olmalı
        user.getIdTokenResult().then(token=>{
            console.log(token.claims)
        })
        $(".loggedin").show();
        $(".logout").hide();
        //db.collection("/todos").get().then(snapshot=>{})
        db.collection("/todos").where("uid","==",auth.currentUser.uid).onSnapshot(snapshot => {
            $("#todos-list").html("");
            snapshot.docs.map(doc => {
                $("#todos-list").append("<li class='list-group-item'>" + doc.data().item + "</li>");
            })

        })
    } else {
      $(".loggedin").hide();
      $(".logout").show();
      $("#todos-list").html("");

    }
})



