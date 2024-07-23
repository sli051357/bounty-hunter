
export const DUMMY_USER_PROFILE = {
    username : 'BATMAN2077',
    ID: 'A12345678',
    rating: '92',
    friends: [
        {nickname: 'Superman012', id: 'A87654321', fav: true},
        {nickname: 'Joker13', id:'J13503923', fav: false},
        {nickname: 'SamCat2013', id: 'PU028385', fav: false},
        {nickname: 'RoboCop_64', id: '0DK23JL', fav: false},
        {nickname: 'WonderWoman45', id: 'A1309524', fav: true}, 
    ],
    aboutMe: 'JUSTICEEEEEEEEEE',
    paymentMethods: [
        'Venmo: JusticeLeagueLLC', 
        'Zelle: AlfredMobile', 
        'Wishlist: https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    ],
    recentFavors: []
}

/* 
    - We need the ID for both sender and 
    receiver to get accurate usernames and profile 
    picture changed. Thus sender and receiver should 
    have values of their unique ID.
*/

export const DUMMY_FAVORS_OF_PROFILE_Updated = [
    {
        bountyId: 'A1234',
        senderId: 'BATMAN2077',
        receiverId: 'Superman012',
        dateCreated: '07/01/2024',
        tags: ['Priority'],
        paymentType: 'monetary',
        paymentOwed: '100000000',
        description: "Favor parent's farm!",
        status: 'completed',
        bountyEditHistory: []
    },
    {
        bountyId: 'A1235',
        senderId: 'BATMAN2077',
        receiverId: 'Joker',
        dateCreated: '07/01/1977',
        tags: ['Priority', 'Non-negoible'],
        paymentType: 'nonmonetary',
        paymentOwed: 'JUSTICEEE!',
        description: "A mass psycho needs to return to Arkham Asylum! This favor is outstanding and no other form of payment",
        status: 'none',
        bountyEditHistory: []
    },
    {
        bountyId: 'A1236',
        senderId: 'BATMAN2077',
        receiverId: 'RoboCop_64',
        dateCreated: '07/17/2013',
        tags: ['Technology'],
        paymentType: 'monetary',
        paymentOwed: '300000000',
        description: "Technology from Wayne-Tech. Need the funds for the technology!",
        status: 'completed',
        bountyEditHistory: [],
    },
    {
        bountyId: 'A1237',
        senderId: 'WonderWomen45',
        receiverId: 'BATMAN2077',
        dateCreated: '07/01/24',
        tags: ['priority'],
        paymentType: 'monetary',
        paymentOwed: '1000000',
        description: "Saving you in Batman vs Superman Movie!",
        status: 'deleted',
        bountyEditHistory: []
    }
]

export const DUMMY_FAVORS_OF_PROFILE = [
    {
        sender: 'BATMAN2077',
        receiver: 'Superman012',
        dateCreated: '07/01/2024',
        tags: ['Monetary', 'Priority'],
        paymentOwed: '100000000',
        description: "Favor parent's farm!",
        status: 'completed'
    },
    {
        sender: 'BATMAN2077',
        receiver: 'Joker',
        dateCreated: '07/01/1977',
        tags: ['Priority', 'Non-negoible', 'Non-monetary'],
        paymentOwed: 'JUSTICEEE!',
        description: "A mass psycho needs to return to Arkham Asylum! This favor is outstanding and no other form of payment",
        status: 'none'
    },
    {
        sender: 'BATMAN2077',
        receiver: 'RoboCop_64',
        dateCreated: '07/17/2013',
        tags: ['Monetary', 'Technology'],
        paymentOwed: '300000000',
        description: "Technology from Wayne-Tech. Need the funds for the technology!",
        status: 'completed'
    },
    {
        sender: 'WonderWomen45',
        receiver: 'BATMAN2077',
        dateCreated: '07/01/24',
        tags: ['monetary', 'priority'],
        paymentOwed: '1000000',
        description: "Saving you in Batman vs Superman Movie!",
        status: 'deleted'
    }

]