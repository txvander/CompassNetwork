// what the fuck this shouldnt work - sky
const ruffle = window.RufflePlayer.newest();

let player;

const main = document.getElementById("main");
const overlay = document.getElementById("overlay");
const authorContainer = document.getElementById("author-container");
const author = document.getElementById("author");
const sampleFileInputContainer = document.getElementById(
    "sample-swfs-container",
);
const localFileInput = document.getElementById("local-file");
const sampleFileInput = document.getElementById("sample-swfs");
const localFileName = document.getElementById("local-file-name");
const closeModal = document.getElementById("close-modal");
const openModal = document.getElementById("open-modal");
const reloadSwf = document.getElementById("reload-swf");
const metadataModal = document.getElementById("metadata-modal");
// prettier-ignore
const optionGroups = {
    "Animation": document.getElementById("anim-optgroup"),
    "Game": document.getElementById("games-optgroup"),
};

// Default config used by the player.
const defaultConfig = {
    letterbox: "on",
    logLevel: "warn",
    forceScale: true,
    forceAlign: true,
};

const swfToFlashVersion = {
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9.0",
    10: "10.0/10.1",
    11: "10.2",
    12: "10.3",
    13: "11.0",
    14: "11.1",
    15: "11.2",
    16: "11.3",
    17: "11.4",
    18: "11.5",
    19: "11.6",
    20: "11.7",
    21: "11.8",
    22: "11.9",
    23: "12",
    24: "13",
    25: "14",
    26: "15",
    27: "16",
    28: "17",
    29: "18",
    30: "19",
    31: "20",
    32: "21",
    33: "22",
    34: "23",
    35: "24",
    36: "25",
    37: "26",
    38: "27",
    39: "28",
    40: "29",
    41: "30",
    42: "31",
    43: "32",
};

function unload() {
    if (player) {
        player.remove();
        document.querySelectorAll("span.metadata").forEach((el) => {
            el.textContent = "Loading";
        });
        document.getElementById("backgroundColor").value = "#FFFFFF";
    }
}

function load(options) {
    unload();
    player = ruffle.createPlayer();
    player.id = "player";
    main.append(player);
    player.load(options);
    player.addEventListener("loadedmetadata", function () {
        if (this.metadata) {
            for (const [key, value] of Object.entries(this.metadata)) {
                const metadataElement = document.getElementById(key);
                if (metadataElement) {
                    switch (key) {
                        case "backgroundColor":
                            metadataElement.value = value ?? "#FFFFFF";
                            break;
                        case "uncompressedLength":
                            metadataElement.textContent = `${value >> 10}Kb`;
                            break;
                        case "swfVersion":
                            document.getElementById(
                                "flashVersion",
                            ).textContent = swfToFlashVersion[value];
                        // falls through and executes the default case as well
                        default:
                            metadataElement.textContent = value;
                            break;
                    }
                }
            }
        }
    });
}

load({ "url": "logo-anim.swf", autoplay: "on", backgroundColor: "#31497D", letterbox: "off", unmuteOverlay: "hidden"});

function showSample(swfData) {
    authorContainer.classList.remove("hidden");
    author.textContent = swfData.author;
    author.href = swfData.authorLink;
    localFileInput.value = null;
}

function hideSample() {
    sampleFileInput.selectedIndex = -1;
    authorContainer.classList.add("hidden");
    author.textContent = "";
    author.href = "";
}

async function loadFile(file) {
    if (!file) {
        return;
    }
    if (file.name) {
        localFileName.textContent = file.name;
    }
    hideSample();
    const data = await new Response(file).arrayBuffer();
    load({ data: data, swfFileName: file.name, ...defaultConfig });
}

function loadSample() {
    const swfData = sampleFileInput[sampleFileInput.selectedIndex].swfData;
    localFileName.textContent = "No file selected.";
    if (swfData) {
        showSample(swfData);
        const config = swfData.config || defaultConfig;
        load({ url: swfData.location, ...config });
    } else {
        hideSample();
        unload();
    }
}

localFileInput.addEventListener("change", (event) => {
    loadFile(event.target.files[0]);
});

sampleFileInput.addEventListener("change", () => loadSample());

main.addEventListener("dragenter", (event) => {
    event.stopPropagation();
    event.preventDefault();
});
main.addEventListener("dragleave", (event) => {
    event.stopPropagation();
    event.preventDefault();
    overlay.classList.remove("drag");
});
main.addEventListener("dragover", (event) => {
    event.stopPropagation();
    event.preventDefault();
    overlay.classList.add("drag");
});
main.addEventListener("drop", (event) => {
    event.stopPropagation();
    event.preventDefault();
    overlay.classList.remove("drag");
    localFileInput.files = event.dataTransfer.files;
    loadFile(event.dataTransfer.files[0]);
});
localFileInput.addEventListener("dragleave", (event) => {
    event.stopPropagation();
    event.preventDefault();
    overlay.classList.remove("drag");
});
localFileInput.addEventListener("dragover", (event) => {
    event.stopPropagation();
    event.preventDefault();
    overlay.classList.add("drag");
});
localFileInput.addEventListener("drop", (event) => {
    event.stopPropagation();
    event.preventDefault();
    overlay.classList.remove("drag");
    localFileInput.files = event.dataTransfer.files;
    loadFile(event.dataTransfer.files[0]);
});

closeModal.addEventListener("click", () => {
    metadataModal.style.display = "none";
});

openModal.addEventListener("click", () => {
    metadataModal.style.display = "block";
});

reloadSwf.addEventListener("click", () => {
    if (player) {
        const confirmReload = confirm("Reload the current SWF?");
        if (confirmReload) {
            player.reload();
        }
    }
});

window.addEventListener("load", () => {
    if (
        navigator.userAgent.match(/iPad/i) ||
        navigator.userAgent.match(/iPhone/i)
    ) {
        localFileInput.removeAttribute("accept");
    }
    overlay.classList.remove("hidden");
});

window.onclick = (event) => {
    if (event.target === metadataModal) {
        metadataModal.style.display = "none";
    }
};
