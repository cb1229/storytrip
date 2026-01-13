import { Request, Response } from 'express';
import { Trip } from '../models/Trip';

export const getTrips = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    const query = userId ? { userId } : {};
    const trips = await Trip.find(query).sort({ createdAt: -1 });

    res.json({ success: true, data: trips });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch trips' });
  }
};

export const getTripById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const trip = await Trip.findById(id);

    if (!trip) {
      return res.status(404).json({ success: false, error: 'Trip not found' });
    }

    res.json({ success: true, data: trip });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch trip' });
  }
};

export const createTrip = async (req: Request, res: Response) => {
  try {
    const tripData = req.body;
    const trip = await Trip.create(tripData);

    res.status(201).json({ success: true, data: trip });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const updateTrip = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const trip = await Trip.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!trip) {
      return res.status(404).json({ success: false, error: 'Trip not found' });
    }

    res.json({ success: true, data: trip });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const deleteTrip = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const trip = await Trip.findByIdAndDelete(id);

    if (!trip) {
      return res.status(404).json({ success: false, error: 'Trip not found' });
    }

    res.json({ success: true, message: 'Trip deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete trip' });
  }
};

export const bookTrip = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const bookingDetails = req.body;

    const trip = await Trip.findByIdAndUpdate(
      id,
      {
        status: 'booked',
        bookingDetails,
      },
      { new: true }
    );

    if (!trip) {
      return res.status(404).json({ success: false, error: 'Trip not found' });
    }

    res.json({ success: true, data: trip });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
};
