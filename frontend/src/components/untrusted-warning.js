import { html, nothing } from 'lit';

const warningText = 'Use with caution. You may want to verify this price elsewhere.';
const warningTextAlt = "One or more of the prices below is unverified. Use with caution."
let warningId = 0;
let historicalTimestampInfoId = 0;

const historicalTimestampFormatter = new Intl.DateTimeFormat("en-US", {dateStyle: 'long', timeStyle: 'medium'});

export function isUntrustedAuthor(authorId) {
  return String(authorId ?? '').startsWith('untrusted:');
}

export function untrustedPriceWarning(type2) {
  const id = `untrusted-warning-${++warningId}`;

  return html` <wa-icon id=${id} class="untrusted-warning" name="triangle-exclamation" role="img" tabindex="0" aria-label="Untrusted price author" style="color: var(--wa-color-warning-fill-loud, #b7791f); cursor: help; vertical-align: -0.15em;"></wa-icon><wa-tooltip for=${id} trigger="click focus hover">${type2 ? warningTextAlt : warningText}</wa-tooltip>`;
}

export function untrustedWarning(authorId, type2) {
  return isUntrustedAuthor(authorId) ? untrustedPriceWarning(type2) : nothing;
}

export function historicalTimestampInfo(isHistorical, realTimestamp) {
  if (!isHistorical || !realTimestamp) return nothing;

  const id = `historical-timestamp-info-${++historicalTimestampInfoId}`;
  const submittedAt = historicalTimestampFormatter.format(new Date(realTimestamp));

  return html` <wa-icon id=${id} name="circle-info" role="img" tabindex="0" aria-label="Historical price timestamp" style="color: var(--wa-color-brand-fill-loud, #bc4bc2); cursor: help; vertical-align: -0.15em;"></wa-icon><wa-tooltip for=${id} trigger="click focus hover">This price is a <strong>historical datapoint.</strong><br>It was submitted on ${submittedAt}</wa-tooltip>`;
}
