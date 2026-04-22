from flask import Flask, request, jsonify
from flask_cors import CORS
import yt_dlp

app = Flask(__name__)
CORS(app)

@app.route('/api/download', methods=['GET'])
def download():
    video_url = request.args.get('url')
    if not video_url:
        return jsonify({"success": False, "message": "No URL provided"}), 400

    # We use 'best' to get a direct MP4 link that browsers can handle
    ydl_opts = {
        'format': 'best',
        'quiet': True,
        'no_warnings': True,
        'extractor_args': {'tiktok': {'webpage_download': False}}
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(video_url, download=False)
            
            # This is the direct address to the video file on TikTok's CDN
            direct_link = info.get('url')
            
            return jsonify({
                "success": True,
                "download_url": direct_link,
                "title": info.get('title', 'TikTok Video')
            })
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

# Required for Vercel
app_handler = app
