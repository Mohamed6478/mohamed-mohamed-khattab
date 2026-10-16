import os

BASE_DIR = '/app/applet/public/assets'
PRINTS_DIR = os.path.join(BASE_DIR, 'prints')
HOODIES_DIR = os.path.join(BASE_DIR, 'hoodies')
PRODUCTS_DIR = os.path.join(BASE_DIR, 'products')

os.makedirs(PRINTS_DIR, exist_ok=True)
os.makedirs(HOODIES_DIR, exist_ok=True)
os.makedirs(PRODUCTS_DIR, exist_ok=True)

# 1. Palestine Map Calligraphy (على هذه الأرض ما يستحق الحياة)
palestine_map_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 800" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGradP" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0d0d0f"/>
      <stop offset="100%" stop-color="#050507"/>
    </linearGradient>
    <filter id="glowP" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#ffffff" flood-opacity="0.25"/>
    </filter>
  </defs>
  <rect width="500" height="800" rx="20" fill="url(#bgGradP)"/>
  <g transform="translate(40, 40)" filter="url(#glowP)">
    <!-- Map Outline Border -->
    <path d="M 210,20 L 250,50 L 260,110 L 230,160 L 245,210 L 225,270 L 235,320 L 210,400 L 195,490 L 180,590 L 170,680 L 160,700 L 155,670 L 145,550 L 130,440 L 110,360 L 95,290 L 80,210 L 115,160 L 140,110 L 175,50 Z" 
          fill="#121215" stroke="#FFFFFF" stroke-width="4.5" stroke-linejoin="round"/>
    
    <!-- Dome of the Rock silhouette in upper portion -->
    <g transform="translate(145, 90)">
      <!-- Base building -->
      <polygon points="10,80 110,80 100,50 20,50" fill="#202025" stroke="#E4E4E7" stroke-width="2"/>
      <rect x="25" y="52" width="70" height="28" fill="#18181B" stroke="#D4D4D8" stroke-width="1.5"/>
      <line x1="45" y1="52" x2="45" y2="80" stroke="#FFFFFF" stroke-width="1.5"/>
      <line x1="60" y1="52" x2="60" y2="80" stroke="#FFFFFF" stroke-width="1.5"/>
      <line x1="75" y1="52" x2="75" y2="80" stroke="#FFFFFF" stroke-width="1.5"/>
      <!-- Dome structure -->
      <path d="M 20,50 Q 60,-15 100,50 Z" fill="#26262B" stroke="#FFFFFF" stroke-width="2.5"/>
      <!-- Crescent / Spire -->
      <line x1="60" y1="-15" x2="60" y2="-30" stroke="#FFFFFF" stroke-width="2.5"/>
      <circle cx="60" cy="-33" r="4" fill="none" stroke="#FFFFFF" stroke-width="2"/>
      <!-- Olive branch flourish -->
      <path d="M 15,65 Q -10,50 5,30 Q 15,40 15,65 Z" fill="#FFFFFF" opacity="0.9"/>
      <path d="M -5,45 Q -25,35 -10,20 Q 0,30 -5,45 Z" fill="#FFFFFF" opacity="0.8"/>
    </g>

    <!-- Arabic Calligraphy "على هذه الأرض ما يستحق الحياة" -->
    <g fill="#FFFFFF" font-family="'Cairo', 'Amiri', 'Traditional Arabic', serif" font-weight="900">
      <text x="180" y="310" font-size="34" text-anchor="middle" letter-spacing="1">عَـلَى</text>
      <text x="175" y="370" font-size="38" text-anchor="middle" letter-spacing="1">هَـذِهِ</text>
      <text x="170" y="445" font-size="42" text-anchor="middle" letter-spacing="2">الأَرْضِ</text>
      <text x="168" y="525" font-size="36" text-anchor="middle" letter-spacing="1">مَـا</text>
      <text x="165" y="590" font-size="36" text-anchor="middle" letter-spacing="1">يَسْتَحِقُّ</text>
      <text x="162" y="660" font-size="40" text-anchor="middle" letter-spacing="2">الحَيَـاة</text>
    </g>
  </g>
