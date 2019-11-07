import { BigNumber as BN } from 'bignumber.js'

export const calculateSaleReturn = ({ totalSupply, poolBalance, reserveRatio, amount }) => {
    if (!totalSupply || !poolBalance || !reserveRatio || !amount) return [0, 0]
    if (totalSupply.toNumber() === 0 || reserveRatio.toNumber() === 0 || poolBalance.toNumber() === 0 || amount.toNumber() === 0) return [0, 0]
    if (amount.isEqualTo(totalSupply) || reserveRatio.toNumber() === 1) return [poolBalance, BN(poolBalance).div(amount)]

    // (1 - _sellAmount / _supply)
    const part1 = BN(1).minus(amount.div(totalSupply))

    // (1 - (1 - _sellAmount / _supply) ^ (1 / (_connectorWeight / 1000000)))
    const part2 = BN(BN(1).minus(part1) ** (BN(1).div(reserveRatio)))

    const tokens = BN(poolBalance).times(part2)

    const price = BN(tokens).div(amount)

    return [tokens, price]
}

export const calculateBuyPrice = ({ totalSupply, poolBalance, reserveRatio, amount }) => {
    if (!totalSupply || !poolBalance || !reserveRatio || !amount) return '0'
    // special case if the weight = 100%
    if (reserveRatio.toNumber() === 1) {
        return totalSupply.times(amount.div(poolBalance))
    }

    // (1 + _depositAmount / _connectorBalance)
    const part1 = BN(poolBalance).plus(BN(amount)).div(BN(poolBalance))

    // Return = _supply * ((1 + _depositAmount / _connectorBalance) ^ (_connectorWeight / 1000000) - 1)
    const tokens = Math.floor(BN(totalSupply).times(BN(part1 ** reserveRatio).minus(BN(1))))

    const price = amount.div(BN(tokens))

    return [tokens, price]
}
