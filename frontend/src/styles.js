import { css } from 'https://esm.sh/lit@3';

export const sharedStyles = css`
.outerbox {
  width: 100%;
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
}
`