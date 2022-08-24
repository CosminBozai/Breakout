const tableController = (() => {
  const gameTable = document.getElementById("game-table");
  function createBricks(bricksNum) {
    for (let i = 0; i < bricksNum; i++) {
      let brick = document.createElement("div");
      brick.classList.add("brick");
      gameTable.appendChild(brick);
    }
    /* 
    take how many bricks to make
    make them through a loop  */
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
    /* loop through the bricks and add positioning to them
    if more than 8 just go to the next row*/
  }
  return { createBricks, splitBricks };
})();
