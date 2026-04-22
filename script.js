const downloadBtn = document.getElementById('downloadBtn');
const videoUrlInput = document.getElementById('videoUrl');
const loader = document.getElementById('loader');
const resultDiv = document.getElementById('result');
const saveLink = document.getElementById('saveLink');

downloadBtn.addEventListener('click', async () => {
    const url = videoUrlInput.value;
    if (!url) return alert("Please paste a URL!");

    // Show loading state
    loader.classList.remove('hidden');
    resultDiv.classList.add('hidden');

    try {
        // REPLACE THIS URL LATER with your Vercel/Render backend URL
        const response = await fetch(`https://your-backend-api.vercel.app/api/download?url=${encodeURIComponent(url)}`);
        const data = await response.json();

        if (data.success) {
            saveLink.href = data.download_url;
            resultDiv.classList.remove('hidden');
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        console.error(error);
        alert("Failed to connect to the server.");
    } finally {
        loader.classList.add('hidden');
    }
});
