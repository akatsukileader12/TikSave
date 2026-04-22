const downloadBtn = document.getElementById('downloadBtn');
const videoUrlInput = document.getElementById('videoUrl');
const loader = document.getElementById('loader');
const resultDiv = document.getElementById('result');
const saveLink = document.getElementById('saveLink');
const videoTitle = document.getElementById('videoTitle');

downloadBtn.addEventListener('click', async () => {
    const url = videoUrlInput.value;
    if (!url) return alert("Please paste a URL!");

    // UI Reset
    loader.classList.remove('hidden');
    resultDiv.classList.add('hidden');

    try {
        // 1. Fetch the data from your Vercel API
        const response = await fetch(`https://tik-save-sandy.vercel.app/api/download?url=${encodeURIComponent(url)}`);
        const data = await response.json();

        if (data.success) {
            // 2. Set the link to the direct CDN URL found by the backend
            saveLink.href = data.download_url; 
            
            // 3. Update the Title
            videoTitle.innerText = data.title;

            // 4. Show the result
            resultDiv.classList.remove('hidden');
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        console.error("Fetch error:", error);
        alert("Failed to connect to the server.");
    } finally {
        loader.classList.add('hidden');
    }
});
 
