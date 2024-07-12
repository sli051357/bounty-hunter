export const DUMMY_USER_PROFILE = {
    username : 'BATMAN2077',
    ID: 'A12345678',
    rating: '92',
    friends: ['Superman012', 'Joker13'
        , 'SamCat2013', 'RoboCop_64', 'WonderWomen45'],
    aboutMe: 'JUSTICEEEEEEEEEE',
    paymentMethods: [
        'Venmo: JusticeLeagueLLC', 
        'Zelle: AlfredMobile', 
        'Wishlist: https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    ],
    recentFavors: []
}

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