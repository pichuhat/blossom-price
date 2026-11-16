import { html } from 'lit';
import { keyed } from 'lit/directives/keyed.js';

const officialImageBase = 'https://items.blossomcraft.org/static/images';
const spawnerImage = 'https://minecraft.wiki/images/Monster_Spawner_JE4.png';

function itemImageSource(item, folder) {
  if (item.tags?.includes('spawner')) return spawnerImage;
  if (item.tags?.includes('currency')) return `/src/images/${item.img_src}`;
  return `${officialImageBase}/${folder}/${item.id}.png`;
}

function hideMissingIcon(event) {
  event.target.hidden = true;
}

export function itemDescriptionImage(item, altText, loading = 'lazy') {
  return html`<img src=${itemImageSource(item, 'Descriptions')} alt=${altText} loading=${loading} />`;
}

export function itemIcon(item) {
  return keyed(
    item.id,
    html`<img class="item-icon" src=${itemImageSource(item, 'Icons')} 
              alt="" width="32" height="32" loading="lazy" @error=${hideMissingIcon} />`,
  );
}
