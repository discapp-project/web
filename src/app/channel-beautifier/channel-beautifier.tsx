'use client';

import { useMemo, useState } from 'react';
import { Check, Copy, Search } from 'lucide-react';

interface BeautifierItem {
  text: string;
  name: string;
  category: 'Separators' | 'Brackets' | 'Stars & sparkles' | 'Arrows' | 'Hearts & flowers' | 'Shapes';
}

const SYMBOLS: BeautifierItem[] = [
  { text: '─', name: 'Light horizontal line', category: 'Separators' },
  { text: '━', name: 'Heavy horizontal line', category: 'Separators' },
  { text: '═', name: 'Double horizontal line', category: 'Separators' },
  { text: '│', name: 'Light vertical line', category: 'Separators' },
  { text: '┃', name: 'Heavy vertical line', category: 'Separators' },
  { text: '║', name: 'Double vertical line', category: 'Separators' },
  { text: '┆', name: 'Light spaced vertical line', category: 'Separators' },
  { text: '┇', name: 'Light double vertical line', category: 'Separators' },
  { text: '┊', name: 'Heavy spaced vertical line', category: 'Separators' },
  { text: '┋', name: 'Heavy double vertical line', category: 'Separators' },
  { text: '╎', name: 'Light dashed vertical line', category: 'Separators' },
  { text: '╏', name: 'Heavy dashed vertical line', category: 'Separators' },
  { text: '┄', name: 'Light triple dash', category: 'Separators' },
  { text: '┅', name: 'Heavy triple dash', category: 'Separators' },
  { text: '┆', name: 'Light four dash', category: 'Separators' },
  { text: '┇', name: 'Heavy four dash', category: 'Separators' },
  { text: '┈', name: 'Light dashed line', category: 'Separators' },
  { text: '┉', name: 'Heavy dashed line', category: 'Separators' },
  { text: '┊', name: 'Light spaced dashed line', category: 'Separators' },
  { text: '┋', name: 'Heavy spaced dashed line', category: 'Separators' },
  { text: '╌', name: 'Light double dash', category: 'Separators' },
  { text: '╍', name: 'Heavy double dash', category: 'Separators' },
  { text: '╴', name: 'Left half line', category: 'Separators' },
  { text: '╵', name: 'Up half line', category: 'Separators' },
  { text: '╶', name: 'Right half line', category: 'Separators' },
  { text: '╷', name: 'Down half line', category: 'Separators' },
  { text: '╾', name: 'Dashed left arrow line', category: 'Separators' },
  { text: '╼', name: 'Dashed right arrow line', category: 'Separators' },
  { text: '▬', name: 'Black rectangle', category: 'Separators' },
  { text: '▰', name: 'Black parallelogram', category: 'Shapes' },
  { text: '【', name: 'Left square bracket', category: 'Brackets' },
  { text: '】', name: 'Right square bracket', category: 'Brackets' },
  { text: '『', name: 'Left double bracket', category: 'Brackets' },
  { text: '』', name: 'Right double bracket', category: 'Brackets' },
  { text: '「', name: 'Left corner bracket', category: 'Brackets' },
  { text: '」', name: 'Right corner bracket', category: 'Brackets' },
  { text: '〈', name: 'Left angle bracket', category: 'Brackets' },
  { text: '〉', name: 'Right angle bracket', category: 'Brackets' },
  { text: '《', name: 'Left double angle bracket', category: 'Brackets' },
  { text: '》', name: 'Right double angle bracket', category: 'Brackets' },
  { text: '〔', name: 'Left tortoise bracket', category: 'Brackets' },
  { text: '〕', name: 'Right tortoise bracket', category: 'Brackets' },
  { text: '‹', name: 'Left small angle bracket', category: 'Brackets' },
  { text: '›', name: 'Right small angle bracket', category: 'Brackets' },
  { text: '✦', name: 'Four pointed star', category: 'Stars & sparkles' },
  { text: '✧', name: 'Hollow four pointed star', category: 'Stars & sparkles' },
  { text: '★', name: 'Black star', category: 'Stars & sparkles' },
  { text: '☆', name: 'Hollow star', category: 'Stars & sparkles' },
  { text: '✶', name: 'Six pointed star', category: 'Stars & sparkles' },
  { text: '✸', name: 'Eight teardrop star', category: 'Stars & sparkles' },
  { text: '❈', name: 'Heavy sparkle', category: 'Stars & sparkles' },
  { text: '❉', name: 'Balloon asterisk', category: 'Stars & sparkles' },
  { text: '✣', name: 'Clover star', category: 'Stars & sparkles' },
  { text: '⋆', name: 'Small star', category: 'Stars & sparkles' },
  { text: '→', name: 'Right arrow', category: 'Arrows' },
  { text: '←', name: 'Left arrow', category: 'Arrows' },
  { text: '↑', name: 'Up arrow', category: 'Arrows' },
  { text: '↓', name: 'Down arrow', category: 'Arrows' },
  { text: '➜', name: 'Heavy right arrow', category: 'Arrows' },
  { text: '➤', name: 'Right arrowhead', category: 'Arrows' },
  { text: '↠', name: 'Rightwards two headed arrow', category: 'Arrows' },
  { text: '↞', name: 'Leftwards two headed arrow', category: 'Arrows' },
  { text: '≫', name: 'Much greater than', category: 'Arrows' },
  { text: '≪', name: 'Much less than', category: 'Arrows' },
  { text: '♡', name: 'Hollow heart', category: 'Hearts & flowers' },
  { text: '♥', name: 'Black heart', category: 'Hearts & flowers' },
  { text: '❀', name: 'White florette', category: 'Hearts & flowers' },
  { text: '✿', name: 'Black florette', category: 'Hearts & flowers' },
  { text: '❥', name: 'Rotated heavy heart bullet', category: 'Hearts & flowers' },
  { text: '♧', name: 'Hollow club', category: 'Hearts & flowers' },
  { text: '☙', name: 'Reversed rotated floral heart bullet', category: 'Hearts & flowers' },
  { text: '❧', name: 'Rotated floral heart bullet', category: 'Hearts & flowers' },
  { text: '◆', name: 'Black diamond', category: 'Shapes' },
  { text: '◇', name: 'Hollow diamond', category: 'Shapes' },
  { text: '■', name: 'Black square', category: 'Shapes' },
  { text: '□', name: 'Hollow square', category: 'Shapes' },
  { text: '◈', name: 'Diamond containing dot', category: 'Shapes' },
  { text: '⬩', name: 'Small black diamond', category: 'Shapes' },
  { text: '●', name: 'Black circle', category: 'Shapes' },
  { text: '○', name: 'Hollow circle', category: 'Shapes' },
];

