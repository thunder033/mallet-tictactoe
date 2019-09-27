import {
    Camera,
    Config, inject,
    EmbeddedStyle,
    InjectableMethod,
    IWebGLResourceContext,
    malletWebGL, MDT,
    ngAnnotate,
    Renderer,
    ShaderDTO,
    WebGLApp,
    MalletConfigProvider, Entity, IShaderOptions,
} from 'mallet-dev';
import {IController} from 'angular';
import angular = require('angular');

import {TicTacToe} from './tictactoe';

export const tictactoe = angular.module('tictactoe', [malletWebGL.name]);

@Config(tictactoe) class Configure implements InjectableMethod {
    public exec(@inject.provider(MDT.config.mallet) malletConfig: MalletConfigProvider): any {
        malletConfig.useStyle(EmbeddedStyle.MalletBase);
    }
}

// class ColorCube extends Entity {
//     private cubeZ: number;
//     private cubeDelta: number;
//     private cubeRot: number;
//
//     constructor() {
//         super('cube');
//         this.cubeZ = -1;
//         this.cubeDelta = 1 / 500;
//         this.cubeRot = 0;
//     }
//
//     public update(dt: number, tt: number): void {
//         this.cubeZ += dt * this.cubeDelta;
//         this.cubeRot += dt * this.cubeDelta * 200;
//
//         const min = -10;
//         const max = -0.1 - 0.5;
//         if (this.cubeZ < min || this.cubeZ > max) {
//             this.cubeZ = Math.min(min, Math.max(this.cubeZ, max));
//             this.cubeDelta *= -1;
//         }
//
//         this.transform.setPosition(.25, -.15, this.cubeZ);
//         this.transform.setRotation(this.cubeRot, this.cubeRot, this.cubeRot);
//     }
// }

class TicTacToeApp extends WebGLApp implements IController {
    game: TicTacToe;

    public config(): void {
        this.logger.info('Running TicTacToeApp App');
    }

    public onError(e) {
        this.logger.error(e);
    }

    public init({renderTarget}: IWebGLResourceContext): any {
        return Promise.all([
            this.library.get(ShaderDTO, '3d-vertex-shader'),
            this.library.get(ShaderDTO, 'fragment-shader'),
        ]).then(([vertex, fragment]: IShaderOptions[]) => {
            if (!vertex || !fragment) {
                throw new Error(`Failed to load TicTacToe shader content.`);
            }

            const program = this.stage.addProgram({shaders: {vertex, fragment}, name: '3d'});
            const glFactory = this.stage.getFactory();

            this.camera = new Camera(renderTarget.getAspectRatio());
            this.renderer = glFactory.create(Renderer, {camera: this.camera, program});
            this.postUpdate = this.camera.update;

            // setup lighting
            program.getUniformSetter('light.ambientColor')(0.1, 0.1, 0.1, 1.0);
            program.getUniformSetter('light.diffuseColor')(0.8, 0.8, 0.8, 1.0);
            program.getUniformSetter('light.direction')(-1, 0, 0);

            this.game = glFactory.create(TicTacToe);
        });
    }
}

tictactoe.component('malletWebglApp', {
    controller: ngAnnotate(TicTacToeApp, WebGLApp),
    transclude: true,
    template: '<mallet-webgl-stage class="viewport-container"></mallet-webgl-stage><ng-transclude></ng-transclude>',
});
