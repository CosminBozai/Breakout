const tableController = (() => {
  const gameTable = document.getElementById("game-table");
  function createBlocks(blocksNum) {
    for (let i = 0; i < blocksNum; i++) {
      let block = document.createElement("div");
      block.classList.add("block");
      gameTable.appendChild(block);
    }
    /* 
    take how many blocks to make
    make them through a loop  */
  }

  function splitBlocks() {
    let blocks = document.querySelectorAll(".block");
    let leftPos = 0;
    let topPos = 0;
    for (i = 0; i < blocks.length; i++) {
      blocks[i].style.left = leftPos + "px";
      blocks[i].style.top = topPos + "px";
      leftPos += 102;
      if ((i + 1) % 8 === 0) {
        topPos += 22;
        leftPos = 0;
      }
    }
    /* loop through the blocks and add positioning to them
    if more than 8 just go to the next row*/
  }
  return { createBlocks, splitBlocks };
})();
