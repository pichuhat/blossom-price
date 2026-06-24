import { css } from 'https://esm.sh/lit@3';

export const sharedStyles = css`
.outerbox {
  width: 100%;
}

.innerbox {
width: 50%;
margin: 0 auto;
}

.ASparams {
  border: 2px solid #bc2bc4;
  border-radius: 5px;
  width: 50%;
  padding: 10px;
  margin: 0 auto;
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
`