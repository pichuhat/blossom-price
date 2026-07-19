import { css, unsafeCSS } from 'https://esm.sh/lit@3';
const fontUrl = new URL('./fonts/Mozart NBP Regular.ttf', import.meta.url).href;

export const sharedStyles = css`
:host, *, *::before, *::after {
  transition: background-color 0.5s ease, color 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease;
}

.self-center {
margin-left: auto;
margin-right: auto;
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
  margin: 20px auto;
  background-color: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  box-shadow: 0 0 0 1px var(--color-border), 0 4px 16px var(--color-glow);
  color: var(--color-text)
}

.forceLeft {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  text-align: left;
  margin-left: 20px;
}

.forceLeft.noGap {
margin-left: 0;
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
    .navsearch {
    background-color: var(--wa-color-brand-fill-normal);
    border: 3px var(--wa-color-brand-border-loud) solid;
    margin-right: 0;
    padding: 3px;
    border-right: none;
    }
    wa-input wa-icon {
    transition: color 0.2s ease;
    }
    wa-input wa-icon:hover {
    color: #d3d3d3;
    }
    .forceGap {
    margin-top: 20px;
    }
    .biggerText {
    font-size: 300%;
    font-weight: bold;
    }
    .bigText {
    font-size: 200%;
    font-weight: bold;
    }
    .bigSubText {
    font-size: 150%;
    }
    .alt {
    font-style: italic;
    }
    .bold {
    font-weight: bold;
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

    .card img, .card .give-preview-text-outer {
      display: block;
      width: auto;
      max-width: 100%;
      height: auto;
      border-radius: 6px;
      margin-top: 12px;
    }
    .fullcard {
    background-color: var(--color-surface-raised);
    border: 2px solid var(--color-border);
    border-radius: 8px;
    padding: 20px;
    color: var(--color-text);
    text-align: center;
    box-shadow: 0 0 0 1px var(--color-border-alt), 0 4px 16px var(--color-glow);
    min-width: 50%;
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
      .grid-single-row {
  flex-wrap: nowrap;
  overflow: hidden;
}
  @font-face {
    font-family: 'Mozart NBP';
    src: url('${unsafeCSS(fontUrl)}') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
}
.give-preview-text-outer {
    overflow: auto;
    max-width: 100%;
}
.give-preview-text {
    padding: 2px;
    display: inline-block;
    background-color: rgba(17,2,16,.8)
}
.give-preview-text-inner {
    font-family: 'Mozart NBP';
    font-smooth: never;
    -webkit-font-smoothing: none;
    -moz-osx-font-smoothing: none;
    font-size: 24px;
    line-height: .8;
    padding: 4px 5px;
    border: 2px solid #2c0863;
    border-radius: 2px;
}
.mc-bold {
    font-weight: bold;
}

.mc-italic {
    font-style: italic;
}
.mc-underlined {
    text-decoration: underline;
}

/* &0 */
.mc-black {
    color: #000000;
}
/* &1 */
.mc-dark-blue {
    color: #0000AA;
}
/* &2 */
.mc-dark-green {
    color: #00AA00;
}
/* &3 */
.mc-dark-aqua {
    color: #00AAAA;
}
/* &4 */
.mc-dark-red {
    color: #AA0000 ;
}
/* &5 */
.mc-dark-purple {
    color: #AA00AA ;
}
/* &6 */
.mc-gold {
    color: #FFAA00;
}
/* &7 */
.mc-gray {
    color: #AAAAAA ;
}
/* &8 */
.mc-dark-gray {
    color: #555555 ;
}
/* &9 */
.mc-blue {
    color: #5555FF;
}
/* &a */
.mc-green {
    color: #55FF55 ;
}
/* &b */
.mc-aqua {
    color: #55FFFF;
}
/* &c */
.mc-red {
    color: #FF5555;
}
/* &d */
.mc-light-purple {
    color: #FF55FF;
}
/* &e */
.mc-yellow {
    color: #FFFF55;
}
/* &f */
.mc-white {
    color: #FFFFFF;
}
table, th, td {
        border: 1px var(--color-text) solid;
        padding: 10px;
        text-align: center;
        transition: border ease 0s;
    }
    
    table {
        border-collapse: collapse;
        margin: 0 auto;
        margin-top: 20px;
        width: 100%;
        color: var(--color-text);
    }

.modal-overlay {
  position: fixed;
  display: block;
  z-index: 1001;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-overlay[hidden] {
  display: none;
}

.modal-content {
  background-color: var(--color-surface-raised);
  margin: 15% auto;
  padding: 20px;
  border: 2px solid var(--color-border);
  width: 80%;
  max-width: 500px;
  border-radius: 8px;
  position: relative;
}

.big-spinner wa-spinner {
font-size: 3rem;
--track-width: 5px;
}
`