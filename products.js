/**
 * products.js - بيانات المتجر الافتراضية لعلامة "كريم السيد" (KARIM ELSAYED)
 * متجر ملابس ستريت وير مصري راقي ومكتبة التصاميم الحصرية
 */

// التصنيفات المعتمدة للمتجر
const CATEGORIES = [
  { id: 'all', name: 'جميع المنتجات', nameEn: 'All Products' },
  { id: 'hoodies', name: 'هوديز', nameEn: 'Hoodies' },
  { id: 'oversized-tshirts', name: 'تيشيرتات أوفر سايز', nameEn: 'Oversized T-Shirts' },
  { id: 'printed-tshirts', name: 'تيشيرتات مطبوعة', nameEn: 'Printed T-Shirts' },
  { id: 'sweatshirts', name: 'سويت شيرت', nameEn: 'Sweatshirts' },
  { id: 'pants', name: 'بناطيل', nameEn: 'Pants' },
  { id: 'custom-print', name: 'طباعة حسب الطلب', nameEn: 'Custom Clothing' },
  { id: 'accessories', name: 'إكسسوارات', nameEn: 'Accessories' }
];

// المقاسات المتاحة
const AVAILABLE_SIZES = ['S', 'M', 'L', 'XL', '2XL', '3XL'];

// لوحة ألوان الأقمشة والملابس المعتمدة
const COLOR_PALETTE = [
  { id: 'black', name: 'أسود فحمي', nameEn: 'Charcoal Black', hex: '#141416' },
  { id: 'white', name: 'أبيض قطني', nameEn: 'Cotton White', hex: '#F4F4F5' },
  { id: 'maroon', name: 'عنابي / مارون', nameEn: 'Deep Maroon', hex: '#581C28' },
  { id: 'heather-grey', name: 'رمادي ميلانج', nameEn: 'Heather Grey', hex: '#9CA3AF' },
  { id: 'desert-beige', name: 'بيج صحراوي', nameEn: 'Desert Beige', hex: '#D7C4B7' },
  { id: 'deep-navy', name: 'كحلي ليلي', nameEn: 'Midnight Navy', hex: '#1E293B' },
  { id: 'forest-olive', name: 'زيتي عسكري', nameEn: 'Military Olive', hex: '#3E4E3A' }
];

// الإعدادات الافتراضية للمتجر
const DEFAULT_SETTINGS = {
  storeName: 'كريم السيد | KARIM ELSAYED',
  storeTagline: 'ستريت وير مصري راقي خامات قطنية 100%',
  whatsappNumber: '201012345678', // رقم افتراضي قابل للتعديل من لوحة الإدارة
  defaultDeliveryFee: 50,
  currency: 'ج.م',
  currencyEn: 'EGP'
};

