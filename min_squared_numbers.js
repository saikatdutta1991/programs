
<script>

let map = new Map([ [0, 0], [1, 1], [2, 2], [3, 3] ]);


function minSquared(n) {

    if( map.has( n ) ) return map.get( n );
    
    let s = Math.floor( Math.sqrt(n) );
    let min;
    
    for(let i = s; i >= 1; i--) {
        min = (i === s) ? minSquared( n - Math.pow(i, 2) ) : Math.min( min, minSquared( n - Math.pow(i, 2) ) );
    }
    
    map.set( n, min );
    return 1 + min;

}

let res = minSquared( 13 );
console.log(res);
</script>
