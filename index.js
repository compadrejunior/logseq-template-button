import '@logseq/libs';

const stylesheet = `
  .templateBtn {
    border-radius: 10px;
    background: #2979FF;
    color: white;
    padding: 5px;
  }
  .templateBtn:hover {
    background: #304FFE;
    color: white;
  }
`;

const loadTemplates = async () => {
  let templates;
  try {
    templates = await logseq.DB.datascriptQuery(`
      [:find ?b (distinct ?value)
      :where
        [?b :block/properties ?prop]
        [(get ?prop :template) ?value] 
      ]`);
  } catch (e) {
    console.error(e);
  }
  return templates;
};

const main = async () => {
  // Register stylesheet
  logseq.provideStyle(stylesheet);

  console.log('Template Button plugin loaded');

  // Retrieve templates
  const templates = await loadTemplates();
  console.log(`templates: ${JSON.stringify(templates)}`);

  // Register slash command to add the renderer code
  logseq.Editor.registerSlashCommand('Insert Template Button', async () => {
    await logseq.Editor.insertAtEditingCursor(`{{renderer :template_button}}`);
    console.log('Button renderer registered.');
  });

  // Provide a model for events
  logseq.provideModel({
    templateButtonClick(e) {
      console.log('Template button clicked');
    },
  });

  // Register button renderer
  logseq.App.onMacroRendererSlotted(({ slot, payload: { arguments } }) => {
    let [type, name] = arguments;
    if (!type?.startsWith(':template_button')) return;
    console.log(`arguments: ${arguments}`);
    console.log(`name: ${name}`);

    // Insert the button
    logseq.provideUI({
      key: 'template-button',
      slot,
      template: `
      <a data-on-click="templateButtonClick" class="templateBtn">New ${
        name || 'Page'
      }</a>
     `,
    });
  });
};

logseq.ready(main).catch(console.error);
