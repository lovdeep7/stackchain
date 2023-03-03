<!-- vscode-markdown-toc -->
* 1. [Important commands](#Importantcommands)
	* 1.1. [Initialize](#Initialize)
	* 1.2. [Create wallet](#Createwallet)
	* 1.3. [Create a contribution](#Createacontribution)
	* 1.4. [Creating a review](#Creatingareview)
	* 1.5. [Making a transaction (stack coin transfer)](#Makingatransactionstackcointransfer)
	* 1.6. [Mining a block](#Miningablock)

<!-- vscode-markdown-toc-config
	numbering=true
	autoSave=true
	/vscode-markdown-toc-config -->
<!-- /vscode-markdown-toc -->

# stackchain



##  1. <a name='Importantcommands'></a>Important commands

###  1.1. <a name='Initialize'></a>Initialize

To start with the project. Initialize the blockchain.
```console
node init-blockchain.js
```
Four files will be created. Those files hold all the information about our blockchain.

###  1.2. <a name='Createwallet'></a>Create wallet

```console
node generate-wallet.js <name>
```

A wallet will be created the corresponds to the entered name.

**Public and private keys can be found in *wallets.json***

###  1.3. <a name='Createacontribution'></a>Create a contribution

Note that, currently, this command receives the threshold option. It should, however, calculate the threshold based on a criteria that will be set in the future.

```console
node create-contribution <private_key> <threshold> <platform> <contribution_hash>
```

- <**private_key**>: The private key of the developer creating the contribution.
- <**threshold**>: The required number of reviewers before allowing the contribution to be added to the blockchain.
- <**platform**>: The platform used to create the contribution. This should be based on the web3.
- <**contribution_hash**>: The hash of the contribution (e.g. the radicle or the git commit hash)

For testing, you can pass anything in the **platform** and the **contribution_hash**.

###  1.4. <a name='Creatingareview'></a>Creating a review

```console
node create-review.js <private_key> <contribution_uuid> <review>
```

- <**private_key**>: The private key of the developer reviewing the contribution.
- <**contribution_uuid**>: The uuid of the contribution. This can be found in the *contributions.json* file.
- <**review**>: The review. You can enter 1 or 0, which mean yes or no, respectively.

After the number of reviews reach the threshold, transactions are issued, according to the criteria, and added to the *transactions.json* file. The threshold is then set to -1 in case of the acceptance. The contribution in removed from the *contribution.json* file in case of the rejection.

###  1.5. <a name='Makingatransactionstackcointransfer'></a>Making a transaction (experience transfer)

A user can make a transaction (transfer xp to another user) using the following command.

```console
node create-transaction.js <private_key> <to_address> <amount>
```

- <**private_key**>: The private key of the user transferring xp.
- <**to_address**>: The public key of the user receiving the xp.
- <**amount**>: The amount of xp required to get transferred.


###  1.6. <a name='Miningablock'></a>Mining a block

This command can be used to mine the currently existing contribtions and transactions:

```console
node mine-block.js
```

