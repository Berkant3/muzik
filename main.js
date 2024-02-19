const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");
const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("play");
const playListButton = document.getElementById("playlist");

const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");

const progressBar = document.getElementById("progress-bar");
const playListContainer = document.getElementById("playlist-container");
const closeButton = document.getElementById("close-button");
const playListSongs = document.getElementById("playlist-songs");

const currentProgress = document.getElementById("current-progress");

let index;

let loop = true;

const songsLists = [
  {
    name: "Spice",
    link: "assets/Spice_-Sean-Paul_-Shaggy-Go-Down-Deh-Official-Music-Video.mp3",
    artist: "Shaggy",
    image: "assets/spice.jpg",
  },
  {
    name: "Ali Cabbar",
    link: "assets/Emir-Can-İğrek.mp3",
    artist: "Emircan İğrek",
    image: "assets/emircan.jpg",
  },
  {
    name: "Bitter",
    link: "assets/İrem-Derici.mp3",
    artist: "İrem Derici",
    image: "assets/iremderici.jpg",
  },
  {
    name: "Hello",
    link: "assets/Mabel-Matiz.mp3",
    artist: "Mabel Matiz",
    image: "assets/mabel.jpg",
  },
  {
    name: "İmparator",
    link: "assets/Sefo.mp3",
    artist: "Sefo",
    image: "assets/sefo.jpg",
  },
];

//zaman düzenleme

const timeFormatter = (timeInput) => {
  let minute = Math.floor(timeInput / 60);
  minute = minute < 10 ? "0" + minute : minute;

  let second = Math.floor(timeInput % 60);
  second = second < 10 ? "0" + second : second;

  return `${minute}:${second}`;
};

// sarki atama

const setSong = (arrayIndex) => {
  let { name, link, artist, image } = songsLists[arrayIndex];
  audio.src = link;
  songName.innerHTML = name;
  songArtist.innerHTML = artist;
  songImage.src = image;

  audio.onloadeddata = () => {
    maxDuration.innerText = timeFormatter(audio.duration);
  };
  playListContainer.classList.add("hide");
    playAudio();
};

// Ses açma

const playAudio = () => {
  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
};

//ses ilerlemesi
progressBar.addEventListener("click", (event) => {
  let coordStart = progressBar.getBoundingClientRect().left;

  let coorEnd = event.clientX;
  let progress = (coorEnd - coordStart) / progressBar.offsetWidth;

  currentProgress.style.width = progress * 100 + "%";

  audio.currentTime = progress * audio.duration;

  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
});

setInterval(() => {
  currentTimeRef.innerHTML = timeFormatter(audio.currentTime);
  currentProgress.style.width =
    (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%";
}, 1000);

audio.addEventListener("timeupdate", () => {
  currentTimeRef.innerText = timeFormatter(audio.currentTime);
});

//sonraki sarkı
const nextSong = () => {
  if (loop) {
    if (index == songsLists.length - 1) {
      index = 0;
    } else {
      index = index + 1;
    }
    setSong(index);
  } else {
    let randIndex = Math.floor(Math.random() * songsLists.length);
    setSong(randIndex);
  }
};

//sarkiyi bittiğinde geç
audio.onended = () => {
    nextSong()
}

//tekrarlama
repeatButton.addEventListener('click', () => {
    if(repeatButton.classList.contains('active')) {
        repeatButton.classList.remove('active')
        audio.loop = false

    } else {
        repeatButton.classList.add('active')
        audio.loop = true
    }
})

// karistirici 
shuffleButton.addEventListener('click', () => {
    if(shuffleButton.classList.contains('active')) {
        shuffleButton.classList.remove('active')
        audio.loop = true

    } else {
        shuffleButton.classList.add('active')
        audio.loop = false
    }
})

const previousSong = () => {
  if (index > 0) {
    index -= 1;
  } else {
    index = songsLists.length - 1;
  }
  setSong(index);
};

const pauseAudio = () => {
  audio.pause();
  pauseButton.classList.add("hide");
  playButton.classList.remove("hide");
};

//sarki listesi acma
playListButton.addEventListener("click", () => {
  playListContainer.classList.remove("hide");
});

//sarki listesini kapatma
closeButton.addEventListener("click", () => {
  playListContainer.classList.add("hide");
});

//sarki listesini olustur
const initializePlaylist = () => {
  for (let i in songsLists) {
    playListSongs.innerHTML += `<li class="playlistSong"
        onclick="setSong(${i})">
        <div class="playlist-image-container">
        <img src="${songsLists[i].image}"/>
        <div>
        <div class"playlist-song-details">
        <span id="playlist-song-name">
        ${songsLists[i].name}
        </span>
        <span id="playlist-song-artist-name">
        ${songsLists[i].artist}
        </span>
        </div>
        </li>`;
  }
};

// Ekran yüklendiginde
window.onload = () => {
  index = 0;
  setSong(index);
  pauseAudio();
  initializePlaylist();
};

// play button
playButton.addEventListener("click", playAudio);

//next butonu

nextButton.addEventListener("click", nextSong);

//prev button
prevButton.addEventListener("click", previousSong);

//pause button

pauseButton.addEventListener("click", pauseAudio);
