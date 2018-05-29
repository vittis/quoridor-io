import { Vertex } from "./Vertex";
import * as easystarjs from "easystarjs";

export class GridManager {

    grid:number[][];//0 free, 1 blocked, 2 pawn

    vertexs:Vertex[][];

    fullGrid:number[][];

    playersPos = [{x: 0, y: 4}, {x: 8, y: 4}];

    easystar:easystarjs.js;

    constructor() {
        this.grid = [];
        for (var i = 0; i < 9; i++) {
            this.grid[i] = [];
            for (var j = 0; j < 9; j++) {
                this.grid[i][j] = 0;
            }
        }

        for(var i= 0; i<this.playersPos.length; i++) {
            let x = this.playersPos[i].x;
            let y = this.playersPos[i].y;
            this.grid[x][y] = 2;
        }
        /* this.grid[0][4] = 2;
        this.grid[8][4] = 2; */

        this.vertexs=[];
        for (var i = 0; i < 8; i++) {
            this.vertexs[i] = [];
            for (var j = 0; j < 8; j++) {
                this.vertexs[i][j] = new Vertex();
            }
        }

        this.fullGrid=[];
        for (var i = 0; i < 17; i++) {
            this.fullGrid[i] = [];
            for (var j = 0; j < 17; j++) {
                this.fullGrid[i][j] =0;
            }
        }
        this.setupFullGrid();

        this.easystar = new easystarjs.js();
        this.setupPathfinding();
        this.easystar.enableSync();

        console.log("Grid Manager Criado");
    }


    setupPathfinding() {
   
        /* this.easystar.setGrid(this.fullGrid);
        this.easystar.setAcceptableTiles([0,2]);

        this.putFence(0, 0, true)
        
        console.log("q");
        this.easystar.findPath(0, 0, 0, 16, function( path ) {//tem q inverter x y > j i
            console.log("kaw");
            if (path == null) {
                console.log("Path was not found.");
            } else {
                console.log(path.length+" lenght")
                console.log("Path was found. The first Point is " + path[0].x + " " + path[0].y);
            }
        });
        console.log("bora porra")
        this.easystar.calculate();
        this.putFence(0, 2, true)
        this.putFence(0, 4, true)

        this.easystar.findPath(0, 0, 0, 16, function( path ) {//tem q inverter x y > j i
            console.log("kaw");
            if (path == null) {
                console.log("Path was not found.");
            } else {
                console.log(path.length+" lenght")
                console.log("Path was found. The first Point is " + path[0].x + " " + path[0].y);
            }
        });
        this.easystar.calculate(); */

    }

    checkHasSolution(gridCopy) {
        this.easystar.setGrid(gridCopy);
        this.easystar.setAcceptableTiles([0,2]);

        var foundPathP1=false;
        var foundPathP2=false;

        for (var i=0; i<this.playersPos.length; i++) {
            if (i==0) {//goal: down
                for(var k=0; k<17;k++) {
                    if (!foundPathP1) {
                        this.easystar.findPath(this.playersPos[i].y*2, this.playersPos[i].x*2, k, 16, function( path ) {
                            if (path == null) {
                                console.log("Path was not found.");
                            } else {
                                console.log("Path was found for TOP player p1");
                                foundPathP1=true;
                            }
                        });
                        this.easystar.calculate();
                    }
                }
            }
            else if (i==1) {
                for(var k=0; k<17;k++) {
                    if (!foundPathP2) {
                        this.easystar.findPath(this.playersPos[i].y*2, this.playersPos[i].x*2, k, 0, function( path ) {
                            if (path == null) {
                                console.log("Path was not found.");
                            } else {
                                console.log("Path was found for BOTTOM player p2");
                                foundPathP2=true;
                            }
                        });
                        this.easystar.calculate();
                    }
                }
            }
        }
        console.log("p1 found path: "+foundPathP1+", p2 found path: "+foundPathP2);
        if (foundPathP1 && foundPathP2) {
            return true;
        }
        else {
            return false;
        }
    }

