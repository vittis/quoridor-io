export class Vertex {

    hasFence:boolean;
    horizontalFence:boolean;

    constructor() {
        this.hasFence = false;
        this.horizontalFence = null;
    }

    hasHorizontalFence():boolean {
        if (this.hasFence) {
            if (this.horizontalFence) {
                return true;
            }
        }
        return false;
    }

    hasVerticalFence():boolean {
        if (this.hasFence) {
            if (!this.horizontalFence) {
                return true;
            }
        }
        return false;
    }

}