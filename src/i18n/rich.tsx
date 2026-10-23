import { Fragment, type ReactNode } from "react";
import {
  DEFAULT_LOCALE,
  format,
  template,
  type Locale,
  type MessageKey,
  type MessageVars,
} from "./index";
import { useLocale } from "./context";

/**
 * Wie `t`, aber mit Platzhaltern, an deren Stelle Elemente stehen – etwa ein
 * Link mitten im Satz. So bleibt der ganze Satz eine Beschriftung und kann in
 * jeder Sprache die Wortstellung ändern; der Link wandert mit.
 *
 * `tRich("x", { link: <a>…</a> })` setzt `{link}` im Text durch das Element.
 * Komponenten benutzen `useRich()`, das die Sprache aus dem Kontext nimmt;
 * `tRich` selbst gilt für Serverseiten (Deutsch, oder `locale` angeben).
 */
export function tRich(
  key: MessageKey,
  nodes: Record<string, ReactNode>,
  vars?: MessageVars,
  locale: Locale = DEFAULT_LOCALE,
): ReactNode {
  return template(key, locale)
    .split(/(\{\w+\})/)
    .map((part, index) => {
      const name = /^\{(\w+)\}$/.exec(part)?.[1];
      if (name !== undefined && name in nodes) {
        return <Fragment key={index}>{nodes[name]}</Fragment>;
      }
      return <Fragment key={index}>{format(part, vars)}</Fragment>;
    });
}

/** `tRich` in der Sprache der Oberfläche – `const tr = useRich();`. */
export function useRich() {
  const locale = useLocale();
  return (key: MessageKey, nodes: Record<string, ReactNode>, vars?: MessageVars) =>
    tRich(key, nodes, vars, locale);
}
