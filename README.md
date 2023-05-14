# Web3CH-Web-App

This PoC is a power delegation solution for DAOs built using the ERC-6551 standard. With this app, a DAO can delegate powers to it’s members with a tokenized Proxy. The solution also provides the possibility to allocate funds along with an issued NFT Proxy, as well as to revoke Proxy, enhancing the flexibility of fund management within a DAO.

The solution is based on Tokenbound contracts (see [https://tokenbound.org/](https://tokenbound.org/)). This allowed create a separate from Delegator’s and Trustee’s accounts onchain history for a Proxy with the possibillity of targeted funds allocation.

### Contracts

The contract part required to take and modify smart contracts from **ERC-6551** and then deploy them to **Mantle Testnet**. Additionally, the Account Proxy was added. The modifications were required for revocation feature:

1. Added revocaton function ```revokeExecutorAccess```  to default Account implementation.
2. Changed ```setExecutor``` function modifier external to public to use it internally.

The deployes contracts:

1. **Default Account Implementation** - 0xd40F171458755FC295fc1Df98CfD8D783858690f
2. **AccountProxy** - 0xC9d87e245c96aC46E72D10A2E197007b9Db6c68D
3. **AccountRegistry** - 0xFeDE1f80D8158170593E137beC447e749F2602e2

The ERC-6551 Token Bound accounts allowed to build the showcase without implementation of wrapping contracts or modifications to the ERC-721 NFT standard.

### The app

The frontend part is built with NextJS, wagmi (React Hooks for Ethereum) and web3.js.

```
# Clone the repo
$ git clone https://github.com/alexthelaw/Web3CH-Web-App.git
$ cd Web3CH-Web-App/

# Setup .env
$ cp .env_example .env
# Edit .env (add contracts)

# Launch the app
$ sudo docker-compose up --build -d
```