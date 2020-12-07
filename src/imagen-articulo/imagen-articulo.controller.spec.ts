import { Test, TestingModule } from '@nestjs/testing';
import { ImagenArticuloController } from './imagen-articulo.controller';

describe('ImagenArticuloController', () => {
  let controller: ImagenArticuloController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagenArticuloController],
    }).compile();

    controller = module.get<ImagenArticuloController>(ImagenArticuloController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
