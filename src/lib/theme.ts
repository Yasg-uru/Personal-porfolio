export const theme = {
  primary: "--primary",
  primaryForeground: "--primary-foreground",
  cssVar: (name: string) => `var(${name})`,
  hsl: (name: string, alpha = "1") => `hsl(var(${name}) / ${alpha})`,
}

export default theme
