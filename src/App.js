import React from "react";
import Game from "./game";
import Rocket from "./rocket";
import Asteroid from "./asteroid";

class GameCanvas extends React.Component {
  constructor() {
    super();
    this.game = new Game();
  }

  componentDidMount() {
    this.game.stop();
  }

  letsBegin = () => {
    this.game.start();
    this.gameLoop();
  };

  gameLoop = timestamp => {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    let deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;
    ctx.clearRect(0, 0, 800, 200);
    this.game.updateParts(deltaTime);
    this.game.drawCanvas(ctx);
    requestAnimationFrame(this.gameLoop);
  };

  restart = () => {
    this.game.rocket = new Rocket(this.game);
    const asteroid1 = new Asteroid(Math.floor(Math.random() * 160), this.game);
    const asteroid2 = new Asteroid(Math.floor(Math.random() * 160), this.game);
    asteroid1.left = 550;
    asteroid2.left = 700;
    this.game.gameObjects = [this.game.rocket, asteroid1, asteroid2];
  };

  render() {
    return (
      <div>
        <canvas className="canvas" ref="canvas" width={800} height={200} />
        <div>
          <button onClick={this.letsBegin}>START</button>
          <button onClick={this.restart}>RESTART</button>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>INFINITE HUMMER</h1>
        <GameCanvas />
        <a href="https://github.com/followdiallo/infinite-hummer">
          <img
            id="github"
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub Logo"
          />
        </a>
      </div>
    );
  }
}

export default App;
