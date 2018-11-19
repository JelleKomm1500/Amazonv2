var audio = new Audio("music/Stardew Valley OST - Summer (Natures Crescendo).mp3");

function startMusic() {
    var x = document.getElementById("start");
    console.log(x);
    var y = document.getElementById("mute");
    console.log(y);

    if (x.style.display === "block") {
        x.style.display = "none";
        y.style.display = "block";
    }
    audio.play();
}

function playMusic() {
    var x = document.getElementById("play");
    var y = document.getElementById("mute");

    if (x.style.display === "block") {
        x.style.display = "none";
        y.style.display = "block";
    } else {
        x.style.display = "none";
        y.style.display = "block";
    }

    audio.play();

}

function stopMusic() {
    var x = document.getElementById("play");
    var y = document.getElementById("mute");
    if (y.style.display === "block") {
        y.style.display = "none";
        x.style.display = "block";
    } else {
        y.style.display = "block";
        x.style.display = "none";
    }

    audio.pause();
}

