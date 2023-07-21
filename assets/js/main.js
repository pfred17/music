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
const notification = $(".notification");
const feedback = $(".feedback");
const containerForm = document.getElementById("container-form");
const formBox = document.getElementById("form-box");
const closeFeedback = $(".button-form-close");
const app = {
  currentIndex: 0,
  currentActive: 0,
  isPlaying: false,
  isRandom: false,
  isLoop: false,
  isLoveSong: false,
  isRenderEmail: true,
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
      name: "em khiến anh muốn trở thành người Hà Nội",
      singer: "Negav",
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
        <span class="list-songs_icon-love"><i class="fa-regular fa-trash-can"></i></span>
        </div>`;
    });
    allSongLove.innerHTML = htmls.join("");
  },
  // ./assets/img/error.png
  renderNotification: function ({ srcImg, title }) {
    const wrapper = document.getElementById("notification");
    const notificationBox = document.createElement("div");
    notificationBox.classList.add("notification");
    notificationBox.innerHTML = `
      <div class="noti-content">
      <div class="noti-left">
      <img src="${srcImg}" alt="notification"/>
      </div>
      <div class="noti-text"><p>${title}</p></div>
    </div>`;
    wrapper.appendChild(notificationBox);
  },
  renderEmailForm: function () {
    const formBox = document.getElementById("form-box");
    const sendForm = document.createElement("form");
    sendForm.innerHTML = ` <div class="wrapper-form">
    <input
    type="text"
    id="name"
    class="name-form"
    placeholder="Name..."
    
  />
  <textarea
    id="message"
    class="message-form"
    placeholder="Massage..."
    
  ></textarea>
  <button id="button-form" type="submit" class="button-form">
    <i class="fa-regular fa-paper-plane"></i>
  </button>
</div>`;
    formBox.appendChild(sendForm);
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
      const songElenment = e.target.closest(".item-song:not(.active)");
      const loveSongElement = e.target.closest(".list-songs_icon");
      // Bật nhạc khi nhắn vào bài hát
      if (songElenment && !loveSongElement) {
        _this.isLoveSong = false;
        _this.currentActive = Number(songElenment.getAttribute("active"));
        _this.currentIndex = Number(songElenment.dataset.index);
        _this.loadCurrentSong();
        _this.renderPlaylist();
        audio.play();
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        closeBtn.click();
      }
      // Thêm bài hát yêu thích
      if (loveSongElement) {
        const indexLoveSong = Number(loveSongElement.dataset.index);
        const active = Number(songElenment.getAttribute("active"));
        if (_this.checkAddLoveSong(active)) {
          _this.renderNotification({
            title: "Add success",
            srcImg: "./assets/img/success.png",
          });
          _this.addSongLove(indexLoveSong);
          loveSongElement.classList.add("active");
        } else {
          _this.renderNotification({
            title: "This song was added before",
            srcImg: "./assets/img/warning.png",
          });
        }
      }
    };
    // Bật nhạc bài hát yêu thích khi nhấn vào bài hát trong playlist
    allSongLove.onclick = function (e) {
      const songLoveElenment = e.target.closest(".item-song-love:not(.active)");
      const songLoveElenmentAcive = e.target.closest(".item-song-love");
      const loveSongElement = e.target.closest(".list-songs_icon-love");
      if (songLoveElenment && !loveSongElement) {
        _this.isLoveSong = true;
        _this.currentActive = Number(songLoveElenment.getAttribute("active"));
        _this.currentIndex = Number(songLoveElenment.dataset.index);
        _this.loadCurrentSong();
        _this.renderPlaylistLove();
        _this.renderPlaylist();
        audio.play();
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        closeLoveSongPlaylist.click();
      }
      // Xóa bài hát yêu thích
      if (loveSongElement) {
        const deleteIndexSong = Number(songLoveElenment.dataset.index);
        _this.playlistLove.splice(deleteIndexSong, 1);
        _this.renderPlaylistLove();
        _this.renderNotification({
          title: "Delete success",
          srcImg: "./assets/img/error.png",
        });
      }
    };
    // Bật feed back
    feedback.onclick = function () {
      containerForm.style.display = "block";
      overlay.style.display = "block";
      _this.sendMail();
    };
    // Đóng feedback
    closeFeedback.onclick = function () {
      containerForm.style.display = "none";
      overlay.style.display = "none";
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
  checkAddLoveSong: function (active) {
    const isCheck = this.playlistLove.every((item) => {
      return item.id != active;
    });
    return isCheck;
  },
  sendMail: function () {
    // Gửi email
    const buttonForm = $("#button-form");
    buttonForm.addEventListener("click", function (e) {
      let nameUser = document.getElementById("name").value;
      let massageUser = document.getElementById("message").value;
      let body =
        "Tên người phản hồi: " + nameUser + "<br /> Lời nhắn: " + massageUser;
      e.preventDefault();
      Email.send({
        SecureToken: "73329add-9966-4c44-a330-bd39b690a761",
        To: "phucmin74@gmail.com",
        From: "phucmin74@gmail.com",
        Subject: "Music App contact from user",
        Body: body,
      }).then(() => app.hendleClostFeedback());
    });
  },
  hendleClostFeedback: function () {
    app.renderNotification({
      title: "Đã gửi thành công",
      srcImg: "./assets/img/success.png",
    });
    setTimeout(() => closeFeedback.click(), 3000);
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
    this.renderEmailForm();
  },
};
app.start();
