import { Vertex } from "./Vertex";
import * as easystarjs from "easystarjs";
export declare class GridManager {
    grid: number[][];
    vertexs: Vertex[][];
    fullGrid: number[][];
    playersPos: {
        x: number;
        y: number;
    }[];
    easystar: easystarjs.js;
    constructor();
    setupPathfinding(): void;
    checkHasSolution(gridCopy: any): boolean;
    isValidFence(i: any, j: any, horizontal: boolean): boolean;
    putFence(i: any, j: any, horizontal: boolean): void;
    isValidVertex(i: any, j: any): boolean;
    getVertex(i: any, j: any): Vertex;
    setupFullGrid(): void;
    printFullGrid(): void;
    printGrid(): void;
}
