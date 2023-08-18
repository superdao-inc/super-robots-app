export enum CUSTOMIZE_COLORS {
	plum = 'plum',
	lemon = 'lemon',
	orange = 'orange',
	bubblegum = 'bubblegum',
	sky = 'sky',
	lime = 'lime',
	silverSnow = 'silver/snow',
	charcoalOnyx = 'charcoal/onyx'
}

export const customizeElements: {
	type: string;
	name: string;
	index: string;
	color: CUSTOMIZE_COLORS[];
}[] = [
	// bg
	{
		type: 'BG',
		name: 'Bubblegum',
		index: 'BG_1',
		color: [CUSTOMIZE_COLORS.bubblegum]
	},
	{
		type: 'BG',
		name: 'Lemon',
		index: 'BG_2',
		color: [CUSTOMIZE_COLORS.lemon]
	},
	{
		type: 'BG',
		name: 'Plum',
		index: 'BG_3',
		color: [CUSTOMIZE_COLORS.plum]
	},
	{
		type: 'BG',
		name: 'Sky',
		index: 'BG_4',
		color: [CUSTOMIZE_COLORS.sky]
	},
	{
		type: 'BG',
		name: 'Lime',
		index: 'BG_5',
		color: [CUSTOMIZE_COLORS.lime]
	},
	{
		type: 'BG',
		name: 'Silver',
		index: 'BG_6',
		color: [CUSTOMIZE_COLORS.silverSnow]
	},
	{
		type: 'BG',
		name: 'Amethyst',
		index: 'BG_7',
		color: [CUSTOMIZE_COLORS.plum]
	},
	{
		type: 'BG',
		name: 'Azure',
		index: 'BG_8',
		color: [CUSTOMIZE_COLORS.sky]
	},
	{
		type: 'BG',
		name: 'Canary',
		index: 'BG_9',
		color: [CUSTOMIZE_COLORS.lemon]
	},
	{
		type: 'BG',
		name: 'Charcoal',
		index: 'BG_10',
		color: [CUSTOMIZE_COLORS.charcoalOnyx]
	},
	{
		type: 'BG',
		name: 'Flamingo',
		index: 'BG_11',
		color: [CUSTOMIZE_COLORS.bubblegum]
	},
	{
		type: 'BG',
		name: 'Jade',
		index: 'BG_12',
		color: [CUSTOMIZE_COLORS.lime]
	},

	// eyes
	{
		type: 'EYES',
		name: 'Lime',
		index: 'EYES_1',
		color: [CUSTOMIZE_COLORS.lime]
	},
	{
		type: 'EYES',
		name: 'Sky',
		index: 'EYES_2',
		color: [CUSTOMIZE_COLORS.sky]
	},
	{
		type: 'EYES',
		name: 'Lemon',
		index: 'EYES_3',
		color: [CUSTOMIZE_COLORS.lemon]
	},
	{
		type: 'EYES',
		name: 'Silver',
		index: 'EYES_4',
		color: [CUSTOMIZE_COLORS.silverSnow]
	},
	{
		type: 'EYES',
		name: 'Plum',
		index: 'EYES_5',
		color: [CUSTOMIZE_COLORS.plum]
	},
	{
		type: 'EYES',
		name: 'Bored Lime',
		index: 'EYES_6',
		color: [CUSTOMIZE_COLORS.lime]
	},
	{
		type: 'EYES',
		name: 'Bored Silver',
		index: 'EYES_7',
		color: [CUSTOMIZE_COLORS.silverSnow]
	},
	{
		type: 'EYES',
		name: 'Bored Sky',
		index: 'EYES_8',
		color: [CUSTOMIZE_COLORS.sky]
	},
	{
		type: 'EYES',
		name: 'Bored Lemon',
		index: 'EYES_9',
		color: [CUSTOMIZE_COLORS.lemon]
	},
	{
		type: 'EYES',
		name: 'Dreamy Lemon',
		index: 'EYES_10',
		color: [CUSTOMIZE_COLORS.lemon]
	},
	{
		type: 'EYES',
		name: 'Dreamy Lime',
		index: 'EYES_11',
		color: [CUSTOMIZE_COLORS.lime]
	},
	{
		type: 'EYES',
		name: 'Dreamy Silver',
		index: 'EYES_12',
		color: [CUSTOMIZE_COLORS.silverSnow]
	},
	{
		type: 'EYES',
		name: 'Dreamy Sky',
		index: 'EYES_13',
		color: [CUSTOMIZE_COLORS.sky]
	},
	{
		type: 'EYES',
		name: 'Shy Lemon',
		index: 'EYES_14',
		color: [CUSTOMIZE_COLORS.lemon]
	},
	{
		type: 'EYES',
		name: 'Shy Lime',
		index: 'EYES_15',
		color: [CUSTOMIZE_COLORS.lime]
	},
	{
		type: 'EYES',
		name: 'Shy Silver',
		index: 'EYES_16',
		color: [CUSTOMIZE_COLORS.silverSnow]
	},
	{
		type: 'EYES',
		name: 'Shy Sky',
		index: 'EYES_17',
		color: [CUSTOMIZE_COLORS.sky]
	},

	// tubes
	{
		type: 'TUBES',
		name: 'Bubblegum',
		index: 'TUBES_1',
		color: [CUSTOMIZE_COLORS.bubblegum]
	},
	{
		type: 'TUBES',
		name: 'Lemon',
		index: 'TUBES_2',
		color: [CUSTOMIZE_COLORS.lemon]
	},
	{
		type: 'TUBES',
		name: 'Plum',
		index: 'TUBES_3',
		color: [CUSTOMIZE_COLORS.plum]
	},
	{
		type: 'TUBES',
		name: 'Sky',
		index: 'TUBES_4',
		color: [CUSTOMIZE_COLORS.sky]
	},
	{
		type: 'TUBES',
		name: 'Lime',
		index: 'TUBES_5',
		color: [CUSTOMIZE_COLORS.lime]
	},
	{
		type: 'TUBES',
		name: 'Iron Bubblegum',
		index: 'TUBES_6',
		color: [CUSTOMIZE_COLORS.bubblegum]
	},
	{
		type: 'TUBES',
		name: 'Iron Lemon',
		index: 'TUBES_7',
		color: [CUSTOMIZE_COLORS.lemon]
	},
	{
		type: 'TUBES',
		name: 'Iron Lime',
		index: 'TUBES_8',
		color: [CUSTOMIZE_COLORS.lime]
	},
	{
		type: 'TUBES',
		name: 'Iron Orange',
		index: 'TUBES_9',
		color: [CUSTOMIZE_COLORS.orange]
	},
	{
		type: 'TUBES',
		name: 'Iron Plum',
		index: 'TUBES_10',
		color: [CUSTOMIZE_COLORS.plum]
	},
	{
		type: 'TUBES',
		name: 'Iron Sky',
		index: 'TUBES_11',
		color: [CUSTOMIZE_COLORS.sky]
	},
	{
		type: 'TUBES',
		name: 'Metallic Bubblegum',
		index: 'TUBES_12',
		color: [CUSTOMIZE_COLORS.bubblegum]
	},
	{
		type: 'TUBES',
		name: 'Metallic Lemon',
		index: 'TUBES_13',
		color: [CUSTOMIZE_COLORS.lemon]
	},
	{
		type: 'TUBES',
		name: 'Metallic Lime',
		index: 'TUBES_14',
		color: [CUSTOMIZE_COLORS.lime]
	},
	{
		type: 'TUBES',
		name: 'Metallic Orange',
		index: 'TUBES_15',
		color: [CUSTOMIZE_COLORS.orange]
	},
	{
		type: 'TUBES',
		name: 'Metallic Plum',
		index: 'TUBES_16',
		color: [CUSTOMIZE_COLORS.plum]
	},
	{
		type: 'TUBES',
		name: 'Metallic Sky',
		index: 'TUBES_17',
		color: [CUSTOMIZE_COLORS.sky]
	},
	{
		type: 'TUBES',
		name: 'Ant Bubblegum',
		index: 'TUBES_18',
		color: [CUSTOMIZE_COLORS.bubblegum]
	},
	{
		type: 'TUBES',
		name: 'Ant Lemon',
		index: 'TUBES_19',
		color: [CUSTOMIZE_COLORS.lemon]
	},
	{
		type: 'TUBES',
		name: 'Ant Lime',
		index: 'TUBES_20',
		color: [CUSTOMIZE_COLORS.lime]
	},
	{
		type: 'TUBES',
		name: 'Ant Orange',
		index: 'TUBES_21',
		color: [CUSTOMIZE_COLORS.orange]
	},
	{
		type: 'TUBES',
		name: 'Ant Plum',
		index: 'TUBES_22',
		color: [CUSTOMIZE_COLORS.plum]
	},
	{
		type: 'TUBES',
		name: 'Ant Sky',
		index: 'TUBES_23',
		color: [CUSTOMIZE_COLORS.sky]
	},
	{
		type: 'TUBES',
		name: 'Kitty Bubblegum',
		index: 'TUBES_24',
		color: [CUSTOMIZE_COLORS.bubblegum]
	},
	{
		type: 'TUBES',
		name: 'Kitty Lemon',
		index: 'TUBES_25',
		color: [CUSTOMIZE_COLORS.lemon]
	},
	{
		type: 'TUBES',
		name: 'Kitty Lime',
		index: 'TUBES_26',
		color: [CUSTOMIZE_COLORS.lime]
	},
	{
		type: 'TUBES',
		name: 'Kitty Orange',
		index: 'TUBES_27',
		color: [CUSTOMIZE_COLORS.orange]
	},
	{
		type: 'TUBES',
		name: 'Kitty Plum',
		index: 'TUBES_28',
		color: [CUSTOMIZE_COLORS.plum]
	},
	{
		type: 'TUBES',
		name: 'Kitty Sky',
		index: 'TUBES_29',
		color: [CUSTOMIZE_COLORS.sky]
	},
	{
		type: 'TUBES',
		name: 'Halo',
		index: 'TUBES_30',
		color: [CUSTOMIZE_COLORS.silverSnow]
	},
	{
		type: 'TUBES',
		name: 'Horns',
		index: 'TUBES_31',
		color: [CUSTOMIZE_COLORS.charcoalOnyx]
	},

	// legs
	{
		type: 'LEGS',
		name: 'Chucks Sky',
		index: 'LEGS_1',
		color: [CUSTOMIZE_COLORS.sky]
	},
	{
		type: 'LEGS',
		name: 'Chucks Lime',
		index: 'LEGS_2',
		color: [CUSTOMIZE_COLORS.lime]
	},
	{
		type: 'LEGS',
		name: 'Chucks Bubblegum',
		index: 'LEGS_3',
		color: [CUSTOMIZE_COLORS.bubblegum]
	},
	{
		type: 'LEGS',
		name: 'Chucks Plum',
		index: 'LEGS_4',
		color: [CUSTOMIZE_COLORS.plum]
	},
	{
		type: 'LEGS',
		name: 'Chucks Lemon',
		index: 'LEGS_5',
		color: [CUSTOMIZE_COLORS.lemon]
	},
	{
		type: 'LEGS',
		name: 'Sneakers Charcoal Lime',
		index: 'LEGS_6',
		color: [CUSTOMIZE_COLORS.charcoalOnyx]
	},
	{
		type: 'LEGS',
		name: 'Sneakers Snow Plum',
		index: 'LEGS_7',
		color: [CUSTOMIZE_COLORS.silverSnow]
	},
	{
		type: 'LEGS',
		name: 'Sneakers Silver Lemon',
		index: 'LEGS_8',
		color: [CUSTOMIZE_COLORS.silverSnow]
	},
	{
		type: 'LEGS',
		name: 'Pumps Onyx Bubblegum',
		index: 'LEGS_9',
		color: [CUSTOMIZE_COLORS.charcoalOnyx, CUSTOMIZE_COLORS.bubblegum]
	},
	{
		type: 'LEGS',
		name: 'Pumps Onyx Lemon',
		index: 'LEGS_10',
		color: [CUSTOMIZE_COLORS.charcoalOnyx, CUSTOMIZE_COLORS.lemon]
	},
	{
		type: 'LEGS',
		name: 'Pumps Onyx Lime',
		index: 'LEGS_11',
		color: [CUSTOMIZE_COLORS.charcoalOnyx, CUSTOMIZE_COLORS.lime]
	},
	{
		type: 'LEGS',
		name: 'Pumps Onyx Orange',
		index: 'LEGS_12',
		color: [CUSTOMIZE_COLORS.charcoalOnyx, CUSTOMIZE_COLORS.orange]
	},
	{
		type: 'LEGS',
		name: 'Pumps Onyx Plum',
		index: 'LEGS_13',
		color: [CUSTOMIZE_COLORS.charcoalOnyx, CUSTOMIZE_COLORS.plum]
	},
	{
		type: 'LEGS',
		name: 'Pumps Onyx Sky',
		index: 'LEGS_14',
		color: [CUSTOMIZE_COLORS.charcoalOnyx, CUSTOMIZE_COLORS.sky]
	},

	{
		type: 'LEGS',
		name: 'Pumps Silver Bubblegum',
		index: 'LEGS_15',
		color: [CUSTOMIZE_COLORS.silverSnow, CUSTOMIZE_COLORS.bubblegum]
	},
	{
		type: 'LEGS',
		name: 'Pumps Silver Lemon',
		index: 'LEGS_16',
		color: [CUSTOMIZE_COLORS.silverSnow, CUSTOMIZE_COLORS.lemon]
	},
	{
		type: 'LEGS',
		name: 'Pumps Silver Lime',
		index: 'LEGS_17',
		color: [CUSTOMIZE_COLORS.silverSnow, CUSTOMIZE_COLORS.lime]
	},
	{
		type: 'LEGS',
		name: 'Pumps Silver Orange',
		index: 'LEGS_18',
		color: [CUSTOMIZE_COLORS.silverSnow, CUSTOMIZE_COLORS.orange]
	},
	{
		type: 'LEGS',
		name: 'Pumps Silver Plum',
		index: 'LEGS_19',
		color: [CUSTOMIZE_COLORS.silverSnow, CUSTOMIZE_COLORS.plum]
	},
	{
		type: 'LEGS',
		name: 'Pumps Silver Sky',
		index: 'LEGS_20',
		color: [CUSTOMIZE_COLORS.silverSnow, CUSTOMIZE_COLORS.sky]
	},
	{
		type: 'LEGS',
		name: 'Laced Boots Bubblegum',
		index: 'LEGS_21',
		color: [CUSTOMIZE_COLORS.bubblegum]
	},
	{
		type: 'LEGS',
		name: 'Laced Boots Lemon',
		index: 'LEGS_22',
		color: [CUSTOMIZE_COLORS.lemon]
	},
	{
		type: 'LEGS',
		name: 'Laced Boots Lime',
		index: 'LEGS_23',
		color: [CUSTOMIZE_COLORS.lime]
	},
	{
		type: 'LEGS',
		name: 'Laced Boots Onyx',
		index: 'LEGS_24',
		color: [CUSTOMIZE_COLORS.charcoalOnyx]
	},
	{
		type: 'LEGS',
		name: 'Laced Boots Orange',
		index: 'LEGS_25',
		color: [CUSTOMIZE_COLORS.orange]
	},
	{
		type: 'LEGS',
		name: 'Laced Boots Plum',
		index: 'LEGS_26',
		color: [CUSTOMIZE_COLORS.plum]
	},
	{
		type: 'LEGS',
		name: 'Laced Boots Sky',
		index: 'LEGS_27',
		color: [CUSTOMIZE_COLORS.sky]
	},
	{
		type: 'LEGS',
		name: 'Laced Boots Snow',
		index: 'LEGS_28',
		color: [CUSTOMIZE_COLORS.silverSnow]
	},
	{
		type: 'LEGS',
		name: 'Laced Boots Metallic Bubblegum',
		index: 'LEGS_29',
		color: [CUSTOMIZE_COLORS.bubblegum]
	},
	{
		type: 'LEGS',
		name: 'Laced Boots Metallic Lemon',
		index: 'LEGS_30',
		color: [CUSTOMIZE_COLORS.lemon]
	},
	{
		type: 'LEGS',
		name: 'Laced Boots Metallic Lime',
		index: 'LEGS_31',
		color: [CUSTOMIZE_COLORS.lime]
	},
	{
		type: 'LEGS',
		name: 'Laced Boots Metallic Orange',
		index: 'LEGS_32',
		color: [CUSTOMIZE_COLORS.orange]
	},
	{
		type: 'LEGS',
		name: 'Laced Boots Metallic Plum',
		index: 'LEGS_33',
		color: [CUSTOMIZE_COLORS.plum]
	},
	{
		type: 'LEGS',
		name: 'Laced Boots Metallic Sky',
		index: 'LEGS_34',
		color: [CUSTOMIZE_COLORS.sky]
	},
	{
		type: 'LEGS',
		name: 'Sneakers Angelic White',
		index: 'LEGS_35',
		color: [CUSTOMIZE_COLORS.silverSnow]
	},
	{
		type: 'LEGS',
		name: 'Chucks Devilish Onyx',
		index: 'LEGS_36',
		color: [CUSTOMIZE_COLORS.charcoalOnyx]
	},

	// body
	{
		type: 'BODY',
		name: 'Hoodie Lime',
		index: 'BODY_1',
		color: [CUSTOMIZE_COLORS.lime]
	},
	{
		type: 'BODY',
		name: 'Hoodie Sky',
		index: 'BODY_2',
		color: [CUSTOMIZE_COLORS.sky]
	},
	{
		type: 'BODY',
		name: 'Hoodie Bubblegum',
		index: 'BODY_3',
		color: [CUSTOMIZE_COLORS.bubblegum]
	},
	{
		type: 'BODY',
		name: 'Hoodie Plum',
		index: 'BODY_4',
		color: [CUSTOMIZE_COLORS.plum]
	},
	{
		type: 'BODY',
		name: 'Hoodie Lemon',
		index: 'BODY_5',
		color: [CUSTOMIZE_COLORS.lemon]
	},
	{
		type: 'BODY',
		name: 'Inflatable Puffer Smiley Sky',
		index: 'BODY_6',
		color: [CUSTOMIZE_COLORS.sky]
	},
	{
		type: 'BODY',
		name: 'Inflatable Puffer Smiley Lime',
		index: 'BODY_7',
		color: [CUSTOMIZE_COLORS.lime]
	},
	{
		type: 'BODY',
		name: 'Inflatable Puffer Smiley Orange',
		index: 'BODY_8',
		color: [CUSTOMIZE_COLORS.orange]
	},
	{
		type: 'BODY',
		name: 'Inflatable Puffer Smiley Bubblegum',
		index: 'BODY_9',
		color: [CUSTOMIZE_COLORS.bubblegum]
	},
	{
		type: 'BODY',
		name: 'Inflatable Puffer Smiley Plum',
		index: 'BODY_10',
		color: [CUSTOMIZE_COLORS.plum]
	},
	{
		type: 'BODY',
		name: 'Ombre Puffer Lime',
		index: 'BODY_11',
		color: [CUSTOMIZE_COLORS.lime]
	},
	{
		type: 'BODY',
		name: 'Ombre Puffer Plum',
		index: 'BODY_12',
		color: [CUSTOMIZE_COLORS.plum]
	},
	{
		type: 'BODY',
		name: 'Ombre Puffer Orange',
		index: 'BODY_13',
		color: [CUSTOMIZE_COLORS.orange]
	},
	{
		type: 'BODY',
		name: 'Ombre Puffer Bubblegum',
		index: 'BODY_14',
		color: [CUSTOMIZE_COLORS.bubblegum]
	},
	{
		type: 'BODY',
		name: 'Ombre Puffer Sky',
		index: 'BODY_15',
		color: [CUSTOMIZE_COLORS.sky]
	},
	{
		type: 'BODY',
		name: 'Super Puffer Plum',
		index: 'BODY_16',
		color: [CUSTOMIZE_COLORS.plum]
	},
	{
		type: 'BODY',
		name: 'Super Puffer Sky',
		index: 'BODY_17',
		color: [CUSTOMIZE_COLORS.sky]
	},
	{
		type: 'BODY',
		name: 'Super Puffer Lemon',
		index: 'BODY_18',
		color: [CUSTOMIZE_COLORS.lemon]
	},
	{
		type: 'BODY',
		name: 'Super Puffer Bubblegum',
		index: 'BODY_19',
		color: [CUSTOMIZE_COLORS.bubblegum]
	},
	{
		type: 'BODY',
		name: 'Super Puffer Lime',
		index: 'BODY_20',
		color: [CUSTOMIZE_COLORS.lime]
	},
	{
		type: 'BODY',
		name: 'Puffer Sky',
		index: 'BODY_21',
		color: [CUSTOMIZE_COLORS.sky]
	},
	{
		type: 'BODY',
		name: 'Puffer Lemon',
		index: 'BODY_22',
		color: [CUSTOMIZE_COLORS.lemon]
	},
	{
		type: 'BODY',
		name: 'Puffer Lime',
		index: 'BODY_23',
		color: [CUSTOMIZE_COLORS.lime]
	},
	{
		type: 'BODY',
		name: 'Puffer Bubblegum',
		index: 'BODY_24',
		color: [CUSTOMIZE_COLORS.bubblegum]
	},
	{
		type: 'BODY',
		name: 'Puffer Plum',
		index: 'BODY_25',
		color: [CUSTOMIZE_COLORS.plum]
	},
	{
		type: 'BODY',
		name: 'Super Hoodie Black',
		index: 'BODY_26',
		color: []
	},
	{
		type: 'BODY',
		name: 'Super Hoodie Gray',
		index: 'BODY_27',
		color: [CUSTOMIZE_COLORS.charcoalOnyx]
	},
	{
		type: 'BODY',
		name: 'Super Hoodie Lemon',
		index: 'BODY_28',
		color: [CUSTOMIZE_COLORS.lemon]
	},
	{
		type: 'BODY',
		name: 'Super Hoodie Lime',
		index: 'BODY_29',
		color: [CUSTOMIZE_COLORS.lime]
	},
	{
		type: 'BODY',
		name: 'Super Hoodie Silver',
		index: 'BODY_30',
		color: [CUSTOMIZE_COLORS.silverSnow]
	},
	{
		type: 'BODY',
		name: 'Super Hoodie Snow',
		index: 'BODY_31',
		color: [CUSTOMIZE_COLORS.silverSnow]
	},
	{
		type: 'BODY',
		name: 'Super Hoodie Sky',
		index: 'BODY_32',
		color: [CUSTOMIZE_COLORS.sky]
	},
	{
		type: 'BODY',
		name: 'Band Check Shirt B_W',
		index: 'BODY_33',
		color: []
	},
	{
		type: 'BODY',
		name: 'Band Check Shirt Brown',
		index: 'BODY_34',
		color: []
	},
	{
		type: 'BODY',
		name: 'Band Check Shirt Lime',
		index: 'BODY_35',
		color: [CUSTOMIZE_COLORS.lime]
	},
	{
		type: 'BODY',
		name: 'Band Check Shirt Orange',
		index: 'BODY_36',
		color: [CUSTOMIZE_COLORS.orange]
	},
	{
		type: 'BODY',
		name: 'Band Check Shirt Plum',
		index: 'BODY_37',
		color: [CUSTOMIZE_COLORS.plum]
	},
	{
		type: 'BODY',
		name: 'Band Check Shirt Red',
		index: 'BODY_38',
		color: []
	},
	{
		type: 'BODY',
		name: 'Band Check Shirt Sky',
		index: 'BODY_39',
		color: [CUSTOMIZE_COLORS.sky]
	},
	{
		type: 'BODY',
		name: 'Band Shirt Washed Lavender',
		index: 'BODY_40',
		color: [CUSTOMIZE_COLORS.plum]
	},
	{
		type: 'BODY',
		name: 'Band Shirt Washed Rose',
		index: 'BODY_41',
		color: [CUSTOMIZE_COLORS.bubblegum]
	},
	{
		type: 'BODY',
		name: 'Band Shirt Washed Sage',
		index: 'BODY_42',
		color: [CUSTOMIZE_COLORS.lime]
	},
	{
		type: 'BODY',
		name: 'Band Shirt Washed Taupe',
		index: 'BODY_43',
		color: [CUSTOMIZE_COLORS.silverSnow]
	},
	{
		type: 'BODY',
		name: 'Band T-Chain Charcoal',
		index: 'BODY_44',
		color: [CUSTOMIZE_COLORS.charcoalOnyx]
	},
	{
		type: 'BODY',
		name: 'Super Check Shirt B_W',
		index: 'BODY_45',
		color: []
	},
	{
		type: 'BODY',
		name: 'Super Check Shirt Brown',
		index: 'BODY_46',
		color: []
	},
	{
		type: 'BODY',
		name: 'Super Check Shirt Lime',
		index: 'BODY_47',
		color: [CUSTOMIZE_COLORS.lime]
	},
	{
		type: 'BODY',
		name: 'Super Check Shirt Orange',
		index: 'BODY_48',
		color: [CUSTOMIZE_COLORS.orange]
	},
	{
		type: 'BODY',
		name: 'Super Check Shirt Plum',
		index: 'BODY_49',
		color: [CUSTOMIZE_COLORS.plum]
	},
	{
		type: 'BODY',
		name: 'Super Check Shirt Red',
		index: 'BODY_50',
		color: []
	},
	{
		type: 'BODY',
		name: 'Super Check Shirt Sky',
		index: 'BODY_51',
		color: [CUSTOMIZE_COLORS.sky]
	},
	{
		type: 'BODY',
		name: 'Super Shirt Washed Lavender',
		index: 'BODY_52',
		color: [CUSTOMIZE_COLORS.plum]
	},
	{
		type: 'BODY',
		name: 'Super Shirt Washed Rose',
		index: 'BODY_53',
		color: [CUSTOMIZE_COLORS.bubblegum]
	},
	{
		type: 'BODY',
		name: 'Super Shirt Washed Sage',
		index: 'BODY_54',
		color: [CUSTOMIZE_COLORS.lime]
	},
	{
		type: 'BODY',
		name: 'Super Shirt Washed Taupe',
		index: 'BODY_55',
		color: [CUSTOMIZE_COLORS.silverSnow]
	},
	{
		type: 'BODY',
		name: 'Super T-Chain Black',
		index: 'BODY_56',
		color: []
	},
	{
		type: 'BODY',
		name: 'Super Cape Bubblegum',
		index: 'BODY_57',
		color: [CUSTOMIZE_COLORS.bubblegum]
	},
	{
		type: 'BODY',
		name: 'Super Cape Lemon',
		index: 'BODY_58',
		color: [CUSTOMIZE_COLORS.lemon]
	},
	{
		type: 'BODY',
		name: 'Super Cape Lime',
		index: 'BODY_59',
		color: [CUSTOMIZE_COLORS.lime]
	},
	{
		type: 'BODY',
		name: 'Super Cape Orange',
		index: 'BODY_60',
		color: [CUSTOMIZE_COLORS.orange]
	},
	{
		type: 'BODY',
		name: 'Super Cape Plum',
		index: 'BODY_61',
		color: [CUSTOMIZE_COLORS.plum]
	},
	{
		type: 'BODY',
		name: 'Super Cape Sky',
		index: 'BODY_62',
		color: [CUSTOMIZE_COLORS.sky]
	},
	{
		type: 'BODY',
		name: 'Puffer Angelic White',
		index: 'BODY_63',
		color: [CUSTOMIZE_COLORS.silverSnow]
	},
	{
		type: 'BODY',
		name: 'Hoodie Devilish Onyx',
		index: 'BODY_64',
		color: [CUSTOMIZE_COLORS.charcoalOnyx]
	}
];

