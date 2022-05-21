import {Request, Response} from "express";
import {getManager} from "typeorm";
import {Videogame} from "../../entity/videogame/videogame.entity";

// get a remake
export const GetRemake = async (req: Request, res: Response) => {
    // caso base: da un gioco padre voglio sapere il gioco figlio
    let query = 'SELECT remake\n' +
        'FROM vg_remake\n' +
        'WHERE "original" = ' + req.params.id + ';\n'

    let result = await getManager().query(query)

    // if result is not empty
    if (result.length > 0) {
        return res.status(200).send(result)   
    }

    // caso: da un gioco figlio voglio sapere il gioco padre
    query = 'SELECT original\n' +
    'FROM vg_remake\n' +
    'WHERE "remake" = ' + req.params.id + ';\n'

    result = await getManager().query(query)

    // if result is not empty
    if (result.length > 0) {
        return res.status(200).send(result)   
    }

    return res.status(404).send('Remake or original, not found!')
 }    



// create a remake
export const CreateRemake = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Videogame)
    const vg1 = await repository.findOne({where: {id: parseInt(req.params.id)}})
    const vg2 = await repository.findOne({where: {id: parseInt(req.body.remake)}})

    if(vg2 === null) {
        return res.status(404).send({message: 'videogame remake doesn\'t exists'});
    }

    if(vg1 !== null) {
        if(vg1.videogames === undefined)
            vg1.videogames = []
        vg1.videogames.push(vg2)
        await repository.save(vg1)
        return res.status(201).send('success');
    }
    else {
        return res.status(404).send({message: 'original videogame doesn\'t exists'});
    }
}

// delete a remake
export const DeleteRemake = async (req: Request, res: Response) => {
    const repository = getManager().getRepository(Videogame)
    const vg1 = await repository.findOne({where: {id: parseInt(req.params.id)}, relations: ['videogames']})
    const vg2 = await repository.findOne({where: {id: parseInt(req.body.remake)}})

    if(vg2 === null) {
        return res.status(404).send({message: 'videogame remake doesn\'t exists'});
    }

    if(vg1 !== null) {
        if(vg1.videogames !== undefined || vg1.videogames.length != 0) {
            if (vg1.videogames.find(vg2 => vg2.id == parseInt(req.body.remake)) !== undefined) {
                vg1.videogames.forEach((element, index) => {
                    if(element.id==vg2.id) vg1.videogames.splice(index,1);
                });
            }
            await repository.save(vg1)
        }

        return res.status(201).send({message: 'success'});
    }
    else {
        return res.status(404).send({message: 'original videogame doesn\'t exists'});
    }
}