import express from 'express';
import Publication from '../../models/student/researchPublish.js';

const Prouter = express.Router();

Prouter.post('/', async (req, res) => {
  try {
    const { title, conference, journal } = req.body;
    const publication = new Publication({
      title,
      conference,
      journal,
      // Assign the path to the uploaded photo
      photo: req.file.path,
    });
    const savedPublication = await publication.save();
    res.status(201).json(savedPublication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

Prouter.get('/', async (req, res) => {
  try {
    const publications = await Publication.find();
    res.json(publications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default Prouter;
