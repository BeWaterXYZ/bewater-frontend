import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import mime from 'mime';
import path from 'path';
import { NFTStorage, File } from 'nft.storage';
const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY!;

function parse(
  req: NextApiRequest,
  opts?: Parameters<typeof formidable>[0],
): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
  return new Promise((resolve, reject) => {
    const form = formidable(opts);

    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err);
      }
      return resolve({ fields, files });
    });
  });
}

async function uploadToNFTStorage(ffile: formidable.File) {
  const content = await fs.promises.readFile(ffile.filepath);
  const type = mime.getType(ffile.filepath);
  const filename = ''; //path.basename(ffile.filepath);
  const image = new File([content], filename, {
    type: type!,
  });
  console.log({ filename });
  const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });
  return nftstorage.storeBlob(image);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') return res.status(404).end();

  try {
    const { files } = await parse(req, { keepExtensions: true });
    const rest = await uploadToNFTStorage(files.avatar as formidable.File);
    res.status(200).json({ cid: rest });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
