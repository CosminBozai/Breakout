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
      brickArray.push(brick);
      splitBricks();
    }
  }

  let brickArray = [];

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

  function deleteBrick(index) {
    boardObj.board.removeChild(index);
  }

  return { createBricks, boardObj, brickArray, deleteBrick };
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
  return { paddle };
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

  let yDirection = 8;
  let xDirection = 0;

  function moveBall() {
    ballObj.yPosition += yDirection;
    ballObj.xPosition += xDirection;

    ball.style.bottom = ballObj.yPosition + "px";
    ball.style.left = ballObj.xPosition + "px";
    checkCollision();
  }

  function checkCollision() {
    // Collision with the borders
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

    // Collision with the paddle
    if (
      ballObj.ball.offsetLeft > paddle.offsetLeft &&
      ballObj.ball.offsetLeft < paddle.offsetLeft + 33 &&
      ballObj.ball.offsetTop + ballObj.diameter === paddle.offsetTop
    ) {
      changeDirection("left");
    } else if (
      ballObj.ball.offsetLeft > paddle.offsetLeft &&
      ballObj.ball.offsetLeft >= paddle.offsetLeft + 33 &&
      ballObj.ball.offsetLeft < paddle.offsetLeft + 66 &&
      ballObj.ball.offsetTop + ballObj.diameter === paddle.offsetTop
    ) {
      changeDirection("up");
    } else if (
      ballObj.ball.offsetLeft > paddle.offsetLeft &&
      ballObj.ball.offsetLeft >= paddle.offsetLeft + 66 &&
      ballObj.ball.offsetTop + ballObj.diameter === paddle.offsetTop &&
      ballObj.ball.offsetLeft < paddle.offsetLeft + 100
    ) {
      changeDirection("right");
    }

    //Collision with the bricks
    boardController.brickArray.forEach((brick) => {
      if (
        ballObj.ball.offsetLeft > brick.offsetLeft &&
        ballObj.ball.offsetLeft <
          brick.offsetLeft + boardController.boardObj.boardWidth / 10 &&
        ballObj.ball.offsetTop <= brick.offsetTop + ballObj.diameter
      ) {
        changeDirection("y");
        boardController.deleteBrick(brick);
      }
    });
  }

  function changeDirection(xy) {
    switch (xy) {
      case "x":
        xDirection *= -1;
        break;
      case "y":
        yDirection *= -1;
        break;
      case "up":
        xDirection = 0;
        yDirection *= -1;
        break;
      case "left":
        xDirection = -3;
        yDirection *= -1;
        break;
      case "right":
        xDirection = 3;
        yDirection *= -1;
        break;
    }
  }

  setInterval(moveBall, 50);
};

function startGame(bricksNum) {
  boardController.createBricks(bricksNum);
  boardController.boardObj.board.addEventListener("click", ballController);
  boardController.boardObj.board.addEventListener("click", paddleController);
}
