import express from 'express'; 
import { Book } from '../models/book.model.js';

const router = express.Router();


router.post('/', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear ||
            request.body.copies === undefined 
        ) {
            return response.status(400).send({
                message: "Please fill in all the fields"
            });
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
            copies: request.body.copies,
        };

        const book = await Book.create(newBook);
        response.status(201).json(book);
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
});

// Route to get all books from database
router.get('/', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to get one book by ID
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const book = await Book.findById(id);
        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to update a book
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear ||
            request.body.copies === undefined
        ) {
            return response.status(400).send({
                message: "Please fill in all the fields"
            });
        }

        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body, { new: true });
        if (!result) {
            return response.status(404).json({ message: "Book not found" });
        }
        return response.status(200).json({ message: "Book updated successfully", book: result });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


router.patch('/:id/copies', async (request, response) => {
    try {
        const { copies } = request.body;
        const book = await Book.findById(request.params.id);

        if (!book) {
            return response.status(404).json({ message: 'Book not found' });
        }

  
        book.copies = Math.max(0, book.copies + copies);
        await book.save();

        response.status(200).json({ message: 'Copies updated successfully', book });
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: "Error updating copies", error: error.message });
    }
});


router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }

        return response.status(200).send({ message: 'Book deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;