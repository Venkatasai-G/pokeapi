const Pokemon = require('../models/Pokemon')
const cloudinary = require('cloudinary').v2

exports.getPokemonbyId = async(req,res)=>{
    try{

        const pokemon = await Pokemon.findOne({
            pokeId: req.params.id
        })

        if (!pokemon) {
            return res.status(404).json({
                message: "Pokemon not found"
            });
        }

        res.status(200).json({
            message:"pokemon fetched sucessfully",
            data: pokemon
        })

    }catch(err){
        console.error(err)

        return res.status(500).json({
            message: err.message
        })
    }
}

exports.getallPokemon = async(req,res)=>{
    try{
        const { sort, name, type, limit, page } = req.query;

        let query = Pokemon.find();

        if (name) {
            query = query.find({ 
                name:{
                $regex: name,
                $options: 'i'
            }
             });
        }

        if (type) {
            query = query.find({ types: type });
        }

        if (sort) {
            let field = sort;
            let order = 1;

            if (sort.startsWith("-")){
                order = -1;
                field = sort.slice(1);
            }

            const allowedFields = ["name", "height", "pokeId"];

            if(!allowedFields.includes(field)) {
                return res.status(400).json({
                    message: "Invalid sort field"
                });
            }

            const sortOption = {
                [field]: order
            }

            query = query.sort(sortOption)

        }

        if (page) {

            if (page < 1 || limit < 1) {
                return res.status(400).json({
                    message: "Page and limit must be positive numbers"
                });
            }

            const pageNo = Number(page) || 1;
            const l = Number(limit) || 20;

            query = query.skip((pageNo-1)*l).limit(l)
        }

        const pokemon = await query;

        if (pokemon.length==0) {
            return res.status(200).json({
                message: "No Pokemon found"
            });
        }

        res.status(200).json({
            message:"pokemon fetched sucessfully",
            data: pokemon
        })

    }catch(err){
        console.error(err)

        return res.status(500).json({
            message: err.message
        })
    }
}

exports.createPokemon = async(req,res)=>{
    try{

        const { pokeId, name, types, height, abilities } = req.body
        if(pokeId>0 || !name || !types || height>0 || !abilities ){
            return res.status(400).json({
                message: "please fill all the fields"
            })
        }

        const have = await Pokemon.findOne({ pokeId: pokeId})

        if(have){
            return res.status(409).json({
                message: "pokemon exists"
            })
        }
        
        let img;

        if(!req.file){
            return res.status(400).json({
                messasge: " image is required"
            })
        }

        try{
            img = await cloudinary.uploader.upload(req.file.path,{
                folder: "pokemons"
            })
        }catch(err){
            console.error(err)

            return res.status(400).json({
                message: " upload image fails"
            })
        }

        /*const pokemon = await Pokemon.create({
            pokeId: req.body.pokeId,
            name: req.body.name,
            image: img.secure_url,
            types: Array.isArray(req.body.types)? req.body.types : [req.body.types],
            height: req.body.height,
            abilities: Array.isArray(req.body.abilities)? req.body.abilities : [req.body.abilities]
        })*/

        const pokemon = await Pokemon.create({
            pokeId: pokeId,
            name: name,
            image: img.secure_url,
            types: Array.isArray(types)? types : [types],
            height: height,
            abilities: Array.isArray(abilities)? abilities : [abilities]
        })
        
        res.status(201).json({
            message:"data added",
            data: pokemon
        })

    }catch(err){
        console.error(err)

        res.status(500).json({
            message: err.message
        })
    }
}

exports.updatePokemon = async(req,res)=>{
    try{

        const { name } = req.params;

        const pokemon = await Pokemon.findOneAndUpdate(
            {name: name},
            req.body,
            {
                new:true,
                runValidators:true
            }
        )

        if(!pokemon){
            return res.status(404).json({
                message: "pokemon not found"
            })
        }

        return res.status(200).json({
            message: "pokemon updated",
            data: pokemon
        })

    }catch(err){
        console.error(err)

        res.status(500).json({
            message: err.message
        })
    }
}

exports.deletePokemon = async(req,res)=>{
    try{

        const pokemon = await Pokemon.findOneAndDelete(
            { name: req.params.name }
        )

        if(!pokemon){
            return res.status(404).json({
                message:"Pokemon not found"
            });
        }
        
        return res.status(200).json({
            message:"Pokemon deleted successfully",
            data: pokemon
        });   

    }catch(err){
        console.error(err)

        res.status(500).json({
            message: err.message
        })
    }
}