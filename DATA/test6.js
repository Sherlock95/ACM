// a := proc( n ) local k; a( n ) := add( k * a( k ) * s( n-1, k ), k = 1 .. n-1) / (n-1) end proc;
// a( 0 ) = 0; a( 1 ) = 1;
// s := proc( n, k ) local j; s( n, k ) := add( a( n + 1 - j * k ), j=1 .. iquo( n, k ) );

function test( len ) 
{
    var memo_a = [ 0, 1 ];
    var memo_s = [];
    for ( var i = 0; i < len; ++i )
    {
        memo_s[ i ] = [];
        for ( var j = 0; j < len; ++j )
        {
            memo_s[ i ][ j ] = 0;
        }
    }

    // CHANGE
    function s( n, k )   
    {
        var sum = memo_s[ n - k ][ k ] + memo_a[ n + 1 - 1 * k ];
        memo_s[ n ][ k ] = sum;
        return sum;
    }

    function a( n )
    {
        if ( memo_a.hasOwnProperty( n ) )
        {
            return memo_a[ n ];
        }

        var sum = 0;
        for ( var k = 1; k <= n - 1; ++k )
        {
            var A = k;
            var B = a( k );
            var C = s( n - 1, k );
            sum += A * B * C;
        }

        var result =  sum / ( n - 1 );
        memo_a[ n ] = result;
        return result;
    }

    var result = [];
    for ( var i = 0; i < len; ++i )
    {
        result[ i ] = a( i );
    }

    return result;
}

var start   = process.hrtime();
var result  = test( 20 );
var end     = process.hrtime( start );

console.log( result );

var time_sec = end[ 0 ];
var time_ms = end[ 1 ] / 1000000;
console.log( time_sec + " s, " + time_ms.toFixed( 3 ) + " ms" );
