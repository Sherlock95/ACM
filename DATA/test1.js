// a := proc( n ) local k; a( n ) := add( k * a( k ) * s( n-1, k ), k = 1 .. n-1) / (n-1) end proc;
// a( 0 ) = 0; a( 1 ) = 1;
// s := proc( n, k ) local j; s( n, k ) := add( a( n + 1 - j * k ), j=1 .. iquo( n, k ) );

function test( len ) 
{
    function s( n, k )   
    {
        var end = Math.floor( n / k );
        var sum = 0;

        for ( var j = 1; j <= end; ++j )
        {
            sum += a( n + 1 - j * k );
        }

        return sum;
    }

    function a( n )
    {
        process.stdout.write( n + '' ); //CHANGE
        if ( n === 0 )
        {
            return 0;
        }
        if ( n === 1 )
        {
            return 1;
        }

        var sum = 0;
        for ( var k = 1; k <= n - 1; ++k )
        {
            sum += k * a( k ) * s( n - 1, k );
        }

        return sum / ( n - 1 );
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
