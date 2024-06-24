document.addEventListener('DOMContentLoaded', function () {
    const video = document.getElementById('myVideo');
    const videoSource = document.getElementById('videoSource');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const volumeRange = document.getElementById('volumeRange');
    const muteBtn = document.getElementById('muteBtn');
    const seekRange = document.getElementById('seekRange');
    const currentTime = document.getElementById('currentTime');
    const duration = document.getElementById('duration');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const speedBtn = document.getElementById('speedBtn');
    const loopBtn = document.getElementById('loopBtn');
    const snapshotBtn = document.getElementById('snapshotBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const fileInput = document.getElementById('fileInput');
    const currentYear = document.getElementById('currentYear');

    // Set current year in footer
    currentYear.textContent = new Date().getFullYear();

    // Play/Pause button
    playPauseBtn.addEventListener('click', function () {
        if (video.paused || video.ended) {
            video.play();
            playPauseBtn.textContent = 'Pause';
        } else {
            video.pause();
            playPauseBtn.textContent = 'Play';
        }
    });

    // Volume control
    volumeRange.addEventListener('input', function () {
        video.volume = this.value;
        if (video.volume === 0) {
            muteBtn.textContent = 'Unmute';
        } else {
            muteBtn.textContent = 'Mute';
        }
    });

    // Mute button
    muteBtn.addEventListener('click', function () {
        if (video.volume > 0) {
            video.volume = 0;
            volumeRange.value = 0;
            muteBtn.textContent = 'Unmute';
        } else {
            video.volume = 1;
            volumeRange.value = 1;
            muteBtn.textContent = 'Mute';
        }
    });

    // Seek control
    video.addEventListener('timeupdate', function () {
        seekRange.value = video.currentTime / video.duration;
        currentTime.textContent = formatTime(video.currentTime);
    });

    seekRange.addEventListener('input', function () {
        video.currentTime = this.value * video.duration;
    });

    // Display duration
    video.addEventListener('loadedmetadata', function () {
        duration.textContent = formatTime(video.duration);
    });

    // Fullscreen button
    fullscreenBtn.addEventListener('click', function () {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) { /* Firefox */
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) { /* IE/Edge */
            video.msRequestFullscreen();
        }
    });

    // Speed button
    speedBtn.addEventListener('click', function () {
        const speeds = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 4.0, 4.5, 5.0, 5.5, 6.0];
        const currentSpeed = video.playbackRate;
        const nextSpeed = speeds[(speeds.indexOf(currentSpeed) + 1) % speeds.length];
        video.playbackRate = nextSpeed;
        speedBtn.textContent = `Speed (${nextSpeed}x)`;
    });

    // Loop button
    loopBtn.addEventListener('click', function () {
        video.loop = !video.loop;
        loopBtn.textContent = video.loop ? 'Loop: On' : 'Loop: Off';
    });

    // Snapshot button
    snapshotBtn.addEventListener('click', function () {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const snapshotURL = canvas.toDataURL('image/png');
        const snapshotLink = document.createElement('a');
        snapshotLink.href = snapshotURL;
        snapshotLink.download = 'snapshot.png';
        snapshotLink.click();
    });

    // Download button
    downloadBtn.addEventListener('click', function () {
        const a = document.createElement('a');
        a.href = video.src;
        a.download = 'video.mp4';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });

    // File input change handler
    fileInput.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            const fileURL = URL.createObjectURL(file);
            videoSource.src = fileURL;
            video.load(); // Load new video source
            playPauseBtn.textContent = 'Play';
        }
    });

    // Format time function
    function formatTime(seconds) {
        let minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
    }
});
