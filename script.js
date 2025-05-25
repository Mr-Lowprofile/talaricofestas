const track = document.getElementById('carousel-track');
const slides = document.querySelectorAll('.carousel-slide');
const buttons = document.querySelectorAll('#carousel-nav button');
let currentIndex = 0;
let interval;
let userInteracting = false;
let interactionTimeout;

function goToSlide(index) {
  track.scrollTo({
    left: slides[index].offsetLeft,
    behavior: 'smooth'
  });
  setActive(index);
  currentIndex = index;
}

function setActive(index) {
  buttons.forEach((btn, i) => {
    btn.classList.toggle('active', i === index);
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  goToSlide(currentIndex);
}

buttons.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    stopAutoSlideTemporarily();
    goToSlide(i);
  });
});

function startAutoSlide() {
  interval = setInterval(nextSlide, 4000);
}

function stopAutoSlideTemporarily() {
  clearInterval(interval);
  userInteracting = true;
  clearTimeout(interactionTimeout);
  interactionTimeout = setTimeout(() => {
    userInteracting = false;
    startAutoSlide();
  }, 6000); // retoma após 6s sem interação
}

track.addEventListener('scroll', () => {
  const scrollLeft = track.scrollLeft;
  const width = track.offsetWidth;
  const index = Math.round(scrollLeft / width);
  if (index !== currentIndex) {
    setActive(index);
    currentIndex = index;
    stopAutoSlideTemporarily();
  }
});

setActive(0);
startAutoSlide();
