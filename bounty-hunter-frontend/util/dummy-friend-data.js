export const DUMMY_FRIEND_PROFILE = {
    username: 'SUPERMAN012',
    ID: 'A87654321',
    rating: '80',
    friends: ['Batman2077', 'SamCat2013', 'WonderWoman45'],
    aboutMe: 'Please stop sending me kryptonite. I will revoke all favors that do so',
    paymentMethods: [
        'Wishlist: https://dummylink.com/',
        'Venmo: theRealSuperMan',
        'Paypal: superman1209',
    ],
    recentFavors:[],
}

/*
    Not sure how we want to do data for information between friends (such as nickname, favorite status, etc) but this is just how it is for now lol
*/

export const DUMMY_FRIEND_INFO = {
    favoriteStatus: false,
    nickname: 'Supes',
    bountiesCompleted: 10,
    bountiesProgress: 2,
    bountiesByYou: 10,
    bountiesByThem: 32,
    owedByYou: 20,
    owedByThem: 50,
    settledByYou: 125,
    settledByThem: 210,
}

export const DUMMY_FAVORS_OF_FRIEND = [
    {
        bountyId: 'A1234',
        senderId: 'BATMAN2077',
        receiverId: 'Superman012',
        dateCreated: '07/01/2024',
        tags: ['Priority'],
        paymentType: 'monetary',
        paymentOwed: '100000000',
        name: "Farm Payment",
        description: "Favor parent's farm!",
        status: 'completed',
        bountyEditHistory: [],
    },
    {
        bountyId: 'A4321',
        senderId: 'Superman012',
        receiverId: 'WonderWoman45',
        dateCreated: '07/07/2024',
        tags: ['Monetary'],
        paymentType: 'monetary',
        paymentOwed: '250',
        name: "Lasso",
        description: 'Lasso replacement',
        status: 'none',
        bountyEditHistory: [],
    }
]