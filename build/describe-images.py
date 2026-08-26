#!/usr/bin/env python3
"""
Describe images and propose a 4:3 crop box using a vision model via OpenRouter.
Outputs JSON lines: one object per image with keys path, description, crop {left, top, right, bottom}.
Fractions are relative to the ORIGINAL image dimensions.
"""
import base64, json, os, sys, urllib.request

KEY = json.load(open(os.path.expanduser("~/.pi/agent/auth.json")))["openrouter"]["key"]
MODEL = os.environ.get("VISION_MODEL", "google/gemini-3.7-flash")

def encode_image(path, max_side=1024):
    from PIL import Image
    import io
    im = Image.open(path)
    im = im.convert("RGB")
    w, h = im.size
    scale = min(1.0, max_side / max(w, h))
    if scale < 1.0:
        im = im.resize((round(w * scale), round(h * scale)), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, format="JPEG", quality=80)
    return base64.b64encode(buf.getvalue()).decode(), (w, h)

def ask(path):
    b64, (orig_w, orig_h) = encode_image(path)
    data_uri = f"data:image/jpeg;base64,{b64}"
    prompt = (
        "You are helping crop a photo for a portfolio gallery. "
        "Describe the image briefly (1-2 sentences, in Italian). "
        "Then propose the best crop rectangle with aspect ratio 4:3 (landscape) that frames the main subject nicely. "
        "Return STRICT JSON only, no markdown, with this shape:\n"
        '{"description": "...", "crop": {"left": 0.0, "top": 0.0, "right": 1.0, "bottom": 0.75}}\n'
        "where left/top/right/bottom are fractions (0.0-1.0) of the original image width/height, "
        "and (right-left)/(bottom-top) must be as close as possible to 4/3. "
        "Keep the crop inside [0,1]. Prefer not to cut heads or key text."
    )
    body = {
        "model": MODEL,
        "messages": [
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {"type": "image_url", "image_url": {"url": data_uri}},
                ],
            }
        ],
        "temperature": 0.1,
        "max_tokens": 3000,
    }
    req = urllib.request.Request(
        "https://openrouter.ai/api/v1/chat/completions",
        data=json.dumps(body).encode(),
        headers={
            "Authorization": f"Bearer {KEY}",
            "Content-Type": "application/json",
        },
    )
    with urllib.request.urlopen(req, timeout=120) as r:
        resp = json.loads(r.read().decode())
    content = resp["choices"][0]["message"]["content"]
    if isinstance(content, list):
        content = "".join(
            p.get("text", "") for p in content if isinstance(p, dict)
        )
    if content is None:
        content = ""
    # strip markdown fences if present
    content = content.strip()
    if content.startswith("```"):
        content = content.split("```", 2)[1]
        if content.startswith("json"):
            content = content[4:]
        content = content.strip()
    return content, (orig_w, orig_h)

def main(paths):
    for p in paths:
        try:
            content, (w, h) = ask(p)
            print(json.dumps({"path": p, "size": [w, h], "model": MODEL, "raw": content}))
            sys.stdout.flush()
        except Exception as e:
            print(json.dumps({"path": p, "error": str(e)}))
            sys.stdout.flush()

if __name__ == "__main__":
    main(sys.argv[1:])
