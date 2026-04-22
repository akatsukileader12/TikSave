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
        // 1. Call your Vercel backend
        const response = await fetch(`https://tik-save-sandy.vercel.app/api/download?url=${encodeURIComponent(url)}`);
        const data = await response.json();

        if (data.success) {
            // 2. Set the link to your Proxy route
            saveLink.href = `https://tik-save-sandy.vercel.app${data.download_url}`;
            
            // 3. Show the result
            resultDiv.classList.remove('hidden');
        } else {
            alert("Error: " + data.message);
        }
    } catch (error) {
        console.error("Fetch error:", error);
        alert("Failed to connect to the server. Check console for details.");
    } finally {
        // Hide loading state
        loader.classList.add('hidden');
    }
});
