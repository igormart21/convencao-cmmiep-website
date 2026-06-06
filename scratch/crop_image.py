from PIL import Image

img = Image.open('novos produdos /PHOTO-2026-06-06-06-48-34.jpg')

# Crop final focado, tirando o restinho do horário
x1 = 60
y1 = 760
x2 = 770
y2 = 1200

cropped = img.crop((x1, y1, x2, y2))
# Salva diretamente nos assets do projeto
cropped.save('src/assets/testimonial-carin.jpg')
print("Salvo imagem final em src/assets/testimonial-carin.jpg")
