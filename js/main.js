const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const sections = navLinks
  .map((link) => {
    const href = link.getAttribute("href");

    if (!href || !href.startsWith("#")) {
      return null;
    }

    return document.querySelector(href);
  })
  .filter(Boolean);
const backTop = document.querySelector(".back-top");

// 根据当前滚动位置更新首页导航高亮。
function updateActiveNav() {
  if (!sections.length) {
    return;
  }

  const current = sections.reduce((active, section) => {
    return section.offsetTop <= window.scrollY + 120 ? section : active;
  }, sections[0]);

  navLinks.forEach((link) => {
    link.classList.toggle("active", current && link.getAttribute("href") === `#${current.id}`);
  });

  if (backTop) {
    backTop.classList.toggle("visible", window.scrollY > 420);
  }
}

window.addEventListener("scroll", updateActiveNav, { passive: true });
window.addEventListener("load", updateActiveNav);

if (backTop) {
  backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const voiceButtons = Array.from(document.querySelectorAll(".voice-play-button"));

// 格式化音频时间，显示为 00:00。
function formatVoiceTime(seconds) {
  if (!Number.isFinite(seconds)) {
    return "00:00";
  }

  const minute = Math.floor(seconds / 60);
  const second = Math.floor(seconds % 60);
  return `${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`;
}

// 更新单张语音卡片的播放按钮、进度和时间。
function updateVoiceCard(button, audio) {
  const player = button.closest(".voice-player");
  const progress = player ? player.querySelector(".voice-progress span") : null;
  const time = player ? player.querySelector(".voice-time") : null;
  const icon = button.querySelector(".voice-play-icon");
  const label = button.querySelector(".voice-play-text");
  const percent = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;

  if (progress) {
    progress.style.width = `${percent}%`;
  }

  if (time) {
    time.textContent = `${formatVoiceTime(audio.currentTime)} / ${formatVoiceTime(audio.duration)}`;
  }

  if (icon && label) {
    icon.textContent = audio.paused ? "▶" : "Ⅱ";
    label.textContent = audio.paused ? "播放导览" : "暂停导览";
  }
}

// 暂停除当前音频外的其他录音，避免多段导览同时播放。
function pauseOtherVoiceAudio(currentAudio) {
  voiceButtons.forEach((button) => {
    const audio = document.getElementById(button.dataset.audio);

    if (audio && audio !== currentAudio) {
      audio.pause();
      updateVoiceCard(button, audio);
    }
  });
}

voiceButtons.forEach((button) => {
  const audio = document.getElementById(button.dataset.audio);

  if (!audio) {
    return;
  }

  button.addEventListener("click", () => {
    if (audio.paused) {
      pauseOtherVoiceAudio(audio);
      audio.play();
    } else {
      audio.pause();
    }
  });

  audio.addEventListener("loadedmetadata", () => updateVoiceCard(button, audio));
  audio.addEventListener("timeupdate", () => updateVoiceCard(button, audio));
  audio.addEventListener("play", () => updateVoiceCard(button, audio));
  audio.addEventListener("pause", () => updateVoiceCard(button, audio));
  audio.addEventListener("ended", () => {
    audio.currentTime = 0;
    updateVoiceCard(button, audio);
  });
});
