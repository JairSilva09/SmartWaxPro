import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        icon     : 'apps',
        children : [
            {
                id       : 'dashboards',
                title    : 'Profile',
                translate: 'NAV.DASHBOARDS',
                type     : 'collapsable',
                icon     : 'dashboard',
                // children : [
                //     {
                //         id   : 'analytics',
                //         title: 'Analytics',
                //         type : 'item',
                //         url  : '/apps/dashboards/analytics'
                //     },
                //     {
                //         id   : 'project',
                //         title: 'Project',
                //         type : 'item',
                //         url  : '/apps/dashboards/project'
                //     }
                // ]
            },
            {
                id       : 'calendar',
                title    : 'Calendar',
                translate: 'NAV.CALENDAR',
                type     : 'item',
                icon     : 'today',
                url      : '/apps/calendar'
            },
            {
                id       : 'e-commerce',
                title    : 'E-Commerce',
                translate: 'NAV.ECOMMERCE',
                type     : 'collapsable',
                icon     : 'shopping_cart',
                // children : [
                //     {
                //         id   : 'dashboard',
                //         title: 'Dashboard',
                //         type : 'item',
                //         url  : '/apps/e-commerce/dashboard'
                //     },
                //     {
                //         id        : 'products',
                //         title     : 'Products',
                //         type      : 'item',
                //         url       : '/apps/e-commerce/products',
                //         exactMatch: true
                //     },
                //     {
                //         id        : 'productDetail',
                //         title     : 'Product Detail',
                //         type      : 'item',
                //         url       : '/apps/e-commerce/products/1/printed-dress',
                //         exactMatch: true
                //     },
                //     {
                //         id        : 'orders',
                //         title     : 'Orders',
                //         type      : 'item',
                //         url       : '/apps/e-commerce/orders',
                //         exactMatch: true
                //     },
                //     {
                //         id        : 'orderDetail',
                //         title     : 'Order Detail',
                //         type      : 'item',
                //         url       : '/apps/e-commerce/orders/1',
                //         exactMatch: true
                //     }
                // ]
            },
            {
                id      : 'pricing',
                title   : 'Payments',
                type    : 'collapsable',
                icon    : 'attach_money',
                children: [
                    {
                        id   : 'style-1',
                        title: 'Style 1',
                        type : 'item',
                        url  : '/pages/pricing/style-1'
                    },
                    {
                        id   : 'style-2',
                        title: 'Style 2',
                        type : 'item',
                        url  : '/pages/pricing/style-2'
                    },
                    {
                        id   : 'style-3',
                        title: 'Style 3',
                        type : 'item',
                        url  : '/pages/pricing/style-3'
                    }
                ]
            }
            
           
         
        ]
    },

];
