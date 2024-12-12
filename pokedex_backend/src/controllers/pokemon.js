const {response, request} = require('express')
const pool = require('../db/connection')
const { pokemonQueries } = require('../models/pokemon')

const getAll = async (req=request,res=response) => {
    let conn
    try{ 
    conn = await pool.getConnection()
    const pokemons = await conn.query(pokemonQueries.getAll)
    res.send(pokemons)

    } catch(error){
        res.status(500).send(error)
    } finally{
      if(conn) conn.end()
    }
}

const getByID = async (req= request, res=response)=>{
    const {id}=req.params

    if (isNaN(id)){
        res.status(400).send('invalid id')
        return;
    }

    let conn
    try{ 
        conn = await pool.getConnection()
        const pokemon = await conn.query(pokemonQueries.getByID,[id])

        if(pokemon.length === 0){
            res.status(404).send('pokemin not found')
            return
        }

        res.send(pokemon)
    
        } catch(error){
            res.status(500).send(error)
        } finally{
          if(conn) conn.end()
        }
}

const addPokemon = async (req=request, res=response) => {
const{pokemon}=req.body;

    if(!pokemon){
        res.status(400).send('pokemon field is required')
        return
    }

    let conn
    try{ 
        conn = await pool.getConnection()
        const pokemon_exist = await conn.query(pokemonQueries.getByPokemonName,[pokemon])

        if(pokemon_exist.length > 0){
            res.status(404).send('pokemon alredy exist')
            return
        }

        const newPokemon = await conn.query(pokemonQueries.createPokemon, [pokemon])
        if(newPokemon.affectedRows === 0){
            res.status(500).send('Failed to create pokemon')
            return
        }

        res.status(201).send('Pokemon added successfully')
    
        } catch(error){
            res.status(500).send(error)
        } finally{
          if(conn) conn.end()
        }

}

const updatePokemon = async (req=request, res=response) =>{
    const {id}=req.params
    const {pokemon} = req.body

    if (isNaN(id)){
        res.status(400).send('invalid id')
        return;   
    }

    if(!pokemon){
        res.status(400).send('pokemon field is required')
        return
    }
    let conn
    try{ 
        conn = await pool.getConnection()
        const pokemon_exist = await conn.query(pokemonQueries.getByID,[id])
        if(pokemon_exist.length === 0){
            res.status(404).send('pokemon no exist')
            return
        }

        const updatePokemon = await conn.query(pokemonQueries.updatePokemon, [pokemon, id])

        if(updatePokemon.affectedRows === 0){
            res.status(500).send('Failed to update pokemon')
            return
        }

        res.status(200).send('Pokemon updated successfully')

        } catch(error){
            res.status(500).send(error)
        } finally{
          if(conn) conn.end()
        }


}

const deletePokemon = async (req=request, res=response) =>{
    const {id}=req.params

    if (isNaN(id)){
        res.status(400).send('invalid id')
        return;   
    }
    let conn
    try{ 
        conn = await pool.getConnection()
        const pokemon_exist = await conn.query(pokemonQueries.getByID,[id])
        if(pokemon_exist.length === 0){
            res.status(404).send('pokemon no exist')
            return
        }

        const deletePokemon = await conn.query(pokemonQueries.deletePokemon, [id])

        if(deletePokemon.affectedRows === 0){
            res.status(500).send('Failed to delete pokemon')
            return
        }

        res.status(200).send('Pokemon deleted successfully')

        } catch(error){
            res.status(500).send(error)
        } finally{
          if(conn) conn.end()
        }
}

const get3randomPokemons = async (req, res) =>{
    let conn

    try{
        conn=await pool.getConnection()
        const pokemons = await conn.query('SELECT * FROM pokemons ORDER BY RAND() LIMIT 3')
        res.status(200).send(pokemons)
    }catch(error){
        res.status(500).send(error)
        return
    }finally{
        if(conn) conn.end()
    }
}

module.exports = {
    getAll,
    getByID,
    addPokemon,
    updatePokemon,
    deletePokemon,
    get3randomPokemons,
}