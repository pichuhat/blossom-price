import { css } from 'https://esm.sh/lit@3';

export const sharedStyles = css`
:host, *, *::before, *::after {
  transition: background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease;
}

.outerbox {
  width: 100%;
}

.innerbox {
width: 50%;
margin: 0 auto;
}

.center {
text-align: center;
}

.ASparams {
  border-radius: 5px;
  width: 50%;
  padding: 10px;
  margin: 0 auto;
  background-color: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  box-shadow: 0 0 0 1px var(--color-border), 0 4px 16px var(--color-glow);
}

:host {
  --wa-color-brand-fill-loud: #bc4bc2;   /* solid buttons/backgrounds */
  --wa-color-brand-fill-normal: #f3d7f7; /* lighter fill */
  --wa-color-brand-fill-quiet: #fcf6fd;  /* subtle fill */
  --wa-color-brand-border-loud: #97319a;
  --wa-color-brand-border-normal: #df8ce6;
  --wa-color-brand-border-quiet: #f3d7f7;
  --wa-color-brand-on-loud: white;       /* text on solid brand bg */
  --wa-color-brand-on-normal: #97319a;
  --wa-color-brand-on-quiet: #7d2a7e;
  --wa-color-focus: #bc4bc2;
}
  
.forceAlign {
display: flex;
align-items: center;
}

.forceAlign wa-icon {
vertical-align: middle;
}

.minibutton {
    color: white;
    background-color: #bc2bc4;
    padding: 7px;
    border: none;
    transition: background-color 0.2s ease;
    }
    .minibutton:disabled {
    background-color: #aaaaaa;
    }
    .minibutton:hover {
    background-color: #831889;
    }
    .minibutton:hover:disabled {
    background-color: #aaaaaa;
    }
    .leftbutton {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    margin-right: 1px;
    }
    .rightbutton {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    margin-left: 1px;
    }
    .navsearch {
    background-color: var(--wa-color-brand-fill-normal);
    border: 3px var(--wa-color-brand-border-loud) solid;
    margin-right: 0;
    padding: 3px;
    border-right: none;
    }
    .navbutton {
    padding: 3px;
    background-color: var(--wa-color-brand-border-loud);
    color: white;
    transition: background-color 0.2s ease;
    margin-left: 0;
    border: 3px var(--wa-color-brand-border-loud) solid;
    transition: 0.2s background-color ease;
    }
    .navbutton:hover {
    background-color: var(--wa-color-border-normal);
    }
    wa-input wa-icon {
    transition: color 0.2s ease;
    }
    wa-input wa-icon:hover {
    color: #d3d3d3;
    }
    .bigText {
    font-size: 200%;
    font-weight: bold;
    }
    .bigSubText {
    font-size: 150%;
    }
    .bigSubText .alt {
    font-style: italic;
    }
    .card {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: fit-content;
      max-width: 100%;
      background-color: var(--color-surface-raised);
      border: 1px solid var(--color-border-alt);
      border-radius: 8px;
      padding: 16px;
      color: var(--color-text);
      box-sizing: border-box;
      overflow: hidden;
      box-shadow: 0 0 0 1px var(--color-border-alt), 0 4px 16px var(--color-glow);
      transition: transform 0.3s ease;
    }

    .card:hover {
    transform: scale(1.02);
    }

    .card img {
      display: block;
      width: auto;
      max-width: 100%;
      height: auto;
      border-radius: 6px;
      margin-top: 12px;
    }
    .priceAdd {
        font-size: 100%;
    }
    .price {
        color: var(--color-price);
        font-weight: bold;
        font-size: 130%;
    }
    .tags {
      margin-top: 10px;
      display: flex;
      gap: 5px;
      flex-wrap: wrap;
      justify-content: center;
    }
    .tag {
      background-color: #bc4bc2;
      color: white;
      font-size: 80%;
      padding: 2px 8px;
      border-radius: 4px;
      text-transform: uppercase;
    }
    .grid {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      padding: 20px;
      justify-content: center;
    }
`