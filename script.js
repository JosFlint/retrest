document.addEventListener("DOMContentLoaded", function() {
    const video = document.getElementById('videoElement');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    // Access the user's camera
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;

            video.addEventListener('play', function () {
                // Set canvas size to match video dimensions
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                // Draw the video frame onto the canvas continuously
                function drawFrame() {
                    context.drawImage(video, 0, 0, canvas.width, canvas.height);
                    requestAnimationFrame(drawFrame);
                }
                drawFrame();
            });
        })
        .catch((error) => {
            console.error('Error accessing the camera:', error);
        });
});
