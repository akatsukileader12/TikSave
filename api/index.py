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

    # We want a format that is likely to be a direct MP4 
    ydl_opts = {
        'format': 'bestvideo+bestaudio/best',
        'quiet': True,
        'no_warnings': True,
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(video_url, download=False)
            
            # This is the direct CDN link found by the server
            direct_link = info.get('url')
            
            return jsonify({
                "success": True,
                "download_url": direct_link,
                "title": info.get('title', 'TikTok Video')
            })
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

app_handler = app
