const tableController = (() => {
  const gameTable = document.getElementById("game-table");
  function createBricks(bricksNum) {
    for (let i = 0; i < bricksNum; i++) {
      let brick = document.createElement("div");
      brick.classList.add("brick");
      gameTable.appendChild(brick);
    }
  }

  function splitBricks() {
    let bricks = document.querySelectorAll(".brick");
    let leftPos = 0;
    let topPos = 0;
    for (i = 0; i < bricks.length; i++) {
      bricks[i].style.left = leftPos + "px";
      bricks[i].style.top = topPos + "px";
      leftPos += 102;
      if ((i + 1) % 8 === 0) {
        topPos += 22;
        leftPos = 0;
      }
    }
  }
  return { createBricks, splitBricks };
})();

const paddle = document.getElementById("paddle");
function movePaddle(e) {
  // -50 is used to mouse position coresponds with the center of the paddle
  paddle.style.left = e.pageX - 50 + "px";
}
document.addEventListener("mousemove", movePaddle);
