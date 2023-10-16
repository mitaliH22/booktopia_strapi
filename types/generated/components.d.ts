import type { Schema, Attribute } from '@strapi/strapi';

export interface BooksBooksCarousel extends Schema.Component {
  collectionName: 'components_books_books_carousels';
  info: {
    displayName: 'Books Carousel';
    icon: 'apps';
  };
  attributes: {
    header: Attribute.String & Attribute.Required;
  };
}

export interface BooksFeaturedBook extends Schema.Component {
  collectionName: 'components_books_featured_books';
  info: {
    displayName: 'featured book';
    icon: 'cast';
  };
  attributes: {
    header: Attribute.String;
  };
}

export interface LayoutButton extends Schema.Component {
  collectionName: 'components_layout_buttons';
  info: {
    displayName: 'button';
    icon: 'arrowRight';
    description: '';
  };
  attributes: {};
}

export interface LayoutHeroSection extends Schema.Component {
  collectionName: 'components_layout_hero_sections';
  info: {
    displayName: 'HeroSection';
    icon: 'alien';
    description: '';
  };
  attributes: {
    buttons: Attribute.Component<'layout.button', true>;
    label: Attribute.String;
    heroDescription: Attribute.String;
    totalBooks: Attribute.Integer;
    categories: Attribute.Integer;
    stores: Attribute.Integer;
  };
}

export interface MenuDropdown extends Schema.Component {
  collectionName: 'components_menu_dropdowns';
  info: {
    displayName: 'dropdown';
    icon: 'arrowDown';
  };
  attributes: {
    label: Attribute.String;
    sections: Attribute.Relation<
      'menu.dropdown',
      'oneToMany',
      'api::section.section'
    >;
  };
}

export interface MenuLink extends Schema.Component {
  collectionName: 'components_menu_links';
  info: {
    displayName: 'link';
    icon: 'link';
  };
  attributes: {
    label: Attribute.String;
    url: Attribute.String;
    style: Attribute.Enumeration<['none', 'border', 'blue']> &
      Attribute.DefaultTo<'none'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'books.books-carousel': BooksBooksCarousel;
      'books.featured-book': BooksFeaturedBook;
      'layout.button': LayoutButton;
      'layout.hero-section': LayoutHeroSection;
      'menu.dropdown': MenuDropdown;
      'menu.link': MenuLink;
    }
  }
}
