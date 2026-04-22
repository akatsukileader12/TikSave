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
            
            # We return a link that points back to OUR OWN proxy route
            # This ensures the browser doesn't get blocked by TikTok
            proxy_url = f"/api/proxy?url={direct_link}"
            
            return jsonify({
                "success": True,
                "download_url": proxy_url,
                "title": info.get('title', 'video')
            })
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

@app.route('/api/proxy')
def proxy():
    target_url = request.args.get('url')
    if not target_url:
        return "No URL provided", 400

    # These headers trick TikTok into thinking we are a normal browser
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
        'Referer': 'https://www.tiktok.com/'
    }

    # Stream the video from TikTok through your Vercel server to the user
    def generate():
        r = requests.get(target_url, headers=headers, stream=True)
        for chunk in r.iter_content(chunk_size=1024 * 1024): # 1MB chunks
            if chunk:
                yield chunk

    return Response(generate(), content_type='video/mp4', headers={
        "Content-Disposition": "attachment; filename=tiktok_video.mp4"
    })

# Required for Vercel
def handler(event, context):
    return app(event, context)
