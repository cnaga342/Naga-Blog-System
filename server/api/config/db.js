import {connect} from 'mongoose';

export const connectDb = async (url) => {
    try{
        await connect(url);
        console.log("Database connected successfully!")
    }catch(error) {
        console.log(error);
    }
}