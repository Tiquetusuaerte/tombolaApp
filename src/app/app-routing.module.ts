import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(x => x.LoginPageModule)
  },
  {
    path: 'loader',
    loadChildren: () => import('./loader/loader.module').then(x => x.LoaderPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then(x => x.InicioPageModule)
  },
  {
    path: 'apostar',
    loadChildren: () => import('./apostar/apostar.module').then(x => x.ApostarPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then(x => x.RegistroPageModule)
  },
  {
    path: 'recuperarPass',
    loadChildren: () => import('./recuperarPass/recuperarPass.module').then(x => x.RecuperarPassPageModule)
  },
  {
    path: 'movimientos',
    loadChildren: () => import('./movimientos/movimientos.module').then(x => x.MovimientosPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then(x => x.PerfilPageModule)
  },
  {
    path: 'sorteos',
    loadChildren: () => import('./sorteos/sorteos.module').then(x => x.SorteosPageModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./usuarios/usuarios.module').then(x => x.UsuariosPageModule)
  },
  {
    path: 'apostarP2',
    loadChildren: () => import('./apostarP2/apostarP2.module').then(x => x.ApostarP2PageModule)
  },
  {
    path: 'aaa',
    loadChildren: () => import('./apostarListaP/apostarListaP.module').then(x => x.ApostarListaPPageModule)
  },
  {
    path: 'misClientes',
    loadChildren: () => import('./misClientes/misClientes.module').then(x => x.MisClientesPageModule)
  },
  {
    path: 'registrarCliente',
    loadChildren: () => import('./registrarCliente/registrarCliente.module').then(x => x.RegistrarClientePageModule)
  },
  {
    path: 'detalleMovimiento',
    loadChildren: () => import('./detalleMovimiento/detalleMovimiento.module').then(x => x.DetalleMovimientoPageModule)
  },
  {
    path: 'cccc',
    loadChildren: () => import('./misListas/misListas.module').then(x => x.MisListasPageModule)
  },
  {
    path: 'configurarLista',
    loadChildren: () => import('./configurarLista/configurarLista.module').then(x => x.ConfigurarListaPageModule)
  },
  {
    path: 'xxx',
    loadChildren: () => import('./comprarLista/comprarLista.module').then(x => x.ComprarListaPageModule)
  },
  {
    path: 'sorteosTombola',
    loadChildren: () => import('./sorteosTombola/sorteosTombola.module').then(x => x.SorteosTombolaPageModule)
  },
  {
    path: 'reglamento',
    loadChildren: () => import('./reglamento/reglamento.module').then(x => x.ReglamentoPageModule)
  },
  {
    path: 'tiqueGol',
    loadChildren: () => import('./tiqueGol/tiqueGol.module').then(x => x.TiqueGolPageModule)
  },
  {
    path: 'meterGol',
    loadChildren: () => import('./meterGol/meterGol.module').then(x => x.MeterGolPageModule)
  },
  {
    path: 'jugarGol',
    loadChildren: () => import('./jugarGol/jugarGol.module').then(x => x.JugarGolPageModule)
  },
  {
    path: 'movimientosGol',
    loadChildren: () => import('./movimientosGol/movimientosGol.module').then(x => x.MovimientosGolPageModule)
  },
  {
    path: 'resultadosGol',
    loadChildren: () => import('./resultadosGol/resultadosGol.module').then(x => x.ResultadosGolPageModule)
  },
  {
    path: 'categoriasGol',
    loadChildren: () => import('./categoriasGol/categoriasGol.module').then(x => x.CategoriasGolPageModule)
  },
  {
    path: 'tresMonazos',
    loadChildren: () => import('./tresMonazos/tresMonazos.module').then(x => x.TresMonazosPageModule)
  },
  {
    path: 'menuTresMonazos',
    loadChildren: () => import('./menuTresMonazos/menuTresMonazos.module').then(x => x.MenuTresMonazosPageModule)
  },
  {
    path: 'movimientosTM',
    loadChildren: () => import('./movimientosTM/movimientosTM.module').then(x => x.MovimientosTMPageModule)
  },
  {
    path: 'resultadosTM',
    loadChildren: () => import('./resultadosTM/resultadosTM.module').then(x => x.ResultadosTMPageModule)
  },{
    path: 'menuPale',
    loadChildren: () => import('./menuPale/menuPale.module').then(x => x.MenuPalePageModule)
  }
  ,{
    path: 'pale',
    loadChildren: () => import('./pale/pale.module').then(x => x.PalePageModule)
  },{
    path: 'movimientosPale',
    loadChildren: () => import('./movimientosPale/movimientosPale.module').then(x => x.MovimientosPalePageModule)
  },{
    path: 'resultadosPale',
    loadChildren: () => import('./resultadosPale/resultadosPale.module').then(x => x.ResultadosPalePageModule)
  },{
    path: 'agentesAutorizados',
    loadChildren: () => import('./agentesAutorizados/agentesAutorizados.module').then(x => x.AgentesAutorizadosPageModule)
  }





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
