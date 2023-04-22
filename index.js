import '@logseq/libs';

const main = async () => {
  console.log('Template Button plugin loaded');

  // Register button renderer
  logseq.Editor.registerSlashCommand('Insert Template Button', async () => {
    await logseq.Editor.insertAtEditingCursor(`{{renderer :template_button}}`);
    console.log('Button renderer registered.');
  });

  logseq.App.onMacroRendererSlotted(({ slot, payload: { arguments } }) => {
    let [template] = arguments;
    logseq.provideUI({
      key: 'template-button',
      slot,
      template: `
      <a>Create Page from Template</a>
     `,
    });
  });
};

logseq.ready(main).catch(console.error);
