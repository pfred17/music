const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const playBtn = $(".play");
const cd = $(".thumbnail-img");
const nameSong = $(".name-song");
const author = $(".author");
const audio = $("#audio");
const progress = $("#progress");
const nextBtn = $(".next");
const prevBtn = $(".prev");
const randomSong = $(".random");
const random = $(".random");
const loop = $(".loop");
const closeBtn = $(".close");
const playListBtn = $(".list-songs");
const boxPlaylist = $(".list-songs_box");
const boxPlaylistLove = $(".list-love-songs_box");
const allSong = $(".all-songs");
const favouriteSongs = $(".favourite-songs");
const allSongLove = $(".all-songs-love");
const overlay = $(".overlay");
const closeLoveSongPlaylist = $(".closeLovePlaylist");
const app = {
  currentIndex: 0,
  currentActive: 0,
  isPlaying: false,
  isRandom: false,
  isLoop: false,
  isLoveSong: false,
  playlistLove: [],
  songs: [
    {
      id: 0,
      name: "Heart",
      singer: "msftz",
      path: "./assets/song/song1.mp3",
      img: "./assets/img/img1.jpg",
    },
    {
      id: 1,
      name: "Solo",
      singer: "Jennie",
      path: "./assets/song/song2.mp3",
      img: "./assets/img/img2.jpg",
    },
    {
      id: 2,
      name: "You and Me",
      singer: "Jennie",
      path: "./assets/song/song3.mp3",
      img: "./assets/img/img3.jpg",
    },
    {
      id: 3,
      name: "Just Friend",
      singer: "Why don't we",
      path: "./assets/song/song4.mp3",
      img: "./assets/img/img4.jpg",
    },
    {
      id: 4,
      name: "Hái Sao",
      singer: "Pixel Neko",
      path: "./assets/song/song5.mp3",
      img: "./assets/img/img5.jpg",
    },
    {
      id: 5,
      name: "Your Smile",
      singer: "Obito ft Hnhngan",
      path: "./assets/song/song6.mp3",
      img: "./assets/img/img6.jpg",
    },
    {
      id: 6,
      name: "In Bloom",
      singer: "ZEROBASEONE",
      path: "./assets/song/song7.mp3",
      img: "./assets/img/img7.jpg",
    },
    {
      id: 7,
      name: "Star Boy",
      singer: "The Weeknd",
      path: "./assets/song/song8.mp3",
      img: "./assets/img/img8.jpg",
    },
    {
      id: 8,
      name: "Đá tan",
      singer: "Ngọt, Giọt mai sương",
      path: "./assets/song/song9.mp3",
      img: "./assets/img/img9.jpg",
    },
    {
      id: 9,
      name: "Out of time",
      singer: "The Weeknd",
      path: "./assets/song/song10.mp3",
      img: "./assets/img/img10.jpg",
    },
  ],
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        if (this.isLoveSong) {
          return this.playlistLove[this.currentIndex];
        } else {
          return this.songs[this.currentIndex];
        }
      },
    });
  },
  renderPlaylist: function () {
    const htmls = this.songs.map((song, index) => {
      return `
      <div class="item-song ${
        song.id === this.currentActive ? "active" : ""
      }" data-index = ${index} active=${song.id}>
      <div class="left-item-song">
        <div class="avatar">
          <img src="${song.img}" alt="#" class=" avatar avatar-img">
        </div>
          <span class="item-name">${song.name}</span>
      </div>
      <span class="list-songs_icon" data-index = ${index}><i class="fa-regular fa-heart"></i></span>
    </div>`;
    });
    allSong.innerHTML = htmls.join("");
  },
  renderPlaylistLove: function () {
    const htmls = this.playlistLove.map((item, index) => {
      return `
      <div class="item-song-love ${
        item.id === this.currentActive ? "active" : ""
      }" data-index = ${index} active=${item.id}>
        <div class="left-item-song">
          <div class="avatar">
            <img src="${item.img}" alt="#" class=" avatar avatar-img">
          </div>
            <span class="item-name">${item.name}</span>
        </div>
        <span class="list-songs_icon-love"><i class="fa-regular fa-heart"></i></span>
      </div>`;
    });
    allSongLove.innerHTML = htmls.join("");
  },
  loadCurrentSong: function () {
    cd.src = this.currentSong.img;
    nameSong.textContent = this.currentSong.name;
    author.textContent = this.currentSong.singer;
    audio.src = this.currentSong.path;
  },
  handleEvent: function () {
    const _this = this;
    // Active tiêu đề
    randomSong.onclick = function () {
      this.classList.toggle("active");
    };
    // Play audio
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
        _this.isPlaying = false;
        this.innerHTML =
          '<li class="play"><i class="fa-solid fa-play"></i></li>';
      } else {
        audio.play();
        _this.isPlaying = true;
        this.innerHTML = '<i class="fa-solid fa-pause"></i>';
      }
    };
    // Tiến độ bài hát
    audio.ontimeupdate = function () {
      const progressPercents = Math.floor(
        (audio.currentTime / audio.duration) * 100
      );
      progress.value = progressPercents;
    };
    // Tua nhạc
    progress.onchange = function (e) {
      const seekValue = (e.target.value * audio.duration) / 100;
      audio.currentTime = seekValue;
    };
    // Next bài hát
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.randomPlaySong();
      } else {
        _this.nextSong();
      }
      playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      audio.play();
      _this.renderPlaylist();
    };
    // Prev bài hát
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.randomPlaySong();
      } else {
        _this.prevSong();
      }
      playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      audio.play();
      _this.renderPlaylist();
    };
    // Random bài hát
    randomSong.onclick = function () {
      _this.isRandom = !_this.isRandom;
      if (_this.isRandom) {
        this.classList.add("active");
      } else {
        this.classList.remove("active");
      }
    };
    // Replay bài hát
    loop.onclick = function () {
      _this.isLoop = !_this.isLoop;
      if (_this.isLoop) {
        this.classList.add("active");
        _this.replaySong();
      } else {
        this.classList.remove("active");
        audio.onended = function () {
          nextBtn.click();
        };
      }
    };
    // Khi hết bài hát thì next sang bài kế tiếp
    audio.onended = function () {
      nextBtn.click();
    };
    // Hiện playlist
    playListBtn.onclick = function () {
      boxPlaylist.style.display = "block";
      overlay.style.display = "block";
    };
    // Ẩn playlist
    closeBtn.onclick = function () {
      boxPlaylist.style.display = "none";
      overlay.style.display = "none";
    };
    // Ẩn danh sách bài hát yêu thích
    closeLoveSongPlaylist.onclick = function () {
      boxPlaylistLove.style.display = "none";
      overlay.style.display = "none";
    };
    // Hiện danh sách bài hát yêu thích
    favouriteSongs.onclick = function () {
      boxPlaylistLove.style.display = "block";
      overlay.style.display = "block";
      // Render playlist love
      _this.renderPlaylistLove();
    };
    // Bật nhạc khi nhấn vào bài hát trong playlist và thêm bài hát yêu thích
    allSong.onclick = function (e) {
      // Bật nhạc
      const songElenment = e.target.closest(".item-song:not(.active)");
      const loveSongElement = e.target.closest(".list-songs_icon");
      if (songElenment && !loveSongElement) {
        _this.isLoveSong = false;
        _this.currentActive = Number(songElenment.getAttribute("active"));
        _this.currentIndex = Number(songElenment.dataset.index);
        _this.loadCurrentSong();
        _this.renderPlaylist();
        audio.play();
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        loveSongElement.classList.add("active");
        // closeBtn.click();
      }
      // Thêm bài hát yêu thích
      if (loveSongElement) {
        const indexLoveSong = Number(loveSongElement.dataset.index);
        _this.addSongLove(indexLoveSong);
        loveSongElement.classList.add("active");
      }
    };

    // Bật nhạc bài hát yêu thích khi nhấn vào bài hát trong playlist
    allSongLove.onclick = function (e) {
      const songLoveElenment = e.target.closest(".item-song-love:not(.active)");
      const loveSongElement = e.target.closest(".list-songs_icon");
      if (songLoveElenment) {
        _this.isLoveSong = true;
        _this.currentActive = Number(songLoveElenment.getAttribute("active"));
        console.log(_this.currentActive);
        _this.currentIndex = Number(songLoveElenment.dataset.index);
        _this.loadCurrentSong();
        _this.renderPlaylistLove();
        _this.renderPlaylist();
        audio.play();
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
      }
    };
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex > this.songs.length - 1) {
      this.currentIndex = 0;
    }
    this.currentActive = this.currentIndex;
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
    this.currentActive = this.currentIndex;
    console.log(this.currentIndex);
    console.log(this.currentActive);
  },
  randomPlaySong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);
    {
      this.currentIndex = newIndex;
      newIndex = Math.floor(Math.random() * this.songs.length);
      this.loadCurrentSong();
      this.currentActive = this.currentIndex;
    }
  },
  replaySong: function () {
    audio.onended = function () {
      progress.value = 0;
      this.play();
    };
  },
  addSongLove: function (indexLoveSong) {
    const indexArrSongs = this.songs[indexLoveSong];
    this.playlistLove.push(indexArrSongs);
  },
  start: function () {
    // Định nghĩa các thuôc tính cho object
    this.defineProperties();
    // Lắng nghe sự kiện
    this.handleEvent();
    // Tải bài hát đầu tiên
    this.loadCurrentSong();
    // Render playlist
    this.renderPlaylist();
  },
};
app.start();
