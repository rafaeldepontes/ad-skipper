const SPEED = 16;
let originalSpeed = 1;
let originalMuted = false;
let wasAd = false;

function handleAd() {
    const video = document.querySelector('video');
    if (!video) return;

    const adSelectors = [
        '.ad-showing',
        '.ad-interrupting',
        '.ytp-ad-player-overlay',
        '.ytp-ad-skip-button',
        '.ytp-ad-skip-button-modern'
    ];

    const adShowing = document.querySelector(adSelectors.join(', '));

    const skipSelectors = [
        '.ytp-ad-skip-button',
        '.ytp-skip-ad-button',
        '.ytp-ad-skip-button-modern',
        '.ytp-skip-ad-button-modern',
        '.ytp-ad-skip-button-container [class*="skip"]',
        '[class*="ytp-ad-skip-button"]'
    ];
    const skipButton = document.querySelector(skipSelectors.join(', '));

    const overlayCloseButton = document.querySelector('.ytp-ad-overlay-close-button');

    const isAd = !!(adShowing || skipButton);

    if (isAd) {
        if (!wasAd) {
            originalSpeed = video.playbackRate;
            originalMuted = video.muted;
            wasAd = true;
        }

        if (video.playbackRate !== SPEED) {
            video.playbackRate = SPEED;
        }
        if (!video.muted) {
            video.muted = true;
        }
    } else {
        if (wasAd) {
            video.playbackRate = originalSpeed;
            video.muted = originalMuted;
            wasAd = false;
        }
    }

    // TODO: make this work in the future... I guess...
    //
    // if (overlayCloseButton) {
    //     const rect = overlayCloseButton.getBoundingClientRect();
    //     if (rect.width > 0 && rect.height > 0) {
    //         console.log('[AdSkipper] Closing overlay');
    //         simulateClick(overlayCloseButton);
    //     }
    // }
}

console.log('Ad Skipper running...')
setInterval(handleAd, 200);