const STYLES = [
  { name: 'Small caps', className: 'small-caps', transform: mapRange('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘᴏʀsᴛᴜᴠᴡxʏᴢ') },
  { name: 'Bold', className: 'bold', transform: mapRange('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', '𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗') },
  { name: 'Italic', className: 'italic', transform: mapRange('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', '𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧') },
  { name: 'Bold italic', className: 'bold-italic', transform: mapRange('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', '𝑨𝑩𝑪𝑫𝑬𝑭𝑮𝑯𝑰𝑱𝑲𝑳𝑴𝑵𝑶𝑷𝑸𝑹𝑺𝑻𝑼𝑽𝑾𝑿𝒀𝒁𝒂𝒃𝒄𝒅𝒆𝒇𝒈𝒉𝒊𝒋𝒌𝒍𝒎𝒏𝒐𝒑𝒒𝒓𝒔𝒕𝒖𝒗𝒘𝒙𝒚𝒛') },
  { name: 'Script', className: 'script', transform: mapRange('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', '𝒜𝐵𝒞𝒟𝒠𝒯𝒢ℋ𝐼𝒥𝒦𝐿𝑀𝒩𝒪𝒫𝒬𝑅𝒮𝒯𝒰𝒱𝒲𝒳𝒴𝒵𝒶𝒷𝒸𝒹𝒆𝒻𝒈ℎ𝒾𝒿𝓀𝓁𝓂𝓃𝓸𝓅𝓆𝓇𝓈𝓉𝓊𝓋𝓌𝓍𝓎𝓏') },
  { name: 'Gothic', className: 'gothic', transform: mapRange('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', '𝔄𝔅ℭ𝔇𝔈𝔉𝔊ℌℑ𝔍𝔎𝔏𝔐𝔑𝔒𝔓𝔔ℜ𝔖𝔗𝔘𝔙𝔚𝔛𝔜ℨ𝔞𝔟𝔠𝔡𝔢𝔣𝔤ℌℎ𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷') },
  { name: 'Double-struck', className: 'double-struck', transform: mapRange('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', '𝔸𝔹ℂℂ𝔻𝔼𝔽𝔾ℍℍℐℑ𝕂𝕃𝕄ℕ𝕆𝕇ℚℝℚ𝕋ℍ𝕐𝕊𝕋𝕍𝕎𝕏𝕐𝕊𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡') },
  { name: 'Sans bold', className: 'sans-bold', transform: mapRange('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', '𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝗌𝗍𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝗪𝗩𝗪𝗫𝗬𝗭𝟎𝟏𝟮𝟯𝟰𝟱𝟼𝟳𝟴𝟵') },
  { name: 'Monospace', className: 'monospace', transform: mapRange('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', '𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿') },
  { name: 'Circled', className: 'circled', transform: mapRange('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', 'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ⓪①②③④⑤⑥⑦⑧⑨') },
  { name: 'Squared', className: 'squared', transform: mapRange('ABCDEFGHIJKLMNOPQRSTUVWXYZ', '🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉') },
  { name: 'Fullwidth', className: 'fullwidth', transform: mapRange('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789', 'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ０１２３４５６７８９') },
];

