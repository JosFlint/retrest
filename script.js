document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const captureButton = document.getElementById('capture');
    const ctx = canvas.getContext('2d');

    // Access the user's rear camera with higher quality settings
    navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: { ideal: 'environment' }, // Use rear camera
            width: { ideal: 3840 }, // Increase width for higher resolution
            height: { ideal: 2160 }, // Increase height for higher resolution
            frameRate: { ideal: 60 } // Higher frame rate for smoother video
        }
    })
    .then(stream => {
        video.srcObject = stream;
        video.play();
    })
    .catch(err => {
        console.error('Error accessing the camera: ', err);
    });

    // Capture the photo with the red-tinted filter
    captureButton.addEventListener('click', () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Apply enhancements to the photo
        ctx.filter = 'sepia(0) saturate(30) hue-rotate(-120deg) brightness(1.2) contrast(1.2)';
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Create a download link for the captured photo
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'captured-photo.png'; // Name of the file
        link.click(); // Trigger the download
        
        // Optional: Display the canvas
        canvas.style.display = 'block';
    });

    // Apply filter to live video feed
    function applyFilter() {
        video.style.filter = 'sepia(0) saturate(30) hue-rotate(-120deg)';
    }

    // Call applyFilter function on video play
    video.addEventListener('play', applyFilter);
});
