document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const captureButton = document.getElementById('capture');
    const ctx = canvas.getContext('2d');

    // Access the user's camera with higher quality settings
    navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: "user",
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            frameRate: { ideal: 30 }
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
        
        // Apply the red-tinted filter
        ctx.filter = 'sepia(0) saturate(30) hue-rotate(-120deg)';
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Display the canvas (optional)
        canvas.style.display = 'block';
        
        // Save the image
        const dataURL = canvas.toDataURL('image/png');
        console.log('Captured image data URL:', dataURL);
        
        // Optional: Display captured image
        const img = document.createElement('img');
        img.src = dataURL;
        document.body.appendChild(img);
    });
});