</svg>'''

# 2. Palestinian Keffiyeh Pattern Triangle
keffiyeh_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <pattern id="fishnet" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M 0,15 Q 15,0 30,15 Q 15,30 0,15 Z" fill="none" stroke="#FFFFFF" stroke-width="2"/>
      <circle cx="15" cy="15" r="1.5" fill="#FFFFFF"/>
    </pattern>
    <pattern id="waves" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 0,10 L 10,0 L 20,10 L 10,20 Z" fill="none" stroke="#FFFFFF" stroke-width="2.5"/>
    </pattern>
  </defs>
  <rect width="600" height="600" fill="#0A0A0C" rx="16"/>
  <!-- Inverted Triangle Keffiyeh Bandana -->
  <g transform="translate(50, 60)">
    <!-- Main Triangle Outer -->
    <polygon points="0,40 500,40 250,480" fill="#111114" stroke="#FFFFFF" stroke-width="6" stroke-linejoin="round"/>
    
    <!-- Fishnet Center Area -->
    <polygon points="80,90 420,90 250,390" fill="url(#fishnet)" stroke="#FFFFFF" stroke-width="3"/>
    
    <!-- Bold Chevron Stripes (Borders) -->
    <polyline points="20,55 250,460 480,55" fill="none" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round"/>
    <polyline points="45,70 250,430 455,70" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-dasharray="10,6"/>
    
    <!-- Olive Leaf Wave Borders -->
    <path d="M 30,60 L 250,450" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="4,4"/>
    <path d="M 470,60 L 250,450" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="4,4"/>
    
    <!-- Hanging Tassels (هدب الكوفية) -->
    <g fill="#FFFFFF">
      <circle cx="20" cy="55" r="7"/>
      <path d="M 15,55 L 12,85 Q 20,95 28,85 L 25,55 Z"/>
      
      <circle cx="65" cy="135" r="6"/>
      <path d="M 60,135 L 56,165 Q 65,175 74,165 L 70,135 Z"/>
      
      <circle cx="115" cy="225" r="6"/>
      <path d="M 110,225 L 106,255 Q 115,265 124,255 L 120,225 Z"/>
      
      <circle cx="170" cy="325" r="6"/>
      <path d="M 165,325 L 161,355 Q 170,365 179,355 L 175,325 Z"/>
      
      <!-- Center Bottom Tassel -->
      <circle cx="250" cy="480" r="9"/>
      <path d="M 243,480 L 238,525 Q 250,540 262,525 L 257,480 Z"/>
      
      <circle cx="330" cy="325" r="6"/>
      <path d="M 325,325 L 321,355 Q 330,365 339,355 L 335,325 Z"/>
      
      <circle cx="385" cy="225" r="6"/>
      <path d="M 380,225 L 376,255 Q 385,265 394,255 L 390,225 Z"/>
      
      <circle cx="435" cy="135" r="6"/>
      <path d="M 430,135 L 426,165 Q 435,175 444,165 L 440,135 Z"/>
      
      <circle cx="480" cy="55" r="7"/>
      <path d="M 475,55 L 472,85 Q 480,95 488,85 L 485,55 Z"/>
    </g>
  </g>
</svg>'''

# 3. "MONEY MONEY MONEY" Pink Bubble & Dollar Bills
money_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 700" width="100%" height="100%">
  <defs>
    <filter id="pinkGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#f43f5e" flood-opacity="0.8"/>
    </filter>
  </defs>
  <rect width="600" height="700" fill="#0D0D10" rx="16"/>
  
  <!-- Floating Dollar Bills background -->
  <g transform="translate(180, 70) rotate(-15)">
    <rect width="220" height="110" rx="6" fill="#1C281F" stroke="#4ADE80" stroke-width="2.5" opacity="0.85"/>
    <circle cx="110" cy="55" r="32" fill="none" stroke="#4ADE80" stroke-width="2"/>
    <text x="110" y="62" font-family="monospace" font-size="24" fill="#4ADE80" text-anchor="middle" font-weight="bold">$100</text>
  </g>
  <g transform="translate(60, 260) rotate(22)">
    <rect width="210" height="105" rx="6" fill="#1C281F" stroke="#4ADE80" stroke-width="2.5" opacity="0.85"/>
    <circle cx="105" cy="52" r="30" fill="none" stroke="#4ADE80" stroke-width="2"/>
    <text x="105" y="60" font-family="monospace" font-size="22" fill="#4ADE80" text-anchor="middle" font-weight="bold">$100</text>
  </g>
  <g transform="translate(320, 380) rotate(-18)">
    <rect width="230" height="115" rx="6" fill="#1C281F" stroke="#4ADE80" stroke-width="2.5" opacity="0.85"/>
    <circle cx="115" cy="57" r="32" fill="none" stroke="#4ADE80" stroke-width="2"/>
    <text x="115" y="65" font-family="monospace" font-size="24" fill="#4ADE80" text-anchor="middle" font-weight="bold">$100</text>
  </g>
  <!-- Paper Airplane Dollar -->
  <g transform="translate(220, 480) rotate(-25)">
    <polygon points="0,40 140,0 80,60" fill="#E2E8F0" stroke="#10B981" stroke-width="2"/>
    <polygon points="80,60 140,0 60,90" fill="#CBD5E1" stroke="#10B981" stroke-width="1.5"/>
  </g>

  <!-- MONEY Typography Layers -->
  <g font-family="'Impact', 'Arial Black', sans-serif" font-weight="900" text-anchor="middle" letter-spacing="4">
    <!-- Top outline money -->
    <text x="300" y="180" font-size="82" fill="none" stroke="#F43F5E" stroke-width="6" stroke-linejoin="round" filter="url(#pinkGlow)">MONEY</text>
    <!-- Second money -->
    <text x="300" y="290" font-size="94" fill="#18181B" stroke="#FB7185" stroke-width="7" stroke-linejoin="round">MONEY</text>
    <!-- Solid Pink Bubble Money -->
    <text x="300" y="410" font-size="98" fill="#F43F5E" stroke="#FFFFFF" stroke-width="5" filter="url(#pinkGlow)">MONEY</text>
    <!-- Bottom line money -->
    <text x="300" y="530" font-size="88" fill="none" stroke="#FDA4AF" stroke-width="6" stroke-linejoin="round">MONEY</text>
  </g>
  
  <text x="300" y="630" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="28" fill="#FB7185" text-anchor="middle" letter-spacing="8">GIVE ME MONEY</text>
