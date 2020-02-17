import React from 'react'
import LinkAccount from '../LinkAccount'


export default ({ currency, contractAddress, address }) => {
  const endOfAddress = address.substring(address.length - 4, address.length)
  const startOfAddress = address.substring(0, 2)
  /* eslint-disable */
  return (
    <div>
      <LinkAccount
        type={currency}
        contractAddress={contractAddress}
        address={address}
      >
        <p>
          {startOfAddress}
          &#183;
          &#183;
          &#183;
          {endOfAddress}
        </p>
      </LinkAccount>
    </div>
  )
  /* eslint-enable */
}
