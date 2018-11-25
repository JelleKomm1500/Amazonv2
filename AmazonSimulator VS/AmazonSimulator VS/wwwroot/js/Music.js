var audio = new Audio("music/AmbientSound.mp3");
/**
 * When button start is pressed, starts playing background music, we did this this way, because a browser requires a persons interaction with the browser to start playing music.
 * The mute button is also shown.
 */
function startMusic() {
    var x = document.getElementById("start");
    var y = document.getElementById("mute");

    if (x.style.display === "block") {
        x.style.display = "none";
        y.style.display = "block";
    }

    audio.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);
    audio.play();
    audio.volume = 0.3;
}
/**
 * If the music is muted, the sound button can be pressed, which will make the music start playing and hide the play button. After the music is done it will start playing again.
 */
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

    audio.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);
    audio.play();
    audio.volume = 0.3;
}
/**
 * If the music is played, the mute button can be pressed, which will make the music pause and hide the mute button.
 */
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

