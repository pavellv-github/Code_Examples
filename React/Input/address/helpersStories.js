export function getStreets() {
    return new Promise((resolve) => {
        let streets = [
            {
                street_id: '7220',
                street_name: 'Ленина (Новоалтайск)',
            },
            {
                street_id: '3764',
                street_name: 'Ленина Пр-Кт',
            },
            {
                street_id: '4125',
                street_name: 'Ленинградская',
            },
            {
                street_id: '3765',
                street_name: 'Лениногорская',
            },
            {
                street_id: '4044',
                street_name: 'Тюленина',
            },
            {
                street_id: '4195',
                street_name: 'тюленина (Новоалтайск)',
            }
        ];

        resolve(streets);
    });
}

export function getHouses() {
    return new Promise((resolve) => {
        let houses = [
            {
                house_id: '1098657',
                house_num: '1/а',
            },
            {
                house_id: '440458',
                house_num: '105',
            },
            {
                house_id: '981843',
                house_num: '18/а',
            }
        ];

        resolve(houses);
    });
}