function mapRange(from: string, to: string) {
  const source = Array.from(from);
  const target = Array.from(to);
  const map = new Map(source.map((character, index) => [character, target[index] ?? character]));
  map.set('-', '-');
  map.set(' ', ' ');
  return (text: string) => Array.from(text).map((character) => map.get(character) ?? map.get(character.toUpperCase()) ?? character).join('');
}

export default function ChannelBeautifier() {
  const [search, setSearch] = useState('');
  const [channelText, setChannelText] = useState('general');
  const [copied, setCopied] = useState<string | null>(null);

  const safeText = useMemo(() => {
    const normalized = channelText.normalize('NFKC').trim();
    return normalized.toLowerCase().replace(/\s+/g, '-');
  }, [channelText]);

  const filteredSymbols = useMemo(() => {
    const query = search.trim().toLowerCase();
    return SYMBOLS.filter((item) => !query || item.name.toLowerCase().includes(query) || item.category.toLowerCase().includes(query));
  }, [search]);

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }
  };

  const handleCopy = async (text: string, key: string) => {
    await copyText(text);
    setCopied(key);
    window.setTimeout(() => setCopied((current) => current === key ? null : current), 1400);
  };

  const categories = Array.from(new Set(filteredSymbols.map((item) => item.category)));

  return (
    <main className="tool-page channel-beautifier-page">
      <header className="tool-page-heading">
        <h1>Channel Beautifier</h1>
        <p>Browse channel-safe symbols, separator bars, and styled text for Discord channel names.</p>
      </header>

      <section className="channel-builder" aria-label="Channel name preview">
        <label className="channel-name-field">
          <span>Channel name</span>
          <input value={channelText} onChange={(event) => setChannelText(event.target.value)} placeholder="general" />
        </label>
        <div className="channel-preview">
          <span>Preview</span>
          <strong>{safeText || 'channel-name'}</strong>
        </div>
      </section>

      <section className="channel-fonts" aria-label="Styled channel names">
        <div className="channel-section-heading">
          <h2>Fonts</h2>
          <p>Click a style to copy</p>
        </div>
        <div className="channel-font-grid">
          {STYLES.map((style) => {
            const output = style.transform(safeText || 'general');
            const key = `font-${style.name}`;
            return (
              <button className="channel-font-row" type="button" key={style.name} onClick={() => handleCopy(output, key)}>
                <span>{style.name}</span>
                <strong className={style.className}>{output}</strong>
                {copied === key ? <Check size={15} /> : <Copy size={15} />}
              </button>
            );
          })}
        </div>
      </section>

      <section className="channel-symbol-section" aria-label="Channel decorations">
        <div className="channel-section-heading">
          <h2>Symbols</h2>
        </div>
        <label className="channel-symbol-search">
          <Search size={16} aria-hidden="true" />
          <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search symbols" />
        </label>

        {categories.map((category) => (
          <div className="channel-symbol-category" key={category}>
            <h3>{category}</h3>
            <div className="channel-symbol-grid">
              {filteredSymbols.filter((item) => item.category === category).map((item) => {
                const key = `symbol-${item.name}`;
                return (
                  <button className="channel-symbol-cell" type="button" key={item.name} onClick={() => handleCopy(item.text, key)} title={`${item.name} - click to copy`}>
                    <span>{item.text}</span>
                    {copied === key && <Check className="channel-symbol-check" size={12} />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {filteredSymbols.length === 0 && <div className="channel-symbol-empty">No decorations match your search.</div>}
      </section>
    </main>
  );
}
