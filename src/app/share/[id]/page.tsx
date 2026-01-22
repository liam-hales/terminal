'use client';

import { FunctionComponent, ReactElement, useEffect, useState } from 'react';
import { fetchShareItem } from '../../../database';
import { useParams } from 'next/navigation';
import { decryptData } from '../../../helpers';
import { Loader } from '../../../components/common';
import { TerminalBlock } from '../../../components';
import { TerminalBlock as Block } from '../../../types';

/**
 * The share page component, used to fetch and
 * decrypt the share item and render its data
 *
 * @returns The `SharePage` component
 */
const SharePage: FunctionComponent = (): ReactElement => {
  const { id } = useParams<{ readonly id: string; }>();
  const [blocks, setBlocks] = useState<Block[] | undefined>();

  /**
   * Used to fetch the share item and decrypt
   * its data using the key fragment
   */
  useEffect(() => {
    const { hash } = window.location;

    // Build the hash params and
    // extract the encryption key
    const fragments = new URLSearchParams(hash.slice(1));
    const key = fragments.get('key');

    // If the encryption key has not been set
    // in the URL then throw an error
    if (key == null) {
      throw new Error('No encryption key found in URL');
    }

    void (async () => {
      const shareItem = await fetchShareItem(id);

      // If the share item cound not be
      // found then throw an error
      if (shareItem == null) {
        throw new Error(`No sare item was found for ID "${id}"`);
      }

      const { iv, ciphertext } = shareItem;

      // Decrypt the data and parse it
      // back into terminal blocks
      const decrypted = await decryptData(iv, ciphertext, key);
      const blocks = JSON.parse(decrypted) as Block[];

      setBlocks(blocks);
    })();
  }, [id]);

  return (
    <div className="w-full flex flex-col items-start gap-y-10 pt-6 pl-6 pr-6 overflow-y-auto no-scrollbar touch-pan-y">
      {
        (blocks == null)
          ? (
              <div className="flex flex-row items-center gap-x-4">
                <Loader />
                <p className="text-xs">
                  Loading...
                </p>
              </div>
            )
          : blocks.map((block) => {
              const { id, type } = block;

              return (
                <TerminalBlock
                  key={`terminal-${type}-block-${id}`}
                  {...block}
                />
              );
            })
      }
    </div>
  );
};

export default SharePage;
