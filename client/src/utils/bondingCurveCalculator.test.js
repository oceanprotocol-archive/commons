// TODO test
import { calculateBuyPrice, calculateSaleReturn } from './bondingcurveCalculator'
import { BigNumber as BN } from 'bignumber.js'

const buyFunctionContractResults = [{ 'startSupply': 10, 'startBalance': 1, 'mintedToken': 334, 'price': 0.1497005988023952 }, { 'startSupply': 344, 'startBalance': 51, 'mintedToken': 292, 'price': 0.17123287671232876 }, { 'startSupply': 636, 'startBalance': 101, 'mintedToken': 277, 'price': 0.18050541516245489 }, { 'startSupply': 913, 'startBalance': 151, 'mintedToken': 268, 'price': 0.1865671641791045 }, { 'startSupply': 1181, 'startBalance': 201, 'mintedToken': 261, 'price': 0.19157088122605362 }, { 'startSupply': 1442, 'startBalance': 251, 'mintedToken': 256, 'price': 0.1953125 }, { 'startSupply': 1698, 'startBalance': 301, 'mintedToken': 251, 'price': 0.199203187250996 }, { 'startSupply': 1949, 'startBalance': 351, 'mintedToken': 248, 'price': 0.20161290322580647 }, { 'startSupply': 2197, 'startBalance': 401, 'mintedToken': 245, 'price': 0.20408163265306123 }, { 'startSupply': 2442, 'startBalance': 451, 'mintedToken': 242, 'price': 0.2066115702479339 }, { 'startSupply': 2684, 'startBalance': 501, 'mintedToken': 239, 'price': 0.20920502092050208 }, { 'startSupply': 2923, 'startBalance': 551, 'mintedToken': 237, 'price': 0.2109704641350211 }, { 'startSupply': 3160, 'startBalance': 601, 'mintedToken': 235, 'price': 0.2127659574468085 }, { 'startSupply': 3395, 'startBalance': 651, 'mintedToken': 233, 'price': 0.2145922746781116 }, { 'startSupply': 3628, 'startBalance': 701, 'mintedToken': 232, 'price': 0.21551724137931033 }, { 'startSupply': 3860, 'startBalance': 751, 'mintedToken': 230, 'price': 0.21739130434782608 }, { 'startSupply': 4090, 'startBalance': 801, 'mintedToken': 229, 'price': 0.21834061135371177 }, { 'startSupply': 4319, 'startBalance': 851, 'mintedToken': 227, 'price': 0.22026431718061673 }, { 'startSupply': 4546, 'startBalance': 901, 'mintedToken': 226, 'price': 0.22123893805309736 }, { 'startSupply': 4772, 'startBalance': 951, 'mintedToken': 225, 'price': 0.2222222222222222 }, { 'startSupply': 4997, 'startBalance': 1001, 'mintedToken': 224, 'price': 0.22321428571428573 }, { 'startSupply': 5221, 'startBalance': 1051, 'mintedToken': 223, 'price': 0.2242152466367713 }, { 'startSupply': 5444, 'startBalance': 1101, 'mintedToken': 222, 'price': 0.22522522522522523 }, { 'startSupply': 5666, 'startBalance': 1151, 'mintedToken': 221, 'price': 0.22624434389140272 }, { 'startSupply': 5887, 'startBalance': 1201, 'mintedToken': 220, 'price': 0.22727272727272727 }, { 'startSupply': 6107, 'startBalance': 1251, 'mintedToken': 219, 'price': 0.228310502283105 }, { 'startSupply': 6326, 'startBalance': 1301, 'mintedToken': 218, 'price': 0.2293577981651376 }, { 'startSupply': 6544, 'startBalance': 1351, 'mintedToken': 217, 'price': 0.2304147465437788 }, { 'startSupply': 6761, 'startBalance': 1401, 'mintedToken': 216, 'price': 0.23148148148148148 }, { 'startSupply': 6977, 'startBalance': 1451, 'mintedToken': 216, 'price': 0.23148148148148148 }, { 'startSupply': 7193, 'startBalance': 1501, 'mintedToken': 215, 'price': 0.23255813953488372 }, { 'startSupply': 7408, 'startBalance': 1551, 'mintedToken': 214, 'price': 0.23364485981308408 }, { 'startSupply': 7622, 'startBalance': 1601, 'mintedToken': 213, 'price': 0.2347417840375587 }, { 'startSupply': 7835, 'startBalance': 1651, 'mintedToken': 213, 'price': 0.2347417840375587 }, { 'startSupply': 8048, 'startBalance': 1701, 'mintedToken': 212, 'price': 0.23584905660377356 }, { 'startSupply': 8260, 'startBalance': 1751, 'mintedToken': 211, 'price': 0.23696682464454977 }, { 'startSupply': 8471, 'startBalance': 1801, 'mintedToken': 211, 'price': 0.23696682464454977 }, { 'startSupply': 8682, 'startBalance': 1851, 'mintedToken': 210, 'price': 0.23809523809523808 }, { 'startSupply': 8892, 'startBalance': 1901, 'mintedToken': 210, 'price': 0.23809523809523808 }, { 'startSupply': 9102, 'startBalance': 1951, 'mintedToken': 209, 'price': 0.23923444976076555 }, { 'startSupply': 9311, 'startBalance': 2001, 'mintedToken': 209, 'price': 0.23923444976076555 }, { 'startSupply': 9520, 'startBalance': 2051, 'mintedToken': 208, 'price': 0.2403846153846154 }, { 'startSupply': 9728, 'startBalance': 2101, 'mintedToken': 208, 'price': 0.2403846153846154 }, { 'startSupply': 9936, 'startBalance': 2151, 'mintedToken': 207, 'price': 0.24154589371980675 }]

it('handles calculateSaleReturn correctly', () => {
    let totalSupply = BN(9936)
    let poolBalance = BN(2151)
    const amount = BN(50)
    const reserveRatio = BN(0.9)

    for (let i = 0; i < 44; i++) {
        // eslint-disable-next-line
        console.log({
            totalSupply: totalSupply.toNumber(),
            poolBalance: poolBalance.toNumber()
        })

        const [tokens, price] = calculateSaleReturn({
            totalSupply,
            amount,
            poolBalance,
            reserveRatio
        })

        totalSupply = totalSupply.minus(tokens)
        poolBalance = poolBalance.minus(amount)

        // eslint-disable-next-line
        console.log(`for ${amount} drops, we get ${tokens.toPrecision(4)} OCN at a price of ${price.toPrecision(4)}`)

        // TODO - remark - Not sure how to test this
    }
})

it('handles calculateBuyPrice correctly', () => {
    let totalSupply = BN(10)
    let poolBalance = BN(1)
    const amount = BN(50)
    const reserveRatio = BN(0.9)

    for (let i = 0; i < 44; i++) {
        const contractResult = buyFunctionContractResults[i]

        expect(contractResult.startSupply).toBe(totalSupply.toNumber())
        expect(contractResult.startBalance).toBe(poolBalance.toNumber())

        const [tokens, price] = calculateBuyPrice({
            totalSupply,
            amount,
            poolBalance,
            reserveRatio
        })

        totalSupply = totalSupply.plus(tokens)
        poolBalance = poolBalance.plus(amount)

        expect(contractResult.mintedToken).toBe(tokens)
        expect(+BN(contractResult.price).toPrecision(4)).toBe(+price.toPrecision(4))
    }
})
