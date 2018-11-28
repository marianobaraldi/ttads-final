import {
  ComponentFactoryResolver,
  Injectable,
  Inject,
  ReflectiveInjector
} from '@angular/core'

import { MuestraFechasComponent } from './internal/muestra-fechas/muestra-fechas.component'
@Injectable()
export class LoaderFechas {

  factoryResolver;
  rootViewContainer;
  componentRef;

  constructor(@Inject(ComponentFactoryResolver) factoryResolver) {
    this.factoryResolver = factoryResolver
  }

  setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef
  }

  addDynamicComponent() {
    const factory = this.factoryResolver
                        .resolveComponentFactory(MuestraFechasComponent)
     const component = factory
      .create(this.rootViewContainer.parentInjector)
    this.rootViewContainer.insert(component.hostView)

    this.componentRef = component;
  }

}