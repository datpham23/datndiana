import React from 'react'
import '../sass/photos-page.scss';
import ReactDOMServer from 'react-dom/server';

export default React.createClass({
  componentDidMount() {

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    var MAX_FLIES = 50;
    var FLY_XSPEED_RANGE = [-1, 1];
    var FLY_YSPEED_RANGE = [-0.5, 0.5];
    var FLY_SIZE_RANGE = [1, 4];
    var FLY_LIFESPAN_RANGE = [75, 500];

    var flies = [];

    function randomRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    function Fly(options) {
      if (!options) { options = {}; }

      this.x = options.x || randomRange(0, canvas.width);
      this.y = options.y || randomRange(0, canvas.height);
      this.xSpeed = options.xSpeed || randomRange(FLY_XSPEED_RANGE[0], FLY_XSPEED_RANGE[1]);
      this.ySpeed = options.ySpeed || randomRange(FLY_YSPEED_RANGE[0], FLY_YSPEED_RANGE[1]);
      this.size = options.size || randomRange(FLY_SIZE_RANGE[0], FLY_SIZE_RANGE[1]);
      this.lifeSpan = options.lifeSpan || randomRange(FLY_LIFESPAN_RANGE[0], FLY_LIFESPAN_RANGE[1]);
      this.age = 0;

      this.colors = options.colors || {
        red: 242,
        green: 104,
        blue: 127,
        alpha: 0
      };
    }

    function fitToScreen(element) {
      element.width = window.innerWidth;
      element.height = window.innerHeight;
    }

    function clearScreen() {
      ctx.beginPath();
      ctx.fillStyle = '#2E2C2C';
      ctx.rect(0, 0, canvas.width, canvas.height);
      ctx.fill();
    }

    function createFlies() {
      if (flies.length !== MAX_FLIES) {
        flies.push(new Fly());
      }
    }

    function moveFlies() {
      flies.forEach(function(fly) {
        fly.x += fly.xSpeed;
        fly.y += fly.ySpeed;
        fly.age++;

        if (fly.age < fly.lifeSpan / 2) {
          fly.colors.alpha += 1 / (fly.lifeSpan / 2);

          if (fly.colors.alpha > 1) { fly.colors.alpha = 1; }
        } else {
          fly.colors.alpha -= 1 / (fly.lifeSpan / 2);

          if (fly.colors.alpha < 0) { fly.colors.alpha = 0; }
        }
      });
    }

    function removeFlies() {
      var i = flies.length;

      while (i--) {
        var fly = flies[i];

        if (fly.age >= fly.lifeSpan) {
          flies.splice(i, 1);
        }
      }
    }

    function drawFlies() {
      flies.forEach(function(fly) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(' + fly.colors.red + ', ' + fly.colors.green + ', ' + fly.colors.blue + ', ' + fly.colors.alpha + ')';
        ctx.arc(
          fly.x,
          fly.y,
          fly.size,
          0,
          Math.PI * 2,
          false
        );
        ctx.fill();
        ctx.strokeStyle = '#F2687F';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#F2687F';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.stroke();
      });
    }

    function render() {
      clearScreen();
      createFlies();
      moveFlies();
      removeFlies();
      drawFlies();
    }

    window.addEventListener('resize', function() {
      fitToScreen(canvas);
    });


    fitToScreen(canvas);

    (function animationLoop() {
      window.requestAnimationFrame(animationLoop);
      render();
    })();

  },
  render() {
    return (
      <div className="photos-page">
        <canvas id="canvas"/>
        <div className="well">
          <h1>
            Send me some goddamn photos Dat!
          </h1>
        </div>
      </div>
    )
  }
})
