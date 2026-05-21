export interface Product {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  features: ProductFeature[];
  externalUrl: string;
  category: string;
}

export interface ProductFeature {
  icon: string;
  title: string;
  description: string;
}

export interface TechItem {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'security' | 'messaging';
}

export interface SecurityFeature {
  icon: string;
  title: string;
  description: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
}

export interface ArchitectureLayer {
  name: string;
  layer: string;
  items: string[];
  color: string;
}

export interface PlatformHighlight {
  icon: string;
  title: string;
  description: string;
  span?: 'wide' | 'tall' | 'normal';
}
