document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const captureButton = document.getElementById('capture');
    const ctx = canvas.getContext('2d');

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

    // Capture the photo with the red-tinted filter
    captureButton.addEventListener('click', () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Apply enhancements to the photo
        ctx.filter = 'sepia(1) saturate(20) hue-rotate(-20deg)'; // Red tint
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
        video.style.filter = 'sepia(1) saturate(20) hue-rotate(-20deg)';
    }

    // Call applyFilter function on video play
    video.addEventListener('play', applyFilter);
});
