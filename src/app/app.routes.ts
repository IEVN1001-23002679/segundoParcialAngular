import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'formularios',
        children:[
            {
                path:'usuarios',
                loadComponent:()=>
                    import('./formularios/usuarios/usuarios').then(
                        (c)=>c.Usuarios
                    ),
            },
             {
                path:'zodiaco',
                loadComponent:()=>
                    import('./formularios/zodiaco/zodiaco').then(
                        (c)=>c.Zodiaco
                    ),
            },
            {
            path: 'registros-zodiaco',
            loadComponent: () =>
                import('./formularios/registros-zodiaco/registros-zodiaco')
                .then((c) => c.RegistrosZodiaco)
            },
            {
            path: 'editar-zodiaco/:id',
            loadComponent: () =>
                import('./formularios/editar-zodiaco/editar-zodiaco')
                .then((c) => c.EditarZodiaco)
            }
        ],
      
    },
    {
        path:'escuela',
        children:[
            {
                path:'lista-alumnos',
                loadComponent:()=>
                    import('./escuela/lista-alumnos/lista-alumnos').then(
                        (c)=>c.ListaAlumnos
                    ),
            },
        ]
    },
    {
        path:'', redirectTo:'admin', pathMatch: 'full'
    },
    {
        path:'**', redirectTo:'admin'
    },
];
