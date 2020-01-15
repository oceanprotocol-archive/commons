import Web3 from 'web3';
import { BigNumber as BN } from 'bignumber.js'

export const calculateSaleReturn = ({ totalSupply, poolBalance, reserveRatio, amount }) => {
    if (!totalSupply || !poolBalance || !reserveRatio || !amount) return [0, 0]
    if (totalSupply.toNumber() === 0 || reserveRatio.toNumber() === 0 || poolBalance.toNumber() === 0 || amount.toNumber() === 0) return [0, 0]
    if (amount.isEqualTo(totalSupply) || reserveRatio.toNumber() === 1) return [poolBalance, BN(poolBalance).div(amount)]

    // (1 - _sellAmount / _supply) 
    // const part1 = BN(1).minus(amount.div(totalSupply))
    // (1 - _sellAmount / _supply) ^ (1 / (_connectorWeight / 1000000)))
    const part1 = new BN(new BN(1).minus(amount.div(totalSupply)) ** (new BN(1).div(reserveRatio)))

    // (1 - (1 - _sellAmount / _supply) ^ (1 / (_connectorWeight / 1000000)))
    // const part2 = BN(BN(1).minus(part1) ** (BN(1).div(reserveRatio)))
    const part2 = new BN(1).minus(part1)

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
    // const part1 = BN(poolBalance).plus(BN(amount)).div(BN(poolBalance))
    const part1 = new BN(1).plus(new BN(amount).div(new BN(poolBalance)))

    // Return = _supply * ((1 + _depositAmount / _connectorBalance) ^ (_connectorWeight / 1000000) - 1)
    const tokens = Math.floor(new BN(totalSupply).times(new BN(part1 ** reserveRatio).minus(new BN(1))))
    // const tokens = Math.floor((new BN(totalSupply).times(new BN(part1 ** reserveRatio).minus(new BN(1)))).toNumber())
    
    const price = amount.div(new BN(tokens))

    return [tokens, price]
}

export const calculateSigmoidBuyPrice = ({ curveHeight, inflectionSupply, steepness, totalSupply, amount }) => {

    // g'
    // a * SQRT((x - b)^2 + c)
    const part1 = curveHeight.times(totalSupply.minus(inflectionSupply).pow(new BN(2)).plus(steepness).sqrt())
    // g + a*SQRT((x - b)^2 + c) + x
    const gPrime = amount.plus(part1).plus(totalSupply)

    // Current supply C(x)
    // a * SQRT(b^2 + c)
    const part2 = curveHeight.times(inflectionSupply.pow(new BN(2)).plus(steepness).sqrt())
    // (a * SQRT((x - b)^2 + c)) - (a * SQRT(b^2 + c))
    const Cx = part1.minus(part2)

    // New Supply X_new
    // g_prime - ab
    const denPart1 = gPrime.minus(curveHeight.times(inflectionSupply))
    // 2a * (g_prime - ab)
    const den = new BN(2).times(curveHeight).times(denPart1)
    // a^2 * (b^2 + c)
    const numPart1 = curveHeight.pow(new BN(2)).times(inflectionSupply.pow(new BN(2)).plus(steepness))
    // g'^2 - (a^2 * (b^2 + c))
    const num = gPrime.pow(new BN(2)).times(numPart1)
    const newSupply = num.div(den)

    // X* = Xnew - X
    // const tokens = Math.floor(newSupply.minus(Cx).toNumber())
    const tokens = Math.floor(newSupply.minus(Cx))

    // const price = amount.div(new BN(tokens))
    const price = amount.toNumber() / tokens

    // console.log('curveHeight, inflectionSupply, steepness, totalSupply, amount', curveHeight, inflectionSupply, steepness, totalSupply, amount)
    // console.log('Values', part1, gPrime, part2, Cx, denPart1, den, numPart1, num, newSupply, newSupply.toNumber())
    console.log('RS', tokens, price, new BN(price))

    return [tokens, price]
    return [tokens, new BN(price)]

}

export const calculateSigmoidSellReturn = ({ curveHeight, inflectionSupply, steepness, totalSupply, amount }) => {

    // SQRT((x - b)^2 + c)
    const part1 = totalSupply.minus(inflectionSupply).pow(BN(2)).plus(steepness).sqrt()
    // SQRT((x - T - b)^2 + c)
    const part2 = totalSupply.minus(amount).minus(inflectionSupply).pow(new BN(2)).plus(steepness).sqrt()
    // a * ( (SQRT((x - b)^2 + c)) - (SQRT((x - T - b)^2 + c)) + T )
    const saleReturn = curveHeight.times(part1.minus(part2).plus(amount))

    const price = saleReturn.div(amount)

    return [saleReturn, price]
}
