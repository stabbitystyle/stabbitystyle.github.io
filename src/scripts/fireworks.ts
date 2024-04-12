import type { boolean } from "astro/zod";

// color enum for use in random color selection
enum Color {
    Red = 0,
    Blue = 1,
    Green = 2,
    Yellow = 3,
    Orange = 4,
    Purple = 5,
    White = 6,
    Silver = 7
}

// pattern enum for use in random pattern selection
enum Pattern {

}

// gets the canvas based on an 'id', throws an error if a canvas with that id isn't found
// taken from stackoverflow
function getCanvasElementById(id: string): HTMLCanvasElement {
    const canvas = document.getElementById(id);

    if (!(canvas instanceof HTMLCanvasElement)) {
        throw new Error(`The element of id "${id}" is not a HTMLCanvasElement. Make sure a <canvas id="${id}""> element is present in the document.`);
    }

    return canvas;
}

// gets the 2D rendering context of the canvas, throws an error if no browser support
// taken from stackoverflow
function getCanvasRenderingContext2D(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
    const context = canvas.getContext('2d');

    if (context === null) {
        throw new Error('This browser does not support 2-dimensional canvas rendering contexts.');
    }

    return context;
}

// gets the width from the side of the window to the side of the body
function getSideWidth(bodyWidth: number, windowWidth: number): number {
    return windowWidth - bodyWidth;
}

// returns random integer from 0 to 'max'
function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
}


function drawColorAtLocation(ctx: CanvasRenderingContext2D, horizontalPixel: number, verticalPixel: number, color: Color) {
    // error checks for pixel and color, should these be separate functions?
    if (color < 0 || color > 7) {
        throw new Error(`Color is not within 0 to 7`);
    } else if (horizontalPixel < 0 || horizontalPixel > window.innerWidth) {
        throw new Error(`Horizontal pixel is not within 0 to "${window.innerWidth}"`);
    } else if (verticalPixel < 0 || verticalPixel > window.innerHeight) {
        throw new Error(`Vertical pixel is not within 0 to "${window.innerHeight}"`);
    }

    ctx.fillStyle = Color[color];
    ctx.fillRect(horizontalPixel, verticalPixel, 1, 1);
}

function isHorizontalPixelValid(horizontalPixel: number): boolean {
    var isValid = true;

    if (horizontalPixel < 0 || horizontalPixel > window.innerWidth) {
        isValid = false;
    }
    return isValid;
}

function isVerticalPixelValid(verticalPixel: number): boolean {
    var isValid = true;

    if (verticalPixel < 0 || verticalPixel > window.innerHeight) {
        isValid = false;
    }
    return isValid;
}

function isColorValid(color: Color): boolean {
    var isValid = true;
    
    if (color < 0 || color > 7) {
        isValid = false;
    }
    return isValid;
}

function draw() {
    const canvasID: string = "backgroundCanvas";
    const ctx: CanvasRenderingContext2D = getCanvasRenderingContext2D(getCanvasElementById(canvasID));
    const bodyWidth: number = document.body.clientWidth;
    const sideWidth: number = getSideWidth(bodyWidth, window.innerWidth);
    const originalColor: string = document.body.style.backgroundColor;
    var changedColors: [x: number, y: number][] = [];
    
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    var isRight: boolean = !!getRandomInt(2);
    var targetVerticalPixel: number = getRandomInt(window.innerHeight);
    var targetHorizontalPixel: number = getRandomInt(sideWidth);
    targetHorizontalPixel = isRight ? targetHorizontalPixel + sideWidth + bodyWidth : targetHorizontalPixel;
    var targetColor: Color = getRandomInt(7);
    

    changedColors.push([targetHorizontalPixel, targetVerticalPixel]);
  }