// ==========================================================================
// مكتبة تصاميم كريم السيد الحصرية (Brand Graphic Prints & Artworks)
// مستخرجة ومطابقة تماماً لصور وتصاميم العميل الأصلية
// ==========================================================================
const BRAND_PRINTS = [
  {
    id: 'print-palestine-map',
    name: 'خارطة فلسطين — على هذه الأرض ما يستحق الحياة',
    nameEn: 'Palestine Map Calligraphy',
    category: 'وطني وخط عربي',
    image: '/assets/prints/palestine-map.svg',
    tag: 'الأكثر طلباً',
    description: 'تصميم خارطة فلسطين الكاملة مدمجة مع قبة الصخرة المشرفة وغصن الزيتون وخط عربي ثلث أصيل (على هذه الأرض ما يستحق الحياة).'
  },
  {
    id: 'print-keffiyeh',
    name: 'كوفية فلسطين الهندسية (Bandana Triangle)',
    nameEn: 'Palestinian Keffiyeh Bandana',
    category: 'وطني وتراثي',
    image: '/assets/prints/keffiyeh.svg',
    tag: 'تراث عصري',
    description: 'شال الكوفية الفلسطيني بتطريز هندسي مثلثي معكوس مع أهداب وزخارف شبك الصيد وأوراق الزيتون.'
  },
  {
    id: 'print-savage-metal',
    name: 'تطريز SAVAGE ميتال أحمر ثلاثي الأبعاد',
    nameEn: 'SAVAGE Red 3D Metal Embroidery',
    category: 'ستريت وير قوطي',
    image: '/assets/prints/savage-metal.svg',
    tag: 'إصدار ثقيل',
    description: 'شعار SAVAGE بحروف قوطية ترايبال ذات بروز معدني أحمر ناري وتفاصيل خياطة وتطريز فاخرة.'
  },
  {
    id: 'print-balance-y2k',
    name: 'BALANCE — ميتاليك كروم ونجوم Y2K روز',
    nameEn: 'BALANCE Metallic Chrome Y2K',
    category: 'Y2K وكروما',
    image: '/assets/prints/balance-y2k.svg',
    tag: 'تريند عصري',
    description: 'حروف BALANCE ثلاثية الأبعاد بلمعة الكروم الميتاليك باللون الوردي السائل ونجوم مشعة بتأثير الـ Y2K.'
  },
  {
    id: 'print-heaven-flame',
    name: 'HEAVEN — تيبوجرافي قوطي مع شعلة نارية ضبابية',
    nameEn: 'HEAVEN Gothic Melting Flame',
    category: 'قوطي ودارك ستريت',
    image: '/assets/prints/heaven-flame.svg',
    tag: 'شتاء 2026',
    description: 'خط إنجليزي قوطي عريق مع لهب متدرج ناعم ينساب إلى الأسفل بتدرجات اللافندر والأبيض الثلجي.'
  },
  {
    id: 'print-euphoria-neon',
    name: 'EUPHORIA — كروما سائل نيون متوهج',
    nameEn: 'EUPHORIA Liquid Neon Chrome',
    category: 'Y2K وكروما',
    image: '/assets/prints/euphoria-neon.svg',
    tag: 'ألوان سحرية',
    description: 'تأثير سائل متموج يذوب لأسفل بألوان النيون الأرجواني والبرتقالي المتوهج.'
  },
  {
    id: 'print-money-money',
    name: 'MONEY MONEY MONEY — بابل بينك ودولارات عائمة',
    nameEn: 'MONEY MONEY MONEY Pink Bubble',
    category: 'بوب آرت وستريت',
    image: '/assets/prints/money-money.svg',
    tag: 'الأكثر مبيعاً',
    description: 'حروف بابل عريضة محددة بالوردي مع دولارات وطيارة ورق نقدية عائمة وعبارة GIVE ME MONEY.'
  },
  {
    id: 'print-take-risk',
    name: 'TAKE THE RISK OR LOSE THE CHANCE — ريترو 8-Ball',
    nameEn: 'TAKE THE RISK Retro 8-Ball',
    category: 'ريترو وفينتاج',
    image: '/assets/prints/take-risk.svg',
    tag: 'كلاسيك',
    description: 'تصميم ريترو مميز مع كرة البلياردو رقم 8 وسحاب ونجوم براقة وكتابة ويفي جريئة.'
  },
  {
    id: 'print-think-outside',
    name: 'THINK OUTSIDE THE BOX — الخط الأحمر الجريء',
    nameEn: 'THINK OUTSIDE THE BOX Tic-Tac-Toe',
    category: 'إبداعي وسكتش',
    image: '/assets/prints/think-outside.svg',
    tag: 'مبدع',
    description: 'رسم يدوي للعبة تيك تاك تو مع خط أحمر متمرد يخرج عن حدود المربع ليعبر عن التفكير خارج الصندوق.'
  },
  {
    id: 'print-distressed-07',
    name: '07 — ديسترويد جرونج كوليدج بينك',
    nameEn: '07 Distressed Pink Varsity',
    category: 'رياضي وكوليدج',
    image: '/assets/prints/distressed-07.svg',
    tag: 'جرونج',
    description: 'أرقام رياضية كوليدج أمريكية بنمط الخدوش والجرونج باللون الوردي على الأسود الفاحم.'
  },
  {
    id: 'print-calligraphy-pink',
    name: 'ولسوف يعطيك ربك فترضى — خط عربي ثلاثي الأبعاد',
    nameEn: 'Arabic Blessing Calligraphy',
    category: 'وطني وخط عربي',
    image: '/assets/prints/calligraphy-pink.svg',
    tag: 'روحاني وعصري',
    description: 'آية كريمة بخط عربي ثري مجسم على هيئة استيكر سحابي باللون الوردي والقلب الرقيق.'
  },
  {
    id: 'print-scream-spider',
    name: 'SCREAM — سايبر سبايدر وشبكة وردية',
    nameEn: 'SCREAM Cyber Spider & Web',
    category: 'سايبر وميتال',
    image: '/assets/prints/scream-spider.svg',
    tag: 'جريء',
    description: 'عنكبوت الأرملة السوداء على شبكة عنكبوت وردية متوهجة مع كلمة SCREAM سايبر قوطية.'
  },
  {
    id: 'print-peace-living',
    name: 'PEACE — Living Life in Peace لهب أزرق سائل',
    nameEn: 'PEACE Liquid Blue Flame',
    category: 'ستريت وير معاصر',
    image: '/assets/prints/peace-living.svg',
    tag: 'تصميم نادر',
    description: 'شعار PEACE مسكوب بلهب بلازما أزرق سائل مع تفاصيل سوليتاري ديزاينز اليومية.'
  },
  {
    id: 'print-seniors-27',
    name: 'SENIORS CLASS 27 FCES — دفعة حاسبات القاهرة',
    nameEn: 'SENIORS CLASS 27 Cairo Uni',
    category: 'تخرج وجامعات',
    image: '/assets/prints/seniors-27.svg',
    tag: 'إصدار تخرج',
    description: 'تصميم جرافيكي متقن لاحتفالات التخرج مع كلاكيت السينما وطائرة ورقية وجملة Long story short, I survived.'
  }
];