</svg>'''

# 4. "SAVAGE" Red 3D Embroidered Tribal Metal Typography
savage_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 500" width="100%" height="100%">
  <defs>
    <filter id="fabricTexture">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="noise"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.15 0"/>
      <feComposite in2="SourceGraphic" in="gl" operator="in"/>
    </filter>
    <filter id="embroiderGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#DC2626" flood-opacity="0.6"/>
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000000" flood-opacity="0.9"/>
    </filter>
    <linearGradient id="metalRed" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FF3333"/>
      <stop offset="45%" stop-color="#DC2626"/>
      <stop offset="75%" stop-color="#991B1B"/>
      <stop offset="100%" stop-color="#450A0A"/>
    </linearGradient>
  </defs>
  <rect width="700" height="500" fill="#08080A" rx="16"/>
  <!-- Fabric grid overlay -->
  <line x1="0" y1="250" x2="700" y2="250" stroke="#121216" stroke-width="500" stroke-dasharray="2,3" opacity="0.6"/>
  
  <g transform="translate(60, 140)" filter="url(#embroiderGlow)">
    <!-- Tribal Spikes & Gothic Metal SAVAGE -->
    <!-- S -->
    <path d="M 40,80 Q 20,40 60,20 Q 110,5 110,50 Q 100,90 40,110 Q 5,120 15,160 Q 30,200 95,190 Q 130,185 140,150 L 120,140 Q 100,165 75,165 Q 45,165 40,140 Q 40,115 80,100 Q 135,80 135,40 Q 130,0 80,0 Q 20,0 0,60 Z" 
          fill="url(#metalRed)" stroke="#7F1D1D" stroke-width="4"/>
    <path d="M 0,60 L -30,40 L 0,80 Z" fill="#DC2626"/>
    
    <!-- A -->
    <path d="M 140,190 L 190,10 L 230,10 L 280,190 L 235,190 L 220,140 L 190,140 L 175,190 Z M 198,110 L 214,110 L 206,60 Z" 
          fill="url(#metalRed)" stroke="#7F1D1D" stroke-width="4"/>
    <path d="M 210,10 L 210,-25 L 218,10 Z" fill="#EF4444"/>

    <!-- V -->
    <path d="M 270,10 L 315,190 L 345,190 L 390,10 L 345,10 L 330,130 L 315,10 Z" 
          fill="url(#metalRed)" stroke="#7F1D1D" stroke-width="4"/>
    <path d="M 330,190 L 330,230 L 335,190 Z" fill="#B91C1C"/>

    <!-- A -->
    <path d="M 380,190 L 430,10 L 470,10 L 520,190 L 475,190 L 460,140 L 430,140 L 415,190 Z M 438,110 L 454,110 L 446,60 Z" 
          fill="url(#metalRed)" stroke="#7F1D1D" stroke-width="4"/>
    <path d="M 450,10 L 450,-25 L 458,10 Z" fill="#EF4444"/>

    <!-- G -->
    <path d="M 580,50 Q 550,10 500,10 Q 440,10 440,100 Q 440,190 510,190 Q 560,190 580,140 L 530,140 Q 520,160 500,160 Q 470,160 470,100 Q 470,40 505,40 Q 535,40 550,65 Z" 
          fill="url(#metalRed)" stroke="#7F1D1D" stroke-width="4"/>

    <!-- E -->
    <path d="M 580,10 L 650,10 L 650,45 L 615,45 L 615,80 L 645,80 L 645,115 L 615,115 L 615,155 L 655,155 L 655,190 L 580,190 Z" 
          fill="url(#metalRed)" stroke="#7F1D1D" stroke-width="4"/>
    <path d="M 650,10 L 685,30 L 650,45 Z" fill="#DC2626"/>
    <path d="M 655,190 L 690,170 L 655,155 Z" fill="#B91C1C"/>
  </g>
</svg>'''

# 5. "BALANCE" Y2K Chrome Pink Metallic Bubble & Starburst
balance_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 450" width="100%" height="100%">
  <defs>
    <linearGradient id="chromeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="25%" stop-color="#FBCFE8"/>
      <stop offset="50%" stop-color="#F472B6"/>
      <stop offset="52%" stop-color="#831843"/>
      <stop offset="70%" stop-color="#DB2777"/>
      <stop offset="100%" stop-color="#FFFFFF"/>
    </linearGradient>
    <filter id="starGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="0" stdDeviation="12" flood-color="#F472B6" flood-opacity="0.8"/>
    </filter>
  </defs>
  <rect width="700" height="450" fill="#0C0A0E" rx="16"/>

  <!-- Liquid Chrome Oval Pod Backdrop -->
  <g transform="translate(50, 60)">
    <path d="M 60,160 Q 20,40 180,40 Q 420,10 540,80 Q 620,140 560,240 Q 480,300 280,290 Q 90,280 60,160 Z" 
          fill="#1F0E17" stroke="#DB2777" stroke-width="6"/>
    <path d="M 80,150 Q 50,60 190,60 Q 400,30 510,95 Q 570,145 525,225 Q 450,275 280,265 Q 120,255 80,150 Z" 
          fill="#3B1124" stroke="#F472B6" stroke-width="2"/>
    
    <!-- Left Starburst -->
    <g transform="translate(100, 50)" filter="url(#starGlow)">
      <polygon points="0,-45 8,-12 45,0 8,12 0,45 -8,12 -45,0 -8,-12" fill="url(#chromeGrad)"/>
    </g>

    <!-- Right Bottom Starburst -->
    <g transform="translate(510, 240)" filter="url(#starGlow)">
      <polygon points="0,-55 10,-15 55,0 10,15 0,55 -10,15 -55,0 -10,-15" fill="url(#chromeGrad)"/>
    </g>

    <!-- BALANCE Inflatable 3D Bubble Letters -->
    <text x="300" y="200" font-family="'Arial Black', 'Impact', sans-serif" font-weight="900" font-size="95" 
          fill="url(#chromeGrad)" stroke="#500724" stroke-width="8" text-anchor="middle" letter-spacing="4" filter="url(#starGlow)">
      BALANCE
    </text>
  </g>
