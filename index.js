import '@logseq/libs';

//Insert a button to the block
async function insertButton(e) {
  const currentBlock = logseq.Editor.getBlock(e.uuid);
  const blockWithButton = currentBlock + ' [Button here] ';
  logseq.Editor.updateBlock(e.uuid, blockWithButton);
}

const main = async () => {
  console.log('Template Button plugin loaded');
  logseq.Editor.registerSlashCommand('insertButton', async (e) => {
    insertButton(e);
  });
};

logseq.ready(main).catch(console.error);
