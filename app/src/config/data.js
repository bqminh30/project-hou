export const hotels_data = [
    {
        id: 1,
        name: 'Golden Tulip',
        price: 100,
        priceSale: 90,
        description : 'Ứng dụng “ đặt phòng khách sạn MARRIOTT ” mang lại lợi ích cho cả người dùng và khách sạn. Người dùng sẽ có khả năng tìm kiếm và đặt phòng khách sạn một cách thuận tiện, tiết kiệm thời gian. Đồng thời, họ còn được hưởng các ưu đãi và khuyến mãi độc quyền. Đối với khách sạn, ứng dụng sẽ giúp khả năng tiếp cận thị trường và cải thiện quản lý đặt phòng.',
        image : 'https://pix8.agoda.net/hotelImages/22423667/-1/c8b11fd11884172c23959f0ccb4ebfc0.jpg?ca=19&ce=1',
        images: [
            {
                id: 1,
                image: 'https://pix8.agoda.net/hotelImages/22423667/-1/c8b11fd11884172c23959f0ccb4ebfc0.jpg?ca=19&ce=1',
            },
            {
                id: 2,
                image: 'https://pix8.agoda.net/hotelImages/775/775065/775065_15090111140035482309.jpg?ca=5&ce=1&s=512x384',
            },
            {
                id: 3,
                image:  'https://q-xx.bstatic.com/xdata/images/hotel/max300/273561988.jpg?k=39362551648e95dde5137287b3f0569d6d1d8e62025094f27ad83f0bb522d030&o=&s=512x384',
            },
            {
                id: 4,
                image : 'https://q-xx.bstatic.com/xdata/images/hotel/max300/222636533.jpg?k=98a417bb9e9ab3700c5c4f4ef72de7602c99745a55f093046a17badcd1898556&o=&s=512x384'
            }
           
            
        ],
        rate: 4.5,
        star: 4,
        location: 'ThaiLand',
        type: 'Popular',
        reviews: [
            {
                id: 1,
                usename: 'Minh',
                rate: 5,
                comment : 'asdasdasdada'
            },
            {
                id: 2,
                usename: 'Quang',
                rate: 5,
                comment : 'asdasdasdada'
            },
        ],
        services: [
            'wifi-check',
            'bed-king',
            'glass-wine',
            'shower'
        ]
    },
    {
        id: 2,
        name: 'Golden Tulip 1',
        image : 'https://pix8.agoda.net/hotelImages/22423667/-1/c8b11fd11884172c23959f0ccb4ebfc0.jpg?ca=19&ce=1',
        rate: 3.5,
        star: 3,
        location: 'Ha Noi',
        type: 'Luxury',
        reviews: [
            {
                id: 1,
                usename: 'Minh',
                rate: 5,
                comment : 'asdasdasdada'
            },
            {
                id: 2,
                usename: 'Quang',
                rate: 5,
                comment : 'asdasdasdada'
            },
        ]
    },
    {
        id: 3,
        name: 'Golden Tulip 2',
        image : 'https://pix8.agoda.net/hotelImages/22423667/-1/c8b11fd11884172c23959f0ccb4ebfc0.jpg?ca=19&ce=1',
        rate: 5,
        star: 5,
        location: 'Ha Noi',
        type: 'Popular',
        reviews: [
            {
                id: 1,
                usename: 'Minh',
                rate: 5,
                comment : 'asdasdasdada'
            },
            {
                id: 2,
                usename: 'Quang',
                rate: 5,
                comment : 'asdasdasdada'
            },
        ]
    }
]

export const hotel_type = [
    {
        id: 0,
        name : 'All',
    },
    {
        id: 1,
        name: 'Popular'
    },
    {
        id: 2,
        name : 'Luxury'
    }
    
]