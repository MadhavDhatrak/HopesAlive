import Pet from '../Models/petModel.js';
import asyncHandler from 'express-async-handler';

// Get all pets with filters
export const getPets = asyncHandler(async (req, res) => {
  const { 
    species, 
    city, 
    gender, 
    minAge, 
    maxAge,
    vaccinated,
    neutered
  } = req.query;

  // Build filter object
  const filter = {};
  if (species) filter.species = species;
  if (city) filter.city = city;
  if (gender) filter.gender = gender;
  if (vaccinated) filter.vaccinated = vaccinated === 'true';
  if (neutered) filter.neutered = neutered === 'true';
  if (minAge || maxAge) {
    filter.age = {};
    if (minAge) filter.age.$gte = Number(minAge);
    if (maxAge) filter.age.$lte = Number(maxAge);
  }

  const pets = await Pet.find(filter)
    .populate('owner', 'name email phoneNumber')
    .sort('-createdAt');

  res.json(pets);
});

// Create new pet listing
export const createPet = asyncHandler(async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Files:', req.files);

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ 
        error: 'At least one photo is required'
      });
    }

    const {
      name,
      species,
      breed,
      age,
      gender,
      city,
      description,
      vaccinated,
      neutered
    } = req.body;

    // Validate required fields
    if (!name || !species || !age || !gender || !city || !description) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['name', 'species', 'age', 'gender', 'city', 'description']
      });
    }

    // Get photo filenames
    const photos = req.files.map(file => file.filename);

    const pet = await Pet.create({
      name,
      species,
      breed: breed || '',
      age: Number(age),
      gender,
      city,
      description,
      photos,
      vaccinated: vaccinated === 'true',
      neutered: neutered === 'true',
      owner: req.user._id
    });

    res.status(201).json({
      message: 'Pet created successfully',
      pet
    });
  } catch (error) {
    console.error('Pet creation error:', error);
    res.status(500).json({
      error: 'Failed to create pet listing',
      details: error.message
    });
  }
});

// Get single pet details
export const getPetDetails = asyncHandler(async (req, res) => {
  const pet = await Pet.findById(req.params.id)
    .populate('owner', 'name email phoneNumber');
  
  if (!pet) {
    res.status(404);
    throw new Error('Pet not found');
  }

  res.json(pet);
}); 