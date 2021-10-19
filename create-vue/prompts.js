import prompts from 'prompts';
let targetDir = "";
const defaultProjectName = 'vue-create';
let result = await prompts([
    {
        name: 'projectName',
        type: targetDir ? null : 'text',
        message: 'Project name:',
        initial: defaultProjectName,
        onState: (state) => (targetDir = String(state.value).trim() || defaultProjectName)
      },
])
console.log(result)