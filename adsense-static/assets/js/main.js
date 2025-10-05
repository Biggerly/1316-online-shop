(function(){
  const byId = (id)=>document.getElementById(id);
  const q = (sel)=>document.querySelector(sel);

  // Mobile menu
  const menuBtn = byId('menuBtn');
  const mobileMenu = byId('mobileMenu');
  if(menuBtn && mobileMenu){
    menuBtn.addEventListener('click',()=>{
      mobileMenu.classList.toggle('open');
    });
  }

  // Footer year
  const yearSpan = byId('year');
  if(yearSpan){ yearSpan.textContent = String(new Date().getFullYear()); }

  // Cookie consent
  const cookieKey = 'cookie-consent-v1';
  const cookieBar = byId('cookieBar');
  const acceptBtn = byId('cookieAccept');
  if(cookieBar && acceptBtn){
    if(!localStorage.getItem(cookieKey)){
      cookieBar.classList.add('show');
    }
    acceptBtn.addEventListener('click',()=>{
      localStorage.setItem(cookieKey,'1');
      cookieBar.classList.remove('show');
    });
  }

  // AdSense loader (disabled by default for review)
  const ADSENSE_CLIENT = window.ADSENSE_CLIENT || 'ca-pub-0000000000000000';
  const ADS_ENABLED = Boolean(window.__ADSENSE_ENABLED);
  function loadAdsense(){
    if(!ADS_ENABLED) return;
    if(document.getElementById('adsenseScript')) return;
    const s = document.createElement('script');
    s.id='adsenseScript';
    s.src=`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(ADSENSE_CLIENT)}`;
    s.async=true; s.crossOrigin='anonymous';
    document.head.appendChild(s);
    // Show ad containers
    document.querySelectorAll('.ad[data-slot]').forEach(el=>{
      el.style.display='block';
    });
  }
  // Keep ads off by default to prioritize content for review
  if(ADS_ENABLED) loadAdsense();
})();
