import { Vertex } from "./Vertex";
export declare class GridManager {
    grid: number[][];
    vertexs: Vertex[][];
    fullGrid: number[][];
    constructor();
    isValidFence(i: any, j: any, horizontal: boolean): boolean;
    putFence(i: any, j: any, horizontal: boolean): void;
    isValidVertex(i: any, j: any): boolean;
    getVertex(i: any, j: any): Vertex;
    setupFullGrid(): void;
    printFullGrid(): void;
    printGrid(): void;
}
