const CHECK_INTERVAL = 1000;
const SPEED = 16;

let originalSpeed = 1;
let originalMuted = false;
let wasAd = false;

function getMoviePlayer() {
    return document.querySelector('#movie_player');
}

function getVideo() {
    return document.querySelector('video');
}

function isAd(moviePlayer) {
    return moviePlayer?.classList.contains('ad-showing');
}

function applyAdState(video) {
    if (video.playbackRate !== SPEED) {
        video.playbackRate = SPEED;
    }

    if (!video.muted) {
        video.muted = true;
    }
}

function restoreVideoState(video) {
    video.playbackRate = originalSpeed;
    video.muted = originalMuted;
}

function handleAd() {
    const moviePlayer = getMoviePlayer();
    const video = getVideo();

    if (!moviePlayer || !video) {
        return;
    }

    const adPlaying = isAd(moviePlayer);

    if (adPlaying) {
        if (!wasAd) {
            originalSpeed = video.playbackRate;
            originalMuted = video.muted;
            wasAd = true;
        }

        applyAdState(video);
        return;
    }

    if (wasAd) {
        restoreVideoState(video);
        wasAd = false;
    }
}

const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        if (
            mutation.type === 'attributes' &&
            mutation.attributeName === 'class'
        ) {
            handleAd();
            break;
        }
    }
});

function observePlayer() {
    const moviePlayer = getMoviePlayer();

    if (!moviePlayer) {
        return;
    }

    observer.observe(moviePlayer, {
        attributes: true,
        attributeFilter: ['class'],
    });
}

console.log('[Ad Skipper] Running...');
document.addEventListener('yt-navigate-finish', () => {
    observePlayer();
    handleAd();
});

setInterval(handleAd, CHECK_INTERVAL);

observePlayer();
handleAd();