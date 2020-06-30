import sdk from './sdk.js';
import t from './types.js';
import SigningFunction from './signing-function.js';

const flowHost = 'https://local.exokit.org:8080';

const makeCredentials = (address, privateKey) => ({
  address,
  signingFunction: SigningFunction.signingFunction(privateKey),
});
const executeTransaction = async (creds, code) => {
  const {address, signingFunction} = creds;
  const acctResponse = await sdk.send(await sdk.pipe(await sdk.build([
    sdk.getAccount(address),
  ]), [
    sdk.resolve([
      sdk.resolveParams,
    ]),
  ]), { node: flowHost });
  const seqNum = acctResponse.account.keys[0].sequenceNumber;

  const response = await sdk.send(await sdk.pipe(await sdk.build([
    sdk.authorizations([sdk.authorization(address, signingFunction, 0)]),
    sdk.payer(sdk.authorization(address, signingFunction, 0)),
    sdk.proposer(sdk.authorization(address, signingFunction, 0, seqNum)),
    sdk.limit(100),
    sdk.transaction(code),
  ]), [
    sdk.resolve([
      sdk.resolveParams,
      sdk.resolveAccounts,
      sdk.resolveSignatures,
    ]),
  ]), { node: flowHost });
  const response2 = await sdk.send(await sdk.pipe(await sdk.build([
    sdk.getTransactionStatus(response.transactionId),
  ]), [
    sdk.resolve([
      sdk.resolveParams,
    ]),
  ]), { node: flowHost });
  return response2;
};
const executeScript = async code => {
  const response = await sdk.send(await sdk.pipe(await sdk.build([
    sdk.script(code),
  ]), [
    sdk.resolve([
      sdk.resolveParams,
      sdk.resolveAccounts,
      sdk.resolveSignatures,
    ]),
  ]), { node: flowHost });
  return response;
};

export {
  makeCredentials,
  executeTransaction,
  executeScript,
};