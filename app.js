/**
 * app.js - المحرك البرمجي لمتجر "كريم السيد" (KARIM ELSAYED)
 * يدعم تشكيلة الملابس، استوديو الهودي والتيشيرت المخصص، معرض التصاميم، والسلة والواتساب
 * جافاسكريبت أصلي (Vanilla JS) نقي بدون مكتبات خارجية، متوافق مع GitHub Pages
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. مفاتيح التخزين المحلي والإعدادات العامة
  // ==========================================================================
  const STORAGE_KEYS = {
    PRODUCTS: 'karim_elsayed_products_v2',
    CART: 'karim_elsayed_cart_v2',
    SETTINGS: 'karim_elsayed_settings_v2',
    CUSTOMER: 'karim_elsayed_customer',
    LANG: 'karim_elsayed_lang'
  };

  // لغة العرض الحالية ('ar' | 'en')
  let currentLang = loadStorage(STORAGE_KEYS.LANG, 'ar');

  // تهيئة الإعدادات
  let appSettings = loadStorage(STORAGE_KEYS.SETTINGS, window.DEFAULT_SETTINGS || {
    storeName: 'كريم السيد | KARIM ELSAYED',
    whatsappNumber: '201012345678',
    defaultDeliveryFee: 50,
    currency: 'ج.م',
    currencyEn: 'EGP'
  });

  // تهيئة المنتجات (تحميل منتجات العميل الحقيقية تلقائياً)
  let products = loadStorage(STORAGE_KEYS.PRODUCTS, null);
  if (!products || !products.some(p => p.id === 'prod-hoodie-savage')) {
    products = [...(window.INITIAL_PRODUCTS || [])];
    saveStorage(STORAGE_KEYS.PRODUCTS, products);
  }

  // تصاميم البراند الحصرية
  const brandPrints = window.BRAND_PRINTS || [];

  // تهيئة السلة
  let cart = loadStorage(STORAGE_KEYS.CART, []);

  // حالة الفلتر الحالي للكتالوج والتصاميم
  let activeCategory = 'all';
  let activePrintCategory = 'all';
  let searchQuery = '';
  let activeSort = 'featured';

  // حالة استوديو التصميم المخصص (T-Shirt / Hoodie Studio)
  const designerState = {
    garmentType: 'tshirt', // 'tshirt' | 'hoodie'
    colorId: 'black',
    colorName: 'أسود فحمي',
    colorHex: '#141416',
    size: 'L',
    side: 'front', // 'front' | 'back'
    artworkSrc: '/assets/prints/palestine-map.svg', // بدء بتصميم افتراضي رائع
    artworkName: 'خارطة فلسطين — على هذه الأرض ما يستحق الحياة',
    artWidth: 100,
    artHeight: 100,
    posX: 0,
    posY: 0,
    scalePercent: 90,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    initialPosX: 0,
    initialPosY: 0,
    basePrice: 460,
    discountPrice: 399
  };

  // ==========================================================================
  // 2. دوال مساعدة وأمان وتخزين (Storage & Helpers)
  // ==========================================================================

  function loadStorage(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      console.warn(`تعذر قراءة ${key} من localStorage:`, e);
      return fallback;
    }
  }

  function saveStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn(`تعذر حفظ ${key} في localStorage:`, e);
    }
  }

  function escapeHtml(str) {
    if (typeof str !== 'string') return str;
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function formatMoney(amount) {
    if (typeof amount !== 'number' || isNaN(amount)) return `0 ${appSettings.currency}`;
    const curr = currentLang === 'en' ? appSettings.currencyEn : appSettings.currency;
    return `${amount.toLocaleString(currentLang === 'en' ? 'en-US' : 'ar-EG')} ${curr}`;
  }

  function showToast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '⚠️';

    toast.innerHTML = `<span>${icon}</span><span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 250);
    }, duration);
  }

  function showConfirm(title, message, onConfirm) {
    const backdrop = document.getElementById('confirmDialogBackdrop');
    const titleEl = document.getElementById('confirmDialogTitle');
    const msgEl = document.getElementById('confirmDialogMessage');
    const acceptBtn = document.getElementById('confirmDialogAcceptBtn');
    const cancelBtn = document.getElementById('confirmDialogCancelBtn');

    if (!backdrop) return;

    titleEl.textContent = title;
    msgEl.textContent = message;
    backdrop.classList.add('open');

    function cleanup() {
      backdrop.classList.remove('open');
      acceptBtn.removeEventListener('click', handleAccept);
      cancelBtn.removeEventListener('click', handleCancel);
    }

    function handleAccept() {
      cleanup();
      if (typeof onConfirm === 'function') onConfirm();
    }

    function handleCancel() {
      cleanup();
    }

    acceptBtn.addEventListener('click', handleAccept);
    cancelBtn.addEventListener('click', handleCancel);
  }

  // ضغط الصور المرفوعة محلياً
  function compressImage(file, maxDimension = 600, quality = 0.8) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          if (width > height && width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = reject;
        img.src = event.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('open');
  }

  // ==========================================================================
  // 3. عرض وتصفية كتالوج المنتجات (Products Catalog)
  // ==========================================================================

  function renderCatalog() {
    const grid = document.getElementById('productsGrid');
    const counterDisplayed = document.getElementById('displayedCount');
    const counterTotal = document.getElementById('totalCount');
    const noResults = document.getElementById('noProductsFound');

    if (!grid) return;

    if (counterTotal) counterTotal.textContent = products.length;

    // تصفية المنتجات
    let filtered = products.filter((item) => {
      // 1. تصنيف
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // 2. بحث
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const inName = (item.name || '').toLowerCase().includes(query) || (item.nameEn || '').toLowerCase().includes(query);
        const inDesc = (item.description || '').toLowerCase().includes(query);
        const inCat = (item.category || '').toLowerCase().includes(query);
        if (!inName && !inDesc && !inCat) return false;
      }
      return true;
    });

    // ترتيب المنتجات
    filtered.sort((a, b) => {
      if (activeSort === 'price-low') {
        const pA = a.discountPrice || a.price;
        const pB = b.discountPrice || b.price;
        return pA - pB;
      }
      if (activeSort === 'price-high') {
        const pA = a.discountPrice || a.price;
        const pB = b.discountPrice || b.price;
        return pB - pA;
      }
      if (activeSort === 'newest') {
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      }
      if (activeSort === 'bestseller') {
        return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      }
      // 'featured'
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });

    if (counterDisplayed) counterDisplayed.textContent = filtered.length;

    if (filtered.length === 0) {
      grid.innerHTML = '';
      if (noResults) noResults.style.display = 'block';
      return;
    }

    if (noResults) noResults.style.display = 'none';

    grid.innerHTML = filtered.map((prod) => {
      const isDiscounted = prod.discountPrice && prod.discountPrice < prod.price;
      const displayPrice = isDiscounted ? prod.discountPrice : prod.price;
      const discountPercent = isDiscounted ? Math.round(((prod.price - prod.discountPrice) / prod.price) * 100) : 0;
      const name = currentLang === 'en' && prod.nameEn ? prod.nameEn : prod.name;

      return `
        <article class="product-card" data-id="${prod.id}">
          <div class="product-card-img-wrap" onclick="window.openProductDetailModal('${prod.id}')">
            ${prod.isFeatured ? '<span class="product-badge featured">مميز</span>' : ''}
            ${prod.isNew && !prod.isFeatured ? '<span class="product-badge new">جديد</span>' : ''}
            ${isDiscounted ? `<span class="product-badge discount" style="left:12px;right:auto;">-${discountPercent}%</span>` : ''}

            <img src="${prod.image}" alt="${escapeHtml(name)}" loading="lazy" />

            <div class="product-card-overlay">
              <button type="button" class="btn-quick-view" onclick="event.stopPropagation(); window.openProductDetailModal('${prod.id}')">
                معاينة القطعة 👁️
              </button>
            </div>
          </div>

          <div class="product-card-content">
            <div class="product-category-tag">${escapeHtml(prod.category)}</div>
            <h3 class="product-card-title" onclick="window.openProductDetailModal('${prod.id}')">${escapeHtml(name)}</h3>
            <p class="product-card-desc">${escapeHtml(prod.description)}</p>

            <div class="product-card-footer">
              <div class="price-box">
                <span class="current-price">${formatMoney(displayPrice)}</span>
                ${isDiscounted ? `<span class="old-price">${formatMoney(prod.price)}</span>` : ''}
              </div>

              <button type="button" class="btn-add-cart-mini" onclick="window.quickAddToCart('${prod.id}')" title="أضف إلى السلة">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                </svg>
                <span>شراء</span>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // ==========================================================================
  // 4. عرض مكتبة تصاميم كريم السيد الحصرية (Brand Artworks Showcase)
  // ==========================================================================

  function renderBrandPrints() {
    const grid = document.getElementById('brandPrintsGrid');
    if (!grid) return;

    let filtered = brandPrints;
    if (activePrintCategory !== 'all') {
      filtered = brandPrints.filter(p => p.category === activePrintCategory);
    }

    grid.innerHTML = filtered.map((print) => {
      const title = currentLang === 'en' && print.nameEn ? print.nameEn : print.name;
      return `
        <div class="print-showcase-card" data-print-id="${print.id}">
          <div class="print-img-wrapper" onclick="window.tryPrintOnGarment('${print.id}')">
            <span class="print-tag-badge">${print.tag}</span>
            <img src="${print.image}" alt="${escapeHtml(title)}" loading="lazy" />
          </div>
          <div class="print-card-content">
            <div class="print-card-category">${escapeHtml(print.category)}</div>
            <h4 class="print-card-title">${escapeHtml(title)}</h4>
            <p class="print-card-desc">${escapeHtml(print.description)}</p>
            <button type="button" class="btn-try-print" onclick="window.tryPrintOnGarment('${print.id}')">
              <span>🎨 طباعة على هودي أو تيشيرت</span>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // تطبيق تصميم من المعرض مباشرة على استوديو الملابس
  window.tryPrintOnGarment = function (printId) {
    const print = brandPrints.find(p => p.id === printId);
    if (!print) return;

    loadArtworkIntoDesigner(print.image, print.name, print.id);

    // انتقال ناعم للاستوديو
    const studioSection = document.getElementById('custom-designer');
    if (studioSection) {
      studioSection.scrollIntoView({ behavior: 'smooth' });
    }

    showToast(`تم تحميل تصميم "${print.name}" على الموك أب بنجاح!`, 'success');
  };

  // ==========================================================================
  // 5. نافذة تفاصيل المنتج (Product Detail Modal)
  // ==========================================================================

  window.openProductDetailModal = function (productId) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('productModalBackdrop');
    const modalBody = document.getElementById('productModalBody');
    if (!modal || !modalBody) return;

    let selectedSize = product.sizes && product.sizes.length ? product.sizes[0] : 'L';
    let selectedColor = product.colors && product.colors.length ? product.colors[0] : 'أسود فحمي';
    let selectedQty = 1;

    const isDiscounted = product.discountPrice && product.discountPrice < product.price;
    const currentPrice = isDiscounted ? product.discountPrice : product.price;
    const prodName = currentLang === 'en' && product.nameEn ? product.nameEn : product.name;

    const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

    modalBody.innerHTML = `
      <div class="product-modal-grid">
        <div class="product-modal-gallery">
          <img src="${product.image}" alt="${escapeHtml(prodName)}" id="modalMainImg" style="width:100%;aspect-ratio:1/1.1;object-fit:cover;border-radius:var(--radius-md);background:#0a0a0c;" />
          ${product.printDesignId ? `
            <div style="margin-top:12px;">
              <button type="button" class="btn-outline" style="width:100%;font-size:0.85rem;" onclick="window.tryPrintOnGarment('${product.printDesignId}'); closeModal('productModalBackdrop');">
                🎨 تخصيص هذا التصميم في استوديو الطباعة
              </button>
            </div>
          ` : ''}
        </div>

        <div class="product-modal-info">
          <div class="product-category-tag">${escapeHtml(product.category)}</div>
          <h2 style="font-size:1.45rem;font-weight:900;margin-bottom:8px;line-height:1.3;">${escapeHtml(prodName)}</h2>

          <div style="display:flex;align-items:baseline;gap:12px;margin-bottom:16px;">
            <span style="font-size:1.6rem;font-weight:900;color:var(--text-pure);">${formatMoney(currentPrice)}</span>
            ${isDiscounted ? `<span style="font-size:1.05rem;color:var(--text-dark);text-decoration:line-through;">${formatMoney(product.price)}</span>` : ''}
            <span style="font-size:0.8rem;background:rgba(34,197,94,0.15);color:#22c55e;padding:3px 8px;border-radius:4px;font-weight:700;">متوفر بالمخزون</span>
          </div>

          <p style="color:var(--text-muted);font-size:0.9rem;line-height:1.6;">${escapeHtml(product.description)}</p>

          <!-- اختيار اللون -->
          <div>
            <div style="font-size:0.85rem;font-weight:700;margin-bottom:8px;">اللون: <span id="modalSelectedColorDisplay" style="color:var(--text-pure);">${escapeHtml(selectedColor)}</span></div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              ${(product.colors || []).map((c, i) => `
                <button type="button" class="tool-btn modal-color-btn ${i === 0 ? 'active' : ''}" data-color="${escapeHtml(c)}" style="${i === 0 ? 'background:var(--text-pure);color:var(--bg-main);border-color:var(--text-pure);' : ''}">
                  ${escapeHtml(c)}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- اختيار المقاس -->
          <div>
            <div style="font-size:0.85rem;font-weight:700;margin-bottom:8px;">المقاس: <span id="modalSelectedSizeDisplay" style="color:var(--text-pure);">${escapeHtml(selectedSize)}</span></div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              ${(product.sizes || []).map((s, i) => `
                <button type="button" class="size-pill-btn modal-size-btn ${i === 0 ? 'active' : ''}" data-size="${escapeHtml(s)}">
                  ${escapeHtml(s)}
                </button>
              `).join('')}
            </div>
          </div>

          <!-- الكمية وزر الإضافة -->
          <div style="display:flex;gap:14px;align-items:center;padding-top:14px;border-top:1px solid var(--border-subtle);">
            <div class="qty-control" style="height:44px;">
              <button type="button" class="qty-btn" id="modalQtyMinus" style="width:36px;height:44px;">-</button>
              <span class="qty-number" id="modalQtyDisplay" style="width:36px;">1</span>
              <button type="button" class="qty-btn" id="modalQtyPlus" style="width:36px;height:44px;">+</button>
            </div>

            <button type="button" class="btn-primary" id="modalAddToCartBtn" style="flex:1;height:44px;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
              </svg>
              <span>أضف إلى السلة</span>
            </button>
          </div>

        </div>
      </div>

      ${related.length > 0 ? `
        <div style="margin-top:36px;padding-top:24px;border-top:1px solid var(--border-subtle);">
          <h4 style="font-size:1rem;font-weight:800;color:var(--text-pure);margin-bottom:14px;">قطع مشابهة قد تعجبك:</h4>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(160px, 1fr));gap:14px;">
            ${related.map((r) => `
              <div style="background:var(--bg-surface);border:1px solid var(--border-subtle);border-radius:var(--radius-md);padding:10px;cursor:pointer;" onclick="window.openProductDetailModal('${r.id}')">
                <img src="${r.image}" alt="${escapeHtml(r.name)}" style="width:100%;aspect-ratio:1;object-fit:cover;border-radius:4px;margin-bottom:6px;" />
                <div style="font-size:0.85rem;font-weight:700;color:var(--text-pure);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(r.name)}</div>
                <div style="font-size:0.8rem;font-weight:900;color:var(--text-pure);">${formatMoney(r.discountPrice || r.price)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    `;

    // معالجة أحداث الألوان
    modalBody.querySelectorAll('.modal-color-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        modalBody.querySelectorAll('.modal-color-btn').forEach((b) => {
          b.style.background = '';
          b.style.color = '';
          b.style.borderColor = '';
        });
        btn.style.background = 'var(--text-pure)';
        btn.style.color = 'var(--bg-main)';
        btn.style.borderColor = 'var(--text-pure)';
        selectedColor = btn.dataset.color;
        const disp = document.getElementById('modalSelectedColorDisplay');
        if (disp) disp.textContent = selectedColor;
      });
    });

    // معالجة أحداث المقاسات
    modalBody.querySelectorAll('.modal-size-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        modalBody.querySelectorAll('.modal-size-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        selectedSize = btn.dataset.size;
        const disp = document.getElementById('modalSelectedSizeDisplay');
        if (disp) disp.textContent = selectedSize;
      });
    });

    // معالجة الكمية
    const qtyMinus = modalBody.querySelector('#modalQtyMinus');
    const qtyPlus = modalBody.querySelector('#modalQtyPlus');
    const qtyDisplay = modalBody.querySelector('#modalQtyDisplay');

    qtyMinus?.addEventListener('click', () => {
      if (selectedQty > 1) {
        selectedQty--;
        qtyDisplay.textContent = selectedQty;
      }
    });

    qtyPlus?.addEventListener('click', () => {
      selectedQty++;
      qtyDisplay.textContent = selectedQty;
    });

    // إضافة إلى السلة
    modalBody.querySelector('#modalAddToCartBtn')?.addEventListener('click', () => {
      addToCart({
        id: product.id,
        name: product.name,
        price: currentPrice,
        size: selectedSize,
        color: selectedColor,
        image: product.image,
        quantity: selectedQty,
        isCustom: false
      });
      closeModal('productModalBackdrop');
    });

    modal.classList.add('open');
  };

  // إضافة سريعة إلى السلة مباشرة من البطاقة
  window.quickAddToCart = function (productId) {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const defaultSize = product.sizes && product.sizes.length ? product.sizes[0] : 'L';
    const defaultColor = product.colors && product.colors.length ? product.colors[0] : 'أسود فحمي';
    const finalPrice = product.discountPrice || product.price;

    addToCart({
      id: product.id,
      name: product.name,
      price: finalPrice,
      size: defaultSize,
      color: defaultColor,
      image: product.image,
      quantity: 1,
      isCustom: false
    });
  };

  // ==========================================================================
  // 6. استوديو تصميم الملابس المخصص (Custom 2D Studio: Hoodie & T-Shirt)
  // ==========================================================================

  function loadArtworkIntoDesigner(imgSrc, name, printId = null) {
    const artworkImg = document.getElementById('customArtworkImg');
    const artworkElement = document.getElementById('customArtworkElement');
    const controlsContainer = document.getElementById('artworkControlsContainer');
    const printableArea = document.getElementById('printableArea');
    const scaleSlider = document.getElementById('artworkScaleSlider');
    const scaleLabel = document.getElementById('scaleValueLabel');

    if (!artworkImg || !artworkElement || !printableArea) return;

    designerState.artworkSrc = imgSrc;
    designerState.artworkName = name;
    artworkImg.src = imgSrc;

    artworkImg.onload = () => {
      const pRect = printableArea.getBoundingClientRect();
      const baseWidth = (pRect.width || 180) * 0.75;
      const naturalW = artworkImg.naturalWidth || 500;
      const naturalH = artworkImg.naturalHeight || 500;
      const ratio = naturalH / naturalW;

      designerState.artWidth = baseWidth;
      designerState.artHeight = baseWidth * ratio;
      designerState.scalePercent = 90;
      designerState.posX = ((pRect.width || 180) - designerState.artWidth) / 2;
      designerState.posY = ((pRect.height || 260) - designerState.artHeight) / 2;

      updateArtworkPosition();
      artworkElement.classList.add('active');
      if (controlsContainer) controlsContainer.style.display = 'block';

      if (scaleSlider) scaleSlider.value = 90;
      if (scaleLabel) scaleLabel.textContent = '90%';

      // تحديث الشريحة النشطة في المعرض
      document.querySelectorAll('.preset-print-chip').forEach((chip) => {
        chip.classList.toggle('active', chip.dataset.printId === printId);
      });
    };
  }

  function updateArtworkPosition() {
    const printableArea = document.getElementById('printableArea');
    const artworkElement = document.getElementById('customArtworkElement');
    if (!printableArea || !artworkElement) return;

    const pRect = printableArea.getBoundingClientRect();
    const currentWidth = (designerState.artWidth * designerState.scalePercent) / 100;
    const currentHeight = (designerState.artHeight * designerState.scalePercent) / 100;

    const maxX = (pRect.width || 180) - currentWidth;
    const maxY = (pRect.height || 260) - currentHeight;

    if (maxX >= 0) {
      designerState.posX = Math.max(0, Math.min(designerState.posX, maxX));
    } else {
      designerState.posX = 0;
    }

    if (maxY >= 0) {
      designerState.posY = Math.max(0, Math.min(designerState.posY, maxY));
    } else {
      designerState.posY = 0;
    }

    artworkElement.style.width = `${currentWidth}px`;
    artworkElement.style.height = `${currentHeight}px`;
    artworkElement.style.left = `${designerState.posX}px`;
    artworkElement.style.top = `${designerState.posY}px`;
  }

  function initCustomDesigner() {
    const dropzone = document.getElementById('uploadDropzone');
    const fileInput = document.getElementById('designerFileInput');
    const colorSwatchesContainer = document.getElementById('designerColorSwatches');
    const sizePillsContainer = document.getElementById('designerSizePills');
    const artworkElement = document.getElementById('customArtworkElement');
    const scaleSlider = document.getElementById('artworkScaleSlider');
    const scaleLabel = document.getElementById('scaleValueLabel');
    const addCustomBtn = document.getElementById('addCustomToCartBtn');
    const tshirtGroup = document.getElementById('tshirtGroup');
    const hoodieGroup = document.getElementById('hoodieGroup');
    const tshirtPath = document.getElementById('tshirtPath');
    const hoodiePath = document.getElementById('hoodiePath');
    const hoodieHoodPath = document.getElementById('hoodieHoodPath');
    const garmentTshirtBtn = document.getElementById('garmentTshirtBtn');
    const garmentHoodieBtn = document.getElementById('garmentHoodieBtn');
    const garmentTypeLabel = document.getElementById('garmentTypeLabel');
    const priceDisplay = document.getElementById('designerPriceDisplay');
    const presetPrintsSelector = document.getElementById('presetPrintsSelector');
    const frontBtn = document.getElementById('sideFrontBtn');
    const backBtn = document.getElementById('sideBackBtn');
    const colorNameLabel = document.getElementById('selectedColorNameLabel');

    if (!dropzone || !fileInput) return;

    // 1. تبديل نوع القطعة (تيشيرت أو هودي)
    function setGarmentType(type) {
      designerState.garmentType = type;
      if (type === 'hoodie') {
        garmentHoodieBtn?.classList.add('active');
        garmentTshirtBtn?.classList.remove('active');
        if (tshirtGroup) tshirtGroup.style.display = 'none';
        if (hoodieGroup) hoodieGroup.style.display = 'block';
        designerState.basePrice = 890;
        designerState.discountPrice = 790;
        if (garmentTypeLabel) garmentTypeLabel.textContent = 'هودي شتوي ثقيل (380g)';
        if (priceDisplay) priceDisplay.textContent = formatMoney(designerState.discountPrice);
      } else {
        garmentTshirtBtn?.classList.add('active');
        garmentHoodieBtn?.classList.remove('active');
        if (hoodieGroup) hoodieGroup.style.display = 'none';
        if (tshirtGroup) tshirtGroup.style.display = 'block';
        designerState.basePrice = 460;
        designerState.discountPrice = 399;
        if (garmentTypeLabel) garmentTypeLabel.textContent = 'تيشيرت أوفر سايز (240g)';
        if (priceDisplay) priceDisplay.textContent = formatMoney(designerState.discountPrice);
      }
      applyGarmentColor();
    }

    garmentTshirtBtn?.addEventListener('click', () => setGarmentType('tshirt'));
    garmentHoodieBtn?.addEventListener('click', () => setGarmentType('hoodie'));

    // 2. ملء شريط تصاميم كريم السيد الجاهزة
    if (presetPrintsSelector) {
      presetPrintsSelector.innerHTML = brandPrints.map((p, i) => `
        <div class="preset-print-chip ${i === 0 ? 'active' : ''}" data-print-id="${p.id}" title="${escapeHtml(p.name)}">
          <img src="${p.image}" alt="${escapeHtml(p.name)}" />
          <span>${escapeHtml(p.name.split('—')[0].trim())}</span>
        </div>
      `).join('');

      presetPrintsSelector.querySelectorAll('.preset-print-chip').forEach((chip) => {
        chip.addEventListener('click', () => {
          const print = brandPrints.find(p => p.id === chip.dataset.printId);
          if (print) {
            loadArtworkIntoDesigner(print.image, print.name, print.id);
            showToast(`تم تطبيق تصميم "${print.name}"`, 'info');
          }
        });
      });
    }

    // 3. إنشاء لوحة ألوان الأقمشة الأربعة الأساسية
    const studioColors = [
      { id: 'black', name: 'أسود فحمي', hex: '#141416' },
      { id: 'white', name: 'أبيض قطني', hex: '#F4F4F5' },
      { id: 'maroon', name: 'عنابي / مارون', hex: '#581C28' },
      { id: 'heather-grey', name: 'رمادي ميلانج', hex: '#9CA3AF' }
    ];

    if (colorSwatchesContainer) {
      colorSwatchesContainer.innerHTML = studioColors.map((c, i) => `
        <button type="button" class="color-swatch-btn ${i === 0 ? 'active' : ''}" 
                data-id="${c.id}" data-name="${c.name}" data-hex="${c.hex}"
                style="background-color: ${c.hex};" title="${c.name}">
        </button>
      `).join('');

      colorSwatchesContainer.querySelectorAll('.color-swatch-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          colorSwatchesContainer.querySelectorAll('.color-swatch-btn').forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');

          designerState.colorId = btn.dataset.id;
          designerState.colorName = btn.dataset.name;
          designerState.colorHex = btn.dataset.hex;

          if (colorNameLabel) colorNameLabel.textContent = designerState.colorName;
          applyGarmentColor();
        });
      });
    }

    function applyGarmentColor() {
      if (tshirtPath) tshirtPath.setAttribute('fill', designerState.colorHex);
      if (hoodiePath) hoodiePath.setAttribute('fill', designerState.colorHex);
      if (hoodieHoodPath) {
        const darkShade = designerState.colorHex === '#F4F4F5' ? '#E4E4E7' : '#0B0B0D';
        hoodieHoodPath.setAttribute('fill', darkShade);
      }
    }

    // 4. أزرار المقاسات
    if (sizePillsContainer) {
      sizePillsContainer.innerHTML = window.DEFAULT_SIZES.map((s) => `
        <button type="button" class="size-pill-btn ${s === 'L' ? 'active' : ''}" data-size="${s}">
          ${s}
        </button>
      `).join('');

      sizePillsContainer.querySelectorAll('.size-pill-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          sizePillsContainer.querySelectorAll('.size-pill-btn').forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          designerState.size = btn.dataset.size;
          const sizeLabel = document.getElementById('selectedSizeLabel');
          if (sizeLabel) sizeLabel.textContent = designerState.size;
        });
      });
    }

    // 5. تبديل الوجه الأمامي والخلفي
    function setSide(side) {
      designerState.side = side;
      if (side === 'front') {
        frontBtn?.classList.add('active');
        backBtn?.classList.remove('active');
      } else {
        backBtn?.classList.add('active');
        frontBtn?.classList.remove('active');
      }
    }

    frontBtn?.addEventListener('click', () => setSide('front'));
    backBtn?.addEventListener('click', () => setSide('back'));

    // 6. رفع ومعالجة ملف الصورة المخصص
    dropzone.addEventListener('click', () => fileInput.click());

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });

    dropzone.addEventListener('dragleave', () => {
      dropzone.classList.remove('dragover');
    });

    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleArtworkUpload(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files[0]) {
        handleArtworkUpload(fileInput.files[0]);
      }
    });

    function handleArtworkUpload(file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type.toLowerCase())) {
        showToast('يرجى اختيار صورة بصيغة JPG أو PNG أو WEBP صالحة.', 'error');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        showToast('حجم الملف كبير جداً، يرجى رفع صورة أقل من 5 ميجابايت.', 'error');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        loadArtworkIntoDesigner(e.target.result, file.name || 'تصميم مخصص');
        showToast('تم تحميل صورتك بنجاح! يمكنك الآن تحريكها وتغيير حجمها بحرية.', 'success');
      };
      reader.readAsDataURL(file);
    }

    // 7. التحكم بالسحب والتحريك (Pointer / Touch Dragging)
    if (artworkElement) {
      artworkElement.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        designerState.isDragging = true;
        designerState.dragStartX = e.clientX;
        designerState.dragStartY = e.clientY;
        designerState.initialPosX = designerState.posX;
        designerState.initialPosY = designerState.posY;
        artworkElement.setPointerCapture(e.pointerId);
      });

      artworkElement.addEventListener('pointermove', (e) => {
        if (!designerState.isDragging) return;
        const dx = e.clientX - designerState.dragStartX;
        const dy = e.clientY - designerState.dragStartY;

        designerState.posX = designerState.initialPosX + dx;
        designerState.posY = designerState.initialPosY + dy;

        updateArtworkPosition();
      });

      artworkElement.addEventListener('pointerup', (e) => {
        designerState.isDragging = false;
        try { artworkElement.releasePointerCapture(e.pointerId); } catch (err) {}
      });

      artworkElement.addEventListener('pointercancel', () => {
        designerState.isDragging = false;
      });
    }

    // 8. شريط التكبير والتصغير
    scaleSlider?.addEventListener('input', (e) => {
      designerState.scalePercent = parseInt(e.target.value, 10) || 90;
      if (scaleLabel) scaleLabel.textContent = `${designerState.scalePercent}%`;
      updateArtworkPosition();
    });

    // 9. أزرار التوسيط والإعادة
    document.getElementById('centerHorizontalBtn')?.addEventListener('click', () => {
      const printableArea = document.getElementById('printableArea');
      const pRect = printableArea.getBoundingClientRect();
      const currentWidth = (designerState.artWidth * designerState.scalePercent) / 100;
      designerState.posX = (pRect.width - currentWidth) / 2;
      updateArtworkPosition();
      showToast('تم توسيط التصميم أفقياً', 'info');
    });

    document.getElementById('centerVerticalBtn')?.addEventListener('click', () => {
      const printableArea = document.getElementById('printableArea');
      const pRect = printableArea.getBoundingClientRect();
      const currentHeight = (designerState.artHeight * designerState.scalePercent) / 100;
      designerState.posY = (pRect.height - currentHeight) / 2;
      updateArtworkPosition();
      showToast('تم توسيط التصميم رأسياً', 'info');
    });

    document.getElementById('resetPositionBtn')?.addEventListener('click', () => {
      designerState.scalePercent = 90;
      if (scaleSlider) scaleSlider.value = 90;
      if (scaleLabel) scaleLabel.textContent = '90%';
      const printableArea = document.getElementById('printableArea');
      const pRect = printableArea.getBoundingClientRect();
      const currentWidth = (designerState.artWidth * 0.9);
      const currentHeight = (designerState.artHeight * 0.9);
      designerState.posX = (pRect.width - currentWidth) / 2;
      designerState.posY = (pRect.height - currentHeight) / 2;
      updateArtworkPosition();
      showToast('تمت إعادة ضبط موضع وحجم التصميم.', 'info');
    });

    document.getElementById('replaceImageBtn')?.addEventListener('click', () => fileInput.click());

    document.getElementById('removeArtworkBtn')?.addEventListener('click', () => {
      artworkElement?.classList.remove('active');
      document.getElementById('artworkControlsContainer').style.display = 'none';
      designerState.artworkSrc = null;
      designerState.artworkName = null;
      showToast('تم حذف التصميم من على الموك أب.', 'info');
    });

    // 10. زر إضافة المنتج المخصص إلى السلة
    addCustomBtn?.addEventListener('click', () => {
      if (!designerState.artworkSrc) {
        showToast('يرجى اختيار تصميم أو رفع صورة أولاً قبل الإضافة للسلة.', 'error');
        return;
      }

      const garmentTitle = designerState.garmentType === 'hoodie' 
        ? 'هودي شتوي ثقيل أوفر سايز (مخصص)' 
        : 'تيشيرت أوفر سايز قطن مصري (مخصص)';

      const sideText = designerState.side === 'front' ? 'طباعة أمامية' : 'طباعة خلفية (على الظهر)';
      const designTitle = designerState.artworkName || 'تصميم العميل الخاص';

      addToCart({
        id: `custom-${Date.now()}`,
        name: `${garmentTitle} — [${designTitle}]`,
        price: designerState.discountPrice,
        size: designerState.size,
        color: designerState.colorName,
        image: designerState.artworkSrc,
        quantity: 1,
        isCustom: true,
        customDetails: {
          garmentType: designerState.garmentType === 'hoodie' ? 'هودي' : 'تيشيرت',
          side: sideText,
          designName: designTitle,
          scale: `${designerState.scalePercent}%`
        }
      });

      showToast(`تمت إضافة ${garmentTitle} بنجاح إلى سلة المشتريات!`, 'success');
      window.openCartDrawer();
    });

    // تحميل أول تصميم افتراضياً في الاستوديو
    if (brandPrints.length > 0) {
      loadArtworkIntoDesigner(brandPrints[0].image, brandPrints[0].name, brandPrints[0].id);
    }
  }

  // ==========================================================================
  // 7. سلة المشتريات وإدارتها (Shopping Cart Engine)
  // ==========================================================================

  function addToCart(item) {
    const existingIndex = cart.findIndex((c) => {
      if (item.isCustom) return false;
      return c.id === item.id && c.size === item.size && c.color === item.color;
    });

    if (existingIndex > -1) {
      cart[existingIndex].quantity += item.quantity || 1;
    } else {
      cart.push({
        ...item,
        quantity: item.quantity || 1
      });
    }

    saveStorage(STORAGE_KEYS.CART, cart);
    updateCartUI();
    showToast(`تمت إضافة "${item.name}" إلى السلة بنجاح.`, 'success');
  }

  function removeFromCart(index) {
    if (index >= 0 && index < cart.length) {
      const removed = cart.splice(index, 1)[0];
      saveStorage(STORAGE_KEYS.CART, cart);
      updateCartUI();
      showToast(`تم حذف "${removed.name}" من السلة.`, 'info');
    }
  }

  function updateCartQuantity(index, newQty) {
    if (index >= 0 && index < cart.length) {
      if (newQty <= 0) {
        removeFromCart(index);
      } else {
        cart[index].quantity = newQty;
        saveStorage(STORAGE_KEYS.CART, cart);
        updateCartUI();
      }
    }
  }

  function calculateCartTotals() {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingFee = cart.length > 0 ? (appSettings.defaultDeliveryFee || 50) : 0;
    const finalTotal = subtotal + shippingFee;
    return { subtotal, shippingFee, finalTotal };
  }

  function updateCartUI() {
    const cartCountBadge = document.getElementById('cartCounter');
    const cartItemsList = document.getElementById('cartItemsList');
    const emptyState = document.getElementById('cartEmptyState');
    const subtotalDisplay = document.getElementById('cartSubtotalDisplay');
    const shippingDisplay = document.getElementById('cartShippingDisplay');
    const finalTotalDisplay = document.getElementById('cartFinalTotalDisplay');
    const checkoutBtn = document.getElementById('proceedToCheckoutBtn');

    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountBadge) cartCountBadge.textContent = totalQty;

    const { subtotal, shippingFee, finalTotal } = calculateCartTotals();

    if (subtotalDisplay) subtotalDisplay.textContent = formatMoney(subtotal);
    if (shippingDisplay) shippingDisplay.textContent = formatMoney(shippingFee);
    if (finalTotalDisplay) finalTotalDisplay.textContent = formatMoney(finalTotal);

    if (cart.length === 0) {
      if (cartItemsList) cartItemsList.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      if (checkoutBtn) checkoutBtn.disabled = true;
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    if (checkoutBtn) checkoutBtn.disabled = false;

    if (cartItemsList) {
      cartItemsList.innerHTML = cart.map((item, index) => `
        <div class="cart-item-row">
          <img src="${item.image}" alt="${escapeHtml(item.name)}" class="cart-item-img" />

          <div class="cart-item-info">
            <h4 class="cart-item-title">${escapeHtml(item.name)}</h4>
            <div class="cart-item-meta">
              <span>المقاس: <strong>${escapeHtml(item.size)}</strong></span>
              <span>اللون: <strong>${escapeHtml(item.color)}</strong></span>
              ${item.isCustom && item.customDetails ? `
                <span style="color:#38bdf8;font-weight:700;">[${escapeHtml(item.customDetails.garmentType)} • ${escapeHtml(item.customDetails.side)}]</span>
              ` : ''}
            </div>
            <div class="cart-item-price">${formatMoney(item.price)}</div>
          </div>

          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px;">
            <button type="button" class="cart-remove-btn" onclick="window.removeCartItem(${index})" title="حذف من السلة">
              🗑️
            </button>

            <div class="qty-control">
              <button type="button" class="qty-btn" onclick="window.changeCartItemQty(${index}, ${item.quantity - 1})">-</button>
              <span class="qty-number">${item.quantity}</span>
              <button type="button" class="qty-btn" onclick="window.changeCartItemQty(${index}, ${item.quantity + 1})">+</button>
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  window.removeCartItem = removeFromCart;
  window.changeCartItemQty = updateCartQuantity;

  window.openCartDrawer = function () {
    const drawer = document.getElementById('cartDrawer');
    const backdrop = document.getElementById('cartBackdrop');
    if (drawer && backdrop) {
      drawer.classList.add('open');
      backdrop.classList.add('open');
    }
  };

  window.closeCartDrawer = function () {
    const drawer = document.getElementById('cartDrawer');
    const backdrop = document.getElementById('cartBackdrop');
    if (drawer && backdrop) {
      drawer.classList.remove('open');
      backdrop.classList.remove('open');
    }
  };

  // ==========================================================================
  // 8. محرك إتمام الطلب وتوليد رسالة واتساب (WhatsApp Checkout Engine)
  // ==========================================================================

  function generateWhatsAppMessage(customerData) {
    const { subtotal, shippingFee, finalTotal } = calculateCartTotals();
    const orderId = `KS-${Math.floor(100000 + Math.random() * 900000)}`;

    let msg = `*طلب شراء جديد من متجر كريم السيد | KARIM ELSAYED*\n`;
    msg += `رقم الطلب: #${orderId}\n`;
    msg += `التاريخ: ${new Date().toLocaleDateString('ar-EG')}\n`;
    msg += `------------------------------------------\n`;
    msg += `*بيانات العميل المستلم:*\n`;
    msg += `• الاسم: ${customerData.name}\n`;
    msg += `• الهاتف الأساسي: ${customerData.phone}\n`;
    if (customerData.altPhone) msg += `• هاتف بديل: ${customerData.altPhone}\n`;
    msg += `• المحافظة: ${customerData.gov}\n`;
    msg += `• العنوان بالتفصيل: ${customerData.address}\n`;
    if (customerData.notes) msg += `• ملاحظات التوصيل: ${customerData.notes}\n`;
    msg += `------------------------------------------\n`;
    msg += `*تفاصيل المنتجات المطلوبة (${cart.length} صنف):*\n\n`;

    let hasCustomDesigns = false;

    cart.forEach((item, i) => {
      msg += `${i + 1}. *${item.name}*\n`;
      msg += `   - المقاس: ${item.size}\n`;
      msg += `   - اللون: ${item.color}\n`;
      msg += `   - الكمية: ${item.quantity}\n`;
      msg += `   - السعر: ${item.price * item.quantity} ${appSettings.currency}\n`;

      if (item.isCustom) {
        hasCustomDesigns = true;
        msg += `   ⚠️ _(قطعة مطبوعة حسب الطلب: ${item.customDetails?.garmentType} - ${item.customDetails?.side})_\n`;
      }
      msg += `\n`;
    });

    msg += `------------------------------------------\n`;
    msg += `*الحساب الإجمالي:*\n`;
    msg += `• قيمة المنتجات: ${subtotal} ${appSettings.currency}\n`;
    msg += `• مصاريف الشحن: ${shippingFee} ${appSettings.currency}\n`;
    msg += `• *المبلغ الإجمالي المستحق عند الاستلام: ${finalTotal} ${appSettings.currency}*\n`;
    msg += `------------------------------------------\n`;

    if (hasCustomDesigns) {
      msg += `📌 *ملاحظة هامة:* توجد قطع مطبوعة حسب الطلب. مرفق صورة التصميم في المحادثة مباشرة.\n`;
    }

    msg += `شكراً لاختياركم علامة كريم السيد للملابس!`;

    return { message: msg, hasCustomDesigns };
  }

  function updateWhatsAppPreview() {
    const previewEl = document.getElementById('whatsappMessagePreview');
    const reminderEl = document.getElementById('customPrintReminder');
    if (!previewEl) return;

    const custName = document.getElementById('custName')?.value || '[اسم العميل]';
    const custPhone = document.getElementById('custPhone')?.value || '[رقم الهاتف]';
    const custGov = document.getElementById('custGov')?.value || 'القاهرة';
    const custAddress = document.getElementById('custAddress')?.value || '[العنوان التفصيلي]';
    const custNotes = document.getElementById('custNotes')?.value || '';

    const { message, hasCustomDesigns } = generateWhatsAppMessage({
      name: custName,
      phone: custPhone,
      gov: custGov,
      address: custAddress,
      notes: custNotes
    });

    previewEl.textContent = message;

    if (reminderEl) {
      reminderEl.style.display = hasCustomDesigns ? 'flex' : 'none';
    }
  }

  function handleSendWhatsAppOrder() {
    const nameInput = document.getElementById('custName');
    const phoneInput = document.getElementById('custPhone');
    const altPhoneInput = document.getElementById('custAltPhone');
    const govInput = document.getElementById('custGov');
    const addressInput = document.getElementById('custAddress');
    const notesInput = document.getElementById('custNotes');

    const name = nameInput?.value.trim();
    const phone = phoneInput?.value.trim();
    const altPhone = altPhoneInput?.value.trim();
    const gov = govInput?.value;
    const address = addressInput?.value.trim();
    const notes = notesInput?.value.trim();

    if (!name || !phone || !address) {
      showToast('يرجى كتابة الاسم ورقم الهاتف والعنوان التفصيلي لإتمام الطلب.', 'error');
      return;
    }

    // حفظ بيانات العميل لتسهيل الطلبات القادمة
    saveStorage(STORAGE_KEYS.CUSTOMER, { name, phone, altPhone, gov, address });

    const { message } = generateWhatsAppMessage({ name, phone, altPhone, gov, address, notes });

    // تنظيف رقم الواتساب الخاص بالمتجر
    let targetPhone = (appSettings.whatsappNumber || '201012345678').replace(/[^0-9]/g, '');
    if (targetPhone.startsWith('01')) targetPhone = '2' + targetPhone;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodedMessage}`;

    // فتح شات واتساب
    window.open(whatsappUrl, '_blank');

    closeModal('checkoutModalBackdrop');
    window.closeCartDrawer();
    showToast('تم فتح واتساب لإرسال تفاصيل طلبك مباشرة إلى كريم السيد!', 'success');
  }

  // ==========================================================================
  // 9. دعم ثنائية اللغة (Arabic / English Toggle)
  // ==========================================================================

  function toggleLanguage() {
    currentLang = currentLang === 'ar' ? 'en' : 'ar';
    saveStorage(STORAGE_KEYS.LANG, currentLang);
    applyLanguage();
  }

  function applyLanguage() {
    const langBtn = document.getElementById('langToggleBtn');
    if (langBtn) {
      langBtn.innerHTML = `<span>${currentLang === 'ar' ? 'EN' : 'عربي'}</span>`;
    }

    if (currentLang === 'en') {
      document.documentElement.lang = 'en';
      document.title = 'Karim Elsayed | Premium Egyptian Streetwear & Custom Clothing';
    } else {
      document.documentElement.lang = 'ar';
      document.title = 'كريم السيد | KARIM ELSAYED — ستريت وير مصري راقي';
    }

    renderCatalog();
    renderBrandPrints();
    updateCartUI();
  }

  // ==========================================================================
  // 10. لوحة الإدارة التجريبية المدمجة (Local Admin Panel)
  // ==========================================================================

  function renderAdminProductsTable() {
    const tbody = document.getElementById('adminProductsTableBody');
    const countLabel = document.getElementById('adminProductsCountLabel');
    if (!tbody) return;

    if (countLabel) countLabel.textContent = `قائمة المنتجات (${products.length})`;

    tbody.innerHTML = products.map((p) => `
      <tr>
        <td>
          <img src="${p.image}" alt="${escapeHtml(p.name)}" class="admin-table-thumb" />
        </td>
        <td>
          <div style="font-weight:700;color:var(--text-pure);">${escapeHtml(p.name)}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">${p.id}</div>
        </td>
        <td>${escapeHtml(p.category)}</td>
        <td>
          <strong>${formatMoney(p.discountPrice || p.price)}</strong>
          ${p.discountPrice ? `<div style="font-size:0.75rem;color:var(--text-dark);text-decoration:line-through;">${formatMoney(p.price)}</div>` : ''}
        </td>
        <td>${p.stock || 0}</td>
        <td>${p.customPrintable ? '✅ متاح' : '❌ لا'}</td>
        <td>
          <div class="admin-actions-cell">
            <button type="button" class="btn-table-action" onclick="window.editProduct('${p.id}')">تعديل</button>
            <button type="button" class="btn-table-action delete" onclick="window.deleteProduct('${p.id}')">حذف</button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  window.editProduct = function (id) {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    switchAdminTab('add');
    const formTitle = document.getElementById('adminTabAdd');
    if (formTitle) formTitle.textContent = 'تعديل المنتج';

    document.getElementById('editProductId').value = product.id;
    document.getElementById('admProdName').value = product.name;
    document.getElementById('admProdCategory').value = product.category;
    document.getElementById('admProdDesc').value = product.description;
    document.getElementById('admProdPrice').value = product.price;
    document.getElementById('admProdDiscount').value = product.discountPrice || '';
    document.getElementById('admProdStock').value = product.stock || 20;
    document.getElementById('admProdSizes').value = (product.sizes || []).join(', ');
    document.getElementById('admProdColors').value = (product.colors || []).join(', ');
    document.getElementById('admProdCustomPrintable').checked = Boolean(product.customPrintable);
    document.getElementById('admProdFeatured').checked = Boolean(product.isFeatured);
    document.getElementById('admProdImageDataUrl').value = product.image;

    const thumb = document.getElementById('admPreviewImg');
    if (thumb) {
      thumb.src = product.image;
      thumb.style.display = 'block';
    }
  };

  window.deleteProduct = function (id) {
    const product = products.find((p) => p.id === id);
    if (!product) return;

    showConfirm('حذف المنتج', `هل أنت متأكد من حذف المنتج "${product.name}" نهائياً من المتجر؟`, () => {
      products = products.filter((p) => p.id !== id);
      saveStorage(STORAGE_KEYS.PRODUCTS, products);
      renderAdminProductsTable();
      renderCatalog();
      showToast(`تم حذف المنتج "${product.name}".`, 'info');
    });
  };

  function switchAdminTab(tabName) {
    document.querySelectorAll('.admin-tab-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });

    document.getElementById('tabContentProducts').style.display = tabName === 'products' ? 'block' : 'none';
    document.getElementById('tabContentAdd').style.display = tabName === 'add' ? 'block' : 'none';
    document.getElementById('tabContentSettings').style.display = tabName === 'settings' ? 'block' : 'none';
    const dlTab = document.getElementById('tabContentDownload');
    if (dlTab) dlTab.style.display = tabName === 'download' ? 'block' : 'none';

    if (tabName === 'products') {
      renderAdminProductsTable();
    }
  }

  function handleSaveProduct() {
    const id = document.getElementById('editProductId').value;
    const name = document.getElementById('admProdName').value.trim();
    const category = document.getElementById('admProdCategory').value;
    const desc = document.getElementById('admProdDesc').value.trim();
    const price = parseFloat(document.getElementById('admProdPrice').value);
    const discountVal = document.getElementById('admProdDiscount').value;
    const discount = discountVal ? parseFloat(discountVal) : null;
    const stock = parseInt(document.getElementById('admProdStock').value, 10) || 0;
    const sizesStr = document.getElementById('admProdSizes').value;
    const colorsStr = document.getElementById('admProdColors').value;
    const customPrintable = document.getElementById('admProdCustomPrintable').checked;
    const featured = document.getElementById('admProdFeatured').checked;
    let imageDataUrl = document.getElementById('admProdImageDataUrl').value;

    if (!name || isNaN(price)) {
      showToast('يرجى كتابة اسم المنتج والسعر على الأقل.', 'error');
      return;
    }

    if (!imageDataUrl) {
      imageDataUrl = '/assets/products/product-hoodie-savage.svg';
    }

    const sizes = sizesStr.split(',').map((s) => s.trim()).filter(Boolean);
    const colors = colorsStr.split(',').map((c) => c.trim()).filter(Boolean);

    if (id) {
      const idx = products.findIndex((p) => p.id === id);
      if (idx > -1) {
        products[idx] = {
          ...products[idx],
          name,
          category,
          description: desc,
          price,
          discountPrice: discount,
          stock,
          sizes: sizes.length ? sizes : ['S', 'M', 'L', 'XL'],
          colors: colors.length ? colors : ['أسود فحمي'],
          customPrintable,
          isFeatured: featured,
          image: imageDataUrl
        };
        showToast(`تم تحديث بيانات المنتج "${name}".`, 'success');
      }
    } else {
      const newProd = {
        id: `prod-${Date.now()}`,
        name,
        category,
        description: desc,
        price,
        discountPrice: discount,
        stock,
        sizes: sizes.length ? sizes : ['S', 'M', 'L', 'XL'],
        colors: colors.length ? colors : ['أسود فحمي'],
        customPrintable,
        isFeatured: featured,
        isNew: true,
        image: imageDataUrl
      };
      products.unshift(newProd);
      showToast(`تمت إضافة المنتج الجديد "${name}" إلى المتجر!`, 'success');
    }

    saveStorage(STORAGE_KEYS.PRODUCTS, products);
    renderAdminProductsTable();
    renderCatalog();
    resetProductForm();
    switchAdminTab('products');
  }

  function resetProductForm() {
    document.getElementById('editProductId').value = '';
    document.getElementById('admProdName').value = '';
    document.getElementById('admProdDesc').value = '';
    document.getElementById('admProdPrice').value = '';
    document.getElementById('admProdDiscount').value = '';
    document.getElementById('admProdStock').value = '20';
    document.getElementById('admProdSizes').value = 'S, M, L, XL, 2XL';
    document.getElementById('admProdColors').value = 'أسود فحمي, أبيض قطني, عنابي / مارون, رمادي ميلانج';
    document.getElementById('admProdCustomPrintable').checked = true;
    document.getElementById('admProdFeatured').checked = false;
    document.getElementById('admProdImageDataUrl').value = '';
    const thumb = document.getElementById('admPreviewImg');
    if (thumb) {
      thumb.src = '';
      thumb.style.display = 'none';
    }
    const formTitle = document.getElementById('adminTabAdd');
    if (formTitle) formTitle.textContent = 'إضافة منتج جديد';
  }

  function updateFooterAndContactLinks() {
    const footerPhone = document.getElementById('footerWhatsappNumberDisplay');
    const directBtn = document.getElementById('directWhatsappInquiryBtn');
    const floatingBtn = document.getElementById('floatingWhatsappBtn');

    let phone = (appSettings.whatsappNumber || '201012345678').replace(/[^0-9]/g, '');
    if (phone.startsWith('01')) phone = '2' + phone;

    if (footerPhone) footerPhone.textContent = `+${phone}`;

    const defaultInquiry = encodeURIComponent('مرحباً، أود الاستفسار عن تشكيلة ملابس كريم السيد.');
    const link = `https://wa.me/${phone}?text=${defaultInquiry}`;

    if (directBtn) directBtn.href = link;
    if (floatingBtn) floatingBtn.href = link;
  }

  // ==========================================================================
  // 11. تهيئة الأحداث والتنقل عند تحميل الصفحة
  // ==========================================================================

  document.addEventListener('DOMContentLoaded', () => {
    // 1. تطبيق اللغة
    applyLanguage();

    // 2. تهيئة الكتالوج والمعرض
    renderCatalog();
    renderBrandPrints();

    // 3. تهيئة استوديو الملابس
    initCustomDesigner();

    // 4. تهيئة السلة والروابط
    updateCartUI();
    updateFooterAndContactLinks();

    // 5. زر تبديل اللغة
    document.getElementById('langToggleBtn')?.addEventListener('click', toggleLanguage);

    // 6. شريط البحث السريع
    const searchToggleBtn = document.getElementById('searchToggleBtn');
    const searchWrapper = document.getElementById('searchBarWrapper');
    const searchInput = document.getElementById('siteSearchInput');
    const clearSearchBtn = document.getElementById('clearSearchBtn');

    searchToggleBtn?.addEventListener('click', () => {
      searchWrapper?.classList.toggle('active');
      if (searchWrapper?.classList.contains('active')) {
        searchInput?.focus();
      }
    });

    searchInput?.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      clearSearchBtn.style.display = searchQuery ? 'block' : 'none';
      renderCatalog();
    });

    clearSearchBtn?.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      searchQuery = '';
      clearSearchBtn.style.display = 'none';
      renderCatalog();
    });

    // 7. تصنيفات الكتالوج
    document.querySelectorAll('.category-pill[data-category]').forEach((pill) => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.category-pill[data-category]').forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
        activeCategory = pill.dataset.category;
        renderCatalog();
      });
    });

    // 8. تصنيفات المعرض الجرافيكي
    document.querySelectorAll('#printsCategoryBar .category-pill').forEach((pill) => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('#printsCategoryBar .category-pill').forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
        activePrintCategory = pill.dataset.printCat;
        renderBrandPrints();
      });
    });

    // 9. ترتيب الكتالوج
    document.getElementById('catalogSort')?.addEventListener('change', (e) => {
      activeSort = e.target.value;
      renderCatalog();
    });

    // 10. أزرار الفلترة السريعة
    document.getElementById('filterFeaturedBtn')?.addEventListener('click', () => {
      activeSort = 'featured';
      const sel = document.getElementById('catalogSort');
      if (sel) sel.value = 'featured';
      renderCatalog();
      showToast('عرض المنتجات المميزة', 'info');
    });

    document.getElementById('filterBestsellerBtn')?.addEventListener('click', () => {
      activeSort = 'bestseller';
      const sel = document.getElementById('catalogSort');
      if (sel) sel.value = 'bestseller';
      renderCatalog();
      showToast('عرض الأكثر طلباً ومبيعاً', 'info');
    });

    document.getElementById('resetCatalogFiltersBtn')?.addEventListener('click', () => {
      activeCategory = 'all';
      searchQuery = '';
      if (searchInput) searchInput.value = '';
      document.querySelectorAll('.category-pill[data-category]').forEach((p) => {
        p.classList.toggle('active', p.dataset.category === 'all');
      });
      renderCatalog();
    });

    // 11. أدراج السلة والشراء
    document.getElementById('cartOpenBtn')?.addEventListener('click', window.openCartDrawer);
    document.getElementById('cartCloseBtn')?.addEventListener('click', window.closeCartDrawer);
    document.getElementById('cartBackdrop')?.addEventListener('click', window.closeCartDrawer);

    // 12. نافذة إتمام الطلب عبر واتساب
    const checkoutModal = document.getElementById('checkoutModalBackdrop');
    const checkoutOpenBtn = document.getElementById('proceedToCheckoutBtn');
    const checkoutCloseBtn = document.getElementById('checkoutModalCloseBtn');
    const cancelCheckoutBtn = document.getElementById('cancelCheckoutBtn');

    checkoutOpenBtn?.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast('السلة فارغة حالياً.', 'error');
        return;
      }
      // استرجاع بيانات العميل المخزنة مسبقاً
      const savedCust = loadStorage(STORAGE_KEYS.CUSTOMER, null);
      if (savedCust) {
        if (savedCust.name) document.getElementById('custName').value = savedCust.name;
        if (savedCust.phone) document.getElementById('custPhone').value = savedCust.phone;
        if (savedCust.altPhone) document.getElementById('custAltPhone').value = savedCust.altPhone;
        if (savedCust.gov) document.getElementById('custGov').value = savedCust.gov;
        if (savedCust.address) document.getElementById('custAddress').value = savedCust.address;
      }

      updateWhatsAppPreview();
      checkoutModal?.classList.add('open');
    });

    checkoutCloseBtn?.addEventListener('click', () => closeModal('checkoutModalBackdrop'));
    cancelCheckoutBtn?.addEventListener('click', () => closeModal('checkoutModalBackdrop'));
    checkoutModal?.addEventListener('click', (e) => {
      if (e.target.id === 'checkoutModalBackdrop') closeModal('checkoutModalBackdrop');
    });

    // تحديث المعاينة الحية لرسالة واتساب عند الكتابة في الحقول
    ['custName', 'custPhone', 'custAltPhone', 'custGov', 'custAddress', 'custNotes'].forEach((id) => {
      document.getElementById(id)?.addEventListener('input', updateWhatsAppPreview);
    });

    document.getElementById('confirmAndSendWhatsappBtn')?.addEventListener('click', handleSendWhatsAppOrder);

    // 13. نافذة تفاصيل المنتج
    document.getElementById('productModalCloseBtn')?.addEventListener('click', () => closeModal('productModalBackdrop'));
    document.getElementById('productModalBackdrop')?.addEventListener('click', (e) => {
      if (e.target.id === 'productModalBackdrop') closeModal('productModalBackdrop');
    });

    // 14. لوحة الإدارة التجريبية
    const adminOpenBtn = document.getElementById('adminOpenBtn');
    const adminModal = document.getElementById('adminModalBackdrop');
    const adminCloseBtn = document.getElementById('adminModalCloseBtn');

    adminOpenBtn?.addEventListener('click', () => {
      renderAdminProductsTable();
      adminModal?.classList.add('open');
      const setPhone = document.getElementById('setWhatsappNumber');
      const setShip = document.getElementById('setDefaultShipping');
      if (setPhone) setPhone.value = appSettings.whatsappNumber;
      if (setShip) setShip.value = appSettings.defaultDeliveryFee;
    });

    adminCloseBtn?.addEventListener('click', () => closeModal('adminModalBackdrop'));
    adminModal?.addEventListener('click', (e) => {
      if (e.target.id === 'adminModalBackdrop') closeModal('adminModalBackdrop');
    });

    // تبويبات الإدارة
    document.getElementById('adminTabProducts')?.addEventListener('click', () => switchAdminTab('products'));
    document.getElementById('adminTabAdd')?.addEventListener('click', () => switchAdminTab('add'));
    document.getElementById('adminTabSettings')?.addEventListener('click', () => switchAdminTab('settings'));
    document.getElementById('adminTabDownload')?.addEventListener('click', () => switchAdminTab('download'));
    document.getElementById('adminAddNewShortcutBtn')?.addEventListener('click', () => {
      resetProductForm();
      switchAdminTab('add');
    });

    // رفع صورة المنتج في الإدارة
    document.getElementById('admProdFileInput')?.addEventListener('change', async (e) => {
      if (e.target.files && e.target.files[0]) {
        try {
          const compressed = await compressImage(e.target.files[0], 500, 0.75);
          document.getElementById('admProdImageDataUrl').value = compressed;
          const preview = document.getElementById('admPreviewImg');
          if (preview) {
            preview.src = compressed;
            preview.style.display = 'block';
          }
        } catch (err) {
          showToast('فشل في معالجة صورة المنتج المرفوعة.', 'error');
        }
      }
    });

    // حفظ المنتج في الإدارة
    document.getElementById('adminProductForm')?.addEventListener('submit', handleSaveProduct);
    document.getElementById('cancelEditProductBtn')?.addEventListener('click', () => {
      resetProductForm();
      switchAdminTab('products');
    });

    // حفظ إعدادات المتجر
    document.getElementById('adminSettingsForm')?.addEventListener('submit', () => {
      const newPhone = document.getElementById('setWhatsappNumber')?.value.trim();
      const newShipping = parseFloat(document.getElementById('setDefaultShipping')?.value);

      if (!newPhone) {
        showToast('يرجى إدخال رقم واتساب صالح.', 'error');
        return;
      }

      appSettings.whatsappNumber = newPhone;
      appSettings.defaultDeliveryFee = !isNaN(newShipping) ? newShipping : 50;

      saveStorage(STORAGE_KEYS.SETTINGS, appSettings);
      updateFooterAndContactLinks();
      updateCartUI();
      showToast('تم حفظ إعدادات المتجر ورقم الواتساب بنجاح!', 'success');
      switchAdminTab('products');
    });

    // استعادة المنتجات الافتراضية
    document.getElementById('adminRestoreDefaultsBtn')?.addEventListener('click', () => {
      showConfirm(
        'استعادة المنتجات الأصلية',
        'سيتم استرجاع قائمة المنتجات والتصاميم الرسمية للبراند وحذف أي تعديلات سابقة. هل ترغب بالاستمرار؟',
        () => {
          products = [...(window.INITIAL_PRODUCTS || [])];
          saveStorage(STORAGE_KEYS.PRODUCTS, products);
          renderAdminProductsTable();
          renderCatalog();
          showToast('تمت استعادة المنتجات الأصلية بنجاح.', 'success');
        }
      );
    });

    // 15. قائمة الموبايل
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const header = document.getElementById('siteHeader');
    mobileToggle?.addEventListener('click', () => {
      header?.classList.toggle('mobile-open');
    });

    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        header?.classList.remove('mobile-open');
      });
    });

    // 16. إغلاق النوافذ عبر زر Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        window.closeCartDrawer();
        closeModal('checkoutModalBackdrop');
        closeModal('productModalBackdrop');
        closeModal('adminModalBackdrop');
        closeModal('confirmDialogBackdrop');
      }
    });
  });

})();
