const boardController = (() => {
  const boardObj = {
    board: document.getElementById("game-board"),
    // Get the values from the :root variable in style.css
    boardWidth: Number(
      getComputedStyle(document.documentElement)
        .getPropertyValue("--board-width")
        .replace("px", "")
    ),
    boardHeight: Number(
      getComputedStyle(document.documentElement)
        .getPropertyValue("--board-height")
        .replace("px", "")
    ),
  };

  function createBricks(bricksNum) {
    for (let i = 0; i < bricksNum; i++) {
      let brick = document.createElement("div");
      brick.classList.add("brick");
      boardObj.board.appendChild(brick);
    }
  }

  function splitBricks() {
    let bricks = document.querySelectorAll(".brick");
    let brickWidth = boardObj.boardWidth / 10;

    //   leftPos topPos are used so bricks don't spawn one on top of the other
    let leftPos = 0;
    let topPos = 0;

    for (i = 0; i < bricks.length; i++) {
      bricks[i].style.left = leftPos + "px";
      bricks[i].style.top = topPos + "px";
      leftPos += brickWidth;
      if ((i + 1) % 10 === 0) {
        topPos += 22;
        leftPos = 0;
      }
    }
  }
  return { createBricks, splitBricks, boardObj };
})();

const paddleController = () => {
  const paddle = document.getElementById("paddle");
  // 100 is the width of the paddle
  // substract 100 so it calculates by the end of the paddle
  function movePaddle(e) {
    if (
      paddle.offsetLeft >= 0 &&
      paddle.offsetLeft <= boardController.boardObj.boardWidth - 100
    ) {
      paddle.style.left = e.pageX - 50 + "px";
    } else if (paddle.offsetLeft < 0) {
      paddle.style.left = 0;
    } else if (paddle.offsetLeft > boardController.boardObj.boardWidth - 100) {
      paddle.style.left = boardController.boardObj.boardWidth - 100 + "px";
    }
  }

  boardController.boardObj.board.addEventListener("mousemove", movePaddle);
};

const ballController = () => {
  let ballObj = {
    ball: document.getElementById("ball"),
    xPosition: Number(
      getComputedStyle(ball).getPropertyValue("left").replace("px", "")
    ),
    yPosition: Number(
      getComputedStyle(ball).getPropertyValue("bottom").replace("px", "")
    ),
    diameter: Number(
      getComputedStyle(ball).getPropertyValue("width").replace("px", "")
    ),
  };

  let yDirection = 6;
  let xDirection = -6;

  function moveBall() {
    ballObj.yPosition += yDirection;
    ballObj.xPosition += xDirection;

    ball.style.bottom = ballObj.yPosition + "px";
    ball.style.left = ballObj.xPosition + "px";
    checkCollision();
    // console.log(ballObj.ball.offsetTop);
    console.log(xDirection, yDirection);
  }

  function checkCollision() {
    if (
      ballObj.ball.offsetLeft <= 0 ||
      ballObj.ball.offsetLeft >=
        boardController.boardObj.boardWidth - ballObj.diameter
    ) {
      changeDirection("x");
    } else if (
      ballObj.ball.offsetTop <= 0 ||
      ballObj.ball.offsetTop >=
        boardController.boardObj.boardHeight - ballObj.diameter
    ) {
      changeDirection("y");
    }
  }
  function changeDirection(xy) {
    switch (xy) {
      case "x":
        xDirection *= -1;
        break;
      case "y":
        yDirection *= -1;
        break;
    }
  }

  setInterval(moveBall, 50);
};

function startGame(bricksNum) {
  paddleController();
  boardController.createBricks(bricksNum);
  boardController.splitBricks();
  ballController();
}
