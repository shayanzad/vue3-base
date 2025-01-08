import { cities } from "../assets/data/cities";

export const findCity = (cityId: number) => {
    return cities.find((city) => city.id === cityId);
}