from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import yt_dlp
import requests

app = Flask(__name__)
# Replace with your actual GitHub Pages URL to make it more secure
CORS(app) 

@app.route('/api/download', methods=['GET'])
def download():
    video_url = request.args.get('url')
    if not video_url:
        return jsonify({"success": False, "message": "No URL provided"}), 400

    # yt-dlp options to get the best quality direct link
    ydl_opts = {
        'format': 'best',
        'quiet': True,
        'no_warnings': True,
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(video_url, download=False)
            direct_link = info.get('url')
            
            # We return a path that points back to our own proxy route
            proxy_url = f"/api/proxy?url={direct_link}"
            
            return jsonify({
                "success": True,
                "download_url": proxy_url,
                "title": info.get('title', 'TikTok Video')
            })
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

@app.route('/api/proxy')
def proxy():
    target_url = request.args.get('url')
    if not target_url:
        return "No URL provided", 400

    # Advanced headers to bypass TikTok's security and prevent 403 Forbidden
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        'Accept': '*/*',
        'Accept-Encoding': 'identity;q=1, *;q=0',
        'Accept-Language': 'en-US,en;q=0.9',
        'Range': 'bytes=0-',  # Important for video streaming
        'Referer': 'https://www.tiktok.com/',
        'Origin': 'https://www.tiktok.com/'
    }

    try:
        # We use a session to maintain connection persistence
        session = requests.Session()
        r = session.get(target_url, headers=headers, stream=True, timeout=15)
        
        # If TikTok rejects us (403/429), we want to see it in the logs
        if r.status_code not in [200, 206]:
            return f"TikTok Error: {r.status_code}", r.status_code

        def generate():
            # Stream the file in 1MB chunks to the browser
            for chunk in r.iter_content(chunk_size=1024 * 1024):
                if chunk:
                    yield chunk

        return Response(
            generate(),
            content_type='video/mp4',
            headers={
                "Content-Disposition": "attachment; filename=tiktok_video.mp4",
                "Content-Length": r.headers.get('Content-Length', '0')
            }
        )
    except Exception as e:
        return str(e), 500

# This is critical for Vercel to recognize the app
app_handler = app