</svg>'''

# 6. "TAKE THE RISK OR LOSE THE CHANCE" Retro Groovy 8-Ball
risk_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 700" width="100%" height="100%">
  <rect width="500" height="700" fill="#0A0A0C" rx="16"/>
  <g transform="translate(40, 40)" fill="#FFFFFF" text-anchor="middle" font-family="'Arial Black', sans-serif">
    <!-- Cloud & Stars at top -->
    <g fill="none" stroke="#FFFFFF" stroke-width="3">
      <path d="M 60,60 Q 75,30 105,45 Q 135,30 150,60 Q 165,75 145,95 L 60,95 Q 40,80 60,60 Z"/>
      <!-- Sparkle stars -->
      <polygon points="180,30 183,38 190,40 183,42 180,50 177,42 170,40 177,38" fill="#FFFFFF"/>
      <polygon points="280,35 283,43 290,45 283,47 280,55 277,47 270,45 277,43" fill="#FFFFFF"/>
    </g>

    <!-- TAKE THE -->
    <text x="210" y="115" font-size="52" font-weight="900" letter-spacing="3">TAKE THE</text>
    
    <!-- RISK (Groovy hollow outline with waves) -->
    <text x="210" y="240" font-size="115" font-weight="900" fill="none" stroke="#FFFFFF" stroke-width="7" letter-spacing="4">RISK</text>
    
    <!-- OR with 8-Ball -->
    <g transform="translate(100, 280)">
      <!-- 8-ball -->
      <circle cx="0" cy="50" r="38" fill="#FFFFFF" stroke="#000000" stroke-width="4"/>
      <circle cx="0" cy="50" r="18" fill="#000000"/>
      <text x="0" y="58" font-size="24" fill="#FFFFFF" font-weight="900" text-anchor="middle">8</text>
      <!-- OR text -->
      <text x="90" y="65" font-size="64" font-weight="900">OR</text>
      <!-- LOSE text -->
      <text x="210" y="65" font-size="70" font-weight="900" fill="none" stroke="#FFFFFF" stroke-width="5">LOSE</text>
    </g>

    <!-- THE CHANCE (Bottom wavy 70s typography) -->
    <text x="140" y="440" font-size="36" font-weight="900">THE</text>
    <text x="210" y="540" font-size="82" font-weight="900" letter-spacing="3">CHANCE</text>
  </g>
</svg>'''

# 7. "HEAVEN" Gothic Melting Airbrush Flame
heaven_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 700" width="100%" height="100%">
  <defs>
    <linearGradient id="flameBlur" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="25%" stop-color="#A78BFA"/>
      <stop offset="60%" stop-color="#DDD6FE"/>
      <stop offset="100%" stop-color="#1E1B4B" stop-opacity="0"/>
    </linearGradient>
    <filter id="motionBlur">
      <feGaussianBlur stdDeviation="3 8"/>
    </filter>
  </defs>
  <rect width="500" height="700" fill="#09090C" rx="16"/>

  <g transform="translate(250, 310)">
    <!-- Blurred downward flame trails -->
    <g filter="url(#motionBlur)" opacity="0.85">
      <path d="M -180,0 L -180,180 Q -160,240 -150,160 L -120,230 Q -100,280 -80,180 L -50,250 Q -20,310 0,200 L 30,270 Q 70,300 90,190 L 130,240 Q 150,270 170,170 L 180,0 Z" 
            fill="url(#flameBlur)"/>
    </g>

    <!-- Gothic Blackletter "heaven" -->
    <text x="0" y="30" font-family="'Old English Text MT', 'UnifrakturMaguntia', serif, 'Times New Roman'" 
          font-size="105" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="3">
      heaven
    </text>
  </g>
