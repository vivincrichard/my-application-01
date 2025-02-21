import axios from "axios"



export class Patient {
    static create = async() => {
        const response = await axios.post(`http://localhost:4000/patients`);
    }
}