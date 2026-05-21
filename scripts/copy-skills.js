const fs = require('fs');
const path = require('path');
const config = require('../config.json');

const docsRoot = path.join(__dirname, '..');
const pluginSkills = path.join(config.marketplacePath, 'plugins/mobiscroll/skills');

const copies = [
    ['mobiscroll-ui',            'static/mobiscroll-ui/SKILL.md'],
    ['mobiscroll-ui-theming',    'static/mobiscroll-ui-theming/SKILL.md'],
    ['mobiscroll-ui-react',      'static/docs/react/SKILL.md'],
    ['mobiscroll-ui-angular',    'static/docs/angular/SKILL.md'],
    ['mobiscroll-ui-vue',        'static/docs/vue/SKILL.md'],
    ['mobiscroll-ui-javascript', 'static/docs/javascript/SKILL.md'],
    ['mobiscroll-ui-jquery',     'static/docs/jquery/SKILL.md'],
];

for (const [skillDir, dest] of copies) {
    const src = path.join(pluginSkills, skillDir, 'SKILL.md');
    const out = path.join(docsRoot, dest);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.copyFileSync(src, out);
    console.log(`Copied ${skillDir}/SKILL.md → ${dest}`);
}