</svg>'''

# 8. "EUPHORIA" Liquid Chrome Melting Neon
euphoria_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 700" width="100%" height="100%">
  <defs>
    <linearGradient id="euphoriaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="20%" stop-color="#E879F9"/>
      <stop offset="45%" stop-color="#C084FC"/>
      <stop offset="70%" stop-color="#FB923C"/>
      <stop offset="95%" stop-color="#581C87" stop-opacity="0.1"/>
    </linearGradient>
    <filter id="liquidMelting">
      <feTurbulence type="fractalNoise" baseFrequency="0.02 0.08" numOctaves="2" result="warp"/>
      <feDisplacementMap in="SourceGraphic" in2="warp" scale="22" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
  </defs>
  <rect width="500" height="700" fill="#08070B" rx="16"/>

  <g transform="translate(250, 320)">
    <!-- Liquid Dripping Trails -->
    <g filter="url(#liquidMelting)">
      <path d="M -190,0 Q -170,140 -160,260 Q -140,360 -130,220 Q -110,340 -90,200 Q -60,370 -40,240 Q -10,390 10,210 Q 40,380 70,220 Q 100,350 120,200 Q 150,330 170,180 L 190,0 Z" 
            fill="url(#euphoriaGrad)" opacity="0.9"/>
    </g>

    <!-- Clean Typography Header -->
    <text x="0" y="25" font-family="'Plus Jakarta Sans', 'Arial Black', sans-serif" font-weight="900" 
          font-size="62" fill="#FFFFFF" text-anchor="middle" letter-spacing="6">
      EUPHORIA
    </text>
  </g>
</svg>'''

# 9. "THINK OUTSIDE THE BOX" Tic-Tac-Toe
think_outside_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 750" width="100%" height="100%">
  <rect width="500" height="750" fill="#FFFFFF" rx="16"/>
  <g transform="translate(50, 60)" font-family="'Comic Sans MS', 'Chalkboard SE', cursive, sans-serif">
    <!-- Handwritten Text -->
    <text x="200" y="80" font-size="68" font-weight="900" fill="#000000" text-anchor="middle" letter-spacing="2">THiNK</text>
    <text x="200" y="155" font-size="52" font-weight="900" fill="#000000" text-anchor="middle" letter-spacing="1">OUTSiDE THE</text>
    <text x="200" y="240" font-size="82" font-weight="900" fill="#000000" text-anchor="middle" letter-spacing="3">BoX</text>

    <!-- Tic Tac Toe Grid -->
    <g transform="translate(60, 270)" stroke="#000000" stroke-linecap="round">
      <!-- Grid lines -->
      <line x1="95" y1="20" x2="95" y2="300" stroke-width="9"/>
      <line x1="185" y1="20" x2="185" y2="300" stroke-width="9"/>
      <line x1="10" y1="110" x2="270" y2="110" stroke-width="9"/>
      <line x1="10" y1="205" x2="270" y2="205" stroke-width="9"/>

      <!-- O and X symbols -->
      <circle cx="50" cy="65" r="28" fill="none" stroke-width="8"/>
      <g stroke-width="8">
        <line x1="125" y1="45" x2="155" y2="85"/>
        <line x1="155" y1="45" x2="125" y2="85"/>
      </g>
      <g stroke-width="8">
        <line x1="215" y1="45" x2="245" y2="85"/>
        <line x1="245" y1="45" x2="215" y2="85"/>
      </g>

      <g stroke-width="8">
        <line x1="35" y1="140" x2="65" y2="180"/>
        <line x1="65" y1="140" x2="35" y2="180"/>
      </g>
      <g stroke-width="8">
        <line x1="125" y1="140" x2="155" y2="180"/>
        <line x1="155" y1="140" x2="125" y2="180"/>
      </g>
      <circle cx="230" cy="160" r="28" fill="none" stroke-width="8"/>

      <circle cx="50" cy="255" r="28" fill="none" stroke-width="8"/>
      <circle cx="140" cy="255" r="28" fill="none" stroke-width="8"/>
      <g stroke-width="8">
        <line x1="215" y1="235" x2="245" y2="275"/>
        <line x1="245" y1="235" x2="215" y2="275"/>
      </g>

      <!-- Red Line Breaking OUT of the Box -->
      <line x1="140" y1="-40" x2="140" y2="330" stroke="#DC2626" stroke-width="9" stroke-linecap="round"/>
    </g>
  </g>
</svg>'''

# 10. "07" Distressed Pink Grunge Varsity
distressed_07_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 550" width="100%" height="100%">
  <defs>
    <filter id="grungeScratch">
      <feTurbulence type="fractalNoise" baseFrequency="0.05 0.95" numOctaves="4" result="noise"/>
      <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 7 -3" result="contrast"/>
      <feComposite in2="SourceGraphic" in="contrast" operator="out"/>
    </filter>
  </defs>
  <rect width="600" height="550" fill="#0A0A0C" rx="16"/>

  <g transform="translate(60, 50)" filter="url(#grungeScratch)">
    <!-- 0 -->
    <path d="M 60,60 L 120,0 L 180,60 L 180,340 L 120,400 L 60,340 Z M 105,100 L 105,300 L 135,300 L 135,100 Z" 
          fill="#F472B6" stroke="#FFFFFF" stroke-width="6" stroke-linejoin="bevel"/>
    
    <!-- 7 -->
    <path d="M 260,0 L 440,0 L 440,70 L 350,400 L 270,400 L 355,80 L 260,80 Z" 
          fill="#F472B6" stroke="#FFFFFF" stroke-width="6" stroke-linejoin="bevel"/>
  </g>
</svg>'''

