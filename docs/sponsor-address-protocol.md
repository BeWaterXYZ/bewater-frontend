# BeWater Sponsor Address Protocol

## Overview

The BeWater Sponsor Address Protocol is a standardized format for developers and organizations to specify their sponsor receiving addresses. For individual developers, addresses are specified in their GitHub bio. For organizations, addresses are specified in the organization's profile repository README.md file.

## Format

The protocol uses a simple, human-readable format:

### For Individual Developers
Add to GitHub bio:
```
bewater:sponsor:chain1:address1|chain2:address2|...
```

### For Organizations
Add to organization's profile repository README.md file:
```
bewater:sponsor:chain1:address1|chain2:address2|...
```

### Components

- `bewater`: Protocol identifier
- `sponsor`: Type of address (currently only supports sponsor)
- `chain1:address1`: First chain and its address
- `|`: Separator between different chain addresses
- `chain2:address2`: Additional chain and its address

## Examples

### Individual Developer Bio
```
Blockchain Developer | bewater:sponsor:ethereum:0x1234567890abcdef1234567890abcdef12345678
```
or
```
Blockchain Developer | bewater:sponsor:eth:0x1234567890abcdef1234567890abcdef12345678
```

### Organization README.md
```markdown
# Organization Name

Welcome to our organization!

## Sponsor Addresses
bewater:sponsor:ethereum:0x1234567890abcdef1234567890abcdef12345678|polygon:0xabcdef1234567890abcdef1234567890abcdef12
```
or
```markdown
# Organization Name

Welcome to our organization!

## Sponsor Addresses
bewater:sponsor:eth:0x1234567890abcdef1234567890abcdef12345678|matic:0xabcdef1234567890abcdef1234567890abcdef12
```

### Multiple Chains
```
bewater:sponsor:ethereum:0x1234567890abcdef1234567890abcdef12345678|polygon:0xabcdef1234567890abcdef1234567890abcdef12|arbitrum:0x7890abcdef1234567890abcdef1234567890abcdef
```

## Supported Chains

Currently supported:
- Ethereum (ethereum/eth)

Coming soon:
- Bitcoin (bitcoin/btc)
- Polygon (polygon/matic)
- Arbitrum (arbitrum/arb)
- Optimism (optimism/op)
- Base (base/base)

### Chain Name Format
Each chain can be specified using either its full name or its short name:

| Chain | Full Name | Short Name |
|-------|-----------|------------|
| Ethereum | ethereum | eth |
| Bitcoin | bitcoin | btc |
| Polygon | polygon | matic |
| Arbitrum | arbitrum | arb |
| Optimism | optimism | op |
| Base | base | base |

Note: While the protocol format supports multiple chains, currently only Ethereum addresses are being processed. Support for additional chains will be added in future updates.

## Implementation

The protocol is implemented in the BeWater frontend to:
1. Parse GitHub bio for individual developers' sponsor addresses
2. Parse organization's README.md file for organization sponsor addresses
3. Display multiple chain addresses in the sponsor application page
4. Enable sponsor application when valid addresses are found

## Best Practices

1. Keep the format clean and readable
2. Use the full address format (don't truncate)
3. For individual developers: place the protocol string anywhere in your bio
4. For organizations: place the protocol string in the README.md file of the organization's profile repository
5. Verify addresses before adding them
6. Update addresses if they change

## Technical Details

### Regular Expression
```javascript
/bewater:sponsor:([^|]+(?:\|[^|]+)*)/
```

### Data Structure
```typescript
interface ChainAddress {
  chain: string;
  address: string;
}

interface SponsorAddress {
  type: string;
  addresses: ChainAddress[];
}
```

## Future Considerations

1. Support for additional address types
2. Chain ID specification
3. Network specification (mainnet/testnet)
4. Address verification
5. Multiple address types per chain

## Contributing

If you'd like to contribute to the protocol or suggest improvements, please:
1. Open an issue in the BeWater repository
2. Describe your proposed changes
3. Provide examples of the new format
4. Explain the benefits of the changes 