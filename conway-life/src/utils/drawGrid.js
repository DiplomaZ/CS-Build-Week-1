import { Cell } from "./cell";
import { useEffect } from "react";
import { Grid } from "./grid";

export const drawGrid = (
  context,
  props,
  canvas,
  stopAnimation,
  cells,
  setCells
) => {
  let { gridHeight, gridWidth } = props;
  let imageData = context.getImageData(0, 0, gridWidth, gridHeight);
  context.clearRect(0, 0, gridWidth, gridHeight);
  let s = 34;
  let nX = Math.floor(gridWidth / s) - 2;
  let nY = Math.floor(gridHeight / s) - 2;
  let pX = gridWidth - nX * s;
  let pY = gridHeight - nY * s;
  let pL = pX / 2;
  let pR = pX / 2;
  let pT = pY / 2;
  let pB = pY / 2;
  let cellLeft = canvas.offsetLeft,
    cellTop = canvas.offsetTop;

  let grid = new Grid({
    w: nX,
    l: nY,
    cellSize: s,
    context: context,
  });
  grid.whateverYouWant();
  context.strokeStyle = "lightgrey";
  context.beginPath();

  //recalcuate offsets to avoid hellish nightmare
  function reOffset() {
    let BB = canvas.getBoundingClientRect();
    console.log("changing ", cellLeft, " to ", window.pageXOffset);
    cellLeft = canvas.offsetLeft - window.pageXOffset;
    cellTop = canvas.offsetTop;
  }

  window.onscroll = function (e) {
    reOffset();
    console.log("resetti");
  };
  window.onresize = function (e) {
    reOffset();
  };

  for (let x = pL; x <= gridWidth - pR; x += s) {
    context.moveTo(x, pT);
    for (let y = pT; y < gridHeight - pB; y += s) {}
    context.lineTo(x, gridHeight - pB);
  }
  for (let y = pT; y <= gridHeight - pB; y += s) {
    context.moveTo(pL, y);
    context.lineTo(gridWidth - pR, y);
  }
  context.stroke();
  for (const cell in cells) {
    console.log(cell);
  }
  canvas.addEventListener("click", function (event) {
    if (stopAnimation == true) {
      let xClick = event.pageX - cellLeft,
        yClick = event.pageY - cellTop;
      let relX = xClick - pL,
        relY = yClick - pT;
      console.log("you clicked the coords: ", relX, relY);
      if (
        pL < xClick &&
        xClick <= gridWidth - pR &&
        pB <= yClick &&
        yClick <= gridWidth - pT
      ) {
        let x = Math.floor(relX / s);
        let y = Math.floor(relY / s);

        console.log(`x pos: ${x}`);
        console.log(`y pos: ${y}`);
        // console.log(grid);
        grid.thing[x][y].draw({ pL, pT });
        // let gridX = xNum * s + pL - s + 1;
        // let gridY = yNum * s + pT - s + 1;
        // let squareNum = xNum + nX * (yNum - 1);
        // console.log("you clicked square number ", squareNum);
        // if (squareNum in cells) {
        //   cells[squareNum].alive = false;
        //   cells[squareNum].draw();
        //   console.log("falseyS");
        //   setCells({ ...cells, [squareNum]: 0 });
        // } else {
        //   let cell = new Cell(context, gridX, gridY, s - 2, squareNum);
        //   cell.draw();
        //   console.log(
        //     "modifying ",
        //     cells,
        //     "with squarenum ",
        //     squareNum,
        //     " and cell ",
        //     cell
        //   );
        //   let bells = { frogs: "seventy two" };
        //   let testObj = { ...bells, [squareNum]: cell };
        //   console.log("test obj is ", testObj);
        //   setCells({ ...bells, [squareNum]: cell });
        // }

        // context.fillRect(
        //   xNum * s + pL - s + 1,
        //   yNum * s + pT - s + 1,
        //   s - 2,
        //   s - 2
        // );
      }
    } else {
      console.log("You cannot modify units while in play!");
    }
  });
  // function createArray(rows) {
  //   //creates a 2 dimensional array of required height
  //   let arr = [];
  //   for (let i = 0; i < rows; i++) {
  //     arr[i] = [];
  //   }
  //   return arr;
  // }
  // let theGrid = createArray(gridWidth);

  // function fillRandom(props) {
  //   //fill the grid randomly
  //   for (let j = 0; j < gridHeight; j++) {
  //     //iterate through rows
  //     for (let k = 0; k < gridWidth; k++) {
  //       //iterate through columns
  //       let rawRandom = Math.random(); //get a raw random number
  //       let improvedNum = rawRandom * 2; //convert it to an int
  //       let randomBinary = Math.floor(improvedNum);
  //       if (randomBinary === 1) {
  //         theGrid[j][k] = 1;
  //       } else {
  //         theGrid[j][k] = 0;
  //       }
  //     }
  //   }
  // }
  // console.log(theGrid);
  // fillRandom({ gridHeight: theGrid.length, gridWidth: theGrid[0].length });

  // context.clearRect(0, 0, 400, 400); //this should clear the canvas ahead of each redraw
  // for (let j = 1; j < gridHeight; j++) {
  //   //iterate through rows
  //   for (let k = 1; k < gridWidth; k++) {
  //     //iterate through columns
  //     if (theGrid[j][k] === 1) {
  //       context.fillStyle = "#FF0000";
  //       context.fillRect(j, k, 1, 1);
  //     }
  //   }
  // }
};
