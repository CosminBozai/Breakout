const boardController = (() => {
  const gameBoard = {
    board: document.getElementById("game-board"),
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
      gameBoard.board.appendChild(brick);
    }
  }

  function splitBricks() {
    let bricks = document.querySelectorAll(".brick");
    let brickWidth = gameBoard.boardWidth / 10;

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
  return { createBricks, splitBricks, gameBoard };
})();

const paddleController = () => {
  const paddle = document.getElementById("paddle");
  function movePaddle(e) {
    if (
      paddle.offsetLeft >= 0 &&
      paddle.offsetLeft <= boardController.gameBoard.boardWidth - 100
    ) {
      paddle.style.left = e.pageX - 50 + "px";
    } else if (paddle.offsetLeft < 0) {
      paddle.style.left = 0;
    } else if (paddle.offsetLeft > boardController.gameBoard.boardWidth - 100) {
      paddle.style.left = boardController.gameBoard.boardWidth - 100 + "px";
    }
  }

  boardController.gameBoard.board.addEventListener("mousemove", movePaddle);
};

function startGame(bricksNum) {
  paddleController();
  boardController.createBricks(bricksNum);
  boardController.splitBricks();
}
