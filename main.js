// To set up our event listener, we need to make sure the elements are loaded.
document.onreadystatechange = function() {
  if (document.readyState === 'complete') {
    // Document is ready. Grab element
    var backToTop = document.querySelector("#backToTop");
    var modal = document.querySelector("#popupContainer");
    var signUpButton = document.querySelector("#signUpButton");
    var close = document.querySelector("#close");

    // Add listener for click event
    backToTop.addEventListener("click", function(event) {
      event.preventDefault();
      smoothScroll(document.querySelector(backToTop.getAttribute("href")), 500);
    });

    signUpButton.addEventListener("click", toggleModal);
    signUpButton.modal = modal;

    close.addEventListener("click", toggleModal);
    close.modal = modal;
  } // End ready state
};

// Validating Empty Field
function check_empty() {
  if (document.getElementById('userName').value === "" || document.getElementById('email').value === "" || document.getElementById('password').value === "") {
    alert("Fill All Fields !");
  } else {
    document.getElementById('form').submit();
    alert("Form Submitted Successfully...");
  }
}

//Function to toggle the modal panel (popup)
function toggleModal(event) {
  var target = event.target.modal;

  // For some reason, the target is the icon inside the anchor link
  if(!target) {
      // This was the only way I knew how to set the target to the anchor link.
      // I would appreciate some feedback on this.
      target = event.target.closest("a").modal;
  }

  if (target.style.display != "block") {
    target.style.display = "block";
  } else {
    target.style.display = "none";
  }
}

// Smoothscroll snippet from http://codepen.io/rleve/pen/iCbgy
var smoothScroll = function (anchor, duration) {
    // Calculate how far and how fast to scroll
    var startLocation = window.pageYOffset;
    var endLocation = anchor.offsetTop;
    var distance = endLocation - startLocation;
    var increments = distance/(duration/16);
    var stopAnimation;

    // Scroll the page by an increment, and check if it's time to stop
    var animateScroll = function () {
        window.scrollBy(0, increments);
        stopAnimation();
    };

    // If scrolling down
    if ( increments >= 0 ) {
        // Stop animation when you reach the anchor OR the bottom of the page
        stopAnimation = function () {
            var travelled = window.pageYOffset;
            if ( (travelled >= (endLocation - increments)) || ((window.innerHeight + travelled) >= document.body.offsetHeight) ) {
                clearInterval(runAnimation);
            }
        };
    }
    // If scrolling up
    else {
        // Stop animation when you reach the anchor OR the top of the page
        stopAnimation = function () {
            var travelled = window.pageYOffset;
            if ( travelled <= (endLocation || 0) ) {
                clearInterval(runAnimation);
            }
        };
    }

    // Loop the animation function
    var runAnimation = setInterval(animateScroll, 16);
};
