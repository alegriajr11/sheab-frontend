'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">frontend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-0177f9ba8a0068379dd5d8b88a5430329a37fb2ae6a4937cd3c07cc5c25e7b0ac4961d814d4816393a3e7279e8a5a36e7b0826fdf9f1604a99d46a2575c34306"' : 'data-bs-target="#xs-components-links-module-AppModule-0177f9ba8a0068379dd5d8b88a5430329a37fb2ae6a4937cd3c07cc5c25e7b0ac4961d814d4816393a3e7279e8a5a36e7b0826fdf9f1604a99d46a2575c34306"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-0177f9ba8a0068379dd5d8b88a5430329a37fb2ae6a4937cd3c07cc5c25e7b0ac4961d814d4816393a3e7279e8a5a36e7b0826fdf9f1604a99d46a2575c34306"' :
                                            'id="xs-components-links-module-AppModule-0177f9ba8a0068379dd5d8b88a5430329a37fb2ae6a4937cd3c07cc5c25e7b0ac4961d814d4816393a3e7279e8a5a36e7b0826fdf9f1604a99d46a2575c34306"' }>
                                            <li class="link">
                                                <a href="components/ActaPamecComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActaPamecComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ActaSicComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActaSicComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ActaSpComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActaSpComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ActaSpProComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ActaSpProComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AgregarIndComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AgregarIndComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AgregarcriIpsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AgregarcriIpsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AgregarcripamComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AgregarcripamComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AgregarcrisicComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AgregarcrisicComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AgregarcriterioestandarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AgregarcriterioestandarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ApoyoDiagnosticoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ApoyoDiagnosticoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AtencionInmediataComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AtencionInmediataComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CapacidadInstaladaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CapacidadInstaladaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConsultaExternaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConsultaExternaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CriterioSpIndComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CriterioSpIndComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CriterioSpIpsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CriterioSpIpsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CriterioTodosServiciosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CriterioTodosServiciosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CriterioestandarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CriterioestandarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CriteriopamecComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CriteriopamecComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CriteriosicComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CriteriosicComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditarPrestadorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditarPrestadorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditarUsuarioComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditarUsuarioComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditarcriteindComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditarcriteindComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditarcriteipsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditarcriteipsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditarcriteipsimplComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditarcriteipsimplComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditarcriteipsplanComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditarcriteipsplanComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditarcriteipsverifComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditarcriteipsverifComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditarcriteriosicComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditarcriteriosicComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditarcritpamComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditarcritpamComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EvaluacionPamecComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EvaluacionPamecComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EvaluacionSicComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EvaluacionSicComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EvaluacionSpIpsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EvaluacionSpIpsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EvaluacionSpProComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EvaluacionSpProComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EvaluacionesPamecComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EvaluacionesPamecComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EvaluacionesSicComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EvaluacionesSicComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EvaluacionesSpIpsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EvaluacionesSpIpsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EvaluacionesSpProComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EvaluacionesSpProComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeCriteriosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeCriteriosComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeEstandarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeEstandarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomePamecComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomePamecComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeResoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeResoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeSicComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeSicComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeSpComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeSpComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InternacionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >InternacionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListaPrestadorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListaPrestadorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListaUsuarioComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListaUsuarioComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListaVerificacionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListaVerificacionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MenuComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MenuComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalEvaluacionesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModalEvaluacionesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Modalsic2Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Modalsic2Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ModalsicComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ModalsicComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NuevoPrestadorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NuevoPrestadorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NuevoUsuarioAdminComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NuevoUsuarioAdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NuevoUsuarioComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NuevoUsuarioComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NuevoUsuarioPamecComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NuevoUsuarioPamecComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NuevoUsuarioResoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NuevoUsuarioResoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NuevoUsuarioSicComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NuevoUsuarioSicComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NuevoUsuarioSpComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NuevoUsuarioSpComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PasswordcComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PasswordcComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/QuirurgicoComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >QuirurgicoComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResetpasswordComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResetpasswordComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TodosServiciosComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TodosServiciosComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#pipes-links-module-AppModule-0177f9ba8a0068379dd5d8b88a5430329a37fb2ae6a4937cd3c07cc5c25e7b0ac4961d814d4816393a3e7279e8a5a36e7b0826fdf9f1604a99d46a2575c34306"' : 'data-bs-target="#xs-pipes-links-module-AppModule-0177f9ba8a0068379dd5d8b88a5430329a37fb2ae6a4937cd3c07cc5c25e7b0ac4961d814d4816393a3e7279e8a5a36e7b0826fdf9f1604a99d46a2575c34306"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AppModule-0177f9ba8a0068379dd5d8b88a5430329a37fb2ae6a4937cd3c07cc5c25e7b0ac4961d814d4816393a3e7279e8a5a36e7b0826fdf9f1604a99d46a2575c34306"' :
                                            'id="xs-pipes-links-module-AppModule-0177f9ba8a0068379dd5d8b88a5430329a37fb2ae6a4937cd3c07cc5c25e7b0ac4961d814d4816393a3e7279e8a5a36e7b0826fdf9f1604a99d46a2575c34306"' }>
                                            <li class="link">
                                                <a href="pipes/ListPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/ActaPdfDto.html" data-type="entity-link" >ActaPdfDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Actividad.html" data-type="entity-link" >Actividad</a>
                            </li>
                            <li class="link">
                                <a href="classes/Ajuste.html" data-type="entity-link" >Ajuste</a>
                            </li>
                            <li class="link">
                                <a href="classes/CambiarPasswordDto.html" data-type="entity-link" >CambiarPasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Clase.html" data-type="entity-link" >Clase</a>
                            </li>
                            <li class="link">
                                <a href="classes/Clasificacion.html" data-type="entity-link" >Clasificacion</a>
                            </li>
                            <li class="link">
                                <a href="classes/CriterioInd.html" data-type="entity-link" >CriterioInd</a>
                            </li>
                            <li class="link">
                                <a href="classes/CriterioPam.html" data-type="entity-link" >CriterioPam</a>
                            </li>
                            <li class="link">
                                <a href="classes/CriterioSic.html" data-type="entity-link" >CriterioSic</a>
                            </li>
                            <li class="link">
                                <a href="classes/CriterioSicEstandarDto.html" data-type="entity-link" >CriterioSicEstandarDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CriterioTodosServiciosDto.html" data-type="entity-link" >CriterioTodosServiciosDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CumplimientoSicDto.html" data-type="entity-link" >CumplimientoSicDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CumplimientoSicEstandarDto.html" data-type="entity-link" >CumplimientoSicEstandarDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Dominio.html" data-type="entity-link" >Dominio</a>
                            </li>
                            <li class="link">
                                <a href="classes/EditarPrestadorDto.html" data-type="entity-link" >EditarPrestadorDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Etapa.html" data-type="entity-link" >Etapa</a>
                            </li>
                            <li class="link">
                                <a href="classes/Evaluacion.html" data-type="entity-link" >Evaluacion</a>
                            </li>
                            <li class="link">
                                <a href="classes/Implementacion.html" data-type="entity-link" >Implementacion</a>
                            </li>
                            <li class="link">
                                <a href="classes/Indicador.html" data-type="entity-link" >Indicador</a>
                            </li>
                            <li class="link">
                                <a href="classes/Item.html" data-type="entity-link" >Item</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginUsuarioDto.html" data-type="entity-link" >LoginUsuarioDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Municipio.html" data-type="entity-link" >Municipio</a>
                            </li>
                            <li class="link">
                                <a href="classes/NuevoUsuarioDto.html" data-type="entity-link" >NuevoUsuarioDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Planeacion.html" data-type="entity-link" >Planeacion</a>
                            </li>
                            <li class="link">
                                <a href="classes/PrestadorDto.html" data-type="entity-link" >PrestadorDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RestablecerPasswordDto.html" data-type="entity-link" >RestablecerPasswordDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Rol.html" data-type="entity-link" >Rol</a>
                            </li>
                            <li class="link">
                                <a href="classes/Tipo.html" data-type="entity-link" >Tipo</a>
                            </li>
                            <li class="link">
                                <a href="classes/TodosServiciosDto.html" data-type="entity-link" >TodosServiciosDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/TokenDto.html" data-type="entity-link" >TokenDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Usuario.html" data-type="entity-link" >Usuario</a>
                            </li>
                            <li class="link">
                                <a href="classes/Verificacion.html" data-type="entity-link" >Verificacion</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ActapdfService.html" data-type="entity-link" >ActapdfService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ActividadService.html" data-type="entity-link" >ActividadService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AjusteService.html" data-type="entity-link" >AjusteService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ClaseService.html" data-type="entity-link" >ClaseService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ClasificacionService.html" data-type="entity-link" >ClasificacionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CriterioIndService.html" data-type="entity-link" >CriterioIndService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CriteriopamService.html" data-type="entity-link" >CriteriopamService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CriterioSicService.html" data-type="entity-link" >CriterioSicService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CriterioTodosServiciosService.html" data-type="entity-link" >CriterioTodosServiciosService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CumplimientoEstandarService.html" data-type="entity-link" >CumplimientoEstandarService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DominioService.html" data-type="entity-link" >DominioService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EtapaService.html" data-type="entity-link" >EtapaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EvaluacionipsService.html" data-type="entity-link" >EvaluacionipsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EvaluacionService.html" data-type="entity-link" >EvaluacionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ImplementacionService.html" data-type="entity-link" >ImplementacionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/IndicadorService.html" data-type="entity-link" >IndicadorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ItemipsService.html" data-type="entity-link" >ItemipsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ModalsicService.html" data-type="entity-link" >ModalsicService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MunicipioService.html" data-type="entity-link" >MunicipioService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PlaneacionService.html" data-type="entity-link" >PlaneacionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PrestadorService.html" data-type="entity-link" >PrestadorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RolService.html" data-type="entity-link" >RolService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SharedServiceService.html" data-type="entity-link" >SharedServiceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TipoService.html" data-type="entity-link" >TipoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TodosServiciosService.html" data-type="entity-link" >TodosServiciosService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TokenService.html" data-type="entity-link" >TokenService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsuarioService.html" data-type="entity-link" >UsuarioService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VerificacionService.html" data-type="entity-link" >VerificacionService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interceptors-links"' :
                            'data-bs-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/UsuarioInterceptor.html" data-type="entity-link" >UsuarioInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/ButtonGuard.html" data-type="entity-link" >ButtonGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/LoginGuard.html" data-type="entity-link" >LoginGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/UsuarioGuard.html" data-type="entity-link" >UsuarioGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});