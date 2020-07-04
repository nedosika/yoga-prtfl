window.addEventListener('load', function () {
    //TABS
    let links = document.querySelectorAll('.info-header-tab'),
        tabcontents = document.querySelectorAll('.info-tabcontent');

    hideContents();
    showContentsItem(0);
    addListeners();

    function addListeners(){
        for(let i = 0; i < links.length; i++){
            links[i].addEventListener('click', function (event) {
                showContent(event.target);
            })
        }
    }

    function hideContents(){
        for(let i = 0; i < tabcontents.length; i++){
            tabcontents[i].classList.add('hide');
            tabcontents[i].classList.remove('show');
        }
    }

    function showContent(target){
        hideContents();
        for (let i = 0; i < links.length; i++){
            if(links[i] == target){
                tabcontents[i].classList.add('show');
                tabcontents[i].classList.remove('hide');
            }
        }
    }

    function showContentsItem(item){
        tabcontents[item].classList.add('show');
        tabcontents[item].classList.remove('hide');
    }

    //TIMER
    let endTime = '2021-07-20',
        seconds = document.getElementsByClassName('seconds')[0],
        minutes = document.getElementsByClassName('minutes')[0],
        hours = document.getElementsByClassName('hours')[0],
        days = document.getElementsByClassName('days')[0];


    function getTimeRemaining(endTime){
        let timeRemaining = Math.floor((Date.parse(endTime) - Date.now()) / 1000) + new Date().getTimezoneOffset() * 60;

        let seconds = timeRemaining % 60,
            minutes = Math.floor(timeRemaining / 60) % 60,
            hours = Math.floor(timeRemaining / 60 / 60 ) % 24,
            days = Math.floor(timeRemaining / 60 / 60 / 24 );

        if(timeRemaining <= 0){
            clearInterval(timer);
            seconds = 0;
            minutes = 0;
            hours = 0;
            days = 0;
        }

        return {
            seconds : seconds,
            minutes : minutes,
            hours : hours,
            days : days
        };
    }

    function updateTime(){
        let timeRemaining = getTimeRemaining(endTime);

        seconds.textContent = addSecondZero(timeRemaining.seconds);
        minutes.textContent = addSecondZero(timeRemaining.minutes);
        hours.textContent = addSecondZero(timeRemaining.hours);
        days.textContent = addSecondZero(timeRemaining.days);
    }

    function addSecondZero(item){
        return (item < 10) ? '0' + item : item;
    }

    let timer = setInterval(updateTime, 1000);

    
//MODAL WINDOW    
    let more = document.getElementsByClassName('more')[0],
        popupClose = document.getElementsByClassName('popup-close')[0],
        modal = document.getElementsByClassName('overlay')[0],
        btnsDescription = document.getElementsByClassName('description-btn');

    more.addEventListener('click', showModal);
    
    popupClose.addEventListener('click', hideModal);

    function showModal(event) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        event.target.classList.add('more-splash');
    }

    function hideModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        more.classList.remove('more-splash');
    }

    for(let i = 0; i < btnsDescription.length; i++){
        btnsDescription[i].addEventListener('click', showModal);
    }

//AJAX
    let popup = document.querySelector('.popup');
    let mainForm = popup.querySelector('.main-form');
    let contactForm = document.querySelector('#form');

    mainForm.addEventListener('submit', sendData);
    contactForm.addEventListener('submit', sendData)

    function sendData(event){

        event.preventDefault();

        let response = new XMLHttpRequest();

        response.open('POST', 'server.php');

        let sendForm = new FormData(event.target);

        let sendObject = {};
        sendForm.forEach(function (value, key) {
            sendObject[key] = value;
        });

        //response.send(JSON.stringify(sendObject));
        response.send(sendForm);

        let statusMessage = document.createElement('div');
        mainForm.appendChild(statusMessage);

        response.addEventListener('readystatechange', function () {
            if(response.readyState < 4){
                statusMessage.innerHTML = 'Message sanding'
            }else if(response.readyState === 4 && response.status == 200){
                statusMessage.innerHTML = response.responseText;
            }


        });

        let inputs = event.target.querySelectorAll('input');

        //Clear inputs
        for(let i = 0; i < inputs.length; i++){
            inputs[i].value = '';
        }

    }



})