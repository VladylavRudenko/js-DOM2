const gallery = document.getElementById('gallery');
const btnLoad = document.getElementById('btn-load');
const btnReverse = document.getElementById('btn-reverse');
const btnRemove = document.getElementById('btn-remove');
const btnClear = document.getElementById('btn-clear');

const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalAuthor = document.getElementById('modal-author');
const modalAvatar = document.getElementById('modal-avatar');
const modalClose = document.getElementById('modal-close');

let currentPage = 1;
const cardHeights = [260, 340, 300, 380];

function openModal(item) {
  modalImg.src = `https://picsum.photos/id/${item.id}/900/650`;
  modalAuthor.textContent = item.author;
  modalAvatar.textContent = item.author.charAt(0).toUpperCase();
  modal.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
  modalImg.src = '';
}

function createPin(item, index) {
  const pin = document.createElement('div');
  pin.className = 'pin';

  const chosenHeight = cardHeights[index % cardHeights.length];

  const img = document.createElement('img');
  img.src = `https://picsum.photos/id/${item.id}/400/${chosenHeight}`;
  img.alt = item.author;

  const info = document.createElement('div');
  info.className = 'pin-info';

  const avatar = document.createElement('div');
  avatar.className = 'pin-avatar';
  avatar.textContent = item.author.charAt(0).toUpperCase();

  const author = document.createElement('span');
  author.className = 'pin-author';
  author.textContent = item.author;

  info.appendChild(avatar);
  info.appendChild(author);

  pin.appendChild(img);
  pin.appendChild(info);

  pin.addEventListener('click', () => {
    openModal(item);
  });

  return pin;
}

async function loadImages() {
  try {
    const response = await fetch(`https://picsum.photos/v2/list?page=${currentPage}&limit=4`);
    const data = await response.json();

    data.forEach((item, index) => {
      const pin = createPin(item, index);
      gallery.appendChild(pin);
    });

    currentPage++;
  } catch (error) {
    alert('Не вдалося отримати картинки');
  }
}

modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnLoad.addEventListener('click', () => {
  loadImages();
});

btnClear.addEventListener('click', () => {
  gallery.innerHTML = '';
});

btnRemove.addEventListener('click', () => {
  const lastPin = gallery.lastElementChild;
  if (lastPin) {
    lastPin.remove();
  }
});

btnReverse.addEventListener('click', () => {
  const pins = Array.from(gallery.children);
  if (pins.length < 2) return;

  pins.reverse().forEach(pin => {
    gallery.appendChild(pin);
  });
});

loadImages();