# 11. "ولسوف يعطيك ربك فترضى" Cute 3D Pink Calligraphy Cloud
calligraphy_pink_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 750" width="100%" height="100%">
  <defs>
    <filter id="cloudShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#F43F5E" flood-opacity="0.3"/>
    </filter>
  </defs>
  <rect width="500" height="750" fill="#E8DFD8" rx="16"/>

  <g transform="translate(80, 80)" filter="url(#cloudShadow)">
    <!-- Cloud Sticker Badge -->
    <path d="M 90,60 Q 60,10 130,20 Q 200,5 240,40 Q 290,10 320,60 Q 360,110 330,170 Q 370,230 330,300 Q 360,370 320,440 Q 340,510 280,550 Q 210,580 160,550 Q 90,580 50,510 Q 0,450 30,380 Q 0,310 20,240 Q -10,170 30,110 Q 40,40 90,60 Z" 
          fill="#FCE7F3" stroke="#FFFFFF" stroke-width="12" stroke-linejoin="round"/>
    
    <!-- Arabic Calligraphy in 3D Magenta/Rose -->
    <g fill="#DB2777" font-family="'Cairo', cursive, sans-serif" font-weight="900" text-anchor="middle">
      <text x="175" y="160" font-size="52" stroke="#FFFFFF" stroke-width="4">وَلَسَوْفَ</text>
      <text x="175" y="270" font-size="54" stroke="#FFFFFF" stroke-width="4">يُعْطِيكَ</text>
      <text x="175" y="380" font-size="58" stroke="#FFFFFF" stroke-width="4">رَبُّكَ</text>
      <text x="175" y="480" font-size="58" stroke="#FFFFFF" stroke-width="4">فَتَرْضَى</text>
      <!-- Heart -->
      <path d="M 175,520 C 175,510 155,495 140,510 C 120,530 150,555 175,570 C 200,555 230,530 210,510 C 195,495 175,510 175,520 Z" 
            fill="#E11D48"/>
    </g>
  </g>
</svg>'''

# 12. "SCREAM" Cyber Gothic Spider on Pink Web
scream_spider_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 700" width="100%" height="100%">
  <rect width="500" height="700" fill="#E4E4E7" rx="16"/>
  <g transform="translate(50, 100)">
    <!-- Cyber Gothic SCREAM in Hot Pink -->
    <text x="200" y="110" font-family="'Impact', sans-serif" font-size="82" font-weight="900" fill="#EC4899" text-anchor="middle" letter-spacing="4">
      SCREAM
    </text>

    <!-- Pink Spiderweb -->
    <g stroke="#EC4899" stroke-width="3" fill="none">
      <line x1="200" y1="280" x2="50" y2="160"/>
      <line x1="200" y1="280" x2="350" y2="160"/>
      <line x1="200" y1="280" x2="30" y2="300"/>
      <line x1="200" y1="280" x2="370" y2="300"/>
      <line x1="200" y1="280" x2="70" y2="440"/>
      <line x1="200" y1="280" x2="330" y2="440"/>
      <line x1="200" y1="280" x2="200" y2="490"/>
      <!-- Concentric Web Rings -->
      <polygon points="140,240 200,210 260,240 270,290 240,340 160,340 130,290"/>
      <polygon points="90,200 200,160 310,200 330,290 280,390 120,390 70,290"/>
      <polygon points="50,160 200,120 350,160 370,300 320,440 80,440 30,300"/>
    </g>

    <!-- Big Black Widow Spider -->
    <g transform="translate(200, 280)" fill="#111114" stroke="#111114">
      <!-- Body -->
      <ellipse cx="0" cy="15" rx="22" ry="32"/>
      <ellipse cx="0" cy="-20" rx="14" ry="12"/>
      <!-- Red Hourglass mark -->
      <polygon points="-5,10 5,10 0,18" fill="#EF4444"/>
      <polygon points="-5,26 5,26 0,18" fill="#EF4444"/>
      <!-- Legs (Long Creepy Joints) -->
      <g stroke-width="5" stroke-linecap="round" fill="none">
        <!-- Left Legs -->
        <polyline points="-12,-20 -50,-50 -90,-20"/>
        <polyline points="-14,-15 -65,-30 -110,10"/>
        <polyline points="-14,10 -70,20 -105,70"/>
        <polyline points="-12,25 -60,60 -80,120"/>
        <!-- Right Legs -->
        <polyline points="12,-20 50,-50 90,-20"/>
        <polyline points="14,-15 65,-30 110,10"/>
        <polyline points="14,10 70,20 105,70"/>
        <polyline points="12,25 60,60 80,120"/>
      </g>
    </g>
  </g>
</svg>'''

# 13. "PEACE - Living Life in Peace" Solitary Melting Blue Flame
peace_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 700" width="100%" height="100%">
  <defs>
    <linearGradient id="blueLiquid" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8"/>
      <stop offset="35%" stop-color="#2563EB"/>
      <stop offset="70%" stop-color="#1D4ED8"/>
      <stop offset="100%" stop-color="#0F172A" stop-opacity="0.1"/>
    </linearGradient>
    <filter id="liquidFlow">
      <feTurbulence type="fractalNoise" baseFrequency="0.015 0.08" numOctaves="3" result="warp"/>
      <feDisplacementMap in="SourceGraphic" in2="warp" scale="26" xChannelSelector="R" yChannelSelector="B"/>
    </filter>
  </defs>
  <rect width="500" height="700" fill="#090A0F" rx="16"/>

  <g transform="translate(250, 100)">
    <!-- Solitary details top -->
    <text x="-180" y="0" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" fill="#94A3B8" font-weight="700">DAY 224/365</text>
    <text x="0" y="0" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" fill="#94A3B8" font-weight="700" text-anchor="middle">LIVING LIFE IN PEACE</text>
    <text x="180" y="0" font-family="'Plus Jakarta Sans', sans-serif" font-size="14" fill="#94A3B8" font-weight="700" text-anchor="end">SOLITARY.DESIGNS</text>
    
    <g transform="translate(0, 220)">
      <!-- Dripping Liquid Blue Flames -->
      <g filter="url(#liquidFlow)">
        <path d="M -190,0 Q -160,180 -140,320 Q -120,400 -100,240 Q -80,380 -50,210 Q -20,420 10,230 Q 40,410 70,220 Q 100,370 130,210 Q 160,340 180,180 L 190,0 Z" 
              fill="url(#blueLiquid)" opacity="0.95"/>
      </g>
      <!-- PEACE Typography -->
      <text x="0" y="20" font-family="'Impact', 'Arial Black', sans-serif" font-weight="900" 
            font-size="88" fill="#0F172A" stroke="#38BDF8" stroke-width="5" text-anchor="middle" letter-spacing="4">
        PEACE
      </text>
    </g>
  </g>
