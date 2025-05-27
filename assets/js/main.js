class RadioSunnahApp {
  constructor() {
    this.webamp = null;
    this.init();
  }

  displayMessage(msg) {
    const displayElement = document.getElementById("display-message");
    const appElement = document.getElementById("app");

    displayElement.innerHTML = msg;
    displayElement.style.display = "block";
    appElement.style.visibility = "hidden";
  }

  async fetchPlaylist() {
    try {
      const response = await fetch(
        "assets/playlists/radio-sunnah-indonesia.m3u"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.text();
    } catch (error) {
      console.error("Error fetching playlist:", error);
      throw error;
    }
  }

  parsePlaylist(m3uContent) {
    const m3uParser = new m3uParserGenerator.M3uParser();
    return m3uParser.parse(m3uContent).medias.map((media) => ({
      metaData: { title: media.name.trim() },
      url: media.location,
    }));
  }

  setupWebamp(playlist) {
    this.webamp = new window.Webamp({
      initialTracks: playlist,
      __initialWindowLayout: {
        main: { position: { x: 0, y: 0 } },
        equalizer: { position: { x: 0, y: 116 } },
        playlist: { position: { x: 0, y: 232 }, size: [0, 4] },
      },
    });

    this.webamp.renderWhenReady(document.getElementById("app"));
    this.setupWebampIcon();
    this.setupMediaSession();
  }

  setupWebampIcon() {
    const webampIcon = document.getElementById("webamp-icon");

    this.webamp.onClose(() => {
      webampIcon.addEventListener("click", () => {
        this.webamp.reopen();
      });
    });
  }

  setupMediaSession() {
    if (!("mediaSession" in navigator)) {
      return;
    }

    this.webamp.onTrackDidChange((track) => {
      if (!track) return;

      const placeholder = "Radio Sunnah Indonesia";

      navigator.mediaSession.metadata = new MediaMetadata({
        title: track.metaData.title || placeholder,
        artist: track.metaData.artist || placeholder,
      });

      document.title = `${
        track.metaData.title || placeholder
      } - ${placeholder}`;
    });

    // Setup media session action handlers
    const mediaActions = {
      play: () => this.webamp.play(),
      pause: () => this.webamp.pause(),
      seekbackward: () => this.webamp.seekBackward(10),
      seekforward: () => this.webamp.seekForward(10),
      previoustrack: () => this.webamp.previousTrack(),
      nexttrack: () => this.webamp.nextTrack(),
    };

    Object.entries(mediaActions).forEach(([action, handler]) => {
      navigator.mediaSession.setActionHandler(action, handler);
    });
  }

  async init() {
    try {
      // Check browser support
      if (!window.Webamp.browserIsSupported()) {
        this.displayMessage(
          "<p>Your browser does not support the features we need.</p>" +
            "<p>Try using the most recent version of Chrome, Firefox, Safari or Edge.</p>"
        );
        return;
      }

      // Fetch and parse playlist
      const m3uContent = await this.fetchPlaylist();
      const playlist = this.parsePlaylist(m3uContent);

      // Setup Webamp with playlist
      this.setupWebamp(playlist);
    } catch (error) {
      console.error("Failed to initialize Radio Sunnah app:", error);
      this.displayMessage(
        "<p>Failed to retrieve the radio playlist.</p>" +
          "<p>Please try again later.</p>"
      );
    }
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new RadioSunnahApp();
});

// Show loading indicator after 500ms
setTimeout(() => {
  const loading = document.getElementById("loading");
  if (loading) {
    loading.style.display = "block";
  }
}, 500);
