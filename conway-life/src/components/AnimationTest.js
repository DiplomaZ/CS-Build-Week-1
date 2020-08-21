import React, { useRef, useState, useEffect } from "react";
import { useAnimationFrame } from "../hooks/useAnimationFrame";
import moment from "moment";
import getPixel from "../utils/getPixel";
import setPixel from "../utils/setPixel";
import { drawGrid } from "../utils/drawGrid";
import { Grid } from "../utils/grid";
const AnimationTest = ({ width, height, cells, setCells, size }) => {
  const grid = new Grid({ l: height, w: width, cellSize: size });
  grid.setUp();

  const canvasRef = useRef(null);

  // const [stopAnimation, setStopAnimation] = useState(true);

  // const draw = (context, canvas) => {
  //   drawGrid(
  //     context,
  //     { gridWidth: width, gridHeight: height },
  //     canvas,
  //     stopAnimation,
  //     cells,
  //     setCells
  //   );
  // };

  // useEffect(() => {
  //   console.log(cells);
  // }, [cells]);

  // const doAnimation = (elapsedTime) => {
  //   const canvas = canvasRef.current; // refers to the ref attribute in render()
  //   const context = canvas.getContext("2d"); // etc.
  //   console.log("elapsed time:", elapsedTime);
  //   console.log(canvasRef.current);
  //   draw(context, canvas);
  // };
  // const [cancelAnimation, resumeAnimation] = useAnimationFrame(
  //   moment.now(),
  //   doAnimation
  // );
  const getNextFrame = () => {
    grid.update();
    console.log(grid.thing);
    // grid object
    // grid method to go over each cell and populate/unpopulate based on conways laws
    // redraw frame
  };

  useEffect(() => {
    getNextFrame();
  }, []);

  // useEffect(() => {
  //   if (stopAnimation === true) {
  //     cancelAnimation();
  //   } else {
  //     resumeAnimation();
  //   }
  // }, [stopAnimation]);
  /**
   * Render the canvas
   */
  return (
    <>
      <canvas ref={canvasRef} width={width} height={height} />{" "}
      <button
        onClick={() => {
          console.log("starting?");
          // setStopAnimation(false);
        }}
      >
        START
      </button>{" "}
      <button
        onClick={() => {
          console.log("stopping?");
          // setStopAnimation(true);
        }}
      >
        STOP
      </button>
    </>
  );
};

export default AnimationTest;
