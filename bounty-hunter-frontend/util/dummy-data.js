export const DUMMY_USER_PROFILE = {
	username: "BATMAN2077",
	ID: "A12345678",
	rating: "92",
	friends: [
		{ nickname: "Superman012", id: "A87654321", fav: true, imageUrl: "https://static.wikia.nocookie.net/marvel_dc/images/a/a5/Superman_Vol_5_1_Textless.jpg/revision/latest/scale-to-width-down/1200?cb=20180711061148" },
		{ nickname: "Joker13", id: "J13503923", fav: false, imageUrl: "https://i.guim.co.uk/img/media/fbb1974c1ebbb6bf4c4beae0bb3d9cb93901953c/80_0_2400_1440/master/2400.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=ede2b27f1cea7c3be30b938195c0cc5c" },
		{ nickname: "SamCat2013", id: "PU028385", fav: false, imageUrl: "https://upload.wikimedia.org/wikipedia/en/4/49/Streakycat.png" },
		{ nickname: "RoboCop_64", id: "0DK23JL", fav: false, imageUrl: "https://cdn11.bigcommerce.com/s-b70w3e4554/images/stencil/1280x1280/products/206/3015/PCS_011_Robocop__60529.1687876586.jpg?c=1" },
		{ nickname: "WonderWoman45", id: "A1309524", fav: true, imageUrl: "https://www.diamondartclub.com/cdn/shop/products/wonder-woman-pop-art-diamond-art-painting-30226211766465.jpg?v=1626580338&width=3133" },
	],
	aboutMe: "JUSTICEEEEEEEEEE",
	paymentMethods: [
		"Venmo: JusticeLeagueLLC",
		"Zelle: AlfredMobile",
		"Wishlist",
	],
	recentFavors: [],
};

/* 
    - We need the ID for both sender and 
    receiver to get accurate usernames and profile 
    picture changed. Thus sender and receiver should 
    have values of their unique ID.
*/

export const DUMMY_FAVORS_OF_PROFILE_Updated = [
	{
		bountyId: "A1234",
		senderId: "BATMAN2077",
		receiverId: "Superman012",
		dateCreated: "07/01/2024",
		tags: ["Priority"],
		paymentType: "monetary",
		paymentOwed: "100000000",
		description: "Favor parent's farm!",
		status: "completed",
		bountyEditHistory: [],
	},
	{
		bountyId: "A1235",
		senderId: "BATMAN2077",
		receiverId: "Joker",
		dateCreated: "07/01/1977",
		tags: ["Priority", "Non-negoible"],
		paymentType: "nonmonetary",
		paymentOwed: "JUSTICEEE!",
		description:
			"A mass psycho needs to return to Arkham Asylum! This favor is outstanding and no other form of payment",
		status: "none",
		bountyEditHistory: [],
	},
	{
		bountyId: "A1236",
		senderId: "BATMAN2077",
		receiverId: "RoboCop_64",
		dateCreated: "07/17/2013",
		tags: ["Technology"],
		paymentType: "monetary",
		paymentOwed: "300000000",
		description:
			"Technology from Wayne-Tech. Need the funds for the technology!",
		status: "completed",
		bountyEditHistory: [],
	},
	{
		bountyId: "A1237",
		senderId: "WonderWomen45",
		receiverId: "BATMAN2077",
		dateCreated: "07/01/24",
		tags: ["priority"],
		paymentType: "monetary",
		paymentOwed: "1000000",
		description: "Saving you in Batman vs Superman Movie!",
		status: "deleted",
		bountyEditHistory: [],
	},
];

export const DUMMY_FAVORS_OF_PROFILE = [
	{
		sender: "BATMAN2077",
		receiver: "Superman012",
		dateCreated: "07/01/2024",
		tags: ["Monetary", "Priority"],
		paymentOwed: "100000000",
		description: "Favor parent's farm!",
		status: "completed",
	},
	{
		sender: "BATMAN2077",
		receiver: "Joker",
		dateCreated: "07/01/1977",
		tags: ["Priority", "Non-negoible", "Non-monetary"],
		paymentOwed: "JUSTICEEE!",
		description:
			"A mass psycho needs to return to Arkham Asylum! This favor is outstanding and no other form of payment",
		status: "none",
	},
	{
		sender: "BATMAN2077",
		receiver: "RoboCop_64",
		dateCreated: "07/17/2013",
		tags: ["Monetary", "Technology"],
		paymentOwed: "300000000",
		description:
			"Technology from Wayne-Tech. Need the funds for the technology!",
		status: "completed",
	},
	{
		sender: "WonderWomen45",
		receiver: "BATMAN2077",
		dateCreated: "07/01/24",
		tags: ["monetary", "priority"],
		paymentOwed: "1000000",
		description: "Saving you in Batman vs Superman Movie!",
		status: "deleted",
	},
];

export const DETAILED_FRIEND_LIST = [
	{
		friendId: "A123456",
		friendUsername: "Batman2077",
		friendProfilePic: "./../assets/batman.jpeg",
		friendRating: 100,
	},
	{
		friendId: "A223456",
		friendUsername: "Superman7",
		friendProfilePic: "./../assets/profile.jpeg",
		friendRating: 99,
	},
	{
		friendId: "A323456",
		friendUsername: "WonderWomen45",
		friendProfilePic: "./../assets/profile.jpeg",
		friendRating: 99,
	},
	{
		friendId: "A423456",
		friendUsername: "FlashPoint",
		friendProfilePic: "./../assets/profile.jpeg",
		friendRating: 82,
	},
	{
		friendId: "A523456",
		friendUsername: "Joker",
		friendProfilePic: "./../assets/batman.jpeg",
		friendRating: 44,
	},
	{
		friendId: "A1234342",
		friendUsername: "Batman2077",
		friendProfilePic: "./../assets/batman.jpeg",
		friendRating: 100,
	},
	{
		friendId: "A2223256",
		friendUsername: "Superman7",
		friendProfilePic: "./../assets/profile.jpeg",
		friendRating: 99,
	},
	{
		friendId: "A323452326",
		friendUsername: "WonderWomen45",
		friendProfilePic: "./../assets/profile.jpeg",
		friendRating: 99,
	},
	{
		friendId: "A4234356",
		friendUsername: "FlashPoint",
		friendProfilePic: "./../assets/profile.jpeg",
		friendRating: 82,
	},
	{
		friendId: "A5234356",
		friendUsername: "Joker",
		friendProfilePic: "./../assets/batman.jpeg",
		friendRating: 44,
	},
];
