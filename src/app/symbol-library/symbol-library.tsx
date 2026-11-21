'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Check, Copy, Search, Shapes } from 'lucide-react';

interface SymbolItem {
  symbol: string;
  name: string;
  category: string;
}

function symbolsInRange(start: number, end: number, category: string, namePrefix: string): SymbolItem[] {
  const items: SymbolItem[] = [];
  for (let codePoint = start; codePoint <= end; codePoint += 1) {
    const symbol = String.fromCodePoint(codePoint);
    if (!symbol.trim()) continue;
    items.push({ symbol, name: `${namePrefix} U+${codePoint.toString(16).toUpperCase().padStart(4, '0')}`, category });
  }
  return items;
}

const COMMON_SYMBOLS: SymbolItem[] = [
  ['✦','black four pointed star','Stars & Sparkles'], ['✧','white four pointed star','Stars & Sparkles'], ['✶','six pointed black star','Stars & Sparkles'], ['✷','six pointed white star','Stars & Sparkles'], ['✸','heavy eight teardrop star','Stars & Sparkles'], ['✹','twelve pointed black star','Stars & Sparkles'], ['✺','sixteen pointed asterisk','Stars & Sparkles'], ['✻','teardrop spoked asterisk','Stars & Sparkles'], ['✼','open centre teardrop spoked star','Stars & Sparkles'], ['✽','heavy teardrop spoked asterisk','Stars & Sparkles'], ['❈','heavy sparkle','Stars & Sparkles'], ['❉','balloon spoked asterisk','Stars & Sparkles'], ['❊','eight teardrop spoked propeller asterisk','Stars & Sparkles'], ['❋','heavy eight teardrop spoked propeller asterisk','Stars & Sparkles'], ['✣','black clover star','Stars & Sparkles'], ['✤','four balloon spoked asterisk','Stars & Sparkles'], ['✥','four club spoked asterisk','Stars & Sparkles'],
  ['◇','white diamond','Shapes & Frames'], ['◆','black diamond','Shapes & Frames'], ['◈','diamond containing dot','Shapes & Frames'], ['◊','lozenge','Shapes & Frames'], ['○','white circle','Shapes & Frames'], ['◯','large circle','Shapes & Frames'], ['□','white square','Shapes & Frames'], ['■','black square','Shapes & Frames'], ['▰','black parallelogram','Shapes & Frames'], ['▱','white parallelogram','Shapes & Frames'], ['▣','white square with vertical fill','Shapes & Frames'], ['▤','square with horizontal fill','Shapes & Frames'], ['▥','square with vertical fill','Shapes & Frames'], ['▦','square with orthogonal crosshatch','Shapes & Frames'], ['▧','square with upper left to lower right fill','Shapes & Frames'], ['▨','square with upper right to lower left fill','Shapes & Frames'], ['▩','square with diagonal crosshatch','Shapes & Frames'], ['⌑','square with bottom left half','Shapes & Frames'],
  ['←','left arrow','Arrows'], ['→','right arrow','Arrows'], ['↑','up arrow','Arrows'], ['↓','down arrow','Arrows'], ['↔','left right arrow','Arrows'], ['↕','up down arrow','Arrows'], ['↖','north west arrow','Arrows'], ['↗','north east arrow','Arrows'], ['↘','south east arrow','Arrows'], ['↙','south west arrow','Arrows'], ['⇐','left double arrow','Arrows'], ['⇒','right double arrow','Arrows'], ['⇑','up double arrow','Arrows'], ['⇓','down double arrow','Arrows'], ['⇔','left right double arrow','Arrows'], ['⇕','up down double arrow','Arrows'], ['➜','heavy right arrow','Arrows'], ['➝','triangle headed right arrow','Arrows'], ['➞','heavy triangle headed right arrow','Arrows'], ['➟','drafting point right arrow','Arrows'], ['➢','three-d top lighted right arrow','Arrows'], ['➣','three-d bottom lighted right arrow','Arrows'], ['➤','black right arrowhead','Arrows'], ['➥','heavy black curved down right arrow','Arrows'],
  ['×','multiplication sign','Math & Operators'], ['÷','division sign','Math & Operators'], ['±','plus minus sign','Math & Operators'], ['∑','summation','Math & Operators'], ['∏','product','Math & Operators'], ['∫','integral','Math & Operators'], ['∞','infinity','Math & Operators'], ['≠','not equal','Math & Operators'], ['≈','almost equal','Math & Operators'], ['≤','less than or equal','Math & Operators'], ['≥','greater than or equal','Math & Operators'], ['√','square root','Math & Operators'], ['∛','cube root','Math & Operators'], ['∴','therefore','Math & Operators'], ['∵','because','Math & Operators'], ['∂','partial differential','Math & Operators'], ['∆','increment','Math & Operators'], ['∇','nabla','Math & Operators'], ['∝','proportional to','Math & Operators'], ['∠','angle','Math & Operators'], ['⊥','up tack','Math & Operators'], ['⊕','circled plus','Math & Operators'], ['⊗','circled times','Math & Operators'],
  ['•','bullet','Bullets & Dividers'], ['●','black circle','Bullets & Dividers'], ['○','white circle','Bullets & Dividers'], ['◦','white bullet','Bullets & Dividers'], ['‣','triangular bullet','Bullets & Dividers'], ['⁃','hyphen bullet','Bullets & Dividers'], ['▪','black small square','Bullets & Dividers'], ['▫','white small square','Bullets & Dividers'], ['―','horizontal bar','Bullets & Dividers'], ['—','em dash','Bullets & Dividers'], ['–','en dash','Bullets & Dividers'], ['…','horizontal ellipsis','Bullets & Dividers'], ['¦','broken bar','Bullets & Dividers'], ['※','reference mark','Bullets & Dividers'], ['⁕','flower punctuation','Bullets & Dividers'], ['⁘','four dots','Bullets & Dividers'], ['⁙','five dots','Bullets & Dividers'],
  ['♪','eighth note','Music & Time'], ['♫','beamed eighth notes','Music & Time'], ['♩','quarter note','Music & Time'], ['♬','beamed sixteenth notes','Music & Time'], ['♭','music flat sign','Music & Time'], ['♮','music natural sign','Music & Time'], ['♯','music sharp sign','Music & Time'], ['⏳','hourglass','Music & Time'], ['⌚','watch','Music & Time'], ['⌛','hourglass','Music & Time'], ['◷','circle with upper right quadrant','Music & Time'],
  ['☀','sun','Nature & Weather'], ['☁','cloud','Nature & Weather'], ['☂','umbrella','Nature & Weather'], ['☃','snowman','Nature & Weather'], ['☄','comet','Nature & Weather'], ['★','black star','Nature & Weather'], ['☆','white star','Nature & Weather'], ['☽','first quarter moon','Nature & Weather'], ['☾','last quarter moon','Nature & Weather'], ['♨','hot springs','Nature & Weather'], ['☘','shamrock','Nature & Weather'], ['☢','radioactive','Nature & Weather'], ['☣','biohazard','Nature & Weather'], ['⚡','high voltage','Nature & Weather'],
  ['⚔','crossed swords','Objects & Signs'], ['⚓','anchor','Objects & Signs'], ['⚠','warning sign','Objects & Signs'], ['⚙','gear','Objects & Signs'], ['⚑','black flag','Objects & Signs'], ['⚐','white flag','Objects & Signs'], ['⚒','hammer and pick','Objects & Signs'], ['⚔','crossed swords','Objects & Signs'], ['⚖','balance scale','Objects & Signs'], ['⚗','alembic','Objects & Signs'], ['⚜','fleur de lis','Objects & Signs'], ['⌘','place of interest sign','Objects & Signs'], ['⎋','broken circle with northwest arrow','Objects & Signs'], ['⏎','return symbol','Objects & Signs'],
  ['™','trademark','Punctuation & Marks'], ['©','copyright','Punctuation & Marks'], ['®','registered','Punctuation & Marks'], ['§','section','Punctuation & Marks'], ['¶','pilcrow','Punctuation & Marks'], ['†','dagger','Punctuation & Marks'], ['‡','double dagger','Punctuation & Marks'], ['№','numero','Punctuation & Marks'], ['℗','sound recording copyright','Punctuation & Marks'], ['℠','service mark','Punctuation & Marks'], ['º','masculine ordinal','Punctuation & Marks'], ['ª','feminine ordinal','Punctuation & Marks'], ['•','bullet','Punctuation & Marks'],
].map(([symbol, name, category]) => ({ symbol, name, category }));

