const tableController = (() => {
  const gameBoard = document.getElementById("game-board");

  function createBricks(bricksNum) {
    for (let i = 0; i < bricksNum; i++) {
      let brick = document.createElement("div");
      brick.classList.add("brick");
      gameBoard.appendChild(brick);
    }
  }

  function splitBricks() {
    let bricks = document.querySelectorAll(".brick");
    let brickWidth =
      Number(
        getComputedStyle(document.documentElement)
          .getPropertyValue("--board-width")
          .replace("px", "")
      ) / 10;

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
  return { createBricks, splitBricks };
})();

const paddleController = () => {
  const paddle = document.getElementById("paddle");
  function movePaddle(e) {
    // -50 is used to mouse position coresponds with the center of the paddle
    paddle.style.left = e.pageX - 50 + "px";
  }
  document.addEventListener("mousemove", movePaddle);
};

function startGame(bricksNum) {
  paddleController();
  tableController.createBricks(bricksNum);
  tableController.splitBricks();
}

/* TO-DO 
1. PUT A GAP ON THE NUMBER OF BRICKS YOU CAN CREATE
2. MAKE THE PADDLE NOT FOLLOW THE MOUSE OUTSIDE OF THE BOARD'S BORDER
*/
