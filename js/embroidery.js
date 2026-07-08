const inheritorStories = {
  liushouxian: {
    title: "刘寿仙",
    role: "红安绣活传承人",
    text: "刘寿仙长期守着传统绣活的基本功，从选布、配线到落针都讲究稳、准、细。她熟悉花鸟、吉祥纹样和红色记忆元素，常把日常生活中的祝福绣进作品里，让红安绣活保留质朴亲切的民间温度。"
  },
  xiheyu: {
    title: "席和玉",
    role: "红安绣活传承人",
    text: "席和玉重视纹样背后的文化含义，善于把牡丹、祥云、五角星等符号与红安红色文化连接起来。她的绣活不只追求好看，也希望让游客通过图案读懂红安人的生活审美和家国情感。"
  },
  liushan: {
    title: "刘珊",
    role: "青年传承力量",
    text: "刘珊关注红安绣活的当代表达，尝试把传统针法转化为纸绣体验、文创小卡和互动展示。她希望年轻人不只是观看非遗，也能亲手参与，在一针一线中建立和红安文化的连接。"
  }
};

const storyModal = document.querySelector("#storyModal");
const storyTitle = document.querySelector("#storyTitle");
const storyRole = document.querySelector("#storyRole");
const storyText = document.querySelector("#storyText");
const storyButtons = Array.from(document.querySelectorAll("[data-story]"));
const closeStoryButtons = Array.from(document.querySelectorAll("[data-close-story]"));

// 打开传承人故事弹窗，并填入对应人物内容。
function openStoryModal(storyKey) {
  const story = inheritorStories[storyKey];

  if (!story || !storyModal || !storyTitle || !storyRole || !storyText) {
    return;
  }

  storyTitle.textContent = story.title;
  storyRole.textContent = story.role;
  storyText.textContent = story.text;
  storyModal.classList.add("is-open");
  storyModal.setAttribute("aria-hidden", "false");
}

// 关闭传承人故事弹窗。
function closeStoryModal() {
  if (!storyModal) {
    return;
  }

  storyModal.classList.remove("is-open");
  storyModal.setAttribute("aria-hidden", "true");
}

storyButtons.forEach((button) => {
  button.addEventListener("click", () => openStoryModal(button.dataset.story));
});

closeStoryButtons.forEach((button) => {
  button.addEventListener("click", closeStoryModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeStoryModal();
  }
});
