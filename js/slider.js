document.addEventListener('DOMContentLoaded', function () {
   let slider = document.querySelector('#photo');
   let photos = slider.querySelectorAll('.slider-item');
   let arrowNext = slider.getElementsByClassName('next')[0];
   let arrowPrev = slider.getElementsByClassName('prev')[0];
   let currentPhoto = 0;

   let sliderDots = document.getElementsByClassName('slider-dots')[0];
   let dots = sliderDots.querySelectorAll('.dot');

   arrowNext.addEventListener('click', nextPhoto);
   arrowPrev.addEventListener('click', prevPhoto);

   for (let i = 0; i < dots.length; i++){
       dots[i].addEventListener('click', dotClickHandler);
   }

    updatePhoto();

   function dotClickHandler(event){
       dots.forEach((value, key) => {
           if (event.target === value){
               currentPhoto = key;
               updatePhoto();
               updateDots();
           }
       })
   }

   function updatePhoto() {
       photos.forEach(value => {
           value.style.display = 'none';
       });
       photos[currentPhoto].style.display = 'block';
       updateDots();
   }

   function updateDots(){
       dots.forEach(value => {
           value.classList.remove('dot-active');
       });
       dots[currentPhoto].classList.add('dot-active');
   }

   function nextPhoto(){
       currentPhoto = (currentPhoto < photos.length - 1) ? ++currentPhoto: 0;
       updatePhoto(currentPhoto);
   }

   function prevPhoto(){
       currentPhoto = (currentPhoto > 0) ? --currentPhoto: photos.length - 1;
       updatePhoto(currentPhoto);
   }
});