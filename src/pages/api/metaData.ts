import {MetaData} from '../../utils/misc';
import {NextApiRequest, NextApiResponse} from 'next';

type Response = MetaData & {tokenId: bigint | string, collectionAddress: string};

const metaDataStore: Array<Response> = [];

export default function handler(req: NextApiRequest,
  res: NextApiResponse<MetaData | Array<Response>>) {
  const {method} = req;

  switch (method) {
    case 'GET':
      if (req.query?.collectionAddress && req.query?.tokenId) {
        const item = metaDataStore.find(el => el.collectionAddress === req.query.collectionAddress && el.tokenId === BigInt(Number(req.query.tokenId)));
        if (item) {
          item.tokenId = item.tokenId.toString();
          res.status(200).json(item);
          break;
        } else {
          res.status(405).end('Not found');
          break;
        }
      }
      res.status(200).json(metaDataStore.map(el => ({...el, tokenId: el.tokenId.toString()})));
      break;
    case 'POST':
      try {
        metaDataStore.push({...JSON.parse(req.body), tokenId: BigInt(Number(JSON.parse(req.body).tokenId))} as Response);
        res.status(200).send({...JSON.parse(req.body), tokenId: String(JSON.parse(req.body).tokenId)} as Response);
        break;
      } catch (e) {
        res.status(500).json(e as any);
        break;
      }
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
