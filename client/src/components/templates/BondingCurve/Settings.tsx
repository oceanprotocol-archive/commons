
export const BondingCurveTypes = [
	"Continuous Bonding Curve",
	"Equilibrium Bonding Curve",
	"Short Selling Bonding Curve"
]

export const BondingCurveSettings = {
	[BondingCurveTypes[0]]: {
		contractAddress: '',
		artifact: {}
	},
	[BondingCurveTypes[1]]: {
		contractAddress: '',
		artifact: {}
	},
	[BondingCurveTypes[2]]: {
		contractAddress: '',
		aArtifact: {}
	}
}