</svg>'''

# 14. "SENIORS CLASS 27 FCES Cairo Uni"
seniors_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 750" width="100%" height="100%">
  <rect width="500" height="750" fill="#FFFFFF" rx="16"/>
  <g transform="translate(50, 60)" font-family="'Plus Jakarta Sans', 'Arial Black', sans-serif">
    <!-- SENIORS Title -->
    <text x="200" y="80" font-size="70" font-weight="900" fill="#9F1239" text-anchor="middle" letter-spacing="2">SENIORS</text>
    <text x="100" y="140" font-size="20" font-weight="800" fill="#FDA4AF">2009</text>
    <text x="200" y="145" font-size="44" font-weight="900" fill="#FECDD3" text-anchor="middle">CLASS</text>
    
    <!-- 27 Giant Badge -->
    <text x="160" y="240" font-size="110" font-weight="900" fill="#BE123C">27</text>
    
    <!-- Clapperboard -->
    <g transform="translate(230, 160)">
      <rect width="160" height="110" rx="8" fill="#FEE2E2" stroke="#9F1239" stroke-width="4"/>
      <rect width="160" height="30" rx="4" fill="#9F1239"/>
      <line x1="30" y1="0" x2="50" y2="30" stroke="#FFFFFF" stroke-width="4"/>
      <line x1="80" y1="0" x2="100" y2="30" stroke="#FFFFFF" stroke-width="4"/>
      <line x1="130" y1="0" x2="150" y2="30" stroke="#FFFFFF" stroke-width="4"/>
      <text x="80" y="52" font-size="13" font-weight="900" fill="#9F1239" text-anchor="middle">FCES Cairo Uni</text>
      <text x="80" y="74" font-size="13" font-weight="800" fill="#BE123C" text-anchor="middle">SENIOR 27</text>
      <text x="80" y="95" font-size="11" font-weight="700" fill="#881337" text-anchor="middle">The Last Episode</text>
    </g>

    <!-- Remembering Seniors ribbon & airplane -->
    <g transform="translate(40, 310)">
      <rect width="180" height="34" rx="17" fill="#BE123C"/>
      <text x="90" y="23" font-size="13" font-weight="800" fill="#FFFFFF" text-anchor="middle">REMEMBERING SENIORS</text>
    </g>

    <text x="200" y="420" font-size="28" font-weight="900" fill="#881337" text-anchor="middle">
      LONG STORY SHORT,
    </text>
    <text x="200" y="460" font-size="32" font-weight="900" fill="#9F1239" text-anchor="middle">
      I SURVIVED.
    </text>

    <!-- Paper airplane flight path -->
    <path d="M 120,490 Q 200,560 300,520" fill="none" stroke="#BE123C" stroke-width="3" stroke-dasharray="6,6"/>
    <g transform="translate(300, 500) rotate(15)">
      <polygon points="0,20 60,0 35,30" fill="#E11D48"/>
      <polygon points="35,30 60,0 25,45" fill="#BE123C"/>
    </g>
    <text x="360" y="560" font-size="22" font-weight="900" fill="#9F1239">2027</text>
  </g>
</svg>'''

