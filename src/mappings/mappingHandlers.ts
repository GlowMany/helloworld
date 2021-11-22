import { SubstrateExtrinsic, SubstrateEvent, SubstrateBlock } from '@subql/types';
import { StarterEntity } from '../types';
import { Balance } from '@polkadot/types/interfaces';

export async function handleBlock(block: SubstrateBlock): Promise<void> {
  //Create a new starterEntity with ID using block hash
  let record = new StarterEntity(block.block.header.hash.toString());
  //Record block number
  record.blockHeight = block.block.header.number.toNumber();
  await record.save();
}

export async function handleEvent(event: SubstrateEvent): Promise<void> {
  const {
    event: {
      data: [account, balance],
    },
  } = event;
  //Retrieve the record by its ID
  const record = await StarterEntity.get(event.extrinsic.block.block.header.hash.toString());
  //Big integer type Balance of a transfer event
  await record.save();
}

export async function handleCall(extrinsic: SubstrateExtrinsic): Promise<void> {
  const record = await StarterEntity.get(extrinsic.block.block.header.hash.toString());
  //Date type timestamp
  //Boolean tyep
  await record.save();
}
