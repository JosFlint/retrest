document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const captureButton = document.getElementById('capture');
    
    // Access the user's camera with 1080p resolution
    navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: { ideal: 'environment' }, // Use rear camera
            width: { ideal: 1920 }, // 1080p width
            height: { ideal: 1080 } // 1080p height
        }
    })
    .then(stream => {
        video.srcObject = stream;
        video.play();
    })
    .catch(err => {
        console.error('Error accessing the camera: ', err);
    });

    // Capture the photo with the red-tinted filter and increased brightness
    captureButton.addEventListener('click', () => {
        // Create an off-screen canvas to process the video frame
        const offScreenCanvas = document.createElement('canvas');
        const offScreenCtx = offScreenCanvas.getContext('2d');
        
        offScreenCanvas.width = video.videoWidth;
        offScreenCanvas.height = video.videoHeight;
        offScreenCtx.drawImage(video, 0, 0, offScreenCanvas.width, offScreenCanvas.height);
        
        // Apply enhancements to the photo with increased brightness
        offScreenCtx.filter = 'sepia(1) saturate(45) hue-rotate(-25deg) brightness(1.2)'; // Adjusted filter values
        offScreenCtx.drawImage(offScreenCanvas, 0, 0, offScreenCanvas.width, offScreenCanvas.height);
        
        // Convert canvas content to data URL
        const dataURL = offScreenCanvas.toDataURL('image/png');
        
        // Create a download link for the captured photo
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'captured-photo.png'; // Name of the file
        link.click(); // Trigger the download
    });

    // Apply filter to live video feed
    function applyFilter() {
        video.style.filter = 'sepia(1) saturate(45) hue-rotate(-25deg) brightness(1.2)'; // Adjusted filter values
    }

    // Call applyFilter function on video play
    video.addEventListener('play', applyFilter);
});
