document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const captureButton = document.getElementById('capture');

    // Access the user's camera with 1080p resolution and autofocus
    navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: { ideal: 'environment' }, // Prefer rear camera
            width: { ideal: 3840 },
            height: { ideal: 2160 },
            focusMode: 'auto' // Request autofocus
        }
    })
    .then(stream => {
        video.srcObject = stream;
        video.play();
    })
    .catch(err => {
        console.error('Error accessing the camera: ', err);
    });

    // Capture the photo with brightness and contrast adjustments
    captureButton.addEventListener('click', () => {
        // Create an off-screen canvas to process the video frame
        const offScreenCanvas = document.createElement('canvas');
        const offScreenCtx = offScreenCanvas.getContext('2d');

        offScreenCanvas.width = video.videoWidth;
        offScreenCanvas.height = video.videoHeight;
        offScreenCtx.drawImage(video, 0, 0, offScreenCanvas.width, offScreenCanvas.height);

        // Apply brightness and contrast to the canvas
        offScreenCtx.filter = 'sepia(1) saturate(40) hue-rotate(-35deg) brightness(0,9) contrast(0.9)'; // Adjusted filter values
        offScreenCtx.drawImage(offScreenCanvas, 0, 0, offScreenCanvas.width, offScreenCanvas.height);

        // Add text watermark to the canvas
        offScreenCtx.font = '30px Arial'; // Font size and family
        offScreenCtx.fillStyle = 'white'; // Text color
        offScreenCtx.textAlign = 'center'; // Center-align the text
        offScreenCtx.textBaseline = 'bottom'; // Align text to the bottom of the canvas
        const title = 'RE-VIEWING THE GAZE by Jo Flint';
        offScreenCtx.fillText(title, offScreenCanvas.width / 2, offScreenCanvas.height - 20); // Draw text on the canvas

        // Convert canvas content to data URL
        const dataURL = offScreenCanvas.toDataURL('image/png');

        // Create a download link for the captured photo
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'RE-VIEWING_THE_GAZE_by_Jo_Flint.png'; // Name of the file
        link.click(); // Trigger the download
    });

    // Apply filter to live video feed
    function applyFilter() {
        video.style.filter = 'sepia(1) saturate(2.5) hue-rotate(-90deg) brightness(0.9) contrast(1.7)'; // Adjusted filter values
    }

    // Call applyFilter function on video play
    video.addEventListener('play', applyFilter);
});
