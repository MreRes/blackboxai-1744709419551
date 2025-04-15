// Global variables
let mediaRecorder;
let recordedChunks = [];
let isRecording = false;

// DOM Elements
const videoInput = document.getElementById('videoInput');
const preview = document.getElementById('preview');
const startRecord = document.getElementById('startRecord');
const stopRecord = document.getElementById('stopRecord');
const processVideo = document.getElementById('processVideo');
const processingStatus = document.getElementById('processingStatus');
const progressBar = document.getElementById('progressBar');

// Initialize video recording capabilities
async function initializeCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        preview.srcObject = stream;
        
        mediaRecorder = new MediaRecorder(stream);
        
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: 'video/webm' });
            preview.src = URL.createObjectURL(blob);
            processVideo.disabled = false;
        };

        startRecord.disabled = false;
    } catch (err) {
        console.error('Error accessing camera:', err);
        alert('Could not access camera. Please ensure you have granted camera permissions.');
    }
}

// Event Listeners
startRecord.addEventListener('click', () => {
    if (!isRecording) {
        recordedChunks = [];
        mediaRecorder.start();
        isRecording = true;
        startRecord.innerHTML = '<i class="fas fa-pause mr-2"></i>Pause';
        stopRecord.disabled = false;
    } else {
        mediaRecorder.pause();
        startRecord.innerHTML = '<i class="fas fa-record-vinyl mr-2"></i>Resume';
    }
});

stopRecord.addEventListener('click', () => {
    mediaRecorder.stop();
    isRecording = false;
    startRecord.innerHTML = '<i class="fas fa-record-vinyl mr-2"></i>Start Recording';
    stopRecord.disabled = true;
});

videoInput.addEventListener('change', (event) => {
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        preview.src = URL.createObjectURL(file);
        processVideo.disabled = false;
    }
});

processVideo.addEventListener('click', async () => {
    processingStatus.classList.remove('hidden');
    
    // Simulate processing progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += 1;
        progressBar.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                processingStatus.classList.add('hidden');
                // Initialize 3D viewer with dummy data
                initializeViewer();
            }, 1000);
        }
    }, 100);
});

// Initialize camera and 3D viewer on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeCamera();
    initializeViewer(); // Initialize the 3D viewer immediately
});
