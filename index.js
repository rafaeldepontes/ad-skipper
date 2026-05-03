const SPEED = 8;

function handleAd() {
    const video = document.querySelector('video');
    const isAd = document.querySelector('.ad-showing');

    if (!video) return;

    if (isAd) {
        if (video.playbackRate !== SPEED) {
            video.playbackRate = SPEED;
        }

    } else {
        if (video.playbackRate !== 1) {
            video.playbackRate = 1;
        }
    }
}

setInterval(handleAd, 300);