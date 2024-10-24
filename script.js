window.onload = function () {
  let startOne = document.getElementById("startOne");
  startOne.classList.add("visible");
};

let startTwo = document.getElementById("startTwo");
let convidado;
let casal;
let numeroDeEscolhas;
let nomeDoConvidado = document.getElementById("nomeDoConvidado");
let convidados = document.getElementById("convidados");
let sozinhoOuAcompanhado = document.getElementById("sozinhoOuAcompanhado");
let bemVindo = document.getElementById("bemVindo");
let estaConvidado = document.getElementById("estaConvidado");
let passe = document.getElementById("passe");
let quantidadeDeSaboresNoTexto = document.getElementById("quantidadeDeSabores");

let buttonHanSolo = document.getElementById("hansolo");
let buttonHanAndLeia = document.getElementById("hanandleia");
let startButton = document.getElementById("startButton");
let startArea = document.getElementById("start-area");
let starter = document.getElementById("starter");

$(document).ready(function () {
  // Initialize Select2
  $('.select2').select2({
    placeholder: "...",
    dropdownAutoWidth: true,
    width: 'resolve'
  }).on('select2:open', function (e) {
    // After the dropdown opens, adjust its max height to remove scrolling
    $('.select2-results__options').css('max-height', 'none');
  });

  $('.select2').on('select2:select', function (e) {
    // Get the selected option's value
    convidado = e.params.data.id;
    nomeDoConvidado.innerHTML = convidado;
    nomeDoConvidado.classList.remove("hidden");
    startOne.classList.add("hidden");

    const selectedOption = convidados.options[convidados.selectedIndex];

    // Check if the selected option has the 'special' class
    if (selectedOption.classList.contains('casal')) {
      sozinhoOuAcompanhado.innerHTML = "Confirmem se virão os dois ou só um:";
      buttonHanSolo.innerHTML = "Han ou Leia";
      bemVindo.innerHTML = "Sejam bem-vindos";
      estaConvidado.innerHTML = "Estão convidadíssimos";
      passe.innerHTML = "Passem";

      // You can add any custom event or behavior here
      alert('Você selecionou uma das quatro opções de "casal".');
    }

    fadeIn(startTwo);
  });
});

function fadeIn(variableName) {
  variableName.style.display = 'flex';

  setTimeout(function () {
    variableName.classList.add("visible");
  }, 100);
}

function fadeOut(divName) {
  divName.classList.remove("visible");

  setTimeout(function () {
    divName.classList.add("hidden");
  }, 100);
}


buttonHanSolo.addEventListener("click", function () {
  buttonHanSolo.disabled = true;
  buttonHanSolo.classList.add("clicked", "no-hover");
  buttonHanAndLeia.disabled = true;
  buttonHanAndLeia.classList.add("no-hover");

  casal = false;
  numeroDeEscolhas = 3;

  fadeOut(startTwo);

  startTwo.style.display = "none";
  fadeIn(starter);

});

buttonHanAndLeia.addEventListener("click", function () {
  buttonHanAndLeia.disabled = true;
  buttonHanAndLeia.classList.add("clicked", "no-hover");
  buttonHanSolo.disabled = true;
  buttonHanSolo.classList.add("no-hover");

  casal = true;
  numeroDeEscolhas = 6;
  quantidadeDeSaboresNoTexto.innerHTML = "Escolham até seis"

  fadeOut(startTwo);

  startTwo.style.display = "none";
  fadeIn(starter);

});

let mainArea = document.querySelector(".main");

startButton.addEventListener("click", function () {
  startArea.style.display = 'none';
  fadeIn(mainArea);
});

// let myAudio = document.getElementById("myAudio");
// let myAudioTwo = document.getElementById("myAudioTwo");
// let myAudioThree = document.getElementById("myAudioThree");
// let myAudioFour = document.getElementById("myAudioFour");
// let myAudioFive = document.getElementById("myAudioFive");
// let myAudioSix = document.getElementById("myAudioSix");
// let myAudioSeven = document.getElementById("myAudioSeven");
// let myAudioEight = document.getElementById("myAudioEight")

