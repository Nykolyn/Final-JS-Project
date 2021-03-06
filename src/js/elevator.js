var Elevator = function(options) {
  "use strict";

  // Elements
  var body = null;

  // Scroll vars
  var animation = null;
  var duration = null; // ms
  var customDuration = false;
  var startTime = null;
  var startPosition = null;
  var endPosition = 0;
  var targetElement = null;
  var verticalPadding = null;
  var elevating = false;

  var startCallback;
  var mainAudio;
  var endAudio;
  var endCallback;

  var that = this;

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  function extendParameters(options, defaults) {
    for (var option in defaults) {
      var t = options[option] === undefined && typeof option !== "function";
      if (t) {
        options[option] = defaults[option];
      }
    }
    return options;
  }

  function getVerticalOffset(element) {
    var verticalOffset = 0;
    while (element) {
      verticalOffset += element.offsetTop || 0;
      element = element.offsetParent;
    }

    if (verticalPadding) {
      verticalOffset = verticalOffset - verticalPadding;
    }

    return verticalOffset;
  }

  function animateLoop(time) {
    if (!startTime) {
      startTime = time;
    }

    var timeSoFar = time - startTime;
    var easedPosition = easeInOutQuad(
      timeSoFar,
      startPosition,
      endPosition - startPosition,
      duration
    );

    window.scrollTo(0, easedPosition);

    if (timeSoFar < duration) {
      animation = requestAnimationFrame(animateLoop);
    } else {
      animationFinished();
    }
  }
  this.elevate = function() {
    if (elevating) {
      return;
    }

    elevating = true;
    startPosition = document.documentElement.scrollTop || body.scrollTop;
    updateEndPosition();
    if (!customDuration) {
      duration = Math.abs(endPosition - startPosition) * 1.5;
    }

    requestAnimationFrame(animateLoop);

    // Start music!
    if (mainAudio) {
      mainAudio.play();
    }

    if (startCallback) {
      startCallback();
    }
  };

  function browserMeetsRequirements() {
    return (
      window.requestAnimationFrame && window.Audio && window.addEventListener
    );
  }

  function resetPositions() {
    startTime = null;
    startPosition = null;
    elevating = false;
  }

  function updateEndPosition() {
    if (targetElement) {
      endPosition = getVerticalOffset(targetElement);
    }
  }

  function animationFinished() {
    resetPositions();
    if (mainAudio) {
      mainAudio.pause();
      mainAudio.currentTime = 0;
    }

    if (endAudio) {
      endAudio.play();
    }

    if (endCallback) {
      endCallback();
    }
  }

  function onWindowBlur() {
    if (elevating) {
      cancelAnimationFrame(animation);
      resetPositions();

      if (mainAudio) {
        mainAudio.pause();
        mainAudio.currentTime = 0;
      }

      updateEndPosition();
      window.scrollTo(0, endPosition);
    }
  }

  function bindElevateToElement(element) {
    if (element.addEventListener) {
      element.addEventListener("click", that.elevate, false);
    } else {
      element.attachEvent("onclick", function() {
        updateEndPosition();
        document.documentElement.scrollTop = endPosition;
        document.body.scrollTop = endPosition;
        window.scroll(0, endPosition);
      });
    }
  }

  function init(_options) {
    if (!browserMeetsRequirements()) {
      return;
    }
    body = document.body;

    var defaults = {
      duration: undefined,
      mainAudio: false,
      endAudio: false,
      preloadAudio: true,
      loopAudio: true,
      startCallback: null,
      endCallback: null
    };

    _options = extendParameters(_options, defaults);

    if (_options.element) {
      bindElevateToElement(_options.element);
    }

    if (_options.duration) {
      customDuration = true;
      duration = _options.duration;
    }

    if (_options.targetElement) {
      targetElement = _options.targetElement;
    }

    if (_options.verticalPadding) {
      verticalPadding = _options.verticalPadding;
    }

    window.addEventListener("blur", onWindowBlur, false);

    if (_options.mainAudio) {
      mainAudio = new Audio(_options.mainAudio);
      mainAudio.setAttribute("preload", _options.preloadAudio);
      mainAudio.setAttribute("loop", _options.loopAudio);
    }

    if (_options.endAudio) {
      endAudio = new Audio(_options.endAudio);
      endAudio.setAttribute("preload", "true");
    }

    if (_options.endCallback) {
      endCallback = _options.endCallback;
    }

    if (_options.startCallback) {
      startCallback = _options.startCallback;
    }
  }

  init(options);
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = Elevator;
}

const elevatorButton = document.querySelector(".elevator");
const elevator = new Elevator({
  element: elevatorButton,
  endAudio: "../music/ding.mp3"
});

const scrollFunction = () => {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    elevatorButton.style.display = "block";
  } else {
    elevatorButton.style.display = "none";
  }

  if (
    document.body.scrollTop > 400 ||
    document.documentElement.scrollTop > 400
  ) {
    elevatorButton.style.display = "block";
  } else {
    elevatorButton.style.display = "none";
  }
};

document.onscroll = () => {
  scrollFunction();
};