    isValidFence(i, j, horizontal:boolean) :boolean {
        let vertex = this.getVertex(i, j);
        if (!vertex) {
            console.log("could not get vertex")
            return false;
        }
        if (horizontal) {
            if (!this.isValidVertex(i, Math.max(j-1,0))) {
                console.log("not valid1");
                return false;
            }
            if (this.getVertex(i, Math.max(j-1,0)).hasHorizontalFence()) {
                console.log("not valid2");
                return false;
            }
            
            if (!this.isValidVertex(i, Math.min(j+1,7))) {
                console.log("not valid3");
                return false;
            }
            
            if (this.getVertex(i, Math.min(j+1,7)).hasHorizontalFence()) {
                console.log("not valid4");
                return false;
            }
        }
        else {
            if (!this.isValidVertex(Math.max(i-1,0), j)) {
                console.log("not valid1");
                return false;
            }
            if (this.getVertex(Math.max(i-1,0), j).hasVerticalFence()) {
                console.log("not valid2");
                return false;
            }
            
            if (!this.isValidVertex(Math.min(i+1,7), j)) {
                console.log("not valid3");
                return false;
            }
            
            if (this.getVertex(Math.min(i+1,7), j).hasVerticalFence()) {
                console.log("not valid4");
                return false;
            }
        }

        var gridCopy = [];
        for (var o = 0; o < 17; o++) {
            gridCopy[o] = [];
            for (var p = 0; p < 17; p++) {
                gridCopy[o][p] = this.fullGrid[o][p];
            }
        }

        if (!horizontal) {
            gridCopy[(i*2+1)+1][(j*2+1)] = 1;
            gridCopy[(i*2+1)-1][(j*2+1)] = 1;
        }
        else {
            gridCopy[(i*2+1)][(j*2+1)+1] = 1;
            gridCopy[(i*2+1)][(j*2+1)-1] = 1;
        }

        return this.checkHasSolution(gridCopy);
        
    }

    putFence(i, j, horizontal:boolean) {
        if (!this.isValidFence(i, j, horizontal)) {
            console.log("not valid fence position");
            return;
        }

        let vertex = this.getVertex(i, j);
        if (!vertex) 
            return;

        vertex.hasFence=true;
        vertex.horizontalFence = horizontal;

        if (!horizontal) {
            this.fullGrid[(i*2+1)+1][(j*2+1)] = 1;
            this.fullGrid[(i*2+1)-1][(j*2+1)] = 1;
        }
        else {
            this.fullGrid[(i*2+1)][(j*2+1)+1] = 1;
            this.fullGrid[(i*2+1)][(j*2+1)-1] = 1;
        }
    }

    isValidVertex(i, j) {
        if ((i<0 || i > 7) || (j < 0 || j > 7)) {
            console.log("isValidVertex: invalid vertex")
            return false;
        }
        return true;
    }

    getVertex(i, j) : Vertex {
        if ((i<0 || i > 7) || (j < 0 || j > 7)) {
            console.log("invalid vertex")
            return;
        }
        return this.vertexs[i][j];
    }

    setupFullGrid() {
        for (var i = 0; i < 17; i++) {
            //process.stdout.write("\n");
            for (var j = 0; j < 17; j++) {
                if (i % 2==0) {
                    if (j % 2 == 0) {
                        //process.stdout.write(this.grid[i/2][j/2]+"  ");
                        this.fullGrid[i][j] = this.grid[i/2][j/2];
                    }
                    else {
                        if (i != 16) {
                            let hasFenceVertical=0;// = this.vertexs[Math.floor(i/2)][Math.floor(j/2)].hasFence? 1 : 0;//mudar dps 
                            if (this.vertexs[Math.floor(i/2)][Math.floor(j/2)].hasFence) {
                                hasFenceVertical = this.vertexs[Math.floor(i/2)][Math.floor(j/2)].horizontalFence ? 0 : 1;
                            }
                            this.fullGrid[i][j] = hasFenceVertical;
                            //process.stdout.write(hasFenceUp+"  ");
                        }
                        else {
                            //process.stdout.write("0  ");
                            this.fullGrid[i][j] = 0;
                        }
                    }
                }
                else {
                    if (j % 2 == 0) {
                        if (j!=16) {
                            let hasFenceLeft = 0//this.vertexs[Math.floor(i/2)][Math.floor(j/2)].hasFence? 1 : 0;//mudar dps 
                            if (this.vertexs[Math.floor(i/2)][Math.floor(j/2)].hasFence) {
                                hasFenceLeft = this.vertexs[Math.floor(i/2)][Math.floor(j/2)].horizontalFence? 1 : 0;
                            }
                            //process.stdout.write(hasFenceLeft+"  ");
                            this.fullGrid[i][j] = hasFenceLeft;

                        }  
                        else {
                            //process.stdout.write("0  ");
                            this.fullGrid[i][j] = 0;
                        }
                    }
                    else {
                        //process.stdout.write("1  ");
                        this.fullGrid[i][j] = 1;
                    }
                }
            }
        }
        //process.stdout.write("\n");
    }

    printFullGrid() {
        for (var i = 0; i < 17; i++) {
            process.stdout.write("\n");
            for (var j = 0; j < 17; j++) {
                process.stdout.write(this.fullGrid[i][j]+"   ");
            }
        }
        process.stdout.write("\n");

    }

    printGrid() {
        for (var i = 0; i < 9; i++) {
            process.stdout.write("\n");
            for (var j = 0; j < 9; j++) {
                process.stdout.write(this.grid[i][j]+"  ");
            }
        }
        process.stdout.write("\n");
    }
}