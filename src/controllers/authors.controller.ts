import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { pool } from './../db'


export const getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
        const authors: QueryResult = await pool.query("SELECT * FROM authors WHERE active")
        return res.status(200).json(authors.rows)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error" })
    }
}

export const getOne = async (req: Request, res: Response): Promise<Response> => {
    try {
        const authors: QueryResult = await pool.query("SELECT * FROM authors WHERE active AND id= $1", [parseInt(req.params.id)])
        return res.status(200).json(authors.rows[0])
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error" })
    }
}

export const deleteById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const authors: QueryResult = await pool.query("UPDATE authors SET active = false WHERE id= $1", [parseInt(req.params.id)])
        return res.status(200).json({ message: "Author deleted successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error" })
    }
}

export const updateOneById = async (req: Request, res: Response): Promise<Response> => {
    try {
        let { name, brief_bio, birth } = req.body
    
        if (!name || !brief_bio || !birth) {
            const authorFound: QueryResult = await pool.query("SELECT * FROM authors WHERE active AND id= $1", [parseInt(req.params.id)])
            if (authorFound.rowCount > 0) {                
                if (!name) {
                    name = authorFound.rows[0].name
                }
                if (!brief_bio) {
                    brief_bio = authorFound.rows[0].brief_bio
                }
                if (!birth) {
                    birth = authorFound.rows[0].birth
                }
            }else{
                return res.status(400).json({message: "Error: ID no exists" })
            }
        }
    
        const response = await pool.query('UPDATE authors SET name = $1 , brief_bio = $2, birth = $3 WHERE id = $4', [
            name, brief_bio, birth, parseInt(req.params.id)
        ]);

        return res.status(200).json("Author updated successfully")
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error" })
    }
}

export const createOne = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, brief_bio, birth } = req.body
    
        if (!name || !brief_bio || !birth ) {
            return res.status(400).json({message: "Error: Incomplete fields" })
        }

        const response: QueryResult = await pool.query(
            'INSERT INTO authors (name, brief_bio, birth, active) VALUES ($1, $2,$3,true)',
            [name, brief_bio, birth])
        return res.status(200).json({ message: "Author created successfully" })
                
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error" })
    }

}