var nameSpace = TIAA || {};

(function () {
  'use strict';

  var timeline;
  var wrapper, clickThrough, logo, copy, cta, width, height, ids;

  nameSpace.init = function () {
    // Initialize any variables here
    ids = [];

    width = 300;
    height = 250;

    //SET IDs IN DOM TO GLOBAL VARIABLES
    var allElements = document.getElementsByTagName('*');
    //grabs all elements and makes them variables
    for (var q = 0; q < allElements.length; q++) {
      var el = allElements[q];
      if (el.id) {
        window[el.id] = document.getElementById(el.id);
        //separates what we don't want to hide initially
        if (
          el.id !== 'wrapper' &&
          el.id !== 'click_through' &&
          el.id !== 'bg'
        ) {
          ids.push(el);
        }
      }
    }

    // TweenMax.set("#allNums", { autoAlpha: 0 });
    TweenMax.set(['#copy-1', '#copy-2', '#copy-3', '#copy-4'], {
      autoAlpha: 0,
    });
    TweenMax.set(
      [
        '#bubble-1',
        '#bubble-2',
        '#copy-effect-1',
        '#copy-effect-2',
        '#copy-effect-3',
      ],
      {
        autoAlpha: 0,
      }
    );

    TweenMax.set(['#cta', '#code'], { autoAlpha: 0 });
    TweenMax.set(['#bubble-1', '#bubble-2'], { autoAlpha: 0, scale: 0.2 });

    wrapper = nameSpace.$('#wrapper');
    clickThrough = document.getElementById('click_through');
    cta = nameSpace.$('#cta');
    /* end added by me */

    wrapper.addClass('show');

    nameSpace.initClickTag();
    nameSpace.initAnimation();

    if (nameSpace.useFallback()) {
      nameSpace.injectFallback();
    } else {
      nameSpace.startAnimation();
    }

    click_through.onmouseover = function () {
      TweenMax.to('#cta', 1, {
        ease: Elastic.easeOut,
        scale: 1.1,
        y: 0,
        transformOrigin: '80% 75%',
        z: 0.01,
        force3D: true,
        rotationZ: 0.01,
        transformPerspective: 400,
      });
    };

    click_through.onmouseout = function () {
      TweenMax.to('#cta', 0.1, {
        scale: 1,
        force3D: true,
        z: 0.01,
        rotationZ: 0.01,
        transformPerspective: 400,
        y: 0,
      });
    };
  };

  nameSpace.initClickTag = function () {
    clickThrough.onclick = function () {
      window.open(window.clickTag);
    };
  };

  nameSpace.injectFallback = function () {
    var body = document.body;

    while (body.firstChild) {
      body.removeChild(body.firstChild);
    }

    var anchor = document.createElement('a');
    anchor.style.cursor = 'pointer';

    var img = new Image();
    img.src = './img/static.jpg';

    anchor.appendChild(img);
    anchor.onclick = function () {
      window.open(window.clickTag);
    };
    document.body.appendChild(anchor);
  };

  nameSpace.initAnimation = function () {
    // TweenMax can be used to set css
    // It will even take care of browser prefixes
    // TweenMax.set(logo, {x:100, y:50, opacity:0});

    timeline = new TimelineMax({
      delay: 0.5,
      onComplete: nameSpace.onAnimationComplete,
    });

    timeline.pause();

    CustomEase.create(
      'bubbleIn',
      'M0,0 C0,0 0.241,-0.004 0.256,-0.01 0.283,-0.02 0.299,-0.008 0.325,-0.02 0.334,-0.023 0.398,-0.015 0.402,-0.012 0.409,-0.004 0.42,0.036 0.425,0.054 0.436,0.101 0.443,0.128 0.451,0.176 0.485,0.389 0.417,0.505 0.45,0.721 0.459,0.783 0.577,1.027 0.61,1.034 0.668,1.046 0.716,0.995 0.75,0.982 0.804,0.96 1,1 1,1 '
    );
    timeline
      .to('#bubble-1', 0.5, { scale: 1, autoAlpha: 1, ease: 'bubbleIn' })
      .to('#copy-effect-1', 0.3, { autoAlpha: 1 }, '-=0.3')
      .to('#copy-1', 0.1, { autoAlpha: 1 }, '-=0.3')

      .to('#copy-effect-1', 0.2, { autoAlpha: 0, ease: 'bubbleIn' }, '+=2.2')
      .to('#copy-1', 0.1, { autoAlpha: 0 }, '-=0.1')

      .to('#copy-effect-2', 0.3, { autoAlpha: 1 }, '+=0.5')
      .to('#copy-2', 0.1, { autoAlpha: 1 }, '-=0.3')

      .to('#copy-effect-2', 0.2, { autoAlpha: 0, ease: 'bubbleIn' }, '+=2.2')
      .to('#copy-2', 0.1, { autoAlpha: 0 }, '-=0.2')
      .to(
        '#bubble-1',
        0.4,
        { scale: 0, autoAlpha: 0, ease: Power4.easeIn },
        '-=0.4'
      )
      .to('#bubble-2', 0.5, { scale: 1, autoAlpha: 1, ease: 'bubbleIn' })
      .to('#copy-effect-3', 0.3, { autoAlpha: 1 }, '-=0.3')
      .to('#copy-3', 0.1, { autoAlpha: 1 }, '-=0.3')

      //   .to('#copy-2', 0.1, { autoAlpha: 1 }, '+=0.2')
      //   .to('#copy-effect-2', 0.2, { autoAlpha: 0, ease: 'bubbleIn' }, '+=2')

      //   .to('#copy-2', 0.5, { autoAlpha: 1 })
      .to(
        ['#cta', '#code'],
        0.5,
        { autoAlpha: 1, ease: Cubic.easeInOut },
        '+=1'
      );
  };

  // function traceTime(){
  // 	console.log("slideTime: " + timeline.time());
  // }

  nameSpace.startAnimation = function () {
    // Code for animation
    timeline.play();
    // startBgImg();
    // TweenMax.delayedCall(4.25, countUpTens);
  };

  nameSpace.onAnimationComplete = function () {
    // Log duration of timeline
    console.log('Animation Duration: ' + timeline.time() + 's');

    // Show a CTA or any animations outside main timeline
    // TweenMax.from( cta, 0.4, { y: '110%' } );
    // TweenMax.to( cta, 0.4, { opacity: 1 } );
  };

  //
})();

var count = 1;
function loop() {
  if (count < 2) {
    console.log(count);
    count++;
    TIAA.init();
  }
}
//
