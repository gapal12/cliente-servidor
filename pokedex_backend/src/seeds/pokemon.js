const pool = require("../db/connection")

const pokemonsSeeder = async ()=> {
   let conn
   try{
        let pokemons = []
        pokemons = await  fetch('https://pokeapi.co/api/v2/pokemon/?limit=151&offset=0').then(res=>res.json())

        conn = await pool.getConnection()

        await conn.query('SET FOREIGN_KEY_CHECKS = 0')
        await conn.query('TRUNCATE TABLE pokemons')
        await conn.query('SET FOREIGN_KEY_CHECKS = 1')

        const pokemonList=await Promise.all(
        pokemons.results.map(async(pokemon)=>{   
         const poke = await fetch(pokemon.url).then( res => res.json());
        
         return{
            pokemon:pokemon.name,
            image:  poke.sprites.other.dream_world.front_default
         }
        })  
    )

    //await Promise.all(
    pokemonList.forEach(async({pokemon, image})=>{
        await conn.query('INSERT INTO pokemons(pokemon,image) VALUES (?,?) ',[
            pokemon, image
        ])
    })  
//)
        

    
        console.log('Seeded pokemons')

   }catch(error){
    console.log(error)
   }finally{
    if(conn)conn.end()
   }




    
}

module.exports = {pokemonsSeeder}