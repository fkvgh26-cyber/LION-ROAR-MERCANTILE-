function toggleMenu(){
  document.getElementById('navMenu').classList.toggle('open');
}
document.querySelectorAll('#navMenu a').forEach(a => a.addEventListener('click', () => {
  document.getElementById('navMenu').classList.remove('open');
}));

document.getElementById('year').textContent = new Date().getFullYear();

function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3200);
}

document.getElementById('orderForm').addEventListener('submit', function(e){
  e.preventDefault();
  const orderId = 'LRM-' + Math.floor(1000 + Math.random()*9000);
  const data = {
    id: orderId,
    url: document.getElementById('productUrl').value,
    quantity: document.getElementById('quantity').value,
    country: document.getElementById('country').value,
    name: document.getElementById('name').value,
    phone: document.getElementById('phone').value,
    variant: document.getElementById('variant').value,
    note: document.getElementById('note').value
  };
  localStorage.setItem('lrm_last_order', JSON.stringify(data));

  const msg = `Hello Lion Roar Mercantile,%0A%0AI want to submit a product request.%0AOrder ID: ${orderId}%0AProduct: ${encodeURIComponent(data.url)}%0ACountry: ${data.country}%0AQuantity: ${data.quantity}%0AName: ${encodeURIComponent(data.name)}%0APhone: ${encodeURIComponent(data.phone)}%0AVariant: ${encodeURIComponent(data.variant || 'N/A')}%0ANote: ${encodeURIComponent(data.note || 'N/A')}`;
  window.open('https://wa.me/8801814026318?text=' + msg, '_blank');
  showToast('Request created: ' + orderId + ' — WhatsApp opened.');
  this.reset();
  document.getElementById('quantity').value = 1;
});

document.getElementById('trackForm').addEventListener('submit', function(e){
  e.preventDefault();
  const id = document.getElementById('trackId').value.trim().toUpperCase();
  const result = document.getElementById('trackResult');
  const last = JSON.parse(localStorage.getItem('lrm_last_order') || 'null');

  if(last && id === last.id){
    result.innerHTML = `<strong>Order ${last.id}</strong><br><span style="color:#777;font-size:12px">Product request received. Our team will contact you for quotation and confirmation.</span>
    <div class="progress"><i class="active"></i><i></i><i></i><i></i><i></i></div>`;
  }else if(id === 'LRM-1024'){
    result.innerHTML = `<strong>Order LRM-1024</strong><br><span style="color:#777;font-size:12px">Sample status: Arrived at Bangladesh warehouse.</span>
    <div class="progress"><i class="active"></i><i class="active"></i><i class="active"></i><i class="active"></i><i></i></div>`;
  }else{
    result.innerHTML = `<strong>Order not found</strong><br><span style="color:#777;font-size:12px">Please check your Order ID or contact us on WhatsApp.</span>`;
  }
  result.classList.remove('hidden');
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(){
    const el = document.querySelector(this.getAttribute('href'));
    if(el) setTimeout(() => el.scrollIntoView({behavior:'smooth', block:'start'}), 10);
  });
});
