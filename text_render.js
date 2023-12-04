
    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
    
    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
    
    var TextScramble = function () {
      function TextScramble(el) {
        _classCallCheck(this, TextScramble);
    
        this.el = el;
        this.chars = '!<>-_\\/[]{}@€”=+*^?#________';
        this.update = this.update.bind(this);
      }
    
      _createClass(TextScramble, [{
        key: 'setText',
        value: function setText(newText) {
          var _this = this;
    
          var oldText = this.el.innerText;
          var length = Math.max(oldText.length, newText.length);
          var promise = new Promise(function (resolve) {
            return _this.resolve = resolve;
          });
          this.queue = [];
          for (var i = 0; i < length; i++) {
            var from = oldText[i] || '';
            var to = newText[i] || '';
            var start = Math.floor(Math.random() * 40);
            var end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from: from, to: to, start: start, end: end });
          }
          cancelAnimationFrame(this.frameRequest);
          this.frame = 0;
          this.update();
          return promise;
        }
      }, {
        key: 'update',
        value: function update() {
          var output = '';
          var complete = 0;
          for (var i = 0, n = this.queue.length; i < n; i++) {
            var _queue$i = this.queue[i],
                from = _queue$i.from,
                to = _queue$i.to,
                start = _queue$i.start,
                end = _queue$i.end,
                char = _queue$i.char;
    
            if (this.frame >= end) {
              complete++;
              output += to;
            } else if (this.frame >= start) {
              if (!char || Math.random() < 0.28) {
                char = this.randomChar();
                this.queue[i].char = char;
              }
              output += '<span class="text">' + char + '</span>';
            } else {
              output += from;
            }
          }
          this.el.innerHTML = output;
          if (complete === this.queue.length) {
            this.resolve();
          } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
          }
        }
      }, {
        key: 'randomChar',
        value: function randomChar() {
          return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
      }]);
    
      return TextScramble;
    }();
    
    var phrases = [
        "so basically, this is a thing",
        "name is daniel",
        "aka AzverexD",
        "could've used something easier but ok",
        "javascript kinda sucks",
        "ASM or c++ is easier than web development",
        "I would love to share something",
        "I really like this animation",
        "if you are wondering how this works",
        "here is an explanation by ai",
        "The `var phrases` variable is an array of strings that contains the phrases that will be displayed on the screen.",
        "The `var el` variable is a reference to the div element with the class `text`.",
        "The `var fx` variable is a reference to the `TextScramble` object that is used to animate the text.",
        "The `var counter` variable is used to keep track of the current phrase in the `var phrases` array.",
        "The `var next` function is used to call the `setText()` method on the `fx` object and then schedule a call to the `next()` function again after phrase length * 60.",
        "The `var clicked` variable is used to keep track of whether or not the user has clicked on the screen.",
        "The `document.onclick` event handler is used to call the `next()` function when the user clicks on the screen.",
        "oh also this is on loop",
        "if you want you can stay here for 10 min",
        "song mix is 10 min so u good"
    ];
    
    var el = document.querySelector('.text');
    var fx = new TextScramble(el);
    var timeout;
    var counter = 0;
    var next = function next() {
        fx.setText(phrases[counter]).then(function () {
            timeout = setTimeout(next, phrases[counter === 0 ? counter : counter - 1].length * 60);
        });
        counter = (counter + 1) % phrases.length;
    };

    var clicked = false;
    if (!clicked){
        fx.setText("click to start the animation (or to skip text)");
    }
    document.onclick = () => {
        if (clicked) {
            clearTimeout(timeout)
            next();
            return;
        }
        clicked = true;
        var aud = new Audio("music.mp3");
        aud.loop = true;
        aud.play();
        next();
    }
