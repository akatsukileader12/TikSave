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
        // 1. Call your Vercel backend to get the direct video link
        const response = await fetch(`https://tik-save-sandy.vercel.app/api/download?url=${encodeURIComponent(url)}`);
        const data = await response.json();

        if (data.success) {
            // 2. IMPORTANT: Use the download_url exactly as it comes from the backend.
            // Do not add the Vercel domain prefix here anymore.
            saveLink.href = data.download_url; 
            
            // 3. Update the UI with the video title
            document.getElementById('videoTitle').innerText = data.title;

            // 4. Show the result section
            resultDiv.classList.remove('hidden');
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        console.error("Fetch error:", error);
        alert("Failed to connect to the server. Please check your internet or the Vercel logs.");
    } finally {
        // Hide loading state
        loader.classList.add('hidden');
    }
});
