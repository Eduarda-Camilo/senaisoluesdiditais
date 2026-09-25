const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

const root = path.resolve(__dirname, '..');
function load(name, globals = {}) {
  const source = fs.readFileSync(path.join(root, 'src/components/cases', name), 'utf8');
  const compiled = ts.transpileModule(source, {compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
  const context = {exports:{}, ...globals};
  vm.runInNewContext(compiled, context);
  return context.exports;
}
const {cardLayers} = load('card-layers.ts');
const motion = load('card-motion.ts', {getComputedStyle:element => element.style});
assert.equal(Object.keys(cardLayers).length, 20);
assert.equal(Object.values(cardLayers).flat().length, 49);
for (const [slug, layers] of Object.entries(cardLayers)) {
  const elements = layers.map((layer, index) => {
    const png = fs.readFileSync(path.join(root, 'public/cases/animated', layer.src));
    assert.equal(png.toString('hex', 0, 8), '89504e470d0a1a0a');
    for (const field of ['x', 'y', 'width', 'height']) assert(Number.isFinite(layer[field]));
    if (slug !== 'nr-10') {
      assert(Math.abs(png.readUInt32BE(16) - layer.width) < 1.1, layer.src);
      assert(Math.abs(png.readUInt32BE(20) - layer.height) < 1.1, layer.src);
    }
    const entry = motion.entryTransform(layer, index, slug);
    if (slug === 'ava-senai') {
      const [, x, y] = entry.match(/translate\(([-.\d]+)px, ([-.\d]+)px\)/);
      assert(+x > 0 && +y + layer.y >= 300);
      assert(Math.abs(+x / +y - 1 / Math.sqrt(3)) < 1e-8);
    }
    if (slug === 'espaco-do-estudante' && index === 0) assert.equal(entry, 'translate(330px, 0px) rotate(0deg) scale(1)');
    return {style:{transform:entry, opacity:'0'}, getAnimations:() => [], animate(frames, timing) {this.frames = frames; this.timing = timing;}};
  });
  const element = {querySelectorAll:() => elements};
  motion.animateLayers(element, layers, slug, true, false);
  elements.forEach((layer, index) => {
    assert.equal(layer.frames.at(-1).transform, motion.finalTransform);
    assert.equal(layer.timing.delay, (layers[index].order ?? index) * 70);
    const directional = ['ava-senai', 'espaco-do-estudante'].includes(slug);
    assert.equal(layer.frames.length, directional ? 2 : 3);
  });
  motion.animateLayers(element, layers, slug, false, false);
  elements.forEach((layer, index) => assert.equal(layer.frames.at(-1).transform, motion.entryTransform(layers[index], index, slug)));
  elements.forEach(layer => {layer.animate = () => assert.fail('Reduced motion must not animate');});
  motion.animateLayers(element, layers, slug, true, true);
  elements.forEach(layer => assert.equal(layer.style.transform, motion.finalTransform));
}
console.log('PASS: 20 cases, 49 layers, PNG dimensions, entrance order, AVA/EE motion, final positions, exit and reduced motion.');
