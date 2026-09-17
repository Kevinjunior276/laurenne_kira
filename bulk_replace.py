import os
import re

directory = 'c:/Users/user/Desktop/laurenne_kira-main'

# Files to update
html_files = [
    'about.html', 'activer-plan.html', 'contact.html',
    'destination.html', 'index.html', 'service.html', 'validation.html'
]

# Replacements for HTML files
replacements_html = {
    'images/log.jpg': 'images/logo11.jpeg',
    'https://www.facebook.com/profile.php?id=61558114561308': 'https://www.facebook.com/share/19MSZCKZ5x/?mibextid=wwXIfr',
    'https://www.facebook.com/share/1Z48gEaA4n/?mibextid=wwXIfr': 'https://www.facebook.com/share/19MSZCKZ5x/?mibextid=wwXIfr',
    'https://www.facebook.com/share/1DXZF4xuWf/?mibextid=wwXIfr': 'https://www.facebook.com/share/19MSZCKZ5x/?mibextid=wwXIfr',
    'https://https://www.facebook.com/profile.php?id=61558114561308': 'https://www.facebook.com/share/19MSZCKZ5x/?mibextid=wwXIfr'
}

for filename in html_files:
    filepath = os.path.join(directory, filename)
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        for old, new in replacements_html.items():
            content = content.replace(old, new)
            
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filename}")

# Replacements for CSS (style.css)
css_file = 'css/style.css'
css_filepath = os.path.join(directory, css_file)
if os.path.exists(css_filepath):
    with open(css_filepath, 'r', encoding='utf-8') as f:
        css_content = f.read()

    # The new red color is #e7040d. We will replace primary and some related ones.
    # --primary: #0967f5 !important;
    css_content = css_content.replace('--primary: #0967f5', '--primary: #e7040d')
    # --bs-primary: #bfdbfe; -> a lighter red for bs-primary, let's say #f87171 (Tailwind red-400) or just rgba
    css_content = css_content.replace('--bs-primary: #bfdbfe', '--bs-primary: #fca5a5') # light red
    # .text-primary { color: #1271e5 !important; /* Bleu clair */ }
    css_content = css_content.replace('color: #1271e5', 'color: #e7040d')
    # .btn-primary { background-color: #bfdbfe !important; border-color: #bfdbfe !important; }
    css_content = css_content.replace('background-color: #bfdbfe', 'background-color: #fca5a5')
    css_content = css_content.replace('border-color: #bfdbfe', 'border-color: #fca5a5')
    # .btn-primary:hover { background-color: #93c5fd !important; /* Couleur légèrement plus foncée pour le hover */ border-color: #4297f8 !important; }
    css_content = css_content.replace('background-color: #93c5fd', 'background-color: #f87171')
    css_content = css_content.replace('border-color: #4297f8', 'border-color: #ef4444')
    
    # Text colors
    css_content = css_content.replace('color: rgb(22, 185, 255)', 'color: #fca5a5') # footer-link hover
    css_content = css_content.replace('color: rgba(13, 110, 253, 0.9)', 'color: rgba(231, 4, 13, 0.9)')
    css_content = css_content.replace('color: rgba(13, 110, 253, 0.75)', 'color: rgba(231, 4, 13, 0.75)')
    css_content = css_content.replace('color: rgba(13, 110, 253, 0.6)', 'color: rgba(231, 4, 13, 0.6)')
    
    # animation colors
    # background: #2563eb; -> #e7040d
    css_content = css_content.replace('#2563eb', '#e7040d')
    css_content = css_content.replace('#2563eb88', '#e7040d88')
    css_content = css_content.replace('#2563eb99', '#e7040d99')
    
    # team hover btn hover
    css_content = css_content.replace('background: #93c5fd', 'background: #f87171')
    
    # Footer hover btn
    css_content = css_content.replace('color: #93c5fd', 'color: #f87171')

    with open(css_filepath, 'w', encoding='utf-8') as f:
        f.write(css_content)
    print(f"Updated {css_file}")

print("All replacements done.")
