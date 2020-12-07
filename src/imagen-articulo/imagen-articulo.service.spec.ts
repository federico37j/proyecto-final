import { Test, TestingModule } from '@nestjs/testing';
import { ImagenArticuloService } from './imagen-articulo.service';

describe('ImagenArticuloService', () => {
  let service: ImagenArticuloService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImagenArticuloService],
    }).compile();

    service = module.get<ImagenArticuloService>(ImagenArticuloService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
