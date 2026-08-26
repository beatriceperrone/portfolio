#!/usr/bin/env python3
"""Ritaglia le foto interne a 4:3 centrandole sul soggetto e le salva come JPEG ottimizzati.

Uso: python3 build/crop-gallery.py
Output: portfolio-v2/assets/foto/gallerie/<slug>/01.jpg, 02.jpg
"""
import json
import os

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_BASE = os.path.join(ROOT, "portfolio-v2", "assets", "foto", "gallerie")

# slug -> lista di (src relativo a ROOT, descrizione/alt)
PROJECTS = {
    "luoghi-comuni": [
        (
            "foto-interne-progetti/cariverona/photo_2024-10-17_10-36-09.jpg",
            "Un gruppo di persone osserva in controluce una suggestiva struttura architettonica circolare con un'installazione sospesa illuminata dalla luce naturale.",
            {"left": 0.0, "top": 0.08, "right": 1.0, "bottom": 0.6425},
        ),
        (
            "foto-interne-progetti/cariverona/photo_2024-10-17_10-41-48.jpg",
            "Due persone ammirano fotografie in bianco e nero esposte sulla parete di una galleria d'arte contemporanea, accanto a una grande scultura.",
            {"left": 0.0, "top": 0.23, "right": 1.0, "bottom": 0.98},
        ),
    ],
    "club-silencio": [
        (
            "foto-interne-progetti/club silencio/02 (1).jpg",
            "Una persona tiene in mano uno smartphone per scattare una foto a un elegante corridoio illuminato da luci scenografiche viola e blu.",
            {"left": 0.17, "top": 0.05, "right": 0.92, "bottom": 1.0},
        ),
        (
            "foto-interne-progetti/club silencio/Paratissima talents in mostra.jpg",
            "Due persone viste di spalle osservano e indicano una serie di piccole fotografie esposte sulla parete bianca di una galleria d'arte.",
            {"left": 0.05, "top": 0.0, "right": 0.94, "bottom": 1.0},
        ),
    ],
    "compay-segundo": [
        (
            "foto-interne-progetti/company segundo/ecco-il-grupo-compay-segundo-mio-padre-vive-nelle-sue-canzoni.jpg",
            "Un gruppo musicale in abiti eleganti si esibisce dal vivo su un palco illuminato da fasci di luce, con il cantante al centro che suona le maracas affiancato da chitarristi e fiati.",
            {"left": 0.18, "top": 0.0, "right": 0.93, "bottom": 1.0},
        ),
        (
            "foto-interne-progetti/company segundo/IMG-20260413-WA0041.jpg",
            "Un musicista suona con grande passione un contrabbasso e canta intensamente davanti a un microfono vintage sul palco.",
            {"left": 0.0, "top": 0.16, "right": 1.0, "bottom": 0.91},
        ),
    ],
    "cosmo-matinee": [
        (
            "foto-interne-progetti/cosmo/photo_2026-08-25_23-03-38.jpg",
            "Un concerto all'aperto con un gruppo musicale che si esibisce su un grande palco all'interno di una corte storica, davanti a un pubblico numeroso.",
            {"left": 0.0, "top": 0.24, "right": 1.0, "bottom": 0.99},
        ),
        (
            "foto-interne-progetti/cosmo/photo_2026-08-25_23-03-38 (2).jpg",
            "Un pubblico entusiasta con le braccia alzate assiste a un concerto all'aperto davanti a un grande palco allestito nella corte di una fortezza.",
            {"left": 0.0, "top": 0.33, "right": 1.0, "bottom": 0.75},
        ),
    ],
    "gianna-nannini": [
        (
            "foto-interne-progetti/gianna/294807252_591840545643879_6663700562805043217_n.jpg",
            "La cantante Gianna Nannini sorride con energia sul palco indossando un completo rosso acceso, illuminata da un intenso fascio di luce scenico.",
            {"left": 0.0, "top": 0.0, "right": 1.0, "bottom": 0.75},
        ),
        (
            "foto-interne-progetti/gianna/Gianna-Nannini.jpg",
            "Una cantante si esibisce con passione sul palco impugnando un microfono, indossando un completo rosso acceso su uno sfondo illuminato da luci ed effetti scenici.",
            {"left": 0.0, "top": 0.13, "right": 1.0, "bottom": 0.88},
        ),
    ],
    "giornata-del-giappone": [
        (
            "foto-interne-progetti/giappone/photo_2026-08-25_23-08-37.jpg",
            "Un'esposizione artigianale di ciondoli e collane realizzati con frammenti di ceramica decorata, disposti ordinatamente su piccole cornici di bambù sopra una stuoia.",
            {"left": 0.0, "top": 0.22, "right": 1.0, "bottom": 0.97},
        ),
        (
            "foto-interne-progetti/giappone/photo_2026-08-25_23-15-44.jpg",
            "Una donna con un kimono floreale tradizionale mostra la tecnica dell'origami ai partecipanti seduti attorno a un tavolo durante un laboratorio.",
            {"left": 0.0, "top": 0.11, "right": 1.0, "bottom": 0.73},
        ),
    ],
    "villaggio-della-salute": [
        (
            "foto-interne-progetti/vill salute/154043295-7ba62453-4da0-4637-b466-6be9ccc04b46.jpg",
            "Una spettacolare vista aerea della partenza della corsa podistica Stracôni a Cuneo, con una marea di partecipanti schierati lungo l'ampio corso cittadino.",
            {"left": 0.0, "top": 0.02, "right": 1.0, "bottom": 0.77},
        ),
        (
            "foto-interne-progetti/vill salute/Gallery_11 (1).webp",
            "Una relatrice parla con il microfono davanti al pubblico durante una conferenza dedicata alla salute e al benessere.",
            {"left": 0.03, "top": 0.0, "right": 0.815, "bottom": 1.0},
        ),
    ],
}