function playMuadib(audioSrc) {
  const audio = new Audio(audioSrc);
  audio.autoplay = true;
};


let currentAudio = null;

function playAudio(audioSrc) {
  if (currentAudio) {
    currentAudio.pause(); // Pause the current audio if playing
  }
  currentAudio = new Audio(audioSrc);
  currentAudio.volume = 1; // Set volume to maximum
  currentAudio.play();
}



function fadeOutAudio(audio, duration) {
  // if (!audio) {
  //   return; // Exit if there's no audio or a fade is already happening
  // }

  const fadeOutInterval = 50; // Interval in milliseconds
  const totalSteps = duration / fadeOutInterval; // Total number of steps
  let currentStep = 0;

  const fadeOut = setInterval(() => {
    currentStep++;
    const newVolume = Math.max(0, 1 - currentStep / totalSteps); // Calculate new volume
    audio.volume = newVolume; // Set the new volume

    if (currentStep >= totalSteps) {
      clearInterval(fadeOut); // Stop fading out
      audio.pause(); // Pause the audio when fully faded out
      audio.currentTime = 0; // Reset the audio to the beginning
      currentAudio = null; // Reset the current audio reference
    }
  }, fadeOutInterval);
}

let animationActive = false;

// function enableAutoplay(audioFile) {
//   audioFile.autoplay = true;
//   audioFile.load();
// }

// function disableAutoplay(audioFile) {
//   audioFile.autoplay = false;
//   audioFile.load();
// }

let paulAtreides = document.getElementById("paulAtreides");
let villeneuve = document.getElementById("villeneuve");
let muadibText = document.getElementById("muadibText");

paulAtreides.addEventListener('click', function () {
  const lisanAlGaib = paulAtreides.getAttribute('data-audio');
  playMuadib(lisanAlGaib);
});

function shaiHulud() {
  // Show and animate the moving image

  animationActive = true;
  muadibText.style.opacity = 1;
  paulAtreides.classList.remove("hidden");
  paulAtreides.classList.add('show');
  muadibText.classList.remove("hidden");

  // Remove the class after the animation ends to reset it
  setTimeout(() => {
    paulAtreides.classList.remove('show');
    paulAtreides.classList.add("hidden");
    animationActive = false;
    villeneuve.style.transform = 'scale(1)';
    muadibText.classList.add("hidden");
    muadibText.style.opacity = 0;
  }, 5000);
};

function shaiHuludOut() {
  paulAtreides.classList.remove('show');
  paulAtreides.classList.add("hidden");
};

let images = document.querySelectorAll('.image:not(.image4)');

images.forEach(image => {
  image.addEventListener('mouseover', () => {
    if (!animationActive) {
      // Only apply hover effect if animation is not active
      image.style.transform = 'scale(1.05)';
      image.style.cursor = 'pointer';
      const audioSrc = image.getAttribute('data-audio');
      playAudio(audioSrc);
    }
  });

  image.addEventListener('mouseout', () => {
    if (!animationActive) {
      // Reset the transform when mouse leaves
      image.style.transform = 'scale(1)';
      fadeOutAudio(currentAudio, 1500);
      
    }
  });
});

const darkPopup = document.getElementById("darkPopup");
const hansZimmer = document.querySelector(".image4");
const batman = document.getElementById("batman");
hansZimmer.addEventListener('mouseover', function () {
  darkPopup.style.display = "block";
  const batmanTheme = hansZimmer.getAttribute('data-audio');
  playMuadib(batmanTheme);

  // Start the transition to darken the background
  setTimeout(() => {
    darkPopup.style.backgroundColor = "rgba(0, 0, 0, 1)"; // Full black background
    darkPopup.style.opacity = 1; // Fade in the background
  }, 10);

  // After the background transition, fade in the center image
  setTimeout(() => {
    batman.style.opacity = 1; // Make the center image visible
  }, 3000); // Start the image fade-in after 3 seconds

  // Keep the center image visible for 2 seconds, then start fading everything out
  setTimeout(() => {
    batman.style.opacity = 0; // Fade out the center image
    darkPopup.style.backgroundColor = "rgba(0, 0, 0, 0)"; // Fade out the background
    darkPopup.style.opacity = 0;
  }, 6000); // Wait 3s for the fade-in and 2s of visibility

  // After everything has faded out, set display back to "none"
  setTimeout(() => {
    darkPopup.style.display = "none";
  }, 9000); // Wait 3s more for the fade-out to complete
})

