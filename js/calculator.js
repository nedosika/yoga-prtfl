document.addEventListener('DOMContentLoaded', () => {
   let counter = document.querySelector('#price');
   let inputs = counter.querySelectorAll('.counter-block-input');

   let selector = counter.querySelector('#select');
   let total = counter.querySelector('#total')

   inputs.forEach(value =>{
       value.addEventListener('input', changeTotal)
   });

    selector.addEventListener('change', changeTotal);

   function changeTotal() {
       total.textContent = inputs[0].value * inputs[1].value * selector.options[selector.selectedIndex].value;
   }



});