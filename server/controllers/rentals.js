import { getAllRentals, getRentalById, getRentalByUserId, addRental, getRentalByAppt_id, deleteRental, updateRental} from "../models/rentals.js";

export const _getAllRentals = async (req,res)=>{
    try{
        const row = await getAllRentals();
        res.json(row);
    }catch(e){
        console.log(e);
        res.status(404).json({msg: "Something went wrong :("})
    }
}

export const _getRentalById = async (req, res)=>{
    const id = req.params.id;
    try{
        const row = await getRentalById(id);
        res.json(row);
    }catch(e){
        console.log(e);
        res.status(404).json({msg: 'Something went wrong :('});
    }
}

export const _getRentalByUserId = async (req, res)=>{
    const id = req.params.id;
    try{
        const row = await getRentalByUserId(id);
        res.json(row);
    }catch(e){
        console.log(e);
        res.status(404).json({msg: 'Something went wrong :('});
    }
}

export const _addRental = async (req,res) =>{

    const {user_id, appt_id, client_id, arrival, departure, price_per_night, currency, origin , confirmed} = req.body;

    //checking if the arrival is before the departure

    if (departure < arrival) return res.json({msg: "The departure date must be after the arrival date"})

    // checking if the appt is not already rented
    try {
        const existingRentals = await getRentalByAppt_id(appt_id);
    
        
        const overlapExists = existingRentals.some((rental) => {
          const rentalArrival = new Date(rental.arrival);
          const rentalDeparture = new Date(rental.departure);
          const newRentalArrival = new Date(arrival);
          const newRentalDeparture = new Date(departure);
    
          return (
            (newRentalArrival >= rentalArrival && newRentalArrival < rentalDeparture) ||
            (newRentalDeparture > rentalArrival && newRentalDeparture <= rentalDeparture) ||
            (newRentalArrival <= rentalArrival && newRentalDeparture >= rentalDeparture)
          );
        });

         //if the appt already rented send an error
        if (overlapExists) {
          return res.json({ msg: "The apartment is already rented during this period" });
        }

        //if there is no overlap : add the new rental to DB

        const row = await addRental(user_id, appt_id, client_id, arrival, departure, price_per_night, currency, origin , confirmed);
        res.json({msg: 'Rental added successfully', rental : row});


    } catch(error){
        console.log(error);
        res.status(404).json({ msg: "Something went wrong :(" });
    }
}


export const _getRentalByAppt_id = async (req,res) =>{
    const id = req.params.id;
    try{
        const row = await getRentalByAppt_id(id);
        res.json(row);
    }catch(e){
        console.log(e);
        res.status(404).json({msg: 'Something went wrong :('});
    }
}

export const _deleteRental = async (req, res)=>{
    const id = req.params.id;
    try{
        const row = await deleteRental(id);
        res.json({msg: 'Rental deleted successfully', rental : row});

    }catch(e){
        console.log(e);
        res.status(404).json({msg: 'Something went wrong :('});
    }
}

export const _updateRental = async (req, res) =>{
    const {user_id, appt_id, client_id, arrival, departure, price_per_night, currency, origin , confirmed} = req.body;

    const id = req.params.id;

    //checking if the arrival is before the departure

    if (departure < arrival) return res.json({msg: "The departure date must be after the arrival date"})

    // checking if the appt is not already rented
    try {
        const existingRentals = await getRentalByAppt_id(appt_id);
    
        
        const overlapExists = existingRentals.some((rental) => {
          const rentalArrival = new Date(rental.arrival);
          const rentalDeparture = new Date(rental.departure);
          const newRentalArrival = new Date(arrival);
          const newRentalDeparture = new Date(departure);
    
          return (
            (newRentalArrival >= rentalArrival && newRentalArrival < rentalDeparture) ||
            (newRentalDeparture > rentalArrival && newRentalDeparture <= rentalDeparture) ||
            (newRentalArrival <= rentalArrival && newRentalDeparture >= rentalDeparture)
          );
        });

         //if the appt already rented send an error
        if (overlapExists) {
          return res.json({ msg: "The apartment is already rented during this period" });
        }

        //if there is no overlap : update the new rental to DB

        const row = await updateRental(user_id, appt_id, client_id, arrival, departure, price_per_night, currency, origin , confirmed, id);
        res.json({msg: 'Rental updated successfully', rental : row});


    } catch(error){
        console.log(error);
        res.status(404).json({ msg: "Something went wrong :(" });
    }
}