// ==========================================================================
// قائمة منتجات المتجر المعتمدة لـ "كريم السيد" (18 منتجاً رسمياً)
// ==========================================================================
const INITIAL_PRODUCTS = [
  // --- قسم الهوديز (Hoodies) ---
  {
    id: 'prod-hoodie-savage',
    name: 'هودي أوفر سايز "SAVAGE" تطريز أحمر معدني',
    nameEn: 'SAVAGE Heavyweight Oversized Hoodie',
    description: 'هودي شتوي ثقيل فاخر 380 جرام مبطن بوبرة قطنية مصرية ناعمة، مع تطريز ثلاثي الأبعاد لشعار SAVAGE المعدني على الصدر أو الظهر، كابيشون مزدوج واسع وجيب كنغر مريح.',
    category: 'هوديز',
    price: 890,
    discountPrice: 790,
    sizes: ['M', 'L', 'XL', '2XL', '3XL'],
    colors: ['أسود فحمي'],
    stock: 25,
    customPrintable: true,
    isFeatured: true,
    isNew: true,
    isBestSeller: true,
    image: '/assets/products/product-hoodie-savage.svg',
    printDesignId: 'print-savage-metal'
  },
  {
    id: 'prod-hoodie-palestine',
    name: 'هودي أوفر سايز "على هذه الأرض ما يستحق الحياة"',
    nameEn: 'Palestine Calligraphy Heavyweight Hoodie',
    description: 'قطعة فنية تجسد الصمود والتراث. خارطة فلسطين الكاملة وقبة الصخرة بالخط العربي الأصيل مطبوعة بأعلى تقنيات الدي تي جي (DTG) غير القابلة للتشقق على قطن مصري نقي.',
    category: 'هوديز',
    price: 880,
    discountPrice: 780,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['أسود فحمي', 'أبيض قطني', 'عنابي / مارون'],
    stock: 35,
    customPrintable: true,
    isFeatured: true,
    isNew: true,
    isBestSeller: true,
    image: '/assets/products/product-hoodie-palestine.svg',
    printDesignId: 'print-palestine-map'
  },
  {
    id: 'prod-hoodie-keffiyeh',
    name: 'هودي ستريت وير "كوفية فلسطين الهندسية"',
    nameEn: 'Palestinian Keffiyeh Streetwear Hoodie',
    description: 'شال الكوفية بتوزيع هندسي مثلثي معكوس مع أهداب وزخارف شبك الصيد وأوراق الزيتون، لمسة فخمة تعبر عن الهوية بأسلوب الستريت وير العالمي الحديث.',
    category: 'هوديز',
    price: 860,
    discountPrice: 760,
    sizes: ['M', 'L', 'XL', '2XL'],
    colors: ['أسود فحمي'],
    stock: 20,
    customPrintable: true,
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
    image: '/assets/products/product-hoodie-keffiyeh.svg',
    printDesignId: 'print-keffiyeh'
  },
  {
    id: 'prod-hoodie-blank-black',
    name: 'هودي أوفر سايز سادة (Heavyweight Blank) — أسود',
    nameEn: 'Heavyweight Blank Hoodie — Charcoal Black',
    description: 'الهودي الأساسي المعتمد من كريم السيد. قماش قطني مصري 100% غير مخلوط بوزن 380 جرام، قصة أكتاف ساقطة (Drop Shoulder)، بوكسي واسع يدوم لسنوات.',
    category: 'هوديز',
    price: 690,
    discountPrice: 590,
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: ['أسود فحمي'],
    stock: 50,
    customPrintable: true,
    isFeatured: false,
    isNew: false,
    isBestSeller: true,
    image: '/assets/products/product-hoodie-blank-black.svg'
  },
  {
    id: 'prod-hoodie-blank-white',
    name: 'هودي أوفر سايز سادة (Heavyweight Blank) — أبيض ناصع',
    nameEn: 'Heavyweight Blank Hoodie — Cotton White',
    description: 'أبيض قطني فاخر معالج ومقاوم للاصفرار، مناسب للارتداء الكاجوال أو الطباعة المخصصة في استوديو التصميم الخاص بنا.',
    category: 'هوديز',
    price: 690,
    discountPrice: 590,
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: ['أبيض قطني'],
    stock: 45,
    customPrintable: true,
    isFeatured: false,
    isNew: true,
    isBestSeller: false,
    image: '/assets/products/product-hoodie-blank-white.svg'
  },
  {
    id: 'prod-hoodie-blank-maroon',
    name: 'هودي أوفر سايز سادة (Heavyweight Blank) — عنابي مارون',
    nameEn: 'Heavyweight Blank Hoodie — Deep Maroon',
    description: 'لون عنابي داكن ملكي فاخر، مصبوغ بأصباغ طبيعية صديقة للبيئة وثابتة تماماً ضد الغسيل المتكرر.',
    category: 'هوديز',
    price: 690,
    discountPrice: 590,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['عنابي / مارون'],
    stock: 30,
    customPrintable: true,
    isFeatured: false,
    isNew: true,
    isBestSeller: false,
    image: '/assets/products/product-hoodie-blank-maroon.svg'
  },
  {
    id: 'prod-hoodie-grey-loss',
    name: 'هودي أوفر سايز "Marceline Your Loss" — رمادي ميلانج',
    nameEn: 'Marceline Heavyweight Grey Hoodie',
    description: 'هودي رمادي ميلانج فاخر مع عبارة "Your loss is normal and doesn\'t concern me" وطبعة جيتار مارسلين القوطية على الصدر.',
    category: 'هوديز',
    price: 850,
    discountPrice: 750,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['رمادي ميلانج'],
    stock: 18,
    customPrintable: true,
    isFeatured: true,
    isNew: true,
    isBestSeller: false,
    image: '/assets/products/product-hoodie-grey-loss.svg'
  },

  // --- قسم تيشيرتات أوفر سايز (Oversized T-Shirts) ---
  {
    id: 'prod-tshirt-balance',
    name: 'تيشيرت أوفر سايز "BALANCE" ميتاليك كروم Y2K',
    nameEn: 'BALANCE Metallic Chrome Oversized T-Shirt',
    description: 'حروف BALANCE ثلاثية الأبعاد بلمعة الكروم الميتاليك باللون الوردي السائل مع نجوم مشعة بتأثير الـ Y2K الجذاب، قطن مصري 240 جرام ثقيل.',
    category: 'تيشيرتات أوفر سايز',
    price: 490,
    discountPrice: 420,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['أسود فحمي'],
    stock: 30,
    customPrintable: true,
    isFeatured: true,
    isNew: true,
    isBestSeller: true,
    image: '/assets/products/product-tshirt-balance.svg',
    printDesignId: 'print-balance-y2k'
  },
  {
    id: 'prod-tshirt-heaven',
    name: 'تيشيرت أوفر سايز "HEAVEN" فليم قوطي أسود',
    nameEn: 'HEAVEN Gothic Melting Oversized T-Shirt',
    description: 'طبعة تيبوجرافي قوطي أصيل مع ألسنة لهب متدرجة ناعمة تضفي طابع الغموض والفخامة لستايل الستريت وير المظلم.',
    category: 'تيشيرتات أوفر سايز',
    price: 480,
    discountPrice: 410,
    sizes: ['M', 'L', 'XL', '2XL'],
    colors: ['أسود فحمي'],
    stock: 26,
    customPrintable: true,
    isFeatured: true,
    isNew: true,
    isBestSeller: true,
    image: '/assets/products/product-tshirt-heaven.svg',
    printDesignId: 'print-heaven-flame'
  },
  {
    id: 'prod-tshirt-euphoria',
    name: 'تيشيرت أوفر سايز "EUPHORIA" نيون كروما سائل',
    nameEn: 'EUPHORIA Liquid Neon Oversized T-Shirt',
    description: 'تأثير سائل متموج يذوب لأسفل بألوان النيون الأرجواني والبرتقالي الساحر بتقنية DTG المباشرة على نسيج القطن المصري.',
    category: 'تيشيرتات أوفر سايز',
    price: 480,
    discountPrice: 410,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['أسود فحمي'],
    stock: 22,
    customPrintable: true,
    isFeatured: false,
    isNew: true,
    isBestSeller: false,
    image: '/assets/products/product-tshirt-euphoria.svg',
    printDesignId: 'print-euphoria-neon'
  },
  {
    id: 'prod-tshirt-peace',
    name: 'تيشيرت أوفر سايز "PEACE" الشعلة الزرقاء السائلة',
    nameEn: 'PEACE Liquid Blue Oversized T-Shirt',
    description: 'شعار PEACE بلهب البلازما الأزرق السائل مع تفاصيل سوليتاري ديزاينز اليومية وطبعة خلفية مميزة.',
    category: 'تيشيرتات أوفر سايز',
    price: 490,
    discountPrice: 430,
    sizes: ['M', 'L', 'XL', '2XL'],
    colors: ['أسود فحمي', 'كحلي ليلي'],
    stock: 24,
    customPrintable: true,
    isFeatured: false,
    isNew: true,
    isBestSeller: false,
    image: '/assets/products/product-tshirt-peace.svg',
    printDesignId: 'print-peace-living'
  },

  // --- قسم تيشيرتات مطبوعة (Printed T-Shirts) ---
  {
    id: 'prod-tshirt-money',
    name: 'تيشيرت ستريت وير "MONEY MONEY MONEY" بابل ودولارات',
    nameEn: 'MONEY MONEY MONEY Streetwear T-Shirt',
    description: 'تصميم بوب آرت عصري مع دولارات عائمة وحروف بابل عريضة باللون الوردي الناري، مظهر شبابي مفعم بالطاقة والحيوية.',
    category: 'تيشيرتات مطبوعة',
    price: 450,
    discountPrice: 380,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['أسود فحمي'],
    stock: 28,
    customPrintable: true,
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
    image: '/assets/products/product-tshirt-money.svg',
    printDesignId: 'print-money-money'
  },
  {
    id: 'prod-tshirt-risk',
    name: 'تيشيرت ريترو "TAKE THE RISK OR LOSE THE CHANCE"',
    nameEn: 'TAKE THE RISK Retro 8-Ball T-Shirt',
    description: 'تصميم ريترو بطابع السبعينيات مع كرة البلياردو رقم 8 ورسومات سحاب ونجوم براقة وكتابة ويفي جريئة تحفزك على خوض التجربة.',
    category: 'تيشيرتات مطبوعة',
    price: 440,
    discountPrice: 380,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['أسود فحمي'],
    stock: 32,
    customPrintable: true,
    isFeatured: false,
    isNew: false,
    isBestSeller: true,
    image: '/assets/products/product-tshirt-risk.svg',
    printDesignId: 'print-take-risk'
  },
  {
    id: 'prod-tshirt-think',
    name: 'تيشيرت أبيض "THINK OUTSIDE THE BOX" الخط الأحمر',
    nameEn: 'THINK OUTSIDE THE BOX Minimalist T-Shirt',
    description: 'رسم يدوي سكتش للعبة إكس أو مع خط أحمر متمرد يكسر حدود الصندوق ليعبر عن روح الإبداع والابتكار، قطن مصري ناصع.',
    category: 'تيشيرتات مطبوعة',
    price: 440,
    discountPrice: 370,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['أبيض قطني'],
    stock: 40,
    customPrintable: true,
    isFeatured: true,
    isNew: false,
    isBestSeller: false,
    image: '/assets/products/product-tshirt-think.svg',
    printDesignId: 'print-think-outside'
  },
  {
    id: 'prod-tshirt-07',
    name: 'تيشيرت ديسترويد جرونج "07" كوليدج بينك',
    nameEn: '07 Distressed Pink Varsity T-Shirt',
    description: 'أرقام رياضية كوليدج أمريكية بنمط الخدوش والجرونج باللون الوردي الجذاب على الأسود الفاحم.',
    category: 'تيشيرتات مطبوعة',
    price: 430,
    discountPrice: 360,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['أسود فحمي'],
    stock: 25,
    customPrintable: true,
    isFeatured: false,
    isNew: false,
    isBestSeller: false,
    image: '/assets/products/product-tshirt-07.svg',
    printDesignId: 'print-distressed-07'
  },
  {
    id: 'prod-tshirt-scream',
    name: 'تيشيرت سايبر "SCREAM" سبايدر وشبكة وردية',
    nameEn: 'SCREAM Cyber Spider T-Shirt',
    description: 'عنكبوت الأرملة السوداء على شبكة عنكبوت وردية متوهجة مع كلمة SCREAM سايبر قوطية على تيشيرت أبيض أو رمادي.',
    category: 'تيشيرتات مطبوعة',
    price: 450,
    discountPrice: 390,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: ['أبيض قطني', 'رمادي ميلانج'],
    stock: 22,
    customPrintable: true,
    isFeatured: false,
    isNew: true,
    isBestSeller: false,
    image: '/assets/products/product-tshirt-scream.svg',
    printDesignId: 'print-scream-spider'
  },
  {
    id: 'prod-tshirt-calligraphy',
    name: 'تيشيرت "ولسوف يعطيك ربك فترضى" خط عربي ثلاثي الأبعاد',
    nameEn: 'Arabic Blessing Calligraphy T-Shirt',
    description: 'آية كريمة مجسمة بتصميم سحابي وردي لطيف يمنحك الراحة والسكينة بإطلالة شبابية راقية.',
    category: 'تيشيرتات مطبوعة',
    price: 440,
    discountPrice: 380,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['أسود فحمي', 'بيج صحراوي'],
    stock: 20,
    customPrintable: true,
    isFeatured: false,
    isNew: false,
    isBestSeller: false,
    image: '/assets/products/product-tshirt-calligraphy.svg',
    printDesignId: 'print-calligraphy-pink'
  },
  {
    id: 'prod-tshirt-seniors',
    name: 'تيشيرت التخرج الرسمي "SENIORS CLASS 27 FCES"',
    nameEn: 'SENIORS CLASS 27 Graduation T-Shirt',
    description: 'تيشيرت التخرج السنوي المعتمد مع كلاكيت السينما وطائرة ورقية وجملة Long story short, I survived.',
    category: 'تيشيرتات مطبوعة',
    price: 460,
    discountPrice: 399,
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: ['أبيض قطني'],
    stock: 50,
    customPrintable: true,
    isFeatured: true,
    isNew: true,
    isBestSeller: true,
    image: '/assets/products/product-tshirt-seniors.svg',
    printDesignId: 'print-seniors-27'
  },

  // --- قسم طباعة حسب الطلب (Custom Clothing) ---
  {
    id: 'prod-custom-studio',
    name: 'استوديو طباعة حسب الطلب (تيشيرت أو هودي بتصميمك)',
    nameEn: 'Custom 2D Studio (T-Shirt or Hoodie)',
    description: 'اختر قطعتك المفضلة (تيشيرت أو هودي)، حدد اللون والمقاس، وارفع تصميمك الخاص أو اختر من مكتبة تصاميم كريم السيد الـ 14 الحصرية لمعاينة 2D مباشرة وإتمام الطلب.',
    category: 'طباعة حسب الطلب',
    price: 490,
    discountPrice: 420,
    sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
    colors: ['أسود فحمي', 'أبيض قطني', 'عنابي / مارون', 'رمادي ميلانج'],
    stock: 999,
    customPrintable: true,
    isFeatured: true,
    isNew: true,
    isBestSeller: true,
    image: '/assets/products/product-hoodie-savage.svg'
  },

  // --- قسم البناطيل والإكسسوارات ---
  {
    id: 'prod-cargo-pants',
    name: 'بنطلون كارغو ستريت وير تكتيكي بـ 6 جيوب',
    nameEn: 'Tactical 6-Pocket Cargo Pants',
    description: 'بنطلون كارغو متين من قماش الجبردين القطني المقاوم مع أربطة مطاطية عند الكاحل وجيوب تكتيكية واسعة تلائم نمط الحياة السريع.',
    category: 'بناطيل',
    price: 780,
    discountPrice: 690,
    sizes: ['M', 'L', 'XL', '2XL'],
    colors: ['أسود فحمي', 'زيتي عسكري', 'بيج صحراوي'],
    stock: 18,
    customPrintable: false,
    isFeatured: true,
    isNew: false,
    isBestSeller: true,
    image: '/assets/products/product-hoodie-blank-black.svg'
  },
  {
    id: 'prod-streetwear-cap',
    name: 'كاب ستريت وير مطرز بشعار كريم السيد',
    nameEn: 'Karim Elsayed Embroidered Cap',
    description: 'كاب كلاسيكي بـ 6 ألواح من القطن الثقيل المغسول مع تطريز بارز لشعار البراند وقفل معدني قابل للتعديل.',
    category: 'إكسسوارات',
    price: 280,
    discountPrice: 240,
    sizes: ['مقاس موحد'],
    colors: ['أسود فحمي', 'أبيض قطني'],
    stock: 40,
    customPrintable: false,
    isFeatured: false,
    isNew: true,
    isBestSeller: false,
    image: '/assets/prints/savage-metal.svg'
  }
];

// تصدير للبيئة العامة في المتصفح
window.DEFAULT_CATEGORIES = CATEGORIES;
window.DEFAULT_SIZES = AVAILABLE_SIZES;
window.DEFAULT_COLORS = COLOR_PALETTE;
window.DEFAULT_SETTINGS = DEFAULT_SETTINGS;
window.BRAND_PRINTS = BRAND_PRINTS;
window.INITIAL_PRODUCTS = INITIAL_PRODUCTS;
