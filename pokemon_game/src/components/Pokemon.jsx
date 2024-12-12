import PropTypes from "prop-types"

const Pokemon = (props) =>{
    
    return (
        <div>
           <img src={props.winner} alt ="Pokémon" width="280" className={"my-5 " + props.youWon ? "" : "pokemon-shadow"}/> 
        </div>
        
    
    )
}

Pokemon.propsTypes ={
    winner: PropTypes.string,
    youWon: PropTypes.bool
}

export default Pokemon