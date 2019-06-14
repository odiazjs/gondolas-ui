import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const menuItems: Menu[] = [
  { state: 'dashboard', name: 'Inicio', type: 'link', icon: 'home' },
  { state: 'roles', type: 'link', name: 'Roles', icon: 'verified_user' },
  { state: 'users', type: 'link', name: 'Usuarios', icon: 'supervised_user_circle' },
  { state: 'establishments', type: 'link', name: 'Negocios', icon: 'business' },
  { state: 'products', type: 'link', name: 'Productos', icon: 'add_shopping_cart' },
  { state: 'exhibitors', type: 'link', name: 'Exhibidores', icon: 'dashboard' },
  { state: 'formats', type: 'link', name: 'Formatos', icon: 'reorder' },
  { state: 'chains', type: 'link', name: 'Cadenas', icon: 'reorder' },
  { state: 'channels', type: 'link', name: 'Canales', icon: 'reorder' },
  { state: 'companies', type: 'link', name: 'Empresas', icon: 'reorder' },
  { state: 'jobtitles', type: 'link', name: 'Puestos', icon: 'reorder' },
  { state: 'brands', type: 'link', name: 'Marcas', icon: 'reorder' },
  { state: 'categories', type: 'link', name: 'Categorias', icon: 'reorder' },
  { state: 'flavors', type: 'link', name: 'Sabores', icon: 'reorder' },
  { state: 'packings', type: 'link', name: 'Presentaciones', icon: 'reorder' },
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return menuItems;
  }
}
