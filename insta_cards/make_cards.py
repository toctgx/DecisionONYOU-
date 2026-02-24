from PIL import Image, ImageDraw, ImageFont
import textwrap, os
W,H=1080,1350
bg=(27,94,32)
white=(255,255,255)
font_path='/System/Library/Fonts/AppleSDGothicNeo.ttc'

def make_card(idx, title, body):
    img=Image.new('RGB',(W,H),bg)
    draw=ImageDraw.Draw(img)
    title_font=ImageFont.truetype(font_path, 72)
    body_font=ImageFont.truetype(font_path, 48)
    small_font=ImageFont.truetype(font_path, 36)
    y=140
    if title:
        for line in textwrap.wrap(title, width=16):
            draw.text((90,y), line, font=title_font, fill=white)
            y+=90
        y+=20
    if body:
        for para in body:
            for line in textwrap.wrap(para, width=22):
                draw.text((90,y), line, font=body_font, fill=white)
                y+=70
            y+=10
    draw.text((90,H-120), f"{idx}/5", font=small_font, fill=white)
    return img

cards=[
    ("오디션 자기소개\n10초 구성법", ["캐스팅 북마크", "오디션·캐스팅·연기"]),
    ("① 한 문장 핵심", ["“저는 ○○ 역할에 어울리는", "○○입니다.”", "한 줄로 정리해요"]),
    ("② 경험 1줄", ["최근 이력/장점을", "짧게 한 줄로", "신뢰도를 높여요"]),
    ("③ 이 자리의 목표", ["“오늘은 ○○ 역할을 위해", "왔습니다.”", "목적을 명확히"]),
    ("마무리", ["짧고 또렷하게", "마지막 여운을 남기기", "— 자신감 있게"])
]

outdir='/Users/toctgx/.openclaw/workspace/insta_cards'
os.makedirs(outdir, exist_ok=True)
for i,(title,body) in enumerate(cards,1):
    img=make_card(i,title,body)
    img.save(os.path.join(outdir, f'card_today_{i}.png'))
print('done')
