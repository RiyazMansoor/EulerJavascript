
type Integer = number;

export type Comparator<T> = (a: T, b: T) => Integer;

export class SortedArray<T> {

    private sortedArray: T[] = [];
    private comparator: Comparator<T>;

    constructor(comparator: Comparator<T>) {
        this.comparator = comparator;
    }

    length(): Integer {
        return this.sortedArray.length;
    }

    clear(): void {
        this.sortedArray.length = 0;
    }

    atIndex(atIndex: Integer): T {
        return this.sortedArray[atIndex];
    }

    indexOf(t: T): Integer {
        if (this.sortedArray.length === 0) return 0;
        const maxIndex: Integer = this.sortedArray.length - 1;
        if (this.comparator(this.sortedArray[maxIndex], t) < 0) {
            return maxIndex + 1;
        }
        let lInd: Integer = 0;
        let rInd: Integer = maxIndex;
        // complete a binary search
        while (lInd <= rInd) {
            const mInd: Integer = Math.floor((lInd + rInd) / 2);
            const compared: Integer = this.comparator(this.sortedArray[mInd], t);
            if (compared === 0) return mInd;
            if (compared > 0) {
                rInd = mInd - 1
            } else {
                lInd = mInd + 1;
            }
        }
        return lInd;
    }

    equals(t: T, atIndex: Integer): boolean {
        if (atIndex == this.sortedArray.length) return false;
        return (this.comparator(t, this.sortedArray[atIndex]) === 0);
    }

    upsert(t: T, atIndex: Integer = -1): Integer {
        if (atIndex === this.sortedArray.length) {
            this.sortedArray.push(t);
            return atIndex;
        }
        if (atIndex < 0) {
            atIndex = this.indexOf(t);
        }
        const compared: Integer = this.comparator(t, this.sortedArray[atIndex]);
        if (compared === 0) {
            this.sortedArray[atIndex] = t;
        } else {
            this.sortedArray.splice(atIndex, 0, t);
        }
        return atIndex;
    }

    // exposes internal data structure - use wisely
    // array(): T[] {
    //     return this.sortedArray;
    // }

    // slice(uptoIndex: Integer): T[] {
    //     return this.sortedArray.slice(0, uptoIndex);
    // }

    *iterator(startIndex: Integer = 0): Generator<T, void, unknown> {
        for (let i = startIndex; i < this.sortedArray.length; i++) {
            yield this.sortedArray[i];
        }
    }

}