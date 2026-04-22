from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import yt_dlp
import requests

app = Flask(__name__)
CORS(app)

@app.route('/api/download', methods=['GET'])
def download():
    video_url = request.args.get('url')
    if not video_url:
        return jsonify({"success": False, "message": "No URL provided"}), 400

    # We change the options to specifically look for the "nwm" (no watermark) version
    # which is often hosted on a different, less-protected server.
    ydl_opts = {
        'format': 'best',
        'quiet': True,
        'no_warnings': True,
        'extractor_args': {'tiktok': {'webpage_download': False}} 
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(video_url, download=False)
            
            # Look for the direct URL. If TikTok is blocking the proxy, 
            # we will try to give the user the direct link again but from a 
            # different 'format' that might not be as strictly locked.
            direct_link = info.get('url')
            
            return jsonify({
                "success": True,
                "download_url": direct_link, # Switching back to direct to see if this format works
                "title": info.get('title', 'TikTok Video')
            })
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

# Keep the proxy as a backup route if needed
@app.route('/api/proxy')
def proxy():
    target_url = request.args.get('url')
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/123.0.0.0 Safari/537.36',
        'Referer': 'https://www.tiktok.com/'
    }
    try:
        r = requests.get(target_url, headers=headers, stream=True, timeout=10)
        return Response(r.iter_content(chunk_size=1024*1024), content_type='video/mp4')
    except:
        return "Proxy Failed", 500

app_handler = app