const RANGED_SYMBOLS: SymbolItem[] = [
  ...symbolsInRange(0x2190, 0x21FF, 'Arrows', 'Arrow'),
  ...symbolsInRange(0x25A0, 0x25FF, 'Shapes & Frames', 'Geometric shape'),
  ...symbolsInRange(0x2600, 0x26FF, 'Objects & Signs', 'Miscellaneous symbol'),
  ...symbolsInRange(0x2700, 0x27BF, 'Dingbats', 'Dingbat'),
  ...symbolsInRange(0x2200, 0x22FF, 'Math & Operators', 'Math symbol'),
  ...symbolsInRange(0x2000, 0x206F, 'Punctuation & Marks', 'General punctuation'),
  ...symbolsInRange(0x2100, 0x214F, 'Letterlike Symbols', 'Letterlike symbol'),
  ...symbolsInRange(0x20A0, 0x20BF, 'Currency', 'Currency symbol'),
  ...symbolsInRange(0x2300, 0x23FF, 'Technical', 'Technical symbol'),
];

const SYMBOLS = Array.from(new Map([...COMMON_SYMBOLS, ...RANGED_SYMBOLS].map((item) => [item.symbol, item])).values());

export default function SymbolLibrary() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [copied, setCopied] = useState<string | null>(null);

  const categories = useMemo(() => ['All', ...Array.from(new Set(SYMBOLS.map((item) => item.category)))], []);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return SYMBOLS.filter((item) => {
      const matchesCategory = category === 'All' || item.category === category;
      const matchesSearch = !query || item.symbol.includes(search.trim()) || item.name.toLowerCase().includes(query) || item.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }
  };

  const handleCopy = async (symbol: string) => {
    await copyText(symbol);
    setCopied(symbol);
    window.setTimeout(() => setCopied((current) => current === symbol ? null : current), 1400);
  };

  const copyVisible = async () => {
    await copyText(filtered.map((item) => item.symbol).join(' '));
    setCopied('__visible__');
    window.setTimeout(() => setCopied((current) => current === '__visible__' ? null : current), 1400);
  };

  return (
    <main className="tool-page symbol-library-page">
      <header className="tool-page-heading">
        <h1>Discord Symbol Library</h1>
        <p>Browse and find uncommon symbols for Discord then click to copy.</p>
      </header>

      <aside className="symbol-channel-note" aria-label="Channel symbol tip">
        <Shapes size={17} aria-hidden="true" />
        <p><strong>Looking for symbols for channels?</strong> Use the <Link href="/channel-beautifier">Channel Beautifier</Link> for channel names and decorations.</p>
      </aside>

      <section className="symbol-toolbar" aria-label="Symbol library controls">
        <label className="symbol-search">
          <Search size={16} aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search symbols or categories"
            aria-label="Search symbols"
          />
        </label>
        <label className="symbol-category">
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <button className="symbol-copy-visible" type="button" onClick={copyVisible} disabled={filtered.length === 0}>
          {copied === '__visible__' ? <Check size={15} /> : <Copy size={15} />}
          {copied === '__visible__' ? 'Copied' : 'Copy All Results'}
        </button>
      </section>

      <div className="symbol-results-heading">
        <p aria-live="polite">{filtered.length} symbols</p>
      </div>

      {filtered.length > 0 ? (
        <section className="symbol-grid" aria-label="Symbols">
          {filtered.map((item) => (
            <button
              className="symbol-cell"
              type="button"
              key={`${item.symbol}-${item.name}`}
              onClick={() => handleCopy(item.symbol)}
              title={`${item.name} - click to copy`}
              aria-label={`Copy ${item.name}: ${item.symbol}`}
            >
              <span className="symbol-glyph" aria-hidden="true">{item.symbol}</span>
              {copied === item.symbol && <span className="symbol-copied"><Check size={13} /> Copied</span>}
            </button>
          ))}
        </section>
      ) : (
        <div className="symbol-empty">No symbols match your search.</div>
      )}
    </main>
  );
}