# 15. Real Streetwear Oversized Hoodies (Blank Mockups in 4 colors)
def generate_hoodie_svg(color_name, fill_color, dark_shade, highlight):
  return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="100%" height="100%">
  <defs>
    <linearGradient id="hoodieBg-{color_name}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#18181B"/>
      <stop offset="100%" stop-color="#09090B"/>
    </linearGradient>
    <filter id="hoodieShadow">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.5"/>
    </filter>
  </defs>
  <rect width="800" height="1000" fill="url(#hoodieBg-{color_name})"/>

  <!-- ================= TOP: FRONT VIEW ================= -->
  <g transform="translate(150, 40)" filter="url(#hoodieShadow)">
    <!-- Hood -->
    <path d="M 170,90 Q 250,20 330,90 Q 300,120 250,115 Q 200,120 170,90 Z" fill="{dark_shade}"/>
    <path d="M 210,95 Q 250,55 290,95 Q 250,105 210,95 Z" fill="#000000" opacity="0.6"/>

    <!-- Sleeves (Drop Shoulder Boxy) -->
    <path d="M 120,100 L 20,270 L 60,290 L 130,190 Z" fill="{fill_color}"/>
    <path d="M 380,100 L 480,270 L 440,290 L 370,190 Z" fill="{fill_color}"/>
    <!-- Ribbed Cuffs -->
    <rect x="18" y="265" width="45" height="24" rx="4" fill="{dark_shade}" transform="rotate(25 40 275)"/>
    <rect x="437" y="265" width="45" height="24" rx="4" fill="{dark_shade}" transform="rotate(-25 460 275)"/>

    <!-- Torso Body -->
    <path d="M 120,100 Q 250,125 380,100 L 370,390 L 130,390 Z" fill="{fill_color}"/>

    <!-- Kangaroo Pocket -->
    <path d="M 175,270 L 325,270 L 345,360 L 155,360 Z" fill="{dark_shade}" stroke="{highlight}" stroke-width="1.5"/>
    <path d="M 155,310 Q 175,280 185,270" stroke="{highlight}" stroke-width="2" fill="none"/>
    <path d="M 345,310 Q 325,280 315,270" stroke="{highlight}" stroke-width="2" fill="none"/>

    <!-- Bottom Ribbed Hem -->
    <rect x="126" y="385" width="248" height="30" rx="4" fill="{dark_shade}"/>
  </g>

  <!-- Divider Line -->
  <line x1="200" y1="495" x2="600" y2="495" stroke="#27272A" stroke-width="1.5" stroke-dasharray="8,8"/>

  <!-- ================= BOTTOM: BACK VIEW ================= -->
  <g transform="translate(150, 520)" filter="url(#hoodieShadow)">
    <!-- Back Hood Down -->
    <path d="M 160,95 Q 250,180 340,95 Q 310,60 250,55 Q 190,60 160,95 Z" fill="{dark_shade}" stroke="{highlight}" stroke-width="1.5"/>
    
    <!-- Sleeves -->
    <path d="M 120,90 L 20,260 L 60,280 L 130,180 Z" fill="{fill_color}"/>
    <path d="M 380,90 L 480,260 L 440,280 L 370,180 Z" fill="{fill_color}"/>
    <!-- Cuffs -->
    <rect x="18" y="255" width="45" height="24" rx="4" fill="{dark_shade}" transform="rotate(25 40 265)"/>
    <rect x="437" y="255" width="45" height="24" rx="4" fill="{dark_shade}" transform="rotate(-25 460 265)"/>

    <!-- Torso Clean Back (Prime Canvas for Back Print) -->
    <path d="M 120,90 Q 250,110 380,90 L 370,380 L 130,380 Z" fill="{fill_color}"/>

    <!-- Printable Area Guide Box (Back) -->
    <rect x="175" y="140" width="150" height="200" rx="6" fill="none" stroke="{highlight}" stroke-width="1.5" stroke-dasharray="4,4" opacity="0.4"/>

    <!-- Bottom Ribbed Hem -->
    <rect x="126" y="375" width="248" height="30" rx="4" fill="{dark_shade}"/>
  </g>
</svg>'''

files = {
  os.path.join(PRINTS_DIR, 'palestine-map.svg'): palestine_map_svg,
  os.path.join(PRINTS_DIR, 'keffiyeh.svg'): keffiyeh_svg,
  os.path.join(PRINTS_DIR, 'money-money.svg'): money_svg,
  os.path.join(PRINTS_DIR, 'savage-metal.svg'): savage_svg,
  os.path.join(PRINTS_DIR, 'balance-y2k.svg'): balance_svg,
  os.path.join(PRINTS_DIR, 'take-risk.svg'): risk_svg,
  os.path.join(PRINTS_DIR, 'heaven-flame.svg'): heaven_svg,
  os.path.join(PRINTS_DIR, 'euphoria-neon.svg'): euphoria_svg,
  os.path.join(PRINTS_DIR, 'think-outside.svg'): think_outside_svg,
  os.path.join(PRINTS_DIR, 'distressed-07.svg'): distressed_07_svg,
  os.path.join(PRINTS_DIR, 'calligraphy-pink.svg'): calligraphy_pink_svg,
  os.path.join(PRINTS_DIR, 'scream-spider.svg'): scream_spider_svg,
  os.path.join(PRINTS_DIR, 'peace-living.svg'): peace_svg,
  os.path.join(PRINTS_DIR, 'seniors-27.svg'): seniors_svg,

  # Hoodies in 4 exact colors from user images
  os.path.join(HOODIES_DIR, 'hoodie-black.svg'): generate_hoodie_svg('black', '#18181B', '#0F0F11', '#27272A'),
  os.path.join(HOODIES_DIR, 'hoodie-white.svg'): generate_hoodie_svg('white', '#F4F4F5', '#E4E4E7', '#D4D4D8'),
  os.path.join(HOODIES_DIR, 'hoodie-maroon.svg'): generate_hoodie_svg('maroon', '#581C28', '#40121B', '#702433'),
  os.path.join(HOODIES_DIR, 'hoodie-grey.svg'): generate_hoodie_svg('grey', '#9CA3AF', '#6B7280', '#D1D5DB'),
}

for path, content in files.items():
  with open(path, 'w', encoding='utf-8') as f:
    f.write(content)
  print(f'Successfully created {path}')

print('All 18 SVG Brand Assets Generated Successfully!')
