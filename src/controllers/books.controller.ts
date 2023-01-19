import { Request, Response } from 'express'
import { QueryResult } from 'pg'
import { pool } from './../db'


export const getAll = async (req: Request, res: Response): Promise<Response> => {
    try {
        const books: QueryResult = await pool.query("SELECT * FROM books WHERE active")
        return res.status(200).json(books.rows)        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error" })
    }
}

export const getOne = async (req: Request, res: Response): Promise<Response> => {
    try {
        const books: QueryResult = await pool.query("SELECT * FROM books WHERE active AND id= $1", [parseInt(req.params.id)])
        return res.status(200).json(books.rows[0])
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error" })
    }  

}


export const deleteById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const books: QueryResult = await pool.query("UPDATE active = false FROM books WHERE id= $1", [parseInt(req.params.id)])
        return res.status(200).json(books.rows)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error" })
    }
}


export const updateOneById = async (req: Request, res: Response): Promise<Response> => {
    try {
        let { name, isbn, year, author_id } = req.body
    
        if (!name || !isbn || !year || !author_id) {
            const bookFound: QueryResult = await pool.query("SELECT * FROM books WHERE active AND id= $1", [parseInt(req.params.id)])
            if (bookFound.rowCount > 0) {                
                if (!name) {
                    name = bookFound.rows[0].name
                }
                if (!isbn) {
                    isbn = bookFound.rows[0].isbn
                }
                if (!year) {
                    year = bookFound.rows[0].year
                }
                if (!author_id) {
                    author_id = bookFound.rows[0].author_id
                }
            }else{
                return res.status(400).json({message: "Error: ID no exists" })
            }
        }
    
        const response = await pool.query('UPDATE books SET name = $1 ,isbn = $2, year = $3, author_id = $4,  WHERE id = $5', [
            name, isbn, year, author_id, parseInt(req.params.id)
        ]);
        return res.status(200).json("Book updated successfully")
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error" })
    }
}

export const createOne = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { name, isbn, year, author_id } = req.body
    
        if (!name || !isbn || !year || !author_id)  {
            return res.status(400).json({message: "Error: Incomplete fields" })
        }
        const response: QueryResult = await pool.query(
            'INSERT INTO books (name, isbn, year, author_id, active) VALUES ($1, $2,$3,$4,true)',
            [name, isbn, year, author_id])
        return res.status(200).json({ message: "Book created successfully" })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Error" })
    }
}
