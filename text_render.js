async function getData() {
  let promise = await fetch("https://api.github.com/users/lmoboy/repos");
  return await promise.json();
}
const repos = getData();
console.log(repos);

let _createClass = (function () {
  function defineProperties(target, props) {
    for (let i = 0; i < props.length; i++) {
      let descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

let TextScramble = (function () {
  function TextScramble(el) {
    _classCallCheck(this, TextScramble);

    this.el = el;
    this.chars = "!<>-_\\/[]{}@€”=+*^?#________";
    this.update = this.update.bind(this);
  }

  _createClass(TextScramble, [
    {
      key: "setText",
      value: function setText(newText) {
        let _this = this;

        let oldText = this.el.innerText;
        let length = Math.max(oldText.length, newText.length);
        let promise = new Promise(function (resolve) {
          return (_this.resolve = resolve);
        });
        this.queue = [];
        for (let i = 0; i < length; i++) {
          let from = oldText[i] || "";
          let to = newText[i] || "";
          let start = Math.floor(Math.random() * 40);
          let end = start + Math.floor(Math.random() * 40);
          this.queue.push({ from: from, to: to, start: start, end: end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
      },
    },
    {
      key: "update",
      value: function update() {
        let output = "";
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
          let _queue$i = this.queue[i],
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
            output += '<span class="text">' + char + "</span>";
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
      },
    },
    {
      key: "randomChar",
      value: function randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
      },
    },
  ]);

  return TextScramble;
})();

let el = document.querySelector(".text");
let cont = document.querySelector(".container");
let fx = new TextScramble(el);

let blur = false;
let clicked = false;
if (!clicked) {
  fx.setText("click to load portfolio");
}

function copy_to_clipboard(name) {
  navigator.clipboard.writeText(name);
}
const volumeSlider = document.getElementById("volume-slider");
const outputContainer = document.getElementById("volume-output");
volumeSlider.addEventListener("input", (e) => {
  const value = e.target.value;
  outputContainer.textContent = value;
});
document["onclick"] = () => {
  if (clicked) {
    return;
  }
  let aud = new Audio("music.mp3");
  aud.loop = true;
  aud.play();
  volumeSlider.addEventListener("input", (e) => {
    const value = e.target.value;
    outputContainer.textContent = value;
    aud.volume = value / 100;
  });


  clicked = true;
  fx.setText("loading portfolio...");
  setTimeout(function () {
    el.classList.add("text-animation");
    setTimeout(function () {
      el.remove();
      setTimeout(function () {
        let portfolioContainer = document.createElement("div");

        portfolioContainer.classList.add("portfolio-container");
        cont.append(portfolioContainer);

        setTimeout(function () {
          let portfolioPictureContainer = document.createElement("div");
          portfolioPictureContainer.classList.add(
            "portfolio-picture-container"
          );
          portfolioContainer.append(portfolioPictureContainer);
          let portfolioPicture = document.createElement("img");
          portfolioPicture.src =
            "https://forum.neverlose.cc/user_avatar/forum.neverlose.cc/azverexd/120/248465_2.png";
          portfolioPicture.classList.add("portfolio-image");
          portfolioPicture.style.cursor = "pointer";
          portfolioPictureContainer.append(portfolioPicture);

          let linkContainer = document.createElement("div");
          let d = document.createElement("a");
          let g = document.createElement("a");
          let s = document.createElement("a");
          let t = document.createElement("a");
          let link_hover = false;
          let pict_hover = false;

          portfolioPicture.addEventListener(
            "mouseleave",
            function () {
              pict_hover = false;
            },
            false
          );
          portfolioPicture.addEventListener(
            "mouseover",
            function () {
              pict_hover = true;
            },
            false
          );

          linkContainer.addEventListener(
            "mouseleave",
            function () {
              link_hover = false;
            },
            false
          );
          linkContainer.addEventListener(
            "mouseover",
            function () {
              link_hover = true;
            },
            false
          );

          portfolioPicture.addEventListener("click", function () {
            blur = !blur;

            if (blur) {
              portfolioPicture.style.cursor = "default";

              linkContainer.style.filter = "opacity(0)";
              linkContainer.style.transition = "all 0.2s ease";
              cont.append(linkContainer);

              linkContainer.classList.add("link-container");
              linkContainer.classList.add("link-container-animate");

              s.classList.add("portfolio-link-text");
              g.classList.add("portfolio-link-text");
              d.classList.add("portfolio-link-text");
              t.classList.add("portfolio-link-text");

              s.href = "https://steamcommunity.com/id/AzverexD/";
              g.href = "https://github.com/lmoboy";
              t.href = "https://t.me/AzverexD";

              d["onclick"] = () => {
                setTimeout(function () {
                  discord.setText("discord");
                }, 2000);
                discord.setText("copied");
                copy_to_clipboard("smarrtie");
              };
              t.style.bottom = "30%";
              s.style.bottom = "40%";
              g.style.bottom = "50%";
              d.style.bottom = "60%";
              d.style.cursor = "pointer";
              let discord = new TextScramble(d);
              let github = new TextScramble(g);
              let steam = new TextScramble(s);
              let telegram = new TextScramble(t);

              discord.setText("discord");
              github.setText("github");
              steam.setText("steam");
              telegram.setText("telegram");
              linkContainer.append(d, g, s, t);
              setTimeout(function () {
                linkContainer.style.filter = "opacity(1)";
              }, 0);
            } else {
              linkContainer.style.transition = "all 0.2s ease";
              linkContainer.style.filter = "opacity(0)";

              setTimeout(function () {
                linkContainer.removeChild(d);
                linkContainer.removeChild(g);
                linkContainer.removeChild(s);
                cont.removeChild(linkContainer);
              }, 500);
            }
          });
          document["onclick"] = () => {
            if (!link_hover && !pict_hover && blur) {
              blur = !blur;
              linkContainer.style.transition = "all 0.2s ease";
              linkContainer.style.filter = "opacity(0)";
              if (!linkContainer) {
                return;
              }
              setTimeout(function () {
                linkContainer.removeChild(d);
                linkContainer.removeChild(g);
                linkContainer.removeChild(s);
                cont.removeChild(linkContainer);
              }, 200);
            }
          };
          setTimeout(function () {
            let portfolioTitle = document.createElement("h3");
            let portfolioAboutme = document.createElement("p");
            
            let portfolioAboutmeAnim = new TextScramble(portfolioAboutme);
            let portfolioTitleAnim = new TextScramble(portfolioTitle);
            portfolioTitleAnim.setText("HELLO!");
            portfolioAboutme.style.position = "relative";
            portfolioAboutmeAnim.setText(
              "I'm Daniel, I'm a software engineer and I like to code. Also this portfolio is hardcoded to hell and back. go check out my github by clicking on the picture to the top left"
            );
            portfolioTitle.classList.add("portfolio-text");
            portfolioAboutme.classList.add("portfolio-aboutme-text");
            portfolioContainer.append(portfolioTitle);
            portfolioContainer.append(portfolioAboutme);
          }, 0);
        }, 0);
      }, 0);
    }, 1000);
  }, 5000);
};
