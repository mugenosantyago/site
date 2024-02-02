(function () {
  window.currentAlbum = null;
  window.currentIndex = 0;
  window.isPlaying = false;

  window.onSpotifyWebPlaybackSDKReady = async () => {
    const clientId = "b618d7a76b81445c8b2f2c3d914e703e";
    const redirectUri = "https://santyago.io/discography";

    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get("code");

    const getToken = async (code) => {
      // stored in the previous step
      let codeVerifier = localStorage.getItem("code_verifier");
      console.log(codeVerifier);

      const payload = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: clientId,
          grant_type: "authorization_code",
          code,
          redirect_uri: redirectUri,
          code_verifier: codeVerifier,
        }),
      };

      const body = await fetch(
        "https://accounts.spotify.com/api/token",
        payload
      );
      const response = await body.json();

      window.accessToken = response.access_token;

      localStorage.setItem("access_token", response.access_token);
    };

    await getToken(code);

    const token = window.accessToken;
    const player = new Spotify.Player({
      name: "Web Playback SDK Quick Start Player",
      getOAuthToken: (cb) => {
        cb(token);
      },
      volume: 0.5,
    });

    // Ready
    player.addListener("ready", ({ device_id }) => {
      console.log("Ready with Device ID", device_id);
    });

    // Not Ready
    player.addListener("not_ready", ({ device_id }) => {
      console.log("Device ID has gone offline", device_id);
    });

    player.addListener("initialization_error", ({ message }) => {
      console.error(message);
    });

    player.addListener("authentication_error", ({ message }) => {
      console.error(message);
    });

    player.addListener("account_error", ({ message }) => {
      console.error(message);
    });

    player.connect().then((success) => {
      if (success) {
        console.log("The Web Playback SDK successfully connected to Spotify!");
      }
    });

    // https://open.spotify.com/artist/6WZx3OjQfZ8vjrd2MKSF1c?si=Fx72c_noTwuOiVbw5eureg

    fetch("https://api.spotify.com/v1/artists/6WZx3OjQfZ8vjrd2MKSF1c/albums", {
      method: "GET",
      headers: {
        Authorization: "Bearer     " + window.accessToken,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((r) => {
        const playerContainer = document.getElementById("album-players");

        for (let i = 0; i < r.items.length; i += 1) {
          const playerItem = document.createElement("div");
          playerItem.classList.add("player-item");
          const img = document.createElement("img");
          img.classList.add("background-image");
          img.src = r.items[i].images[0].url;
          playerItem.appendChild(img);
          const playImg = document.createElement("img");
          const pauseImg = document.createElement("img");
          playImg.classList.add("play-button-" + i);
          pauseImg.classList.add("button-image");
          playImg.classList.add("button-image");
          pauseImg.classList.add("pause-button-" + i);
          playImg.src = "play.svg";
          pauseImg.src = "pause.svg";
          playImg.style.visibility = "visible";
          pauseImg.style.visibility = "hidden";
          playerItem.appendChild(playImg);
          playerItem.appendChild(pauseImg);

          const albumID = /[^/]*$/.exec(r.items[i].external_urls.spotify)[0];
          const albumType =
            r.items[i].album_type === "album" ? "album" : "track";

          playerItem.onclick = function () {
            if (window.currentAlbum !== albumID) {
              fetch("https://api.spotify.com/v1/me/player/pause", {
                method: "PUT",
                headers: {
                  Authorization: "Bearer     " + window.accessToken,
                  "Content-Type": "application/json",
                },
              })
                .then((res) => {})
                .catch((err) => console.log("err", err));

              document.getElementsByClassName(
                "play-button-" + window.currentIndex
              )[0].style.visibility = "visible";
              document.getElementsByClassName(
                "pause-button-" + window.currentIndex
              )[0].style.visibility = "hidden";

              console.log("switch album play");

              https: document.getElementsByClassName(
                "play-button-" + i
              )[0].style.visibility = "hidden";
              document.getElementsByClassName(
                "pause-button-" + i
              )[0].style.visibility = "visible";

              window.currentAlbum = albumID;
              window.currentIndex = i;
              window.isPlaying = true;
              player.resume();

              fetch("https://api.spotify.com/v1/me/player/play", {
                method: "PUT",
                headers: {
                  Authorization: "Bearer     " + window.accessToken,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  context_uri: "spotify:album:" + albumID,
                  offset: {
                    position: 0,
                  },
                  position_ms: 0,
                }),
              })
                .then((res) => {})
                .catch((err) => console.log("err", err));
            } else if (window.currentAlbum && !window.isPlaying) {
              console.log("play");
              document.getElementsByClassName(
                "play-button-" + i
              )[0].style.visibility = "hidden";
              document.getElementsByClassName(
                "pause-button-" + i
              )[0].style.visibility = "visible";
              player.resume();
              fetch("https://api.spotify.com/v1/me/player/play", {
                method: "PUT",
                headers: {
                  Authorization: "Bearer     " + window.accessToken,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  context_uri: "spotify:album:" + window.currentAlbum,
                  offset: {
                    position: 0,
                  },
                  position_ms: 0,
                }),
              })
                .then((res) => {})
                .catch((err) => console.log("err", err));

              window.isPlaying = true;
            } else if (window.isPlaying) {
              console.log("pause");
              document.getElementsByClassName(
                "play-button-" + i
              )[0].style.visibility = "visible";
              document.getElementsByClassName(
                "pause-button-" + i
              )[0].style.visibility = "hidden";
              player.pause();

              fetch("https://api.spotify.com/v1/me/player/pause", {
                method: "PUT",
                headers: {
                  Authorization: "Bearer     " + window.accessToken,
                  "Content-Type": "application/json",
                },
              })
                .then((res) => {})
                .catch((err) => console.log("err", err));

              window.isPlaying = false;
            }
          };
          playerContainer.appendChild(playerItem);
        }
      })
      .catch((err) => console.log(err));
  };
})();