def crop_4_3(box, w, h):
    """Calcola un crop 4:3 centrato sul centro del box del modello, clampato ai bordi."""
    cx = (box["left"] + box["right"]) / 2 * w
    cy = (box["top"] + box["bottom"]) / 2 * h

    if w / h > 4 / 3:  # troppo larga -> ritaglia la larghezza
        crop_w = round(h * 4 / 3)
        crop_h = h
        x0 = int(round(cx - crop_w / 2))
        y0 = 0
    else:  # troppo alta (o quadrata) -> ritaglia l'altezza
        crop_w = w
        crop_h = round(w * 3 / 4)
        x0 = 0
        y0 = int(round(cy - crop_h / 2))

    # clamp ai bordi
    x0 = max(0, min(x0, w - crop_w))
    y0 = max(0, min(y0, h - crop_h))
    return (x0, y0, x0 + crop_w, y0 + crop_h)


def main():
    os.makedirs(OUT_BASE, exist_ok=True)
    rows = []
    for slug, items in PROJECTS.items():
        for i, (src, alt, box) in enumerate(items, start=1):
            src_path = os.path.join(ROOT, src)
            img = Image.open(src_path)
            img.load()
            w, h = img.size
            exif = img.info.get("exif")
            box4 = crop_4_3(box, w, h)
            cropped = img.crop(box4)

            # ridimensiona: lato lungo max 1600px
            max_side = 1600
            cw, ch = cropped.size
            if max(cw, ch) > max_side:
                scale = max_side / max(cw, ch)
                cropped = cropped.resize(
                    (round(cw * scale), round(ch * scale)), Image.LANCZOS
                )

            out_dir = os.path.join(OUT_BASE, slug)
            os.makedirs(out_dir, exist_ok=True)
            out_path = os.path.join(out_dir, f"{i:02d}.jpg")
            save_kwargs = {"quality": 85, "optimize": True}
            if exif:
                save_kwargs["exif"] = exif
            cropped.convert("RGB").save(out_path, "JPEG", **save_kwargs)

            rows.append(
                {
                    "slug": slug,
                    "file": f"{i:02d}.jpg",
                    "src": src,
                    "alt": alt,
                    "orig": [w, h],
                    "box_model": box,
                    "crop_px": list(box4),
                    "out": [cropped.size[0], cropped.size[1]],
                }
            )
            print(f"✓ {slug}/{i:02d}.jpg  {w}x{h} -> crop {box4} -> {cropped.size[0]}x{cropped.size[1]}")

    manifest = os.path.join(OUT_BASE, "manifest.json")
    with open(manifest, "w", encoding="utf-8") as f:
        json.dump(rows, f, ensure_ascii=False, indent=2)
    print(f"\nManifest salvato in {manifest}")


if __name__ == "__main__":
    main()