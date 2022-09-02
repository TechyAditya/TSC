function login() {
    var who = document.querySelector("input[type='radio'][name=signInAs]:checked").value
    console.log(who == "student")
    if(who == "student"){
        window.open("assets/student.html", "_self")
    }else if(who == "teacher"){
        window.open("assets/teacher.html", "_self")
    }
    else if(who == "admin"){
        window.open("assets/admin.html", "_self")
    }
}