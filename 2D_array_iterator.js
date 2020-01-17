function MatIterator (mat) {

    let arrIndx = 0, elemIndx = 0;

    const isCurrent = function () {
        return mat[ arrIndx ] && mat[ arrIndx ][ elemIndx ];
    }
 
    const hasNext = function () {
        if( isCurrent() ) return true;
        else { advance(); return isCurrent(); }
    }

    const current = function () {
        return mat[ arrIndx ][ elemIndx ];
    }

    const advance = function () {
    
        if( elemIndx < mat[ arrIndx ].length ) {
            ++elemIndx;
        } else {

            elemIndx = 0;
            
            ++arrIndx;
            while( mat[ arrIndx ] !== undefined && mat[ arrIndx ].length == 0 ) {
                arrIndx++;
            }
        }

    }

    const next = function () {

        if( !hasNext() ) {
            throw new Error("2D array empty");
        }

        let val = current();

        advance();

        return val;
    }


    return { next : next, hasNext : hasNext };

}


let mat = [ [], [], [ 1, 2 ], [], [ 3 ], [ 4, 5 ], [], [] ];
let iterator = new MatIterator(mat);

while(iterator.hasNext()) {
    console.log(iterator.next())
}