// Select the trigger image and all other images
const captainJack = document.querySelector(".image6");
let imagesAgain = document.querySelectorAll('.image');
// Function to change the source of other images
function changeImages() {
  imagesAgain.forEach(img => {
    const altSrc = img.getAttribute('data-alt-src');
    img.setAttribute('src', altSrc); // Change to alternate source
  });
}

// Function to revert the images back to their original source
function revertImages() {
  imagesAgain.forEach(img => {
    const originalSrc = img.getAttribute('data-original-src');
    img.setAttribute('src', originalSrc); // Revert to the original source
  });
};

// Add event listeners for hover on the trigger image
captainJack.addEventListener('mouseover', changeImages);
captainJack.addEventListener('mouseout', revertImages);






let buttonTodos = document.getElementById("buttonTodos");
let buttonVeggies = document.getElementById("buttonVeggies");
let form = document.getElementById("form");

let saboresNaoVegetarianos = form.querySelectorAll('label:not(.vegetarian)')
let saboresVegetarianos = form.querySelectorAll('input.vegetarian');


function showForm() {
  form.classList.remove("hidden");
  form.scrollIntoView({
    behavior: 'smooth',  // Smooth scrolling effect
    block: 'start'       // Align to the top of the viewport
  });
}

buttonTodos.addEventListener("click", function () {
  showForm();
  saboresNaoVegetarianos.forEach(input => {
    input.classList.remove("hidden");
  })
});

buttonVeggies.addEventListener("click", function () {
  showForm();
  saboresNaoVegetarianos.forEach(input => {
    input.classList.add("hidden");
  })
});

// Select all the checkbox inputs
let formCheckboxes = document.querySelectorAll('#form input[type="checkbox"]');

// Add an event listener to each checkbox to listen for changes
formCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', function () {
    const label = this.parentElement; // Select the label containing the checkbox

    if (this.checked) {
      // Apply new styles when checkbox is checked
      label.classList.add('styledLabel');
    } else {
      // Revert to the original styles when checkbox is unchecked
      label.classList.remove('styledLabel');
    }
  });
});

let finalButton = document.getElementById("finalButton");
finalButton.onclick = function () {
  popup.style.display = "none";
}

// Listen for the form submission
form.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the default form submission

  // Get all checkbox inputs
  let checkboxes = document.querySelectorAll('input[name="sabor"]:checked');

  if (checkboxes.length > 3 && numeroDeEscolhas == 3) {
    alert("Escolha no máximo 3 sabores!")
    return
  }
  else if (checkboxes.length > 6 && numeroDeEscolhas == 6) {
    alert("Escolham no máximo 6 sabores!")
    return
  }

  else if (checkboxes.length == 0) {
    alert("É preciso escolher pelo menos 1 sabor!")
    return
  }



  // Create an array of selected checkbox values
  let selectedCheckboxes = Array.from(checkboxes).map(checkbox => checkbox.value);


  // Join the selected options into a string (or handle it as needed)
  let selectedCheckboxesList = selectedCheckboxes.join(', ');

  // Data to send via EmailJS
  const formData = {
    convidado: convidado,
    selectedOptions: selectedCheckboxesList // This will be passed into the email template
  };

  // Send the email using EmailJS
  emailjs.send('guilhermejorge91', 'template_sabores', formData)
    .then(function (response) {
      console.log('SUCCESS!', response.status, response.text);
      popup.style.display = "block";
    }, function (error) {
      console.error('FAILED...', error);
      alert('Falhou... Tente de novo. Se continuar dando erro, entre em contato comigo.');
    });
});


