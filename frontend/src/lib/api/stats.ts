import axios from "axios";
import type { Stats } from "../../types/statsType";



export async function fetchStatsData(): Promise<Stats>{
    const response = await axios.get<Stats>("http://localhost:8000/api/stats");
    const status = response.status
    const data = response.data

    console.log(status)

    if(!status){
        throw new Error(`Error Fetching recipes: ${response.statusText}`);
    }

    return data
}