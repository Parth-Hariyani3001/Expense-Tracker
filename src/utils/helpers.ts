export const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en', { maximumFractionDigits: 0 }).format(value);
