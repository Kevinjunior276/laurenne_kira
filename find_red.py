import sys
try:
    from PIL import Image
    import collections

    img = Image.open('images/logo11.jpeg').convert('RGB')
    pixels = list(img.getdata())
    
    red_pixels = []
    for p in pixels:
        r, g, b = p
        # Filter for "red" pixels: R > 150, and R > G + B (approximate)
        if r > 100 and r > g * 1.5 and r > b * 1.5:
            red_pixels.append(p)
            
    if not red_pixels:
        print("No red found.")
    else:
        counter = collections.Counter(red_pixels)
        most_common = counter.most_common(5)
        print("Most common red colors:")
        for color, count in most_common:
            hex_color = '#{:02x}{:02x}{:02x}'.format(*color)
            print(f"{hex_color} (RGB: {color}) - Count: {count}")
except Exception as e:
    print("Error:", e)
