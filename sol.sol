
contract Giorgi {
    
    struct structType {
        uint x;
    }

    event Bla(structType oe);
    
    function create(structType memory nice)  external {
       emit Bla(nice);
    }

}