export const featuredConfig = [
	...customizeElements.filter((elem) =>
		[
			// featured tubes
			'TUBES_11',
			'TUBES_17',
			// featured legs
			'LEGS_8',
			'LEGS_19',
			'LEGS_24',
			'LEGS_32',
			// featured body
			'BODY_9',
			'BODY_18',
			'BODY_27',
			'BODY_29',
			'BODY_40',
			'BODY_56',
			'BODY_60'
		].includes(elem.index)
	)
];

export const subShopsConfig = [
	{
		name: 'Superhero style pack',
		path: 'superhero'
	},
	{
		name: 'Grunge style pack',
		path: 'grunge'
	},
	{
		name: 'Heavell style pack',
		path: 'heavell'
	}
];

export const subShopsParamsConfig = [
	{
		name: 'superhero',
		elems: [
			...customizeElements.filter((elem) =>
				[
					'BODY_57',
					'BODY_58',
					'BODY_59',
					'BODY_60',
					'BODY_61',
					'BODY_62',
					'LEGS_15',
					'LEGS_16',
					'LEGS_17',
					'LEGS_18',
					'LEGS_19',
					'LEGS_20',
					'TUBES_12',
					'TUBES_13',
					'TUBES_14',
					'TUBES_15',
					'TUBES_16',
					'TUBES_17'
				].includes(elem.index)
			)
		],
		fullsets: [
			{
				name: 'Rosethorn',
				BG: 'BG_6',
				BODY: 'BODY_57',
				TUBES: 'TUBES_12',
				EYES: 'EYES_7',
				LEGS: 'LEGS_15'
			},
			{
				name: 'Supersolar',
				BG: 'BG_1',
				BODY: 'BODY_58',
				TUBES: 'TUBES_13',
				EYES: 'EYES_12',
				LEGS: 'LEGS_16'
			},
			{
				name: 'Limestorm',
				BG: 'BG_4',
				BODY: 'BODY_59',
				TUBES: 'TUBES_14',
				EYES: 'EYES_16',
				LEGS: 'LEGS_17'
			},
			{
				name: 'Tangeo',
				BG: 'BG_3',
				BODY: 'BODY_60',
				TUBES: 'TUBES_15',
				EYES: 'EYES_4',
				LEGS: 'LEGS_18'
			},
			{
				name: 'Mightplum',
				BG: 'BG_5',
				BODY: 'BODY_61',
				TUBES: 'TUBES_16',
				EYES: 'EYES_12',
				LEGS: 'LEGS_19'
			},
			{
				name: 'Bluebeam',
				BG: 'BG_2',
				BODY: 'BODY_62',
				TUBES: 'TUBES_17',
				EYES: 'EYES_16',
				LEGS: 'LEGS_20'
			}
		]
	},
	{
		name: 'grunge',
		elems: [
			...customizeElements.filter((elem) =>
				[
					'BODY_33',
					'BODY_34',
					'BODY_35',
					'BODY_36',
					'BODY_37',
					'BODY_38',
					'BODY_39',
					'BODY_40',
					'BODY_41',
					'BODY_42',
					'BODY_43',
					'BODY_44',
					'BODY_45',
					'BODY_46',
					'BODY_47',
					'BODY_48',
					'BODY_49',
					'BODY_50',
					'BODY_51',
					'BODY_52',
					'BODY_53',
					'BODY_54',
					'BODY_55',
					'BODY_56',

					'LEGS_21',
					'LEGS_22',
					'LEGS_23',
					'LEGS_24',
					'LEGS_25',
					'LEGS_26',
					'LEGS_27',
					'LEGS_28',
					'LEGS_29',
					'LEGS_30',
					'LEGS_31',
					'LEGS_32',
					'LEGS_33',
					'LEGS_34',

					'TUBES_6',
					'TUBES_7',
					'TUBES_8',
					'TUBES_9',
					'TUBES_10',
					'TUBES_11'
				].includes(elem.index)
			)
		],
		fullsets: [
			{
				name: 'Lime Punk',
				BG: 'BG_2',
				BODY: 'BODY_46',
				TUBES: 'TUBES_8',
				EYES: 'EYES_12',
				LEGS: 'LEGS_31'
			},
			{
				name: 'Rose Thorn',
				BG: 'BG_4',
				BODY: 'BODY_45',
				TUBES: 'TUBES_6',
				EYES: 'EYES_12',
				LEGS: 'LEGS_29'
			},
			{
				name: 'Viper',
				BG: 'BG_6',
				BODY: 'BODY_52',
				TUBES: 'TUBES_10',
				EYES: 'EYES_7',
				LEGS: 'LEGS_24'
			},
			{
				name: 'T-Chainer',
				BG: 'BG_3',
				BODY: 'BODY_56',
				TUBES: 'TUBES_8',
				EYES: 'EYES_16',
				LEGS: 'LEGS_28'
			}
		]
	},
	{
		name: 'heavell',
		elems: [
			...customizeElements.filter((elem) =>
				['BODY_63', 'BODY_64', 'LEGS_35', 'LEGS_36', 'TUBES_30', 'TUBES_31'].includes(elem.index)
			)
		],
		fullsets: [
			{
				name: 'Zephir',
				BG: 'BG_4',
				BODY: 'BODY_63',
				TUBES: 'TUBES_30',
				EYES: 'EYES_12',
				LEGS: 'LEGS_35'
			},
			{
				name: 'Evillo',
				BG: 'BG_3',
				BODY: 'BODY_64',
				TUBES: 'TUBES_31',
				EYES: 'EYES_7',
				LEGS: 'LEGS_36'
			}
		]
	}
];
