import { calculateBuyPrice, calculateSaleReturn, calculateSigmoidBuyPrice, calculateSigmoidSellReturn
	} from '../../../utils/bondingcurveCalculator'


export const BondingCurveTypes = {
	standard: "Standard Continouos Token (~66% Reserve Ratio)",
	sigmoid: "Sigmoid (For Project Funding)",
	equilibrium: "Equilibrium Bonding Curve",
	shortSelling: "Short Selling Bonding Curve"
}

export const BondingCurveSettings = {
	standard: {
		reserveRatio: 666666, // in ppm
		calculateBuyPrice: calculateBuyPrice,
		calculateSaleReturn: calculateSaleReturn,
		contractAddress: '',
		artifact: {}
	},
	sigmoid: {
		curveHeight: 5000, // a
		inflectionSupply: 15000, // b 
		steepness: 1000000, // c
		calculateBuyPrice: calculateSigmoidBuyPrice,
		calculateSaleReturn: calculateSigmoidSellReturn,
		contractAddress: '',
		artifact: {}
	},
	equilibrium: {
		calculateBuyPrice: () => 0,
		calculateSaleReturn: () => 0,
		contractAddress: '',
		aArtifact: {}
	},
	shortSelling: {
		calculateBuyPrice: () => 0,
		calculateSaleReturn: () => 0,
		contractAddress: '',
		artifact: {}